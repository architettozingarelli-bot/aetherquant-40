from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, Dict, Optional, Tuple
import numpy as np

from src.indicators import atr, bollinger_bands, donchian_channels, ema, rsi, sma
from src.models import Position, Signal
from src.regime import (
    REGIME_BEAR_DEFENSIVE,
    REGIME_BULL_TREND,
    REGIME_RANGE,
    RegimeReport,
)


DEFAULT_GENOME_PARAMS: Dict[str, Dict[str, float]] = {
    "trend_pullback": {
        "fast_ema": 21,
        "slow_ema": 89,
        "rsi_low": 38.0,
        "rsi_high": 58.0,
        "stop_atr_mult": 1.8,
        "tp_atr_mult": 3.6,
        "trail_atr_mult": 2.0,
    },
    "donchian_breakout": {
        "channel_period": 20,
        "vol_mult": 1.10,
        "rsi_max": 74.0,
        "stop_atr_mult": 2.0,
        "tp_atr_mult": 4.2,
        "trail_atr_mult": 2.2,
    },
    "mean_reversion_bb": {
        "bb_period": 20,
        "bb_std": 2.0,
        "rsi_oversold": 35.0,
        "stop_atr_mult": 1.8,
        "tp_atr_mult": 3.0,
        "trail_atr_mult": 1.6,
    },
}


