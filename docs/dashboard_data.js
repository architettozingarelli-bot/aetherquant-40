window.BOT_DASHBOARD_DATA = {
  "bot_name": "AetherQuant-40",
  "version": "1.0.0",
  "mode": "paper",
  "exchange": "kraken",
  "last_run_at": "2026-11-26T06:02:05.086440+00:00",
  "last_optimized_at": "2026-11-26T03:57:01.129264+00:00",
  "cycle_count": 159,
  "summary": {
    "initial_capital_eur": 40.0,
    "total_ecosystem_eur": 39.11,
    "user_equity_eur": 39.11,
    "trading_cash_eur": 39.11,
    "invested_eur": 0.0,
    "bot_vault_eur": 0.0,
    "bot_share_pct": 10.0,
    "high_water_mark_pnl_eur": 0.0,
    "user_roi_pct": -2.22,
    "total_roi_pct": -2.22,
    "win_rate_pct": 0.0,
    "profit_factor": 0.0,
    "total_trades": 2,
    "current_drawdown_pct": 2.22,
    "current_tier": 1,
    "current_tier_name": "Seed Explorer",
    "last_regime_summary": "RANGE_ACCUMULATION",
    "last_selected_strategy": "Attesa Setup Ottimale (Cash EUR)"
  },
  "self_improvement": {
    "generation": 27,
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
      "BTC/EUR: miglior strategia evoluta = donchian_breakout (WF score -0.01)",
      "ETH/EUR: miglior strategia evoluta = trend_pullback (WF score +0.44)",
      "SOL/EUR: miglior strategia evoluta = donchian_breakout (WF score -0.53)",
      "XRP/EUR: miglior strategia evoluta = donchian_breakout (WF score -0.44)"
    ],
    "assets_genome": {
      "BTC/EUR": {
        "strategies": {
          "trend_pullback": {
            "params": {
              "fast_ema": 15,
              "slow_ema": 89,
              "rsi_low": 38.0,
              "rsi_high": 58.0,
              "stop_atr_mult": 1.9,
              "tp_atr_mult": 3.8,
              "trail_atr_mult": 2.0
            },
            "walk_forward_score": -0.2786,
            "metrics": {
              "in_sample_return_pct": 0.0,
              "out_of_sample_return_pct": -0.12,
              "profit_factor": 0.95,
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
            "walk_forward_score": -0.0104,
            "metrics": {
              "in_sample_return_pct": -0.703,
              "out_of_sample_return_pct": 0.851,
              "profit_factor": 1.2,
              "sample_trades": 2
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
              "in_sample_return_pct": -7.567,
              "out_of_sample_return_pct": -2.687,
              "profit_factor": 0.14,
              "sample_trades": 12
            }
          }
        }
      },
      "ETH/EUR": {
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
            "walk_forward_score": 0.4391,
            "metrics": {
              "in_sample_return_pct": 0.0,
              "out_of_sample_return_pct": 1.597,
              "profit_factor": 1.6,
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
            "walk_forward_score": 0.4258,
            "metrics": {
              "in_sample_return_pct": 0.0,
              "out_of_sample_return_pct": 1.313,
              "profit_factor": 1.6,
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
              "in_sample_return_pct": -7.161,
              "out_of_sample_return_pct": -1.61,
              "profit_factor": 0.04,
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
              "slow_ema": 75,
              "rsi_low": 38.0,
              "rsi_high": 58.0,
              "stop_atr_mult": 1.6,
              "tp_atr_mult": 4.5,
              "trail_atr_mult": 2.0
            },
            "walk_forward_score": -0.9892,
            "metrics": {
              "in_sample_return_pct": 0.0,
              "out_of_sample_return_pct": -1.854,
              "profit_factor": 0.76,
              "sample_trades": 5
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
            "walk_forward_score": -0.53,
            "metrics": {
              "in_sample_return_pct": -1.265,
              "out_of_sample_return_pct": 0.0,
              "profit_factor": 0.6,
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
              "in_sample_return_pct": -3.146,
              "out_of_sample_return_pct": -3.771,
              "profit_factor": 0.22,
              "sample_trades": 11
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
              "in_sample_return_pct": -2.636,
              "out_of_sample_return_pct": -0.623,
              "profit_factor": 0.47,
              "sample_trades": 7
            }
          },
          "donchian_breakout": {
            "params": {
              "channel_period": 16,
              "vol_mult": 1.0,
              "rsi_max": 74.0,
              "stop_atr_mult": 2.2,
              "tp_atr_mult": 5.2,
              "trail_atr_mult": 2.2
            },
            "walk_forward_score": -0.4415,
            "metrics": {
              "in_sample_return_pct": -2.367,
              "out_of_sample_return_pct": 1.492,
              "profit_factor": 1.2,
              "sample_trades": 3
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
              "in_sample_return_pct": -2.747,
              "out_of_sample_return_pct": -1.392,
              "profit_factor": 0.09,
              "sample_trades": 8
            }
          }
        }
      }
    }
  },
  "market_overview": {
    "BTC/EUR": {
      "price_eur": 55416.9,
      "regime": "BEAR_DEFENSIVE",
      "adx": 27.45,
      "rsi": 63.1,
      "atr_pct": 0.95,
      "slope_pct": -0.061,
      "confidence": 0.61,
      "rationale": "Mercato ribassista (Prezzo < EMA150, slope=-0.06%): attiva difesa capitale.",
      "selected_strategy": "capital_shield_eur",
      "signal": "HOLD",
      "signal_rationale": "Modalità Scudo EUR attiva: mercato ribassista, capitale protetto."
    },
    "ETH/EUR": {
      "price_eur": 1544.53,
      "regime": "BEAR_DEFENSIVE",
      "adx": 27.01,
      "rsi": 57.99,
      "atr_pct": 1.03,
      "slope_pct": -0.109,
      "confidence": 0.62,
      "rationale": "Mercato ribassista (Prezzo < EMA150, slope=-0.11%): attiva difesa capitale.",
      "selected_strategy": "capital_shield_eur",
      "signal": "HOLD",
      "signal_rationale": "Modalità Scudo EUR attiva: mercato ribassista, capitale protetto."
    },
    "SOL/EUR": {
      "price_eur": 64.65,
      "regime": "RANGE_ACCUMULATION",
      "adx": 29.86,
      "rsi": 62.45,
      "atr_pct": 1.04,
      "slope_pct": -0.013,
      "confidence": 0.65,
      "rationale": "Mercato laterale/accumulazione (ADX=29.9, RSI=62.4): ideale per Mean-Reversion selettiva.",
      "selected_strategy": "mean_reversion_bb",
      "signal": "HOLD",
      "signal_rationale": "In attesa di setup ad aspettativa positiva (mean_reversion_bb)."
    },
    "XRP/EUR": {
      "price_eur": 0.874,
      "regime": "RANGE_ACCUMULATION",
      "adx": 27.26,
      "rsi": 70.63,
      "atr_pct": 0.99,
      "slope_pct": 0.137,
      "confidence": 0.65,
      "rationale": "Mercato laterale/accumulazione (ADX=27.3, RSI=70.6): ideale per Mean-Reversion selettiva.",
      "selected_strategy": "mean_reversion_bb",
      "signal": "HOLD",
      "signal_rationale": "In attesa di setup ad aspettativa positiva (mean_reversion_bb)."
    }
  },
  "open_positions": [],
  "recent_trades": [
    {
      "trade_id": "5c3110b9a2",
      "symbol": "SOL/EUR",
      "strategy": "trend_pullback",
      "regime": "RANGE_ACCUMULATION",
      "entry_price": 66.143055,
      "exit_price": 64.597685,
      "quantity": 0.26930114,
      "gross_pnl_eur": -0.4162,
      "fees_eur": 0.0563,
      "net_pnl_eur": -0.4725,
      "net_pnl_pct": -0.02653,
      "bot_share_eur": 0.0,
      "user_share_eur": -0.4725,
      "exit_reason": "STOP_LOSS_PROTECTION",
      "opened_at": "2026-11-24T01:01:46.502670+00:00",
      "closed_at": "2026-11-24T10:06:11.776769+00:00"
    },
    {
      "trade_id": "d511013107",
      "symbol": "ETH/EUR",
      "strategy": "trend_pullback",
      "regime": "RANGE_ACCUMULATION",
      "entry_price": 1655.457315,
      "exit_price": 1622.36841,
      "quantity": 0.01087313,
      "gross_pnl_eur": -0.3598,
      "fees_eur": 0.057,
      "net_pnl_eur": -0.4168,
      "net_pnl_pct": -0.02316,
      "bot_share_eur": 0.0,
      "user_share_eur": -0.4168,
      "exit_reason": "STOP_LOSS_PROTECTION",
      "opened_at": "2026-11-23T14:59:06.251361+00:00",
      "closed_at": "2026-11-23T17:56:34.358304+00:00"
    }
  ],
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
    },
    {
      "timestamp": "2026-11-22T14:47:57.679538+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T15:43:07.200752+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T16:42:38.159746+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T17:40:11.035918+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T18:43:05.305022+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T19:48:20.371064+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T20:41:54.353177+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T21:40:09.745825+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T22:41:55.055430+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-22T23:39:46.246771+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-23T01:02:00.482392+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-23T02:16:26.489592+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-23T03:59:56.345380+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-23T05:14:50.522746+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-23T07:29:07.009663+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-23T09:21:05.385431+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-23T11:04:28.776731+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-23T11:56:24.695168+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-23T13:12:34.405408+00:00",
      "total_equity_eur": 40.0,
      "user_equity_eur": 40.0,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 40.0,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-23T14:59:06.251361+00:00",
      "total_equity_eur": 39.9622,
      "user_equity_eur": 39.9622,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 21.9712,
      "invested_eur": 17.991,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-23T16:00:23.954953+00:00",
      "total_equity_eur": 39.6592,
      "user_equity_eur": 39.6592,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 21.9712,
      "invested_eur": 17.688,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-23T16:59:16.531333+00:00",
      "total_equity_eur": 39.6592,
      "user_equity_eur": 39.6592,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 21.9712,
      "invested_eur": 17.688,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-23T17:56:34.358304+00:00",
      "total_equity_eur": 39.5832,
      "user_equity_eur": 39.5832,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.5832,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-23T18:57:09.171240+00:00",
      "total_equity_eur": 39.5832,
      "user_equity_eur": 39.5832,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.5832,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-23T19:59:24.666611+00:00",
      "total_equity_eur": 39.5832,
      "user_equity_eur": 39.5832,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.5832,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-23T20:49:54.922528+00:00",
      "total_equity_eur": 39.5832,
      "user_equity_eur": 39.5832,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.5832,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-23T21:50:09.055539+00:00",
      "total_equity_eur": 39.5832,
      "user_equity_eur": 39.5832,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.5832,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-23T22:51:13.008817+00:00",
      "total_equity_eur": 39.5832,
      "user_equity_eur": 39.5832,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.5832,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-23T23:48:00.686727+00:00",
      "total_equity_eur": 39.5832,
      "user_equity_eur": 39.5832,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.5832,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T01:01:46.502670+00:00",
      "total_equity_eur": 39.5458,
      "user_equity_eur": 39.5458,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 21.7423,
      "invested_eur": 17.8035,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T02:16:58.964389+00:00",
      "total_equity_eur": 39.4462,
      "user_equity_eur": 39.4462,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 21.7423,
      "invested_eur": 17.7039,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T03:56:49.770164+00:00",
      "total_equity_eur": 39.2523,
      "user_equity_eur": 39.2523,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 21.7423,
      "invested_eur": 17.51,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T05:02:06.557943+00:00",
      "total_equity_eur": 39.3842,
      "user_equity_eur": 39.3842,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 21.7423,
      "invested_eur": 17.6419,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T05:59:42.799466+00:00",
      "total_equity_eur": 39.3842,
      "user_equity_eur": 39.3842,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 21.7423,
      "invested_eur": 17.6419,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T07:10:14.294569+00:00",
      "total_equity_eur": 39.4839,
      "user_equity_eur": 39.4839,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 21.7423,
      "invested_eur": 17.7416,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T08:59:28.800640+00:00",
      "total_equity_eur": 39.3815,
      "user_equity_eur": 39.3815,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 21.7423,
      "invested_eur": 17.6392,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-24T10:06:11.776769+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-24T11:56:06.793063+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T13:11:31.196459+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-24T14:56:57.960536+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-24T16:04:12.326144+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T17:06:52.297512+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T18:56:31.473326+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T20:00:31.516130+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T20:52:13.435944+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T21:55:01.181029+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T22:55:56.145388+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-24T23:48:21.444122+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T01:06:27.002328+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T02:54:05.436855+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T03:59:12.722829+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T05:04:42.294148+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T06:02:13.190457+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T07:18:51.886147+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T09:02:12.029198+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T10:11:48.664610+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T11:58:36.284568+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T13:15:08.391046+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T15:00:13.335129+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T16:02:30.619584+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T17:04:15.603667+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T17:53:22.859063+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T18:50:42.759607+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T19:54:46.389675+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T20:53:41.271378+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T21:55:36.790869+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T22:52:46.449027+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-25T23:47:42.705027+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-26T01:06:39.437718+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "BEAR_DEFENSIVE"
    },
    {
      "timestamp": "2026-11-26T02:53:12.207067+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-26T03:57:01.129264+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-26T05:03:50.938067+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    },
    {
      "timestamp": "2026-11-26T06:02:05.086440+00:00",
      "total_equity_eur": 39.1107,
      "user_equity_eur": 39.1107,
      "bot_vault_eur": 0.0,
      "trading_cash_eur": 39.1107,
      "invested_eur": 0,
      "regime_summary": "RANGE_ACCUMULATION"
    }
  ]
};
