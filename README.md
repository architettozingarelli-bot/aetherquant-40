# AetherQuant-40 — Bot di Investimento Automatico Auto-Evolutivo

**AetherQuant-40** è un bot quantitativo autonomo progettato specificamente per partire da un **capitale iniziale di 40,00 €**, operare gratuitamente nel cloud tramite **GitHub Actions** ogni ora, scegliere in autonomia la strategia d'investimento più adatta al mercato e **trattenere il 10% dei profitti netti** per autofinanziarsi e potenziare il proprio motore di ricerca algoritmica.

---

## Caratteristiche Principali

1. **Scelta Strategica Autonoma Multi-Regime (`src/regime.py` & `src/strategies.py`)**
   Ad ogni ciclo orario il bot analizza trend (EMA 50/150, ADX), volatilità (ATR%) e momentum (RSI, Bande di Bollinger) sulle principali coppie Spot in Euro (`BTC/EUR`, `ETH/EUR`, `SOL/EUR`, `XRP/EUR`, `ADA/EUR`, `LINK/EUR`) e sceglie autonomamente cosa fare:
   - **`BULL_TREND` (Mercato Rialzista)** → Attiva *Smart Trend Pullback* o *Momentum Donchian Breakout* con **Trailing Profit Lock** dinamico per lasciar correre i profitti proteggendo il capitale appena l'operazione va in utile.
   - **`RANGE_ACCUMULATION` (Mercato Laterale)** → Attiva *Bollinger Value Dip* (Mean-Reversion sugli eccessi statistici di ipervenduto con conferma di rimbalzo).
   - **`BEAR_DEFENSIVE` (Mercato Ribassista)** → Attiva automaticamente lo **Scudo Liquidità EUR**, restando parcheggiato in Euro ed evitando i crolli di mercato.

2. **Ingegnerizzato per 40 € Reali (`src/risk.py`)**
   - **Filtro Anti-Commissioni**: Scarta qualsiasi operazione il cui target netto stimato (dopo commissioni di acquisto, vendita e slippage) sia inferiore a `+1.8%` o con rapporto Rischio/Rendimento `< 1.6x`.
   - **Rispetto dei Minimi d'Ordine Exchange**: Concentra il capitale in massimo 2 posizioni ad alta convinzione (`11€ – 18€` ciascuna, scalando automaticamente a 3–4 posizioni quando il capitale supera `75€` e `150€`) mantenendo sempre una riserva cash in EUR.
   - **Protezione Drawdown Automatica**: Se lo scostamento dal picco supera il 12%, dimezza l'esposizione e alza la soglia minima di confidenza.

3. **Autofinanziamento del 10% con High-Water Mark & Auto-Miglioramento (`src/vault.py` & `src/optimizer.py`)**
   - **Principio Equo High-Water Mark**: Il bot trattiene il **10%** *esclusivamente* sui nuovi profitti netti effettivi (al netto di tutte le commissioni) che superano il massimo profitto storico raggiunto. Non trattiene **mai** nulla sul semplice recupero di una perdita precedente!
   - Il **90% degli utili** resta nel capitale operativo dell'utente generando **interesse composto** automatico.
   - Il **10% accantonato nel `Fondo Bot` (`bot_vault_eur`)** è isolato dal rischio e sblocca progressivamente livelli superiori di calcolo Walk-Forward:
     - **Tier 1 — Seed Explorer (`0.00€+`)**: Scansione top 4 asset EUR + 12 combinazioni Walk-Forward per strategia.
     - **Tier 2 — Adaptive Quant (`1.50€+` nel Fondo Bot)**: Espansione a 6 asset EUR + 27 combinazioni evolutive Out-of-Sample.
     - **Tier 3 — Autonomous Alpha (`5.00€+` nel Fondo Bot)**: 48 mutazioni parametriche profonde e apprendimento rinforzato dallo storico reale.

---

