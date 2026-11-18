# ==============================================================================
# AetherQuant-40 — Script guidato per collegare e pubblicare il Bot su GitHub
# Esegui in PowerShell con: .\setup_github.ps1
# ==============================================================================

$ErrorActionPreference = "Stop"
Write-Host "`n=== AetherQuant-40 | Collegamento Automatico a GitHub ===" -ForegroundColor Cyan

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "`n[!] Git non risulta installato su questo PC." -ForegroundColor Yellow
    $ans = Read-Host "Vuoi installare Git automaticamente tramite winget adesso? (S/N)"
    if ($ans -match "^[SsYy]") {
        winget install --id Git.Git -e --source winget
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    } else {
        Write-Host "Nessun problema! Puoi caricare l'intera cartella direttamente dal sito github.com (New Repository -> Upload files)." -ForegroundColor Green
        exit 0
    }
}

if (-not (Test-Path ".git")) {
    git init -b main
    Write-Host "[OK] Repository Git locale inizializzato sul branch 'main'." -ForegroundColor Green
}

git add .
$status = git status --porcelain
if ($status) {
    git commit -m "feat: initialize AetherQuant-40 autonomous self-improving trading bot"
    Write-Host "[OK] Primo commit creato con successo." -ForegroundColor Green
}

Write-Host "`nCrea un nuovo repository vuoto su https://github.com/new (NON spuntare 'Add a README')." -ForegroundColor Cyan
$repoUrl = Read-Host "Incolla qui l'URL del tuo repository GitHub (es. https://github.com/tuo-utente/aetherquant-40.git)"

if ($repoUrl) {
    $existing = git remote
    if ($existing -contains "origin") {
        git remote set-url origin $repoUrl
    } else {
        git remote add origin $repoUrl
    }
    git push -u origin main
    Write-Host "`n[COMPLETATO] Bot caricato su GitHub! Vai nella scheda 'Actions' del tuo repository per avviarlo!" -ForegroundColor Green
}
