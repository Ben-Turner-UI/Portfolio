# Chrome headless print of the Frontify DAM profile (2 x A4).
# Requires: .\serve.ps1 on port 8771.

param(
  [string]$Url = 'http://127.0.0.1:8771/frontify-dam-profile/index.html',
  [string]$Out
)

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
if (-not $Out) {
  $Out = Join-Path $here 'Ben-Turner-Frontify-DAM-Profile.pdf'
} elseif (-not [IO.Path]::IsPathRooted($Out)) {
  $Out = Join-Path $here $Out
}

$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
if (-not (Test-Path $chrome)) { throw "Chrome not found at $chrome" }

try {
  $null = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
} catch {
  throw "Local server is not serving $Url - start .\serve.ps1 first."
}

$pdfTmp = Join-Path $env:TEMP 'Ben-Turner-Frontify-DAM-Profile-export.pdf'
$profile = Join-Path $env:TEMP 'frontify-dam-profile-print'
if (Test-Path $profile) { Remove-Item $profile -Recurse -Force }
New-Item -ItemType Directory -Force -Path $profile | Out-Null

$chromeArgs = @(
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--virtual-time-budget=25000',
  "--user-data-dir=$profile",
  "--print-to-pdf=$pdfTmp",
  $Url
)
Start-Process $chrome -ArgumentList $chromeArgs -Wait | Out-Null
Start-Sleep -Seconds 1
Copy-Item $pdfTmp $Out -Force

$bytes = [IO.File]::ReadAllBytes($Out)
$ascii = [Text.Encoding]::ASCII.GetString($bytes)
$toUnicode = ([regex]::Matches($ascii, '/ToUnicode')).Count
$noto = ([regex]::Matches($ascii, 'NotoSans|Noto Sans')).Count
$kb = [Math]::Round((Get-Item $Out).Length / 1kb)
Write-Host ("wrote {0} ({1} KB) ToUnicode={2} NotoHits={3}" -f $Out, $kb, $toUnicode, $noto)
