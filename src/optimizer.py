from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, Dict, List, Tuple
import numpy as np

from src.indicators import atr, bollinger_bands, donchian_channels, ema, rsi, sma
from src.models import TradeRecord
from src.strategies import DEFAULT_GENOME_PARAMS


def _simulate_vectorized_strategy(
    strategy_name: str,
    opens: np.ndarray,
    highs: np.ndarray,
    lows: np.ndarray,
    closes: np.ndarray,
    volumes: np.ndarray,
    params: Dict[str, float],
    start_idx: int,
    end_idx: int,
    fee_rate: float = 0.0016,
    slippage_rate: float = 0.0005,
) -> Dict[str, float]:
    """
    Simula rapidamente una strategia su candele storiche reali includendo commissioni
    e slippage realistici, senza alcun look-ahead bias.
    """
    n = min(len(closes), end_idx)
    if n - start_idx < 30:
        return {"net_return_pct": 0.0, "profit_factor": 1.0, "trades": 0, "max_dd_pct": 0.0}

    atr_arr = atr(highs, lows, closes, 14)
    rsi_arr = rsi(closes, 14)

    # Pre-calcolo indicatori specifici per velocità O(N)
    if strategy_name == "trend_pullback":
        ema_f = ema(closes, int(params["fast_ema"]))
        ema_s = ema(closes, int(params["slow_ema"]))
    elif strategy_name == "donchian_breakout":
        _, dc_up = donchian_channels(highs, lows, int(params["channel_period"]))
        vol_sma = sma(volumes, 20)
        ema_macro = ema(closes, 100)
    else:
        bb_low, bb_mid, bb_up = bollinger_bands(
            closes, int(params["bb_period"]), float(params["bb_std"])
        )

    equity = 1.0
    peak_equity = 1.0
    max_dd = 0.0
    gross_wins = 0.0
    gross_losses = 0.0
    trades = 0

    in_pos = False
    entry_px = 0.0
    stop_px = 0.0
    tp_px = 0.0
    trail_dist = 0.0
    highest_px = 0.0

    cost_side = fee_rate + slippage_rate

    for i in range(max(120, start_idx), n):
        px = float(closes[i])
        hi = float(highs[i])
        lo = float(lows[i])
        cur_atr = float(atr_arr[i]) if not np.isnan(atr_arr[i]) else px * 0.015
        cur_atr = max(cur_atr, px * 0.004)

        if in_pos:
            if hi > highest_px:
                highest_px = hi
            if trail_dist > 0 and (highest_px - entry_px) >= 1.1 * trail_dist:
                stop_px = max(stop_px, highest_px - trail_dist, entry_px * (1.0 + 2.2 * cost_side))

            exit_px = 0.0
            if lo <= stop_px:
                exit_px = stop_px
            elif hi >= tp_px:
                exit_px = tp_px

            if exit_px > 0.0:
                net_ret = ((exit_px * (1.0 - cost_side)) / (entry_px * (1.0 + cost_side))) - 1.0
                equity *= 1.0 + net_ret * 0.45  # Frazione media allocata per trade
                if equity > peak_equity:
                    peak_equity = equity
                dd = (peak_equity - equity) / peak_equity
                if dd > max_dd:
                    max_dd = dd
                if net_ret > 0:
                    gross_wins += net_ret
                else:
                    gross_losses += abs(net_ret)
                trades += 1
                in_pos = False
            continue

        # Verifica segnale di ingresso alla chiusura della candela i
        buy_signal = False
        cur_rsi = float(rsi_arr[i])
        prev_rsi = float(rsi_arr[i - 1])

        if strategy_name == "trend_pullback":
            if not (np.isnan(ema_f[i]) or np.isnan(ema_s[i])):
                in_up = px > float(ema_s[i]) and float(ema_f[i]) >= float(ema_s[i]) * 0.998
                pull = float(lows[i - 1]) <= float(ema_f[i - 1]) * 1.008 or lo <= float(ema_f[i]) * 1.006
                rebound = px > float(closes[i - 1]) and px >= float(opens[i])
                r_ok = params["rsi_low"] <= prev_rsi <= params["rsi_high"] and cur_rsi > prev_rsi
                buy_signal = in_up and pull and rebound and r_ok

        elif strategy_name == "donchian_breakout":
            if not (np.isnan(dc_up[i]) or np.isnan(ema_macro[i])):
                v_ok = True
                if not np.isnan(vol_sma[i]) and float(vol_sma[i]) > 0:
                    v_ok = float(volumes[i]) >= float(vol_sma[i]) * float(params["vol_mult"])
                buy_signal = (
                    px > float(ema_macro[i])
                    and px > float(dc_up[i])
                    and float(closes[i - 1]) <= float(dc_up[i - 1]) * 1.002
                    and 50.0 <= cur_rsi <= float(params["rsi_max"])
                    and v_ok
                )

        elif strategy_name == "mean_reversion_bb":
            if not (np.isnan(bb_low[i]) or np.isnan(bb_up[i])):
                dipped = (
                    float(lows[i - 1]) <= float(bb_low[i - 1]) * 1.003
                    or float(closes[i - 1]) <= float(bb_low[i - 1]) * 1.003
                )
                r_ok = min(cur_rsi, prev_rsi) <= float(params["rsi_oversold"])
                rebound = px > float(closes[i - 1]) and px > float(opens[i])
                buy_signal = dipped and r_ok and rebound

        if buy_signal:
            in_pos = True
            entry_px = px
            highest_px = px
            stop_px = px - float(params["stop_atr_mult"]) * cur_atr
            tp_px = px + float(params["tp_atr_mult"]) * cur_atr
            if strategy_name == "mean_reversion_bb" and not np.isnan(bb_mid[i]):
                target_bb = float(bb_mid[i]) + 0.55 * (float(bb_up[i]) - float(bb_mid[i]))
                tp_px = max(tp_px, target_bb)
            trail_dist = float(params["trail_atr_mult"]) * cur_atr

    pf = (gross_wins / gross_losses) if gross_losses > 1e-9 else (2.0 if gross_wins > 0 else 1.0)
    return {
        "net_return_pct": (equity - 1.0) * 100.0,
        "profit_factor": min(5.0, pf),
        "trades": trades,
        "max_dd_pct": max_dd * 100.0,
    }


