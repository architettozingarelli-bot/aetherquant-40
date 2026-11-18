from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class Position:
    symbol: str
    strategy: str
    regime_at_entry: str
    entry_price: float
    quantity: float
    cost_eur: float
    entry_fee_eur: float
    stop_loss: float
    take_profit: float
    highest_price: float
    trailing_atr_dist: float
    opened_at: str
    order_id: str = "paper"

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Position":
        return cls(**data)


@dataclass
class TradeRecord:
    trade_id: str
    symbol: str
    strategy: str
    regime: str
    entry_price: float
    exit_price: float
    quantity: float
    gross_pnl_eur: float
    fees_eur: float
    net_pnl_eur: float
    net_pnl_pct: float
    bot_share_eur: float
    user_share_eur: float
    exit_reason: str
    opened_at: str
    closed_at: str

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "TradeRecord":
        return cls(**data)


@dataclass
class EquityPoint:
    timestamp: str
    total_equity_eur: float
    user_equity_eur: float
    bot_vault_eur: float
    trading_cash_eur: float
    invested_eur: float
    regime_summary: str

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "EquityPoint":
        return cls(**data)


@dataclass
class Signal:
    symbol: str
    action: str  # "BUY", "SELL", "HOLD"
    strategy: str
    regime: str
    confidence: float
    price: float
    stop_loss: float
    take_profit: float
    trailing_atr_dist: float
    expected_reward_pct: float
    walk_forward_score: float
    rationale: str


@dataclass
class PortfolioState:
    mode: str = "paper"
    exchange_used: str = "kraken"
    initial_capital_eur: float = 40.0
    trading_cash_eur: float = 40.0
    bot_vault_eur: float = 0.0
    cumulative_realized_net_pnl_eur: float = 0.0
    high_water_mark_pnl_eur: float = 0.0
    cumulative_user_profit_eur: float = 0.0
    peak_user_equity_eur: float = 40.0
    cycle_count: int = 0
    current_tier: int = 1
    current_tier_name: str = "Seed Explorer"
    last_regime_summary: str = "NEUTRAL"
    last_selected_strategy: str = "In attesa del primo ciclo"
    last_run_at: Optional[str] = None
    last_optimized_at: Optional[str] = None
    positions: Dict[str, Position] = field(default_factory=dict)
    trade_history: List[TradeRecord] = field(default_factory=list)
    equity_curve: List[EquityPoint] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "mode": self.mode,
            "exchange_used": self.exchange_used,
            "initial_capital_eur": round(self.initial_capital_eur, 4),
            "trading_cash_eur": round(self.trading_cash_eur, 4),
            "bot_vault_eur": round(self.bot_vault_eur, 4),
            "cumulative_realized_net_pnl_eur": round(self.cumulative_realized_net_pnl_eur, 4),
            "high_water_mark_pnl_eur": round(self.high_water_mark_pnl_eur, 4),
            "cumulative_user_profit_eur": round(self.cumulative_user_profit_eur, 4),
            "peak_user_equity_eur": round(self.peak_user_equity_eur, 4),
            "cycle_count": self.cycle_count,
            "current_tier": self.current_tier,
            "current_tier_name": self.current_tier_name,
            "last_regime_summary": self.last_regime_summary,
            "last_selected_strategy": self.last_selected_strategy,
            "last_run_at": self.last_run_at,
            "last_optimized_at": self.last_optimized_at,
            "positions": {sym: pos.to_dict() for sym, pos in self.positions.items()},
            "trade_history": [tr.to_dict() for tr in self.trade_history[-200:]],
            "equity_curve": [ep.to_dict() for ep in self.equity_curve[-500:]],
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "PortfolioState":
        positions = {
            sym: Position.from_dict(pos_data)
            for sym, pos_data in data.get("positions", {}).items()
        }
        trade_history = [
            TradeRecord.from_dict(tr_data)
            for tr_data in data.get("trade_history", [])
        ]
        equity_curve = [
            EquityPoint.from_dict(ep_data)
            for ep_data in data.get("equity_curve", [])
        ]
        return cls(
            mode=data.get("mode", "paper"),
            exchange_used=data.get("exchange_used", "kraken"),
            initial_capital_eur=float(data.get("initial_capital_eur", 40.0)),
            trading_cash_eur=float(data.get("trading_cash_eur", 40.0)),
            bot_vault_eur=float(data.get("bot_vault_eur", 0.0)),
            cumulative_realized_net_pnl_eur=float(data.get("cumulative_realized_net_pnl_eur", 0.0)),
            high_water_mark_pnl_eur=float(data.get("high_water_mark_pnl_eur", 0.0)),
            cumulative_user_profit_eur=float(data.get("cumulative_user_profit_eur", 0.0)),
            peak_user_equity_eur=float(data.get("peak_user_equity_eur", 40.0)),
            cycle_count=int(data.get("cycle_count", 0)),
            current_tier=int(data.get("current_tier", 1)),
            current_tier_name=data.get("current_tier_name", "Seed Explorer"),
            last_regime_summary=data.get("last_regime_summary", "NEUTRAL"),
            last_selected_strategy=data.get("last_selected_strategy", "In attesa"),
            last_run_at=data.get("last_run_at"),
            last_optimized_at=data.get("last_optimized_at"),
            positions=positions,
            trade_history=trade_history,
            equity_curve=equity_curve,
        )
