from __future__ import annotations

from dataclasses import dataclass
import numpy as np

from src.indicators import adx, atr, ema, rsi


REGIME_BULL_TREND = "BULL_TREND"
REGIME_RANGE = "RANGE_ACCUMULATION"
REGIME_BEAR_DEFENSIVE = "BEAR_DEFENSIVE"


@dataclass
class RegimeReport:
    regime: str
    adx_value: float
    rsi_value: float
    atr_pct: float
    trend_slope_pct: float
    above_slow_ema: bool
    confidence: float
    rationale: str


def detect_regime(
    highs: np.ndarray,
    lows: np.ndarray,
    closes: np.ndarray,
    fast_ema_period: int = 50,
    slow_ema_period: int = 150,
) -> RegimeReport:
    """
    Classifica autonomamente il regime di mercato dell'asset:
    - BULL_TREND: Prezzo > EMA lenta, EMA veloce > EMA lenta o forte pendenza positiva + ADX solido.
    - BEAR_DEFENSIVE: Prezzo < EMA lenta con struttura ribassista -> protezione capitale in EUR.
    - RANGE_ACCUMULATION: Fase laterale / consolidamento adatta a Mean-Reversion su ipervenduto.
    """
    c = np.asarray(closes, dtype=float)
    h = np.asarray(highs, dtype=float)
    l = np.asarray(lows, dtype=float)

    if len(c) < slow_ema_period + 10:
        return RegimeReport(
            regime=REGIME_RANGE,
            adx_value=20.0,
            rsi_value=50.0,
            atr_pct=0.015,
            trend_slope_pct=0.0,
            above_slow_ema=True,
            confidence=0.5,
            rationale="Storico breve: regime laterale prudenziale.",
        )

    ema_fast = ema(c, fast_ema_period)
    ema_slow = ema(c, slow_ema_period)
    adx_arr = adx(h, l, c, 14)
    rsi_arr = rsi(c, 14)
    atr_arr = atr(h, l, c, 14)

    price = float(c[-1])
    fast_now = float(ema_fast[-1])
    slow_now = float(ema_slow[-1])
    slow_prev = float(ema_slow[-10]) if not np.isnan(ema_slow[-10]) else slow_now

    adx_val = float(adx_arr[-1])
    rsi_val = float(rsi_arr[-1])
    atr_val = float(atr_arr[-1]) if not np.isnan(atr_arr[-1]) else price * 0.015
    atr_pct = atr_val / price if price > 0 else 0.015
    slope_pct = ((slow_now - slow_prev) / slow_prev * 100.0) if slow_prev > 0 else 0.0
    above_slow = price >= slow_now

    if above_slow and fast_now >= slow_now and (adx_val >= 21.0 or slope_pct > 0.25):
        conf = min(0.95, 0.55 + (adx_val - 20.0) / 60.0 + max(0.0, slope_pct) * 0.1)
        return RegimeReport(
            regime=REGIME_BULL_TREND,
            adx_value=round(adx_val, 2),
            rsi_value=round(rsi_val, 2),
            atr_pct=round(atr_pct, 4),
            trend_slope_pct=round(slope_pct, 3),
            above_slow_ema=True,
            confidence=round(conf, 2),
            rationale=f"Trend rialzista confermato (Prezzo > EMA{slow_ema_period}, ADX={adx_val:.1f}, slope={slope_pct:+.2f}%).",
        )

    if not above_slow and fast_now < slow_now and (slope_pct < -0.15 or adx_val >= 22.0):
        conf = min(0.95, 0.60 + abs(slope_pct) * 0.15)
        return RegimeReport(
            regime=REGIME_BEAR_DEFENSIVE,
            adx_value=round(adx_val, 2),
            rsi_value=round(rsi_val, 2),
            atr_pct=round(atr_pct, 4),
            trend_slope_pct=round(slope_pct, 3),
            above_slow_ema=False,
            confidence=round(conf, 2),
            rationale=f"Mercato ribassista (Prezzo < EMA{slow_ema_period}, slope={slope_pct:+.2f}%): attiva difesa capitale.",
        )

    return RegimeReport(
        regime=REGIME_RANGE,
        adx_value=round(adx_val, 2),
        rsi_value=round(rsi_val, 2),
        atr_pct=round(atr_pct, 4),
        trend_slope_pct=round(slope_pct, 3),
        above_slow_ema=above_slow,
        confidence=0.65,
        rationale=f"Mercato laterale/accumulazione (ADX={adx_val:.1f}, RSI={rsi_val:.1f}): ideale per Mean-Reversion selettiva.",
    )