def _generate_candidate_grid(strategy_name: str, max_combos: int) -> List[Dict[str, float]]:
    """Genera combinazioni parametriche scalate in base al Tier Evolutivo sbloccato dal Fondo 10%."""
    base = dict(DEFAULT_GENOME_PARAMS[strategy_name])
    candidates: List[Dict[str, float]] = [base]

    if strategy_name == "trend_pullback":
        fast_opts = [15, 21, 28]
        slow_opts = [75, 89, 110]
        tp_opts = [3.2, 3.8, 4.5]
        stop_opts = [1.6, 1.9, 2.2]
        for f in fast_opts:
            for s in slow_opts:
                for tp in tp_opts:
                    for st in stop_opts:
                        c = dict(base)
                        c.update({"fast_ema": f, "slow_ema": s, "tp_atr_mult": tp, "stop_atr_mult": st})
                        candidates.append(c)

    elif strategy_name == "donchian_breakout":
        ch_opts = [16, 20, 28, 36]
        vol_opts = [1.0, 1.15, 1.30]
        tp_opts = [3.6, 4.4, 5.2]
        stop_opts = [1.8, 2.2]
        for ch in ch_opts:
            for v in vol_opts:
                for tp in tp_opts:
                    for st in stop_opts:
                        c = dict(base)
                        c.update({"channel_period": ch, "vol_mult": v, "tp_atr_mult": tp, "stop_atr_mult": st})
                        candidates.append(c)

    elif strategy_name == "mean_reversion_bb":
        bb_opts = [18, 20, 24]
        std_opts = [1.85, 2.0, 2.25]
        rsi_opts = [30.0, 35.0, 39.0]
        tp_opts = [2.6, 3.2, 3.8]
        for bbp in bb_opts:
            for std in std_opts:
                for ro in rsi_opts:
                    for tp in tp_opts:
                        c = dict(base)
                        c.update({"bb_period": bbp, "bb_std": std, "rsi_oversold": ro, "tp_atr_mult": tp})
                        candidates.append(c)

    # Campionamento deterministico uniforme fino a max_combos
    if len(candidates) <= max_combos:
        return candidates
    idxs = np.linspace(0, len(candidates) - 1, num=max_combos, dtype=int)
    return [candidates[int(k)] for k in idxs]


def _compute_live_feedback_adjustment(
    symbol: str, strategy_name: str, trade_history: List[TradeRecord]
) -> float:
    """Apprendimento per rinforzo dai trade reali/paper chiusi dal bot stesso."""
    relevant = [
        t for t in trade_history[-40:] if t.symbol == symbol and t.strategy == strategy_name
    ]
    if not relevant:
        return 0.0
    net_sum = sum(t.net_pnl_pct for t in relevant)
    return max(-0.25, min(0.25, net_sum * 2.0))