def evaluate_strategy_signal(
    symbol: str,
    strategy_name: str,
    opens: np.ndarray,
    highs: np.ndarray,
    lows: np.ndarray,
    closes: np.ndarray,
    volumes: np.ndarray,
    regime_report: RegimeReport,
    params: Dict[str, float],
    walk_forward_score: float = 0.0,
) -> Signal:
    """Valuta una specifica strategia sull'ultima candela chiusa."""
    price = float(closes[-1])
    atr_arr = atr(highs, lows, closes, 14)
    cur_atr = float(atr_arr[-1]) if not np.isnan(atr_arr[-1]) else price * 0.015
    cur_atr = max(cur_atr, price * 0.004)

    hold_sig = Signal(
        symbol=symbol,
        action="HOLD",
        strategy=strategy_name,
        regime=regime_report.regime,
        confidence=0.0,
        price=price,
        stop_loss=0.0,
        take_profit=0.0,
        trailing_atr_dist=0.0,
        expected_reward_pct=0.0,
        walk_forward_score=walk_forward_score,
        rationale="Nessun setup ad alta probabilità.",
    )

    if len(closes) < 160 or price <= 0:
        return hold_sig

    rsi_arr = rsi(closes, 14)
    cur_rsi = float(rsi_arr[-1])
    prev_rsi = float(rsi_arr[-2])

    if strategy_name == "trend_pullback":
        fast_p = int(params.get("fast_ema", 21))
        slow_p = int(params.get("slow_ema", 89))
        ema_f = ema(closes, fast_p)
        ema_s = ema(closes, slow_p)
        if np.isnan(ema_s[-1]) or np.isnan(ema_f[-1]):
            return hold_sig

        in_uptrend = price > float(ema_s[-1]) and float(ema_f[-1]) >= float(ema_s[-1]) * 0.998
        touched_pullback = (
            float(lows[-2]) <= float(ema_f[-2]) * 1.008
            or float(lows[-1]) <= float(ema_f[-1]) * 1.006
        )
        bullish_rebound = price > float(closes[-2]) and price >= float(opens[-1])
        rsi_ok = params.get("rsi_low", 38.0) <= prev_rsi <= params.get("rsi_high", 58.0) and cur_rsi > prev_rsi

        if in_uptrend and touched_pullback and bullish_rebound and rsi_ok:
            stop_mult = float(params.get("stop_atr_mult", 1.8))
            tp_mult = float(params.get("tp_atr_mult", 3.6))
            trail_mult = float(params.get("trail_atr_mult", 2.0))
            stop_loss = price - stop_mult * cur_atr
            take_profit = price + tp_mult * cur_atr
            exp_reward = (take_profit - price) / price
            conf = min(0.92, 0.62 + max(0.0, walk_forward_score) * 0.15)
            return Signal(
                symbol=symbol,
                action="BUY",
                strategy="trend_pullback",
                regime=regime_report.regime,
                confidence=round(conf, 3),
                price=price,
                stop_loss=round(stop_loss, 6),
                take_profit=round(take_profit, 6),
                trailing_atr_dist=round(trail_mult * cur_atr, 6),
                expected_reward_pct=round(exp_reward, 5),
                walk_forward_score=round(walk_forward_score, 4),
                rationale=(
                    f"Pullback rialzista su EMA{fast_p} confermato "
                    f"(RSI {prev_rsi:.1f}->{cur_rsi:.1f}, WF={walk_forward_score:+.2f})."
                ),
            )

    elif strategy_name == "donchian_breakout":
        ch_period = int(params.get("channel_period", 20))
        _, dc_upper = donchian_channels(highs, lows, ch_period)
        vol_sma = sma(volumes, 20)
        if np.isnan(dc_upper[-1]):
            return hold_sig

        vol_ok = True
        if not np.isnan(vol_sma[-1]) and float(vol_sma[-1]) > 0:
            vol_ok = float(volumes[-1]) >= float(vol_sma[-1]) * float(params.get("vol_mult", 1.10))

        ema_macro = ema(closes, 100)
        macro_ok = not np.isnan(ema_macro[-1]) and price > float(ema_macro[-1])
        broke_high = price > float(dc_upper[-1]) and float(closes[-2]) <= float(dc_upper[-2]) * 1.002
        rsi_ok = 50.0 <= cur_rsi <= float(params.get("rsi_max", 74.0))

        if macro_ok and broke_high and vol_ok and rsi_ok:
            stop_mult = float(params.get("stop_atr_mult", 2.0))
            tp_mult = float(params.get("tp_atr_mult", 4.2))
            trail_mult = float(params.get("trail_atr_mult", 2.2))
            stop_loss = price - stop_mult * cur_atr
            take_profit = price + tp_mult * cur_atr
            exp_reward = (take_profit - price) / price
            conf = min(0.94, 0.64 + max(0.0, walk_forward_score) * 0.15)
            return Signal(
                symbol=symbol,
                action="BUY",
                strategy="donchian_breakout",
                regime=regime_report.regime,
                confidence=round(conf, 3),
                price=price,
                stop_loss=round(stop_loss, 6),
                take_profit=round(take_profit, 6),
                trailing_atr_dist=round(trail_mult * cur_atr, 6),
                expected_reward_pct=round(exp_reward, 5),
                walk_forward_score=round(walk_forward_score, 4),
                rationale=(
                    f"Breakout Donchian {ch_period}p con espansione volumi "
                    f"(RSI={cur_rsi:.1f}, WF={walk_forward_score:+.2f})."
                ),
            )

    elif strategy_name == "mean_reversion_bb":
        bb_p = int(params.get("bb_period", 20))
        bb_std = float(params.get("bb_std", 2.0))
        bb_low, bb_mid, bb_up = bollinger_bands(closes, bb_p, bb_std)
        if np.isnan(bb_low[-1]) or np.isnan(bb_up[-1]):
            return hold_sig

        oversold_lvl = float(params.get("rsi_oversold", 35.0))
        if regime_report.regime == REGIME_BEAR_DEFENSIVE:
            # In bear market accetta solo ipervenduto estremo di capitolazione
            oversold_lvl = min(oversold_lvl, 25.0)

        dipped_below_bb = (
            float(lows[-2]) <= float(bb_low[-2]) * 1.003
            or float(closes[-2]) <= float(bb_low[-2]) * 1.003
        )
        rsi_oversold = min(cur_rsi, prev_rsi) <= oversold_lvl
        rebound_candle = price > float(closes[-2]) and price > float(opens[-1])

        if dipped_below_bb and rsi_oversold and rebound_candle:
            stop_mult = float(params.get("stop_atr_mult", 1.8))
            tp_mult = float(params.get("tp_atr_mult", 3.0))
            trail_mult = float(params.get("trail_atr_mult", 1.6))
            stop_loss = price - stop_mult * cur_atr
            target_bb = float(bb_mid[-1]) + 0.55 * (float(bb_up[-1]) - float(bb_mid[-1]))
            take_profit = max(target_bb, price + tp_mult * cur_atr)
            exp_reward = (take_profit - price) / price
            conf = min(0.90, 0.60 + max(0.0, walk_forward_score) * 0.15)
            return Signal(
                symbol=symbol,
                action="BUY",
                strategy="mean_reversion_bb",
                regime=regime_report.regime,
                confidence=round(conf, 3),
                price=price,
                stop_loss=round(stop_loss, 6),
                take_profit=round(take_profit, 6),
                trailing_atr_dist=round(trail_mult * cur_atr, 6),
                expected_reward_pct=round(exp_reward, 5),
                walk_forward_score=round(walk_forward_score, 4),
                rationale=(
                    f"Rimbalzo statistico da Banda di Bollinger inferiore "
                    f"(RSI min={min(cur_rsi, prev_rsi):.1f}, WF={walk_forward_score:+.2f})."
                ),
            )

    return hold_sig


