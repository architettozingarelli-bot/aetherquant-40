from __future__ import annotations

import logging
import os
from typing import Any, Dict, List, Optional, Tuple
import numpy as np

logger = logging.getLogger("AetherQuant.Exchange")


class ExchangeAdapter:
    """
    Connettore CCXT multi-exchange con:
    - Auto-fallback intelligente (Kraken -> Coinbase -> KuCoin -> Bybit -> Binance) in Paper Mode
      per funzionare sempre su GitHub Actions senza blocchi IP geografici.
    - Supporto ordini reali Spot in EUR in Live Mode tramite GitHub Secrets / variabili d'ambiente.
    """

    def __init__(self, settings: Dict[str, Any], mode: str = "paper") -> None:
        self.settings = settings
        self.mode = mode.lower().strip()
        self.primary_id = os.getenv(
            "EXCHANGE_ID", settings.get("primary_exchange", "kraken")
        ).lower().strip()
        self.fallbacks: List[str] = [
            ex.lower()
            for ex in settings.get(
                "fallback_exchanges", ["coinbase", "kucoin", "bybit", "binance"]
            )
            if ex.lower() != self.primary_id
        ]
        self.active_exchange_id: str = self.primary_id
        self._client: Any = None

    def _build_ccxt_instance(self, exchange_id: str, authenticated: bool = False) -> Any:
        import ccxt  # Import pigro per consentire unit test offline velocissimi

        if not hasattr(ccxt, exchange_id):
            raise ValueError(f"Exchange '{exchange_id}' non supportato da CCXT.")

        cfg: Dict[str, Any] = {
            "enableRateLimit": True,
            "timeout": 20000,
        }
        if authenticated:
            api_key = os.getenv("EXCHANGE_API_KEY", "").strip()
            api_secret = os.getenv("EXCHANGE_API_SECRET", "").strip()
            api_password = os.getenv("EXCHANGE_PASSWORD", "").strip()
            if not api_key or not api_secret:
                raise RuntimeError(
                    "TRADING_MODE=live richiede EXCHANGE_API_KEY e EXCHANGE_API_SECRET "
                    "configurati nei GitHub Secrets (o nel file .env locale)."
                )
            cfg["apiKey"] = api_key
            cfg["secret"] = api_secret
            if api_password:
                cfg["password"] = api_password

        exchange_cls = getattr(ccxt, exchange_id)
        return exchange_cls(cfg)

    def connect(self) -> str:
        """Inizializza la connessione e carica i mercati disponibili."""
        if self.mode == "live":
            client = self._build_ccxt_instance(self.primary_id, authenticated=True)
            client.load_markets()
            self._client = client
            self.active_exchange_id = self.primary_id
            logger.info("Connesso in LIVE mode a %s.", self.active_exchange_id)
            return self.active_exchange_id

        candidates = [self.primary_id] + self.fallbacks
        last_err: Optional[Exception] = None
        for ex_id in candidates:
            try:
                client = self._build_ccxt_instance(ex_id, authenticated=False)
                client.load_markets()
                self._client = client
                self.active_exchange_id = ex_id
                logger.info("Connesso ai dati reali di mercato tramite %s (Paper Mode).", ex_id)
                return ex_id
            except Exception as exc:  # noqa: BLE001
                logger.warning("Exchange %s non raggiungibile (%s), provo fallback...", ex_id, exc)
                last_err = exc

        raise RuntimeError(f"Impossibile connettersi a nessun exchange pubblico: {last_err}")

    def fetch_ohlcv_arrays(
        self, symbols: List[str], timeframe: str = "1h", limit: int = 500
    ) -> Dict[str, np.ndarray]:
        """Scarica le candele OHLCV chiuse (escludendo la candela in formazione se aperta da pochi secondi)."""
        if self._client is None:
            self.connect()

        result: Dict[str, np.ndarray] = {}
        markets = getattr(self._client, "markets", {}) or {}

        for sym in symbols:
            resolved_sym = sym
            if resolved_sym not in markets:
                logger.info("Coppia %s non quotata su %s, ignorata.", sym, self.active_exchange_id)
                continue
            try:
                raw = self._client.fetch_ohlcv(resolved_sym, timeframe=timeframe, limit=limit)
                if not raw or len(raw) < 60:
                    continue
                # Usa candele chiuse fino alla penultima + prezzo attuale stabile, evitando candele incomplete
                arr = np.asarray(raw[:-1] if len(raw) > 165 else raw, dtype=float)
                result[sym] = arr
            except Exception as exc:  # noqa: BLE001
                logger.warning("Errore download OHLCV per %s su %s: %s", sym, self.active_exchange_id, exc)
        return result

    def fetch_live_eur_balance(self) -> float:
        """Legge il saldo EUR libero reale sull'exchange (solo in modalità live)."""
        if self.mode != "live":
            raise RuntimeError("fetch_live_eur_balance va chiamato solo in modalità live.")
        if self._client is None:
            self.connect()
        bal = self._client.fetch_balance()
        free_eur = float(bal.get("free", {}).get("EUR", 0.0) or 0.0)
        return free_eur

    def execute_spot_buy(
        self, symbol: str, order_eur: float, ref_price: float
    ) -> Tuple[float, float, float, str]:
        """
        Esegue un acquisto Spot:
        Restituisce (executed_price, executed_qty, fee_eur, order_id).
        """
        fee_rate = float(self.settings.get("fee_rate", 0.0016))
        slippage = float(self.settings.get("slippage_rate", 0.0005))

        if self.mode != "live":
            exec_price = ref_price * (1.0 + slippage)
            qty = order_eur / exec_price
            fee_eur = order_eur * fee_rate
            return round(exec_price, 6), round(qty, 8), round(fee_eur, 6), f"paper-buy-{symbol}"

        if self._client is None:
            self.connect()

        raw_qty = order_eur / ref_price
        precise_qty = float(self._client.amount_to_precision(symbol, raw_qty))
        order = self._client.create_market_buy_order(symbol, precise_qty)

        filled_qty = float(order.get("filled") or precise_qty)
        avg_price = float(order.get("average") or order.get("price") or ref_price)
        cost_eur = float(order.get("cost") or (filled_qty * avg_price))

        fee_info = order.get("fee") or {}
        fee_cost = float(fee_info.get("cost") or 0.0)
        fee_curr = str(fee_info.get("currency") or "EUR")
        if fee_cost > 0 and fee_curr != "EUR":
            fee_eur = fee_cost * avg_price
        elif fee_cost > 0:
            fee_eur = fee_cost
        else:
            fee_eur = cost_eur * fee_rate

        order_id = str(order.get("id") or "live-buy")
        return avg_price, filled_qty, fee_eur, order_id

    def execute_spot_sell(
        self, symbol: str, quantity: float, ref_price: float
    ) -> Tuple[float, float, float, str]:
        """
        Esegue una vendita Spot:
        Restituisce (executed_price, executed_qty, fee_eur, order_id).
        """
        fee_rate = float(self.settings.get("fee_rate", 0.0016))
        slippage = float(self.settings.get("slippage_rate", 0.0005))

        if self.mode != "live":
            exec_price = ref_price * (1.0 - slippage)
            gross_eur = quantity * exec_price
            fee_eur = gross_eur * fee_rate
            return round(exec_price, 6), round(quantity, 8), round(fee_eur, 6), f"paper-sell-{symbol}"

        if self._client is None:
            self.connect()

        # Verifica il saldo reale disponibile dell'asset per evitare errori per dust/fee
        base_asset = symbol.split("/")[0]
        bal = self._client.fetch_balance()
        free_asset = float(bal.get("free", {}).get(base_asset, quantity) or quantity)
        sell_qty = min(quantity, free_asset)
        precise_qty = float(self._client.amount_to_precision(symbol, sell_qty))

        order = self._client.create_market_sell_order(symbol, precise_qty)
        filled_qty = float(order.get("filled") or precise_qty)
        avg_price = float(order.get("average") or order.get("price") or ref_price)
        gross_eur = float(order.get("cost") or (filled_qty * avg_price))

        fee_info = order.get("fee") or {}
        fee_cost = float(fee_info.get("cost") or 0.0)
        fee_curr = str(fee_info.get("currency") or "EUR")
        if fee_cost > 0 and fee_curr != "EUR":
            fee_eur = fee_cost * avg_price
        elif fee_cost > 0:
            fee_eur = fee_cost
        else:
            fee_eur = gross_eur * fee_rate

        order_id = str(order.get("id") or "live-sell")
        return avg_price, filled_qty, fee_eur, order_id