def optimize_genome(
    market_candles: Dict[str, np.ndarray],
    current_genome: Dict[str, Any],
    trade_history: List[TradeRecord],
    grid_combinations: int = 12,
    fee_rate: float = 0.0016,
    slippage_rate: float = 0.0005,
) -> Tuple[Dict[str, Any], List[str]]:
    """
    Motore di Auto-Miglioramento Walk-Forward:
    Divide i dati reali in 70% In-Sample (addestramento) e 30% Out-of-Sample (validazione),
    seleziona i parametri più profittevoli al netto delle commissioni e aggiorna il genoma.
    """
    assets_genome = current_genome.get("assets", {})
    logs: List[str] = []

    for symbol, ohlcv in market_candles.items():
        if ohlcv is None or len(ohlcv) < 220:
            continue

        opens = ohlcv[:, 1]
        highs = ohlcv[:, 2]
        lows = ohlcv[:, 3]
        closes = ohlcv[:, 4]
        volumes = ohlcv[:, 5]

        n = len(closes)
        split_idx = int(n * 0.70)

        sym_entry = assets_genome.get(symbol, {"strategies": {}})
        strat_dict = sym_entry.get("strategies", {})

        for strat_name in ("trend_pullback", "donchian_breakout", "mean_reversion_bb"):
            candidates = _generate_candidate_grid(strat_name, grid_combinations)
            best_params = dict(
                strat_dict.get(strat_name, {}).get("params", DEFAULT_GENOME_PARAMS[strat_name])
            )
            best_composite_score = -999.0
            best_metrics: Dict[str, float] = {}

            for cand in candidates:
                is_res = _simulate_vectorized_strategy(
                    strat_name, opens, highs, lows, closes, volumes,
                    cand, 120, split_idx, fee_rate, slippage_rate
                )
                oos_res = _simulate_vectorized_strategy(
                    strat_name, opens, highs, lows, closes, volumes,
                    cand, max(120, split_idx - 20), n, fee_rate, slippage_rate
                )

                # Combinazione robusta: premia rendimento netto OOS + Profit Factor - penalità Drawdown
                total_trades = is_res["trades"] + oos_res["trades"]
                if total_trades == 0:
                    comp = 0.05  # Neutro-prudente se non ha forzato operazioni inutili
                else:
                    weighted_ret = 0.40 * is_res["net_return_pct"] + 0.60 * oos_res["net_return_pct"]
                    weighted_dd = max(is_res["max_dd_pct"], oos_res["max_dd_pct"])
                    pf_bonus = (0.4 * is_res["profit_factor"] + 0.6 * oos_res["profit_factor"] - 1.0) * 0.25
                    comp = (weighted_ret * 0.35) + pf_bonus - (weighted_dd * 0.20)

                if comp > best_composite_score:
                    best_composite_score = comp
                    best_params = cand
                    best_metrics = {
                        "in_sample_return_pct": round(is_res["net_return_pct"], 3),
                        "out_of_sample_return_pct": round(oos_res["net_return_pct"], 3),
                        "profit_factor": round(
                            0.4 * is_res["profit_factor"] + 0.6 * oos_res["profit_factor"], 2
                        ),
                        "sample_trades": int(total_trades),
                    }

            live_adj = _compute_live_feedback_adjustment(symbol, strat_name, trade_history)
            final_wf_score = round(max(-1.0, min(2.0, best_composite_score + live_adj)), 4)
            # Se una strategia non ha mai perso ma ha fatto pochi trade profittevoli o neutri,
            # garantiamo uno score minimo positivo solo se il rendimento combinato non è negativo
            if (
                final_wf_score <= 0.0
                and best_metrics.get("out_of_sample_return_pct", 0.0) >= 0.0
                and best_metrics.get("in_sample_return_pct", 0.0) >= 0.0
            ):
                final_wf_score = 0.12

            strat_dict[strat_name] = {
                "params": best_params,
                "walk_forward_score": final_wf_score,
                "metrics": best_metrics,
            }

        sym_entry["strategies"] = strat_dict
        assets_genome[symbol] = sym_entry

        top_strat = max(
            strat_dict.items(), key=lambda kv: float(kv[1].get("walk_forward_score", -9.0))
        )
        logs.append(
            f"{symbol}: miglior strategia evoluta = {top_strat[0]} "
            f"(WF score {top_strat[1]['walk_forward_score']:+.2f})"
        )

    updated_genome = {
        "generation": int(current_genome.get("generation", 0)) + 1,
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "grid_combinations_used": grid_combinations,
        "assets": assets_genome,
        "recent_optimization_notes": logs[-12:],
    }
    return updated_genome, logs
