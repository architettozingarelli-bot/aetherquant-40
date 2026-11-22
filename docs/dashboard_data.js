window.BOT_DASHBOARD_DATA = {
  "bot_name": "AetherQuant-40",
  "version": "1.0.0",
  "mode": "paper",
  "exchange": "kraken",
  "last_run_at": "2026-11-22T13:55:42.267518+00:00",
  "last_optimized_at": "2026-11-22T12:49:05.708603+00:00",
  "cycle_count": 86,
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
    "generation": 15,
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
      "BTC/EUR: miglior strategia evoluta = trend_pullback (WF score +0.05)",
      "ETH/EUR: miglior strategia evoluta = trend_pullback (WF score +0.05)",
      "SOL/EUR: miglior strategia evoluta = trend_pullback (WF score -0.51)",
      "XRP/EUR: miglior strategia evoluta = donchian_breakout (WF score -0.56)"
    ],
    "assets_genome": {
      "BTC/EUR": {
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
            "walk_forward_score": 0.05,
            "metrics": {
              "in_sample_return_pct": 0.0,
              "out_of_sample_return_pct": 0.0,
              "profit_factor": 1.0,
              "sample_trades": 0
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
            "walk_forward_score": -0.3391,
            "metrics": {
              "in_sample_return_pct": -0.703,
              "out_of_sample_return_pct": 0.0,
              "profit_factor": 0.6,
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
              "in_sample_return_pct": -4.181,
              "out_of_sample_return_pct": -4.359,
              "profit_factor": 0.04,
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
            "walk_forward_score": 0.05,
            "metrics": {
              "in_sample_return_pct": 0.0,
              "out_of_sample_return_pct": 0.0,
              "profit_factor": 1.0,
              "sample_trades": 0
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
            "walk_forward_score": 0.05,
            "metrics": {
              "in_sample_return_pct": 0.0,
              "out_of_sample_return_pct": 0.0,
              "profit_factor": 1.0,
              "sample_trades": 0
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
              "in_sample_return_pct": -6.577,
              "out_of_sample_return_pct": -1.501,
              "profit_factor": 0.08,
              "sample_trades": 11
            }
          }
        }
      },
      "SOL/EUR": {
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
            "walk_forward_score": -0.505,
            "metrics": {
              "in_sample_return_pct": 0.0,
              "out_of_sample_return_pct": -0.866,
              "profit_factor": 0.4,
              "sample_trades": 1
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
            "walk_forward_score": -0.6685,
            "metrics": {
              "in_sample_return_pct": 0.0,
              "out_of_sample_return_pct": -1.265,
              "profit_factor": 0.4,
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
              "in_sample_return_pct": -5.259,
              "out_of_sample_return_pct": -2.524,
              "profit_factor": 0.2,
              "sample_trades": 12
            }
          }
        }
      },
      "XRP/EUR": {
        "strategies": {
          "trend_pullback": {
            "params": {
              "fast_ema": 15,
              "slow_ema": 75,
              "rsi_low": 38.0,
              "rsi_high": 58.0,
              "stop_atr_mult": 1.6,
              "tp_atr_mult": 4.5,
              "trail_atr_mult": 2.0
            },
            "walk_forward_score": -1.0,
            "metrics": {
              "in_sample_return_pct": 0.0,
              "out_of_sample_return_pct": -2.636,
              "profit_factor": 0.44,
              "sample_trades": 4
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
            "walk_forward_score": -0.5628,
            "metrics": {
              "in_sample_return_pct": 0.0,
              "out_of_sample_return_pct": -1.007,
              "profit_factor": 0.4,
              "sample_trades": 1
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
              "in_sample_return_pct": -3.688,
              "out_of_sample_return_pct": -2.896,
              "profit_factor": 0.06,
              "sample_trades": 11
            }
          }
        }
      }
    }
  },
  "market_overview": {
    "BTC/EUR": {
      "price_eur": 55479.3,
      "regime": "BEAR_DEFENSIVE",
      "adx": 22.86,
      "rsi": 60.29,
      "atr_pct": 1.11,
      "slope_pct": -0.422,
      "confidence": 0.66,
      "rationale": "Mercato ribassista (Prezzo < EMA150, slope=-0.42%): attiva difesa capitale.",
      "selected_strategy": "capital_shield_eur",
      "signal": "HOLD",
      "signal_rationale": "Modalità Scudo EUR attiva: mercato ribassista, capitale protetto."
    },
    "ETH/EUR": {
      "price_eur": 1556.65,
      "regime": "BEAR_DEFENSIVE",
      "adx": 21.81,
      "rsi": 61.09,
      "atr_pct": 1.11,
      "slope_pct": -0.415,
      "confidence": 0.66,
      "rationale": "Mercato ribassista (Prezzo < EMA150, slope=-0.41%): attiva difesa capitale.",
      "selected_strategy": "capital_shield_eur",
      "signal": "HOLD",
      "signal_rationale": "Modalità Scudo EUR attiva: mercato ribassista, capitale protetto."
    },
    "SOL/EUR": {
      "price_eur": 64.03,
      "regime": "BEAR_DEFENSIVE",
      "adx": 16.87,
      "rsi": 53.37,
      "atr_pct": 1.05,
      "slope_pct": -0.36,
      "confidence": 0.65,
      "rationale": "Mercato ribassista (Prezzo < EMA150, slope=-0.36%): attiva difesa capitale.",
      "selected_strategy": "capital_shield_eur",
      "signal": "HOLD",
      "signal_rationale": "Modalità Scudo EUR attiva: mercato ribassista, capitale protetto."
    },
    "XRP/EUR": {
      "price_eur": 0.8416,
      "regime": "BEAR_DEFENSIVE",
      "adx": 15.43,
      "rsi": 49.33,
      "atr_pct": 1.05,
      "slope_pct": -0.331,
      "confidence": 0.65,
      "rationale": "Mercato ribassista (Prezzo < EMA150, slope=-0.33%): attiva difesa capitale.",
      "selected_strategy": "capital_shield_eur",
      "signal": "HOLD",
      "signal_rationale": "Modalità Scudo EUR attiva: mercato ribassista, capitale protetto."
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
    },
    {
      "timestamp": "2026-11-18T21:51:11.581425+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-18T22:50:23.639450+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-18T23:48:07.088367+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-19T01:04:07.659670+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-19T02:16:30.952842+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-19T03:54:36.639033+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-19T05:00:39.399781+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-19T05:59:58.167971+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-19T07:10:32.371590+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-19T08:59:02.443080+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-19T10:00:22.079861+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-19T10:57:54.279923+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-19T11:55:25.229347+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-19T13:08:30.695821+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-19T14:51:11.166852+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-19T15:56:53.581644+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-19T17:00:43.554370+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-19T17:53:50.000225+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-19T18:56:50.607876+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-19T19:59:31.635927+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-19T20:50:42.369621+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-19T21:48:58.203487+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-19T22:46:41.718987+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-19T23:42:30.749640+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T00:57:34.547721+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T02:06:02.750951+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T03:52:12.934909+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T04:58:00.051009+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T05:59:32.181391+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T07:10:57.847559+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T08:59:16.240336+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T09:57:42.562857+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T10:57:49.292247+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T11:55:09.058835+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T13:02:48.250031+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T14:20:02.312291+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T15:54:52.321728+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T16:56:04.076006+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T17:55:10.890356+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T18:56:26.750113+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T19:57:15.404812+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T20:47:49.052775+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T21:45:27.550059+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T22:45:21.426489+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-20T23:45:55.475091+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T01:00:48.854408+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T02:08:59.004586+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T03:50:39.816588+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T04:53:37.574158+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T05:53:27.509138+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T07:02:30.201134+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T08:11:52.711316+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T09:45:56.816859+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T10:45:51.966173+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T11:43:05.287787+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T12:51:51.127754+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T13:56:30.208163+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T14:48:57.096086+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T15:42:59.939862+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T16:42:52.499372+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T17:40:18.575486+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T18:42:31.688947+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T19:45:15.062997+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T20:39:01.693798+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T21:37:45.558386+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T22:38:11.307041+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-21T23:36:24.954636+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T00:58:08.340983+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T02:04:52.120808+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T02:54:23.340235+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T03:51:57.481974+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T04:56:34.250558+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T05:55:08.088530+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T07:02:32.572202+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T08:13:11.918509+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T09:45:57.810466+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T10:44:45.834720+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T11:41:33.666261+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T12:49:05.708603+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T13:55:42.267518+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    }
  ]
};
