from __future__ import annotations

import pytest

from src.models import PortfolioState
from src.vault import allocate_realized_profit, resolve_self_improvement_tier


def test_ten_percent_profit_split_and_high_water_mark() -> None:
    state = PortfolioState(initial_capital_eur=40.0, trading_cash_eur=40.0)

    # 1. Primo trade in profitto netto di +2.00€ (già incassato in trading_cash_eur -> 42.00€)
    state.trading_cash_eur = 42.00
    bot_cut_1, user_cut_1 = allocate_realized_profit(state, net_pnl_eur=2.00, bot_share_pct=0.10)

    assert bot_cut_1 == pytest.approx(0.20)
    assert user_cut_1 == pytest.approx(1.80)
    assert state.bot_vault_eur == pytest.approx(0.20)
    assert state.trading_cash_eur == pytest.approx(41.80)
    assert state.high_water_mark_pnl_eur == pytest.approx(2.00)

    # 2. Secondo trade in perdita di -0.80€ -> nessuna trattenuta bot, Fondo Bot intatto!
    state.trading_cash_eur -= 0.80
    bot_cut_2, user_cut_2 = allocate_realized_profit(state, net_pnl_eur=-0.80, bot_share_pct=0.10)

    assert bot_cut_2 == pytest.approx(0.0)
    assert user_cut_2 == pytest.approx(-0.80)
    assert state.bot_vault_eur == pytest.approx(0.20)
    assert state.high_water_mark_pnl_eur == pytest.approx(2.00)

    # 3. Terzo trade guadagna +1.00€: recupera i -0.80€ persi e genera +0.20€ sopra HWM!
    # Il bot trattiene il 10% SOLO sui +0.20€ nuovi (= 0.02€), mai sul recupero!
    state.trading_cash_eur += 1.00
    bot_cut_3, user_cut_3 = allocate_realized_profit(state, net_pnl_eur=1.00, bot_share_pct=0.10)

    assert bot_cut_3 == pytest.approx(0.02)
    assert user_cut_3 == pytest.approx(0.98)
    assert state.bot_vault_eur == pytest.approx(0.22)
    assert state.high_water_mark_pnl_eur == pytest.approx(2.20)
    assert state.trading_cash_eur + state.bot_vault_eur == pytest.approx(42.20)


def test_self_improvement_tier_unlocking() -> None:
    tiers = [
        {"tier": 1, "name": "Seed Explorer", "min_vault_eur": 0.0, "grid_combinations": 12},
        {"tier": 2, "name": "Adaptive Quant", "min_vault_eur": 1.5, "grid_combinations": 27},
        {"tier": 3, "name": "Autonomous Alpha", "min_vault_eur": 5.0, "grid_combinations": 48},
    ]
    assert resolve_self_improvement_tier(0.0, tiers)["tier"] == 1
    assert resolve_self_improvement_tier(1.49, tiers)["tier"] == 1
    assert resolve_self_improvement_tier(1.50, tiers)["tier"] == 2
    assert resolve_self_improvement_tier(6.20, tiers)["tier"] == 3
