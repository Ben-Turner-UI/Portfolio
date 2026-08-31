# Chrome headless print of the A4 CV → ../Ben-Turner-CV.pdf
# Requires the local server: .\serve.ps1 (http://127.0.0.1:8765/)
# Never overwrite original.pdf.

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
$repo = Split-Path $here -Parent | Split-Path -Parent
$pdfOut = Join-Path $repo 'file\Ben-Turner-CV.pdf'
$pdfTmp = Join-Path $env:TEMP 'Ben-Turner-CV-export.pdf'
$url = 'http://127.0.0.1:8765/file/cv-ai-generation/index.html?print=1'
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

if (-not (Test-Path $chrome)) {
  throw "Chrome not found at $chrome"
}

try {
  $null = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5
} catch {
  throw "Local server is not serving $url — start .\serve.ps1 first."
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
Copy-Item $pdfTmp $pdfOut -Force

$bytes = [IO.File]::ReadAllBytes($pdfOut)
$ascii = [Text.Encoding]::ASCII.GetString($bytes)
$pattern = ([regex]::Matches($ascii, '/Pattern')).Count
$shading = ([regex]::Matches($ascii, '/Shading')).Count
$toUnicode = ([regex]::Matches($ascii, '/ToUnicode')).Count
$kb = [Math]::Round((Get-Item $pdfOut).Length / 1kb)
Write-Host ("wrote {0} ({1} KB) Pattern={2} Shading={3} ToUnicode={4}" -f $pdfOut, $kb, $pattern, $shading, $toUnicode)
if ($pattern -gt 0 -or $shading -gt 0) {
  Write-Warning 'PDF has /Pattern or /Shading — CSS gradients or grain likely leaked in. Use img/cv-wash.jpg only.'
}
Write-Host 'Bump the ?v= query on the homepage CV button in /index.html'
Write-Host 'Close cached PDF tabs before judging lag.'
