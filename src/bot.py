from __future__ import annotations

import argparse
import json
import logging
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List

from src.dashboard import export_dashboard_payload
from src.exchange import ExchangeAdapter
from src.models import EquityPoint, PortfolioState, Position, Signal, TradeRecord
from src.optimizer import optimize_genome
from src.regime import detect_regime
from src.risk import evaluate_entry_and_size
from src.strategies import evaluate_position_exit, select_autonomous_signal
from src.vault import allocate_realized_profit, resolve_self_improvement_tier


ROOT_DIR = Path(__file__).resolve().parent.parent
CONFIG_PATH = ROOT_DIR / "config" / "settings.json"
STATE_PATH = ROOT_DIR / "data" / "state.json"
GENOME_PATH = ROOT_DIR / "data" / "strategy_genome.json"
DOCS_DIR = ROOT_DIR / "docs"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-7s | %(name)s | %(message)s",
)
logger = logging.getLogger("AetherQuant.Bot")


def load_json(path: Path, default: Dict[str, Any]) -> Dict[str, Any]:
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:  # noqa: BLE001
        logger.warning("Impossibile leggere %s (%s), uso default.", path, exc)
        return default


def save_json(path: Path, data: Dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def run_cycle(mode: str, force_optimize: bool = False) -> None:
    settings = load_json(CONFIG_PATH, {})
    initial_cap = float(settings.get("initial_capital_eur", 40.0))

    raw_state = load_json(
        STATE_PATH,
        PortfolioState(mode=mode, initial_capital_eur=initial_cap, trading_cash_eur=initial_cap).to_dict(),
    )
    state = PortfolioState.from_dict(raw_state)
    state.mode = mode

    genome = load_json(GENOME_PATH, {"generation": 0, "assets": {}, "recent_optimization_notes": []})

    now_utc = datetime.now(timezone.utc)
    now_iso = now_utc.isoformat()

    # 1. Determina il Livello Evolutivo sbloccato dal Fondo Autofinanziamento 10%
    active_tier = resolve_self_improvement_tier(
        state.bot_vault_eur, settings.get("self_improvement_tiers", [])
    )
    state.current_tier = int(active_tier.get("tier", 1))
    state.current_tier_name = str(active_tier.get("name", "Seed Explorer"))

    # 2. Connessione Exchange e download candele reali EUR
    adapter = ExchangeAdapter(settings=settings, mode=mode)
    active_ex = adapter.connect()
    state.exchange_used = active_ex

    if mode == "live":
        live_free_eur = adapter.fetch_live_eur_balance()
        # Separa sempre il Fondo Bot 10% dal capitale operativo disponibile
        state.trading_cash_eur = max(0.0, round(live_free_eur - state.bot_vault_eur, 4))

    all_symbols: List[str] = list(settings.get("candidate_symbols", ["BTC/EUR", "ETH/EUR"]))
    max_scan = int(active_tier.get("max_symbols_scanned", len(all_symbols)))
    # Includi sempre eventuali simboli con posizioni già aperte
    scan_symbols = list(dict.fromkeys(list(state.positions.keys()) + all_symbols[:max_scan]))

    market_candles = adapter.fetch_ohlcv_arrays(
        symbols=scan_symbols,
        timeframe=str(settings.get("timeframe", "1h")),
        limit=int(settings.get("candle_limit", 500)),
    )
    if not market_candles:
        raise RuntimeError("Nessun dato OHLCV ricevuto dall'exchange. Ciclo annullato in sicurezza.")

    # 3. Auto-Ottimizzazione Walk-Forward (al primo avvio, su richiesta, o ogni N cicli)
    opt_every = int(settings.get("optimize_every_n_cycles", 6))
    should_optimize = (
        force_optimize
        or int(genome.get("generation", 0)) == 0
        or (state.cycle_count > 0 and state.cycle_count % opt_every == 0)
    )
    if should_optimize:
        grid_combos = int(active_tier.get("grid_combinations", 12))
        logger.info(
            "Avvio Auto-Ottimizzazione Walk-Forward [Tier %d - %s | %d combinazioni]...",
            state.current_tier,
            state.current_tier_name,
            grid_combos,
        )
        genome, opt_logs = optimize_genome(
            market_candles=market_candles,
            current_genome=genome,
            trade_history=state.trade_history,
            grid_combinations=grid_combos,
            fee_rate=float(settings.get("fee_rate", 0.0016)),
            slippage_rate=float(settings.get("slippage_rate", 0.0005)),
        )
        state.last_optimized_at = now_iso
        for line in opt_logs:
            logger.info("  [EVOLUZIONE] %s", line)

    # 4. Analisi Regimi di Mercato su tutti gli asset scansionati
    market_prices: Dict[str, float] = {}
    regime_reports = {}
    market_regimes_view: Dict[str, Dict[str, Any]] = {}

    for sym, ohlcv in market_candles.items():
        highs = ohlcv[:, 2]
        lows = ohlcv[:, 3]
        closes = ohlcv[:, 4]
        cur_px = float(closes[-1])
        market_prices[sym] = cur_px
        rep = detect_regime(highs, lows, closes)
        regime_reports[sym] = rep
        market_regimes_view[sym] = {
            "price_eur": round(cur_px, 4),
            "regime": rep.regime,
            "adx": rep.adx_value,
            "rsi": rep.rsi_value,
            "atr_pct": round(rep.atr_pct * 100.0, 2),
            "slope_pct": rep.trend_slope_pct,
            "confidence": rep.confidence,
            "rationale": rep.rationale,
        }

    # Sintesi macro regime prevalente
    regimes_list = [r.regime for r in regime_reports.values()]
    if regimes_list:
        state.last_regime_summary = max(set(regimes_list), key=regimes_list.count)

    # 5. Gestione Posizioni Aperte (Stop-Loss, Trailing Profit Lock, Take-Profit, Regime Shield)
    max_hold_h = int(settings.get("risk", {}).get("max_holding_hours", 120))
    bot_share_pct = float(settings.get("bot_profit_share_pct", 0.10))

    for sym in list(state.positions.keys()):
        pos = state.positions[sym]
        if sym not in market_candles:
            continue
        ohlcv = market_candles[sym]
        cur_px = float(ohlcv[-1, 4])
        hi_px = float(ohlcv[-1, 2])
        lo_px = float(ohlcv[-1, 3])
        rep = regime_reports[sym]

        should_exit, exit_reason, _ = evaluate_position_exit(
            pos=pos,
            current_price=cur_px,
            high_price=hi_px,
            low_price=lo_px,
            regime_report=rep,
            max_holding_hours=max_hold_h,
            now_utc=now_utc,
        )
        if should_exit:
            exec_px, sold_qty, exit_fee_eur, _ = adapter.execute_spot_sell(
                symbol=sym, quantity=pos.quantity, ref_price=cur_px
            )
            gross_proceeds = sold_qty * exec_px
            net_proceeds = gross_proceeds - exit_fee_eur
            state.trading_cash_eur = round(state.trading_cash_eur + net_proceeds, 6)

            total_entry_outflow = pos.cost_eur + pos.entry_fee_eur
            total_fees = pos.entry_fee_eur + exit_fee_eur
            gross_pnl = gross_proceeds - pos.cost_eur
            net_pnl = net_proceeds - total_entry_outflow
            net_pnl_pct = (net_pnl / pos.cost_eur) if pos.cost_eur > 0 else 0.0

            bot_cut, user_cut = allocate_realized_profit(
                state=state, net_pnl_eur=net_pnl, bot_share_pct=bot_share_pct
            )

            trade_rec = TradeRecord(
                trade_id=uuid.uuid4().hex[:10],
                symbol=sym,
                strategy=pos.strategy,
                regime=pos.regime_at_entry,
                entry_price=round(pos.entry_price, 6),
                exit_price=round(exec_px, 6),
                quantity=round(sold_qty, 8),
                gross_pnl_eur=round(gross_pnl, 4),
                fees_eur=round(total_fees, 4),
                net_pnl_eur=round(net_pnl, 4),
                net_pnl_pct=round(net_pnl_pct, 5),
                bot_share_eur=round(bot_cut, 4),
                user_share_eur=round(user_cut, 4),
                exit_reason=exit_reason,
                opened_at=pos.opened_at,
                closed_at=now_iso,
            )
            state.trade_history.append(trade_rec)
            del state.positions[sym]
            logger.info(
                "CHIUSA %s [%s] | Net PnL: %+.3f€ (%+.2f%%) | Quota Bot 10%%: %.4f€ | Fondo Bot Totale: %.4f€",
                sym,
                exit_reason,
                net_pnl,
                net_pnl_pct * 100.0,
                bot_cut,
                state.bot_vault_eur,
            )

    # 6. Scansione Nuove Opportunità ad Aspettativa Positiva
    candidate_signals: List[Signal] = []
    for sym, ohlcv in market_candles.items():
        if sym in state.positions:
            continue
        sig = select_autonomous_signal(
            symbol=sym,
            opens=ohlcv[:, 1],
            highs=ohlcv[:, 2],
            lows=ohlcv[:, 3],
            closes=ohlcv[:, 4],
            volumes=ohlcv[:, 5],
            regime_report=regime_reports[sym],
            asset_genome=genome.get("assets", {}).get(sym, {}),
        )
        market_regimes_view[sym]["selected_strategy"] = sig.strategy
        market_regimes_view[sym]["signal"] = sig.action
        market_regimes_view[sym]["signal_rationale"] = sig.rationale
        if sig.action == "BUY":
            candidate_signals.append(sig)

    # Ordina i segnali BUY per confidenza + Walk-Forward score decrescente
    candidate_signals.sort(
        key=lambda s: (s.confidence + s.walk_forward_score * 0.4), reverse=True
    )

    for sig in candidate_signals:
        invested_now = sum(
            p.quantity * market_prices.get(s, p.entry_price)
            for s, p in state.positions.items()
        )
        current_user_eq = state.trading_cash_eur + invested_now

        decision = evaluate_entry_and_size(
            signal=sig,
            state=state,
            user_equity_eur=current_user_eq,
            settings=settings,
        )
        if not decision.approved:
            logger.info("Segnale %s (%s) filtrato dal Risk Manager: %s", sig.symbol, sig.strategy, decision.reason)
            continue

        exec_px, filled_qty, entry_fee_eur, order_id = adapter.execute_spot_buy(
            symbol=sig.symbol, order_eur=decision.order_eur, ref_price=sig.price
        )
        actual_cost_eur = filled_qty * exec_px
        total_outflow = actual_cost_eur + entry_fee_eur
        state.trading_cash_eur = round(max(0.0, state.trading_cash_eur - total_outflow), 6)

        # Ricalcola stop/target rispetto al prezzo effettivo eseguito
        sl_offset = sig.price - sig.stop_loss
        tp_offset = sig.take_profit - sig.price
        new_pos = Position(
            symbol=sig.symbol,
            strategy=sig.strategy,
            regime_at_entry=sig.regime,
            entry_price=round(exec_px, 6),
            quantity=round(filled_qty, 8),
            cost_eur=round(actual_cost_eur, 4),
            entry_fee_eur=round(entry_fee_eur, 4),
            stop_loss=round(exec_px - sl_offset, 6),
            take_profit=round(exec_px + tp_offset, 6),
            highest_price=round(exec_px, 6),
            trailing_atr_dist=sig.trailing_atr_dist,
            opened_at=now_iso,
            order_id=order_id,
        )
        state.positions[sig.symbol] = new_pos
        state.last_selected_strategy = f"{sig.strategy} ({sig.symbol})"
        logger.info(
            "APERTA %s | Strategia: %s | Costo: %.2f€ | SL: %.4f | TP: %.4f",
            sig.symbol,
            sig.strategy,
            actual_cost_eur,
            new_pos.stop_loss,
            new_pos.take_profit,
        )

    if not state.positions and not candidate_signals:
        state.last_selected_strategy = (
            "Scudo Liquidità EUR (Difesa)"
            if state.last_regime_summary == "BEAR_DEFENSIVE"
            else "Attesa Setup Ottimale (Cash EUR)"
        )

    # 7. Aggiornamento Equity Curve, Picco Storico e Salvataggio
    final_invested = sum(
        p.quantity * market_prices.get(s, p.entry_price)
        for s, p in state.positions.items()
    )
    final_user_equity = state.trading_cash_eur + final_invested
    if final_user_equity > state.peak_user_equity_eur:
        state.peak_user_equity_eur = round(final_user_equity, 4)

    # Ri-verifica eventuale upgrade di Tier dopo chiusure in profitto
    updated_tier = resolve_self_improvement_tier(
        state.bot_vault_eur, settings.get("self_improvement_tiers", [])
    )
    state.current_tier = int(updated_tier.get("tier", 1))
    state.current_tier_name = str(updated_tier.get("name", "Seed Explorer"))

    state.cycle_count += 1
    state.last_run_at = now_iso
    state.equity_curve.append(
        EquityPoint(
            timestamp=now_iso,
            total_equity_eur=round(final_user_equity + state.bot_vault_eur, 4),
            user_equity_eur=round(final_user_equity, 4),
            bot_vault_eur=round(state.bot_vault_eur, 4),
            trading_cash_eur=round(state.trading_cash_eur, 4),
            invested_eur=round(final_invested, 4),
            regime_summary=state.last_regime_summary,
        )
    )

    save_json(STATE_PATH, state.to_dict())
    save_json(GENOME_PATH, genome)
    export_dashboard_payload(
        state=state,
        genome=genome,
        settings=settings,
        market_prices=market_prices,
        market_regimes=market_regimes_view,
        docs_dir=DOCS_DIR,
    )

    logger.info(
        "Ciclo #%d completato | Capitale Utente: %.2f€ | Fondo Bot (10%%): %.4f€ | Posizioni: %d",
        state.cycle_count,
        final_user_equity,
        state.bot_vault_eur,
        len(state.positions),
    )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="AetherQuant-40: Bot di Investimento Automatico Auto-Evolutivo"
    )
    parser.add_argument(
        "--mode",
        choices=["paper", "live"],
        default=os.getenv("TRADING_MODE", "paper").lower(),
        help="Modalità di esecuzione: paper (simulazione su dati reali) o live (ordini reali).",
    )
    parser.add_argument(
        "--force-optimize",
        action="store_true",
        help="Forza la ricalibrazione Walk-Forward dei parametri in questo ciclo.",
    )
    args = parser.parse_args()
    run_cycle(mode=args.mode, force_optimize=args.force_optimize)


if __name__ == "__main__":
    main()