def select_autonomous_signal(
    symbol: str,
    opens: np.ndarray,
    highs: np.ndarray,
    lows: np.ndarray,
    closes: np.ndarray,
    volumes: np.ndarray,
    regime_report: RegimeReport,
    asset_genome: Dict[str, Any],
) -> Signal:
    """
    Il cervello decisionale autonomo: sceglie liberamente la tipologia di strategia
    combinando il Regime di Mercato attuale con gli score Walk-Forward auto-appresi.
    """
    strategies_cfg = asset_genome.get("strategies", {})

    if regime_report.regime == REGIME_BULL_TREND:
        candidate_order = ["trend_pullback", "donchian_breakout", "mean_reversion_bb"]
    elif regime_report.regime == REGIME_RANGE:
        candidate_order = ["mean_reversion_bb", "trend_pullback", "donchian_breakout"]
    else:
        # BEAR_DEFENSIVE: massima prudenza, valuta solo rimbalzi estremi se e solo se WF score > 0.35
        candidate_order = ["mean_reversion_bb"]

    best_buy: Optional[Signal] = None
    best_rank = -999.0

    for strat_name in candidate_order:
        s_meta = strategies_cfg.get(strat_name, {})
        params = s_meta.get("params", DEFAULT_GENOME_PARAMS[strat_name])
        wf_score = float(s_meta.get("walk_forward_score", 0.15))

        if regime_report.regime == REGIME_BEAR_DEFENSIVE and wf_score < 0.35:
            continue

        # Scarta strategie che nel recente walk-forward su questo asset sono risultate in perdita
        if wf_score < 0.0:
            continue

        sig = evaluate_strategy_signal(
            symbol=symbol,
            strategy_name=strat_name,
            opens=opens,
            highs=highs,
            lows=lows,
            closes=closes,
            volumes=volumes,
            regime_report=regime_report,
            params=params,
            walk_forward_score=wf_score,
        )
        if sig.action == "BUY":
            regime_bonus = 0.15 if strat_name == candidate_order[0] else 0.0
            rank = sig.confidence + wf_score * 0.4 + regime_bonus
            if rank > best_rank:
                best_rank = rank
                best_buy = sig

    if best_buy is not None:
        return best_buy

    preferred = "capital_shield_eur" if regime_report.regime == REGIME_BEAR_DEFENSIVE else candidate_order[0]
    return Signal(
        symbol=symbol,
        action="HOLD",
        strategy=preferred,
        regime=regime_report.regime,
        confidence=0.0,
        price=float(closes[-1]),
        stop_loss=0.0,
        take_profit=0.0,
        trailing_atr_dist=0.0,
        expected_reward_pct=0.0,
        walk_forward_score=float(strategies_cfg.get(candidate_order[0], {}).get("walk_forward_score", 0.0)),
        rationale=(
            "Modalità Scudo EUR attiva: mercato ribassista, capitale protetto."
            if regime_report.regime == REGIME_BEAR_DEFENSIVE
            else f"In attesa di setup ad aspettativa positiva ({preferred})."
        ),
    )


def evaluate_position_exit(
    pos: Position,
    current_price: float,
    high_price: float,
    low_price: float,
    regime_report: RegimeReport,
    max_holding_hours: int = 120,
    now_utc: Optional[datetime] = None,
) -> Tuple[bool, str, float]:
    """
    Aggiorna il trailing stop dinamico e verifica condizioni di uscita:
    Restituisce (should_exit, exit_reason, updated_stop_loss).
    """
    if current_price > pos.highest_price:
        pos.highest_price = current_price
    if high_price > pos.highest_price:
        pos.highest_price = high_price

    updated_stop = pos.stop_loss

    # Attiva break-even + trailing stop non appena il profitto supera 1.1x la distanza di trailing
    unrealized_gain = pos.highest_price - pos.entry_price
    if pos.trailing_atr_dist > 0 and unrealized_gain >= 1.1 * pos.trailing_atr_dist:
        candidate_trail = pos.highest_price - pos.trailing_atr_dist
        breakeven_floor = pos.entry_price * 1.0045  # Copre commissioni andata/ritorno + piccolo utile
        updated_stop = max(updated_stop, candidate_trail, breakeven_floor)
        pos.stop_loss = round(updated_stop, 6)

    if current_price <= updated_stop:
        reason = (
            "TRAILING_PROFIT_LOCK"
            if updated_stop > pos.entry_price
            else "STOP_LOSS_PROTECTION"
        )
        return True, reason, updated_stop

    if current_price >= pos.take_profit:
        return True, "TAKE_PROFIT_TARGET", updated_stop

    # Uscita difensiva se una posizione trend viene sorpresa da inversione ribassista strutturale mentre è in utile
    if (
        pos.strategy in ("trend_pullback", "donchian_breakout")
        and regime_report.regime == REGIME_BEAR_DEFENSIVE
        and current_price > pos.entry_price * 1.005
    ):
        return True, "REGIME_SHIELD_EXIT", updated_stop

    # Time-stop se l'operazione resta bloccata troppo a lungo senza slancio
    if now_utc is None:
        now_utc = datetime.now(timezone.utc)
    try:
        opened_dt = datetime.fromisoformat(pos.opened_at.replace("Z", "+00:00"))
        hours_held = (now_utc - opened_dt).total_seconds() / 3600.0
        if hours_held >= max_holding_hours and current_price < pos.entry_price * 1.01:
            return True, "TIME_DECAY_EXIT", updated_stop
    except ValueError:
        pass

    return False, "", updated_stop
