from __future__ import annotations

from typing import Tuple
import numpy as np


def sma(values: np.ndarray, period: int) -> np.ndarray:
    """Media mobile semplice con gestione sicura di serie corte."""
    arr = np.asarray(values, dtype=float)
    n = len(arr)
    out = np.full(n, np.nan, dtype=float)
    if period <= 0 or n < period:
        return out
    csum = np.cumsum(np.insert(arr, 0, 0.0))
    out[period - 1 :] = (csum[period:] - csum[:-period]) / float(period)
    return out


def ema(values: np.ndarray, period: int) -> np.ndarray:
    """Media mobile esponenziale inizializzata con la prima SMA valida."""
    arr = np.asarray(values, dtype=float)
    n = len(arr)
    out = np.full(n, np.nan, dtype=float)
    if period <= 0 or n < period:
        return out
    alpha = 2.0 / (period + 1.0)
    out[period - 1] = float(np.mean(arr[:period]))
    for i in range(period, n):
        out[i] = alpha * arr[i] + (1.0 - alpha) * out[i - 1]
    return out


def rsi(closes: np.ndarray, period: int = 14) -> np.ndarray:
    """Relative Strength Index di Wilder (0-100)."""
    arr = np.asarray(closes, dtype=float)
    n = len(arr)
    out = np.full(n, 50.0, dtype=float)
    if period <= 0 or n <= period:
        return out

    deltas = np.diff(arr)
    gains = np.where(deltas > 0.0, deltas, 0.0)
    losses = np.where(deltas < 0.0, -deltas, 0.0)

    avg_gain = float(np.mean(gains[:period]))
    avg_loss = float(np.mean(losses[:period]))

    for i in range(period, n):
        if i > period:
            avg_gain = (avg_gain * (period - 1) + gains[i - 1]) / period
            avg_loss = (avg_loss * (period - 1) + losses[i - 1]) / period
        if avg_loss < 1e-12:
            out[i] = 100.0 if avg_gain > 0 else 50.0
        else:
            rs = avg_gain / avg_loss
            out[i] = 100.0 - (100.0 / (1.0 + rs))
    return out


def atr(highs: np.ndarray, lows: np.ndarray, closes: np.ndarray, period: int = 14) -> np.ndarray:
    """Average True Range di Wilder."""
    h = np.asarray(highs, dtype=float)
    l = np.asarray(lows, dtype=float)
    c = np.asarray(closes, dtype=float)
    n = len(c)
    out = np.full(n, np.nan, dtype=float)
    if period <= 0 or n <= period:
        return out

    tr = np.empty(n, dtype=float)
    tr[0] = h[0] - l[0]
    prev_c = c[:-1]
    tr[1:] = np.maximum(
        h[1:] - l[1:],
        np.maximum(np.abs(h[1:] - prev_c), np.abs(l[1:] - prev_c)),
    )

    out[period] = float(np.mean(tr[1 : period + 1]))
    for i in range(period + 1, n):
        out[i] = (out[i - 1] * (period - 1) + tr[i]) / period
    return out


def bollinger_bands(
    closes: np.ndarray, period: int = 20, num_std: float = 2.0
) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Restituisce (lower_band, middle_band, upper_band)."""
    arr = np.asarray(closes, dtype=float)
    n = len(arr)
    mid = sma(arr, period)
    lower = np.full(n, np.nan, dtype=float)
    upper = np.full(n, np.nan, dtype=float)
    if period <= 0 or n < period:
        return lower, mid, upper

    for i in range(period - 1, n):
        window = arr[i - period + 1 : i + 1]
        std = float(np.std(window, ddof=0))
        lower[i] = mid[i] - num_std * std
        upper[i] = mid[i] + num_std * std
    return lower, mid, upper


def adx(highs: np.ndarray, lows: np.ndarray, closes: np.ndarray, period: int = 14) -> np.ndarray:
    """Average Directional Index per misurare la forza del trend (0-100)."""
    h = np.asarray(highs, dtype=float)
    l = np.asarray(lows, dtype=float)
    c = np.asarray(closes, dtype=float)
    n = len(c)
    out = np.full(n, 20.0, dtype=float)
    if period <= 0 or n <= 2 * period:
        return out

    up_move = h[1:] - h[:-1]
    down_move = l[:-1] - l[1:]

    plus_dm = np.where((up_move > down_move) & (up_move > 0.0), up_move, 0.0)
    minus_dm = np.where((down_move > up_move) & (down_move > 0.0), down_move, 0.0)

    tr = np.maximum(
        h[1:] - l[1:],
        np.maximum(np.abs(h[1:] - c[:-1]), np.abs(l[1:] - c[:-1])),
    )

    atr_smooth = np.zeros(n - 1, dtype=float)
    plus_smooth = np.zeros(n - 1, dtype=float)
    minus_smooth = np.zeros(n - 1, dtype=float)

    atr_smooth[period - 1] = float(np.sum(tr[:period]))
    plus_smooth[period - 1] = float(np.sum(plus_dm[:period]))
    minus_smooth[period - 1] = float(np.sum(minus_dm[:period]))

    for i in range(period, n - 1):
        atr_smooth[i] = atr_smooth[i - 1] - (atr_smooth[i - 1] / period) + tr[i]
        plus_smooth[i] = plus_smooth[i - 1] - (plus_smooth[i - 1] / period) + plus_dm[i]
        minus_smooth[i] = minus_smooth[i - 1] - (minus_smooth[i - 1] / period) + minus_dm[i]

    dx = np.zeros(n - 1, dtype=float)
    for i in range(period - 1, n - 1):
        if atr_smooth[i] > 1e-12:
            p_di = 100.0 * (plus_smooth[i] / atr_smooth[i])
            m_di = 100.0 * (minus_smooth[i] / atr_smooth[i])
            denom = p_di + m_di
            dx[i] = 100.0 * abs(p_di - m_di) / denom if denom > 1e-12 else 0.0

    start_idx = 2 * period - 2
    if start_idx < n - 1:
        adx_val = float(np.mean(dx[period - 1 : start_idx + 1]))
        out[start_idx + 1] = adx_val
        for i in range(start_idx + 1, n - 1):
            adx_val = (adx_val * (period - 1) + dx[i]) / period
            out[i + 1] = adx_val
    return out


def donchian_channels(
    highs: np.ndarray, lows: np.ndarray, period: int = 20
) -> Tuple[np.ndarray, np.ndarray]:
    """Canale di Donchian (esclusa la barra corrente per evitare look-ahead bias nei breakout)."""
    h = np.asarray(highs, dtype=float)
    l = np.asarray(lows, dtype=float)
    n = len(h)
    upper = np.full(n, np.nan, dtype=float)
    lower = np.full(n, np.nan, dtype=float)
    if period <= 0 or n <= period:
        return lower, upper
    for i in range(period, n):
        upper[i] = float(np.max(h[i - period : i]))
        lower[i] = float(np.min(l[i - period : i]))
    return lower, upper
