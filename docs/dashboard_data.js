window.BOT_DASHBOARD_DATA = {
  "bot_name": "AetherQuant-40",
  "version": "1.0.0",
  "mode": "paper",
  "exchange": "kraken",
  "last_run_at": "2026-11-18T20:52:47.238348+00:00",
  "last_optimized_at": "2026-11-18T15:57:19.561623+00:00",
  "cycle_count": 6,
  "summary": {
    "initial_capital_eur": 40.0,
    "total_ecosystem_eur": 40.0,
    "user_equity_eur": 40.0,
    "trading_cash_eur": 40.0,
    "invested_eur": 0.0,
    "bot_vault_eur": 0.0,
    "bot_share_pct": 10.0,
    "high_water_mark_pnl_eur": 0.0,
    "user_roi_pct": 0.0,
    "total_roi_pct": 0.0,
    "win_rate_pct": 0.0,
    "profit_factor": 0.0,
    "total_trades": 0,
    "current_drawdown_pct": 0.0,
    "current_tier": 1,
    "current_tier_name": "Seed Explorer",
    "last_regime_summary": "BEAR_DEFENSIVE",
    "last_selected_strategy": "Scudo Liquidità EUR (Difesa)"
  },
  "self_improvement": {
    "generation": 1,
    "grid_combinations_used": 12,
    "tiers": [
      {
        "tier": 1,
        "name": "Seed Explorer",
        "min_vault_eur": 0.0,
        "grid_combinations": 12,
        "max_symbols_scanned": 4,
        "description": "Scansione base sui top 4 asset EUR e griglia rapida walk-forward."
      },
      {
        "tier": 2,
        "name": "Adaptive Quant",
        "min_vault_eur": 1.5,
        "grid_combinations": 27,
        "max_symbols_scanned": 6,
        "description": "Sbloccato con 1.50€ nel Fondo Bot: espande universo a 6 asset e ricerca parametrica multi-regime."
      },
      {
        "tier": 3,
        "name": "Autonomous Alpha",
        "min_vault_eur": 5.0,
        "grid_combinations": 48,
        "max_symbols_scanned": 8,
        "description": "Sbloccato con 5.00€ nel Fondo Bot: mutazione evolutiva profonda, filtro multi-timeframe e compounding dinamico."
      }
    ],
    "recent_notes": [
      "BTC/EUR: miglior strategia evoluta = trend_pullback (WF score +0.06)",
      "ETH/EUR: miglior strategia evoluta = trend_pullback (WF score +0.22)",
      "SOL/EUR: miglior strategia evoluta = donchian_breakout (WF score +0.14)",
      "XRP/EUR: miglior strategia evoluta = trend_pullback (WF score -0.07)"
    ],
    "assets_genome": {
      "BTC/EUR": {
        "strategies": {
          "trend_pullback": {
            "params": {
              "fast_ema": 15,
              "slow_ema": 110,
              "rsi_low": 38.0,
              "rsi_high": 58.0,
              "stop_atr_mult": 1.6,
              "tp_atr_mult": 3.8,
              "trail_atr_mult": 2.0
            },
            "walk_forward_score": 0.0627,
            "metrics": {
              "in_sample_return_pct": 0.594,
              "out_of_sample_return_pct": 0.0,
              "profit_factor": 1.4,
              "sample_trades": 2
            }
          },
          "donchian_breakout": {
            "params": {
              "channel_period": 16,
              "vol_mult": 1.3,
              "rsi_max": 74.0,
              "stop_atr_mult": 1.8,
              "tp_atr_mult": 3.6,
              "trail_atr_mult": 2.2
            },
            "walk_forward_score": -0.3155,
            "metrics": {
              "in_sample_return_pct": 0.431,
              "out_of_sample_return_pct": -0.703,
              "profit_factor": 0.65,
              "sample_trades": 3
            }
          },
          "mean_reversion_bb": {
            "params": {
              "bb_period": 20,
              "bb_std": 2.0,
              "rsi_oversold": 35.0,
              "stop_atr_mult": 1.8,
              "tp_atr_mult": 3.0,
              "trail_atr_mult": 1.6
            },
            "walk_forward_score": -1.0,
            "metrics": {
              "in_sample_return_pct": -0.508,
              "out_of_sample_return_pct": -5.893,
              "profit_factor": 0.2,
              "sample_trades": 12
            }
          }
        }
      },
      "ETH/EUR": {
        "strategies": {
          "trend_pullback": {
            "params": {
              "fast_ema": 21,
              "slow_ema": 89,
              "rsi_low": 38.0,
              "rsi_high": 58.0,
              "stop_atr_mult": 1.8,
              "tp_atr_mult": 3.6,
              "trail_atr_mult": 2.0
            },
            "walk_forward_score": 0.2188,
            "metrics": {
              "in_sample_return_pct": 0.848,
              "out_of_sample_return_pct": 0.0,
              "profit_factor": 1.4,
              "sample_trades": 1
            }
          },
          "donchian_breakout": {
            "params": {
              "channel_period": 20,
              "vol_mult": 1.1,
              "rsi_max": 74.0,
              "stop_atr_mult": 2.0,
              "tp_atr_mult": 4.2,
              "trail_atr_mult": 2.2
            },
            "walk_forward_score": 0.1333,
            "metrics": {
              "in_sample_return_pct": 0.238,
              "out_of_sample_return_pct": 0.0,
              "profit_factor": 1.4,
              "sample_trades": 1
            }
          },
          "mean_reversion_bb": {
            "params": {
              "bb_period": 18,
              "bb_std": 2.25,
              "rsi_oversold": 35.0,
              "stop_atr_mult": 1.8,
              "tp_atr_mult": 2.6,
              "trail_atr_mult": 1.6
            },
            "walk_forward_score": -1.0,
            "metrics": {
              "in_sample_return_pct": -4.085,
              "out_of_sample_return_pct": -5.22,
              "profit_factor": 0.06,
              "sample_trades": 14
            }
          }
        }
      },
      "SOL/EUR": {
        "strategies": {
          "trend_pullback": {
            "params": {
              "fast_ema": 28,
              "slow_ema": 110,
              "rsi_low": 38.0,
              "rsi_high": 58.0,
              "stop_atr_mult": 1.6,
              "tp_atr_mult": 3.2,
              "trail_atr_mult": 2.0
            },
            "walk_forward_score": -0.398,
            "metrics": {
              "in_sample_return_pct": -0.876,
              "out_of_sample_return_pct": 0.0,
              "profit_factor": 0.6,
              "sample_trades": 1
            }
          },
          "donchian_breakout": {
            "params": {
              "channel_period": 20,
              "vol_mult": 1.1,
              "rsi_max": 74.0,
              "stop_atr_mult": 2.0,
              "tp_atr_mult": 4.2,
              "trail_atr_mult": 2.2
            },
            "walk_forward_score": 0.1379,
            "metrics": {
              "in_sample_return_pct": 0.271,
              "out_of_sample_return_pct": 0.0,
              "profit_factor": 1.4,
              "sample_trades": 1
            }
          },
          "mean_reversion_bb": {
            "params": {
              "bb_period": 20,
              "bb_std": 1.85,
              "rsi_oversold": 30.0,
              "stop_atr_mult": 1.8,
              "tp_atr_mult": 3.2,
              "trail_atr_mult": 1.6
            },
            "walk_forward_score": -1.0,
            "metrics": {
              "in_sample_return_pct": -2.433,
              "out_of_sample_return_pct": -3.982,
              "profit_factor": 0.2,
              "sample_trades": 13
            }
          }
        }
      },
      "XRP/EUR": {
        "strategies": {
          "trend_pullback": {
            "params": {
              "fast_ema": 28,
              "slow_ema": 75,
              "rsi_low": 38.0,
              "rsi_high": 58.0,
              "stop_atr_mult": 1.6,
              "tp_atr_mult": 3.8,
              "trail_atr_mult": 2.0
            },
            "walk_forward_score": -0.0743,
            "metrics": {
              "in_sample_return_pct": -0.41,
              "out_of_sample_return_pct": 0.212,
              "profit_factor": 1.4,
              "sample_trades": 4
            }
          },
          "donchian_breakout": {
            "params": {
              "channel_period": 20,
              "vol_mult": 1.0,
              "rsi_max": 74.0,
              "stop_atr_mult": 1.8,
              "tp_atr_mult": 3.6,
              "trail_atr_mult": 2.2
            },
            "walk_forward_score": -0.7637,
            "metrics": {
              "in_sample_return_pct": -0.939,
              "out_of_sample_return_pct": -0.926,
              "profit_factor": 0.0,
              "sample_trades": 2
            }
          },
          "mean_reversion_bb": {
            "params": {
              "bb_period": 24,
              "bb_std": 2.25,
              "rsi_oversold": 30.0,
              "stop_atr_mult": 1.8,
              "tp_atr_mult": 2.6,
              "trail_atr_mult": 1.6
            },
            "walk_forward_score": -1.0,
            "metrics": {
              "in_sample_return_pct": -3.005,
              "out_of_sample_return_pct": -1.754,
              "profit_factor": 0.16,
              "sample_trades": 10
            }
          }
        }
      }
    }
  },
  "market_overview": {
    "BTC/EUR": {
      "price_eur": 57161.0,
      "regime": "BEAR_DEFENSIVE",
      "adx": 20.11,
      "rsi": 32.13,
      "atr_pct": 0.84,
      "slope_pct": -0.518,
      "confidence": 0.68,
      "rationale": "Mercato ribassista (Prezzo < EMA150, slope=-0.52%): attiva difesa capitale.",
      "selected_strategy": "capital_shield_eur",
      "signal": "HOLD",
      "signal_rationale": "Modalità Scudo EUR attiva: mercato ribassista, capitale protetto."
    },
    "ETH/EUR": {
      "price_eur": 1600.06,
      "regime": "BEAR_DEFENSIVE",
      "adx": 23.76,
      "rsi": 35.41,
      "atr_pct": 1.09,
      "slope_pct": -0.571,
      "confidence": 0.69,
      "rationale": "Mercato ribassista (Prezzo < EMA150, slope=-0.57%): attiva difesa capitale.",
      "selected_strategy": "capital_shield_eur",
      "signal": "HOLD",
      "signal_rationale": "Modalità Scudo EUR attiva: mercato ribassista, capitale protetto."
    },
    "SOL/EUR": {
      "price_eur": 66.68,
      "regime": "BEAR_DEFENSIVE",
      "adx": 17.7,
      "rsi": 44.79,
      "atr_pct": 1.18,
      "slope_pct": -0.208,
      "confidence": 0.63,
      "rationale": "Mercato ribassista (Prezzo < EMA150, slope=-0.21%): attiva difesa capitale.",
      "selected_strategy": "capital_shield_eur",
      "signal": "HOLD",
      "signal_rationale": "Modalità Scudo EUR attiva: mercato ribassista, capitale protetto."
    },
    "XRP/EUR": {
      "price_eur": 0.8811,
      "regime": "RANGE_ACCUMULATION",
      "adx": 17.28,
      "rsi": 42.64,
      "atr_pct": 1.13,
      "slope_pct": -0.104,
      "confidence": 0.65,
      "rationale": "Mercato laterale/accumulazione (ADX=17.3, RSI=42.6): ideale per Mean-Reversion selettiva.",
      "selected_strategy": "mean_reversion_bb",
      "signal": "HOLD",
      "signal_rationale": "In attesa di setup ad aspettativa positiva (mean_reversion_bb)."
    }
  },
  "open_positions": [],
  "recent_trades": [],
  "equity_curve": [
    {
      "timestamp": "2026-11-17T20:00:00+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0.0,
      "regime_summary": "INITIAL_SEED"
    },
    {
      "timestamp": "2026-11-18T15:57:19.561623+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-18T16:59:50.104280+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-18T17:55:23.987942+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-18T18:53:24.253857+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-18T19:56:26.964881+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-18T20:52:47.238348+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    }
  ]
};
