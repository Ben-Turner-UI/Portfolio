# Chrome headless print of the A4 CV → ../Ben-Turner-CV.pdf
# Requires the local server: .\serve.ps1 (http://127.0.0.1:8765/)
# Optional: -Url and -Out for a different HTML/PDF. Never overwrite original.pdf.

param(
  [string]$Url = 'http://127.0.0.1:8765/file/cv-ai-generation/index.html?print=1',
  [string]$Out
)

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
$repo = Split-Path $here -Parent | Split-Path -Parent
$isMaster = -not $Out
if ($isMaster) {
  $pdfOut = Join-Path $repo 'file\Ben-Turner-CV.pdf'
} else {
  if (-not [IO.Path]::IsPathRooted($Out)) { $Out = Join-Path $repo $Out }
  $pdfOut = $Out
}
if ([IO.Path]::GetFileName($pdfOut) -eq 'original.pdf') {
  throw 'Refusing to overwrite original.pdf'
}
$pdfTmp = Join-Path $env:TEMP 'Ben-Turner-CV-export.pdf'
$url = $Url
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

if (-not (Test-Path $chrome)) {
  throw "Chrome not found at $chrome"
}

try {
  $null = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5
} catch {
  throw "Local server is not serving $url - start .\serve.ps1 first."
}

$profile = Join-Path $env:TEMP 'cv-print-export'
if (Test-Path $profile) { Remove-Item $profile -Recurse -Force }
New-Item -ItemType Directory -Force -Path $profile | Out-Null

$chromeArgs = @(
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--virtual-time-budget=20000',
  "--user-data-dir=$profile",
  "--print-to-pdf=$pdfTmp",
  $url
)
Start-Process $chrome -ArgumentList $chromeArgs -Wait | Out-Null
Start-Sleep -Seconds 1
New-Item -ItemType Directory -Force -Path (Split-Path $pdfOut) | Out-Null
Copy-Item $pdfTmp $pdfOut -Force

$bytes = [IO.File]::ReadAllBytes($pdfOut)
$ascii = [Text.Encoding]::ASCII.GetString($bytes)
$pattern = ([regex]::Matches($ascii, '/Pattern')).Count
$shading = ([regex]::Matches($ascii, '/Shading')).Count
$toUnicode = ([regex]::Matches($ascii, '/ToUnicode')).Count
$kb = [Math]::Round((Get-Item $pdfOut).Length / 1kb)
Write-Host ("wrote {0} ({1} KB) Pattern={2} Shading={3} ToUnicode={4}" -f $pdfOut, $kb, $pattern, $shading, $toUnicode)
if ($pattern -gt 0 -or $shading -gt 0) {
  Write-Warning 'PDF has /Pattern or /Shading - CSS gradients or grain likely leaked in. Use img/cv-wash.jpg only.'
}
if ($isMaster) {
  Write-Host 'Bump the ?v= query on the homepage CV button in /index.html'
}
Write-Host 'Close cached PDF tabs before judging lag.'
