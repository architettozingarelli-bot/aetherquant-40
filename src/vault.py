from __future__ import annotations

from typing import Any, Dict, List, Tuple

from src.models import PortfolioState


def allocate_realized_profit(
    state: PortfolioState,
    net_pnl_eur: float,
    bot_share_pct: float = 0.10,
) -> Tuple[float, float]:
    """
    Gestisce la trattenuta del 10% sui profitti netti per autofinanziamento del bot.
    Usa il principio istituzionale High-Water Mark (HWM):
    - Il bot trattiene il 10% SOLO sui nuovi profitti netti effettivi che superano
      il massimo profitto cumulativo storico (High-Water Mark).
    - Se un trade recupera una perdita precedente, il 100% del recupero torna al capitale utente
      finché non viene superato il precedente picco di profitto!
    - Il 10% trattenuto viene spostato da `trading_cash_eur` a `bot_vault_eur` (fondo protetto).
    """
    prev_cum_pnl = state.cumulative_realized_net_pnl_eur
    new_cum_pnl = prev_cum_pnl + net_pnl_eur
    state.cumulative_realized_net_pnl_eur = round(new_cum_pnl, 6)

    bot_share_eur = 0.0
    if net_pnl_eur > 0.0 and new_cum_pnl > state.high_water_mark_pnl_eur:
        taxable_new_profit = new_cum_pnl - max(state.high_water_mark_pnl_eur, prev_cum_pnl)
        taxable_new_profit = max(0.0, min(net_pnl_eur, taxable_new_profit))
        bot_share_eur = round(taxable_new_profit * bot_share_pct, 6)

        if bot_share_eur > 0.0 and state.trading_cash_eur >= bot_share_eur:
            state.trading_cash_eur = round(state.trading_cash_eur - bot_share_eur, 6)
            state.bot_vault_eur = round(state.bot_vault_eur + bot_share_eur, 6)

        state.high_water_mark_pnl_eur = round(new_cum_pnl, 6)

    user_share_eur = round(net_pnl_eur - bot_share_eur, 6)
    state.cumulative_user_profit_eur = round(
        state.cumulative_user_profit_eur + user_share_eur, 6
    )
    return bot_share_eur, user_share_eur


def resolve_self_improvement_tier(
    bot_vault_eur: float, tiers_config: List[Dict[str, Any]]
) -> Dict[str, Any]:
    """
    Determina il livello evolutivo sbloccato dal Fondo Autofinanziamento del Bot (10%).
    Più il bot guadagna e accumula nel suo fondo, più potenzia la profondità di ricerca
    parametrica Walk-Forward e il numero di mercati analizzati!
    """
    if not tiers_config:
        return {
            "tier": 1,
            "name": "Seed Explorer",
            "min_vault_eur": 0.0,
            "grid_combinations": 12,
            "max_symbols_scanned": 4,
            "description": "Configurazione standard.",
        }

    active_tier = tiers_config[0]
    for tier in sorted(tiers_config, key=lambda x: float(x.get("min_vault_eur", 0.0))):
        if bot_vault_eur >= float(tier.get("min_vault_eur", 0.0)):
            active_tier = tier
    return active_tier
