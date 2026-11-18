from __future__ import annotations

import numpy as np

from src.models import PortfolioState, Signal
from src.optimizer import optimize_genome
from src.regime import REGIME_BULL_TREND, detect_regime
from src.risk import evaluate_entry_and_size


def test_forty_euro_sizing_and_fee_guard() -> None:
    settings = {
        "fee_rate": 0.0016,
        "slippage_rate": 0.0005,
        "risk": {
            "min_order_eur": 11.0,
            "base_max_positions": 2,
            "max_position_pct": 0.45,
            "cash_reserve_pct": 0.10,
            "max_risk_per_trade_pct": 0.025,
            "min_net_reward_pct": 0.018,
            "min_reward_to_risk": 1.6,
            "max_drawdown_defensive_pct": 0.12,
        },
    }
    state = PortfolioState(initial_capital_eur=40.0, trading_cash_eur=40.0)

    # Segnale valido con R/R = 2.0 e target lordo +5% su capitale 40€
    good_sig = Signal(
        symbol="BTC/EUR",
        action="BUY",
        strategy="trend_pullback",
        regime=REGIME_BULL_TREND,
        confidence=0.80,
        price=50000.0,
        stop_loss=48750.0,   # -2.5%
        take_profit=52500.0, # +5.0%
        trailing_atr_dist=800.0,
        expected_reward_pct=0.05,
        walk_forward_score=0.42,
        rationale="Test signal",
    )
    dec = evaluate_entry_and_size(good_sig, state, user_equity_eur=40.0, settings=settings)
    assert dec.approved is True
    assert 11.0 <= dec.order_eur <= 18.0

    # Segnale con target troppo piccolo (+0.8%) che verrebbe mangiato dalle commissioni -> RIFIUTATO
    fee_trap_sig = Signal(
        symbol="ETH/EUR",
        action="BUY",
        strategy="mean_reversion_bb",
        regime="RANGE_ACCUMULATION",
        confidence=0.75,
        price=2500.0,
        stop_loss=2490.0,
        take_profit=2520.0,  # +0.8% lordo
        trailing_atr_dist=15.0,
        expected_reward_pct=0.008,
        walk_forward_score=0.30,
        rationale="Micro target",
    )
    dec_trap = evaluate_entry_and_size(fee_trap_sig, state, user_equity_eur=40.0, settings=settings)
    assert dec_trap.approved is False


def test_regime_and_walk_forward_optimizer_on_uptrend() -> None:
    rng = np.random.default_rng(42)
    n = 320
    t = np.linspace(0, 1, n)
    # Trend rialzista sintetico con oscillazioni realistiche
    closes = 100.0 * np.exp(0.35 * t) + 1.8 * np.sin(np.linspace(0, 24 * np.pi, n))
    opens = np.roll(closes, 1)
    opens[0] = closes[0]
    highs = np.maximum(opens, closes) + rng.uniform(0.3, 1.1, size=n)
    lows = np.minimum(opens, closes) - rng.uniform(0.3, 1.1, size=n)
    volumes = rng.uniform(1000.0, 2500.0, size=n)
    timestamps = np.arange(n, dtype=float) * 3600000.0

    ohlcv = np.column_stack([timestamps, opens, highs, lows, closes, volumes])
    rep = detect_regime(highs, lows, closes)
    assert rep.regime == REGIME_BULL_TREND

    genome, logs = optimize_genome(
        market_candles={"SOL/EUR": ohlcv},
        current_genome={"generation": 0, "assets": {}},
        trade_history=[],
        grid_combinations=6,
    )
    assert genome["generation"] == 1
    assert "SOL/EUR" in genome["assets"]
    assert len(logs) == 1
