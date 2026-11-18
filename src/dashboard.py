from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict

from src.models import PortfolioState


def export_dashboard_payload(
    state: PortfolioState,
    genome: Dict[str, Any],
    settings: Dict[str, Any],
    market_prices: Dict[str, float],
    market_regimes: Dict[str, Dict[str, Any]],
    docs_dir: Path,
) -> Dict[str, Any]:
    """
    Esporta lo stato completo e le metriche di performance in:
    - docs/dashboard_data.json (per GitHub Pages / HTTP fetch)
    - docs/dashboard_data.js (per apertura immediata file:// su PC senza errori CORS)
    """
    docs_dir.mkdir(parents=True, exist_ok=True)

    invested_market_value = 0.0
    open_positions_view = []
    for sym, pos in state.positions.items():
        cur_px = float(market_prices.get(sym, pos.entry_price))
        mkt_val = pos.quantity * cur_px
        invested_market_value += mkt_val
        unreal_eur = mkt_val - (pos.cost_eur + pos.entry_fee_eur)
        unreal_pct = (unreal_eur / pos.cost_eur * 100.0) if pos.cost_eur > 0 else 0.0
        open_positions_view.append(
            {
                "symbol": sym,
                "strategy": pos.strategy,
                "regime": pos.regime_at_entry,
                "entry_price": round(pos.entry_price, 5),
                "current_price": round(cur_px, 5),
                "quantity": round(pos.quantity, 6),
                "market_value_eur": round(mkt_val, 2),
                "stop_loss": round(pos.stop_loss, 5),
                "take_profit": round(pos.take_profit, 5),
                "unrealized_pnl_eur": round(unreal_eur, 3),
                "unrealized_pnl_pct": round(unreal_pct, 2),
                "opened_at": pos.opened_at,
            }
        )

    user_equity_eur = state.trading_cash_eur + invested_market_value
    total_ecosystem_eur = user_equity_eur + state.bot_vault_eur
    user_roi_pct = (
        (user_equity_eur - state.initial_capital_eur) / state.initial_capital_eur * 100.0
        if state.initial_capital_eur > 0
        else 0.0
    )
    total_roi_pct = (
        (total_ecosystem_eur - state.initial_capital_eur) / state.initial_capital_eur * 100.0
        if state.initial_capital_eur > 0
        else 0.0
    )

    closed = state.trade_history
    wins = [t for t in closed if t.net_pnl_eur > 0]
    losses = [t for t in closed if t.net_pnl_eur <= 0]
    win_rate_pct = (len(wins) / len(closed) * 100.0) if closed else 0.0
    gross_win_sum = sum(t.net_pnl_eur for t in wins)
    gross_loss_sum = abs(sum(t.net_pnl_eur for t in losses))
    profit_factor = (
        round(gross_win_sum / gross_loss_sum, 2)
        if gross_loss_sum > 1e-6
        else (round(gross_win_sum, 2) if gross_win_sum > 0 else 0.0)
    )

    peak = max(state.peak_user_equity_eur, user_equity_eur, state.initial_capital_eur)
    current_dd_pct = ((peak - user_equity_eur) / peak * 100.0) if peak > 0 else 0.0

    payload: Dict[str, Any] = {
        "bot_name": settings.get("bot_name", "AetherQuant-40"),
        "version": settings.get("version", "1.0.0"),
        "mode": state.mode,
        "exchange": state.exchange_used,
        "last_run_at": state.last_run_at,
        "last_optimized_at": state.last_optimized_at,
        "cycle_count": state.cycle_count,
        "summary": {
            "initial_capital_eur": round(state.initial_capital_eur, 2),
            "total_ecosystem_eur": round(total_ecosystem_eur, 2),
            "user_equity_eur": round(user_equity_eur, 2),
            "trading_cash_eur": round(state.trading_cash_eur, 2),
            "invested_eur": round(invested_market_value, 2),
            "bot_vault_eur": round(state.bot_vault_eur, 4),
            "bot_share_pct": round(float(settings.get("bot_profit_share_pct", 0.10)) * 100.0, 1),
            "high_water_mark_pnl_eur": round(state.high_water_mark_pnl_eur, 3),
            "user_roi_pct": round(user_roi_pct, 2),
            "total_roi_pct": round(total_roi_pct, 2),
            "win_rate_pct": round(win_rate_pct, 1),
            "profit_factor": profit_factor,
            "total_trades": len(closed),
            "current_drawdown_pct": round(current_dd_pct, 2),
            "current_tier": state.current_tier,
            "current_tier_name": state.current_tier_name,
            "last_regime_summary": state.last_regime_summary,
            "last_selected_strategy": state.last_selected_strategy,
        },
        "self_improvement": {
            "generation": genome.get("generation", 0),
            "grid_combinations_used": genome.get("grid_combinations_used", 12),
            "tiers": settings.get("self_improvement_tiers", []),
            "recent_notes": genome.get("recent_optimization_notes", []),
            "assets_genome": genome.get("assets", {}),
        },
        "market_overview": market_regimes,
        "open_positions": open_positions_view,
        "recent_trades": [t.to_dict() for t in reversed(closed[-50:])],
        "equity_curve": [ep.to_dict() for ep in state.equity_curve[-300:]],
    }

    json_path = docs_dir / "dashboard_data.json"
    js_path = docs_dir / "dashboard_data.js"

    json_str = json.dumps(payload, indent=2, ensure_ascii=False)
    json_path.write_text(json_str, encoding="utf-8")
    js_path.write_text(f"window.BOT_DASHBOARD_DATA = {json_str};\n", encoding="utf-8")

    return payload
