from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict

from src.models import PortfolioState, Signal


@dataclass
class SizingDecision:
    approved: bool
    order_eur: float
    quantity: float
    reason: str


def compute_dynamic_max_positions(user_equity_eur: float, base_max: int = 2) -> int:
    """Scala il numero massimo di posizioni al crescere del capitale grazie al compounding."""
    if user_equity_eur >= 150.0:
        return max(base_max, 4)
    if user_equity_eur >= 75.0:
        return max(base_max, 3)
    return base_max


def evaluate_entry_and_size(
    signal: Signal,
    state: PortfolioState,
    user_equity_eur: float,
    settings: Dict[str, Any],
) -> SizingDecision:
    """
    Valida l'aspettativa matematica al netto delle commissioni e calcola la size ottimale
    calibrata per piccoli capitali (40€+) rispettando i minimi d'ordine degli exchange.
    """
    risk_cfg = settings.get("risk", {})
    min_order_eur = float(risk_cfg.get("min_order_eur", 11.0))
    base_max_pos = int(risk_cfg.get("base_max_positions", 2))
    max_pos_pct = float(risk_cfg.get("max_position_pct", 0.45))
    cash_reserve_pct = float(risk_cfg.get("cash_reserve_pct", 0.10))
    max_risk_pct = float(risk_cfg.get("max_risk_per_trade_pct", 0.025))
    min_net_reward_pct = float(risk_cfg.get("min_net_reward_pct", 0.018))
    min_rr = float(risk_cfg.get("min_reward_to_risk", 1.6))
    dd_defensive_pct = float(risk_cfg.get("max_drawdown_defensive_pct", 0.12))

    fee_rate = float(settings.get("fee_rate", 0.0016))
    slippage_rate = float(settings.get("slippage_rate", 0.0005))
    round_trip_cost_pct = 2.0 * (fee_rate + slippage_rate)

    if signal.action != "BUY" or signal.price <= 0:
        return SizingDecision(False, 0.0, 0.0, "Nessun segnale BUY attivo.")

    if signal.symbol in state.positions:
        return SizingDecision(False, 0.0, 0.0, f"Posizione già aperta su {signal.symbol}.")

    max_positions = compute_dynamic_max_positions(user_equity_eur, base_max_pos)
    if len(state.positions) >= max_positions:
        return SizingDecision(
            False, 0.0, 0.0, f"Slot posizioni pieni ({len(state.positions)}/{max_positions})."
        )

    if signal.walk_forward_score <= 0.0:
        return SizingDecision(
            False,
            0.0,
            0.0,
            f"Strategia bloccata: score Walk-Forward non positivo ({signal.walk_forward_score:.3f}).",
        )

    stop_dist = signal.price - signal.stop_loss
    reward_dist = signal.take_profit - signal.price
    if stop_dist <= 0 or reward_dist <= 0:
        return SizingDecision(False, 0.0, 0.0, "Livelli SL/TP non validi.")

    stop_pct = stop_dist / signal.price
    gross_reward_pct = reward_dist / signal.price
    net_expected_reward_pct = gross_reward_pct - round_trip_cost_pct
    rr_ratio = reward_dist / stop_dist

    if net_expected_reward_pct < min_net_reward_pct:
        return SizingDecision(
            False,
            0.0,
            0.0,
            (
                f"Rendimento netto atteso ({net_expected_reward_pct*100:.2f}%) "
                f"inferiore alla soglia anti-commissioni ({min_net_reward_pct*100:.2f}%)."
            ),
        )

    if rr_ratio < min_rr:
        return SizingDecision(
            False,
            0.0,
            0.0,
            f"Rapporto Rischio/Rendimento ({rr_ratio:.2f}) inferiore al minimo ({min_rr:.2f}).",
        )

    # Controllo Drawdown per riduzione automatica rischio
    peak = max(state.peak_user_equity_eur, state.initial_capital_eur)
    current_dd = (peak - user_equity_eur) / peak if peak > 0 else 0.0
    effective_risk_pct = max_risk_pct
    if current_dd >= dd_defensive_pct:
        if signal.confidence < 0.70:
            return SizingDecision(
                False,
                0.0,
                0.0,
                f"Protezione Drawdown attiva ({current_dd*100:.1f}%): richiesta confidenza >= 0.70.",
            )
        effective_risk_pct = max_risk_pct * 0.65

    # Calcolo size basata sul rischio massimo per trade
    risk_budget_eur = user_equity_eur * effective_risk_pct
    total_stop_loss_pct = stop_pct + round_trip_cost_pct
    risk_based_eur = risk_budget_eur / total_stop_loss_pct

    # Limiti di concentrazione e riserva liquidità EUR
    max_alloc_eur = user_equity_eur * max_pos_pct
    reserve_eur = user_equity_eur * cash_reserve_pct
    spendable_cash_eur = max(0.0, state.trading_cash_eur - reserve_eur)

    order_eur = min(risk_based_eur, max_alloc_eur, spendable_cash_eur)
    # Lasciamo margine per la fee di acquisto se l'exchange la addebita in EUR
    max_affordable = state.trading_cash_eur / (1.0 + fee_rate + slippage_rate)
    order_eur = min(order_eur, max_affordable)

    if order_eur < min_order_eur:
        return SizingDecision(
            False,
            0.0,
            0.0,
            (
                f"Size calcolata ({order_eur:.2f}€) inferiore al minimo exchange ({min_order_eur:.2f}€) "
                f"per liquidità o volatilità elevata."
            ),
        )

    exec_price = signal.price * (1.0 + slippage_rate)
    quantity = order_eur / exec_price
    return SizingDecision(
        approved=True,
        order_eur=round(order_eur, 4),
        quantity=round(quantity, 8),
        reason=(
            f"Approvato: size {order_eur:.2f}€ | R/R {rr_ratio:.2f}x | "
            f"Target netto +{net_expected_reward_pct*100:.2f}%."
        ),
    )