## Collegamento a GitHub in 3 Minuti (100% Cloud Gratuito)

### Passo 1 — Carica il progetto su GitHub
- **Metodo guidato da Windows**: Esegui in PowerShell nella cartella del progetto:
  ```powershell
  .\setup_github.ps1
  ```
- **Oppure via Browser (senza installare nulla sul PC)**:
  1. Crea un nuovo repository su [github.com/new](https://github.com/new) (es. `aetherquant-40`).
  2. Carica tutti i file e le cartelle di questo progetto (assicurandoti di includere la cartella `.github/workflows/trading_bot.yml`).

### Passo 2 — Abilita i permessi GitHub Actions e avvia la Modalità Simulazione (Paper)
1. Nel tuo repository GitHub vai su **Settings → Actions → General**.
2. Scorri fino a **Workflow permissions** e seleziona **Read and write permissions**, poi clicca **Save**.
3. Vai nella scheda **Actions** in alto, seleziona **AetherQuant-40 Autonomous Bot**, clicca **Enable workflow** (se richiesto) e premi **Run workflow** per eseguire subito il primo ciclo! Da quel momento girerà **in automatico ogni ora** nel cloud di GitHub.

### Passo 3 — Attiva la Dashboard Grafica Live su GitHub Pages
1. Vai su **Settings → Pages**.
2. Sotto **Build and deployment → Source**, scegli **Deploy from a branch**.
3. Seleziona il branch `main` e la cartella **`/docs`**, poi clicca **Save**.
4. Dopo 60 secondi avrai la tua dashboard web aggiornata ogni ora all'indirizzo `https://<tuo-username>.github.io/<nome-repo>/`!
   *(Puoi anche aprirla subito in locale sul tuo PC facendo doppio clic su `docs/index.html`)*.

---

## Passaggio al Trading Reale (Live con 40 €)

Per sicurezza il bot parte in **`paper` mode** (opera in simulazione usando candele e prezzi reali di mercato + commissioni reali). Quando hai verificato il funzionamento sulla dashboard e vuoi collegare un exchange reale (consigliato **Kraken** perché supporta nativamente tutte le coppie `/EUR` con commissioni basse e non subisce blocchi IP dai server cloud di GitHub):

1. Crea una chiave API sul tuo exchange con **soli permessi di Lettura Saldo e Trading Spot** (**NON abilitare mai il permesso di Prelievo / Withdraw** per la tua massima sicurezza!).
2. Deposita i tuoi **40,00 €** sul saldo Spot EUR dell'exchange.
3. Nel tuo repository GitHub vai su **Settings → Secrets and variables → Actions**:
   - Nella scheda **Secrets** aggiungi:
     - `EXCHANGE_ID` = `kraken` *(oppure `coinbase`, `kucoin`, `bitget`)*
     - `EXCHANGE_API_KEY` = *la tua API Key*
     - `EXCHANGE_API_SECRET` = *il tuo API Secret*
   - Nella scheda **Variables** aggiungi la variabile:
     - `TRADING_MODE` = `live`

*(Nota: se usi il passaggio a Live su un repository GitHub **privato**, hai 2.000 minuti gratuiti al mese inclusi su GitHub, ampiamente sufficienti per l'esecuzione oraria che consuma circa 400 minuti/mese).*

---

## Avvertenza sui Rischi Finanziari

Nessun software o algoritmo quantitativo può garantire matematicamente rendimenti sempre positivi sui mercati finanziari reali, che sono soggetti a volatilità imprevista, gap di liquidità e rischio di perdita del capitale. Questo bot implementa filtri rigorosi di aspettativa matematica positiva Walk-Forward, stop-loss adattivi, trailing stop e protezione in liquidità EUR nei mercati ribassisti per massimizzare la probabilità statistica a favore dell'utente, ma opera esclusivamente a tuo rischio: testa sempre in modalità `paper` prima di attivare `live` e investi solo somme che puoi permetterti di rischiare.
