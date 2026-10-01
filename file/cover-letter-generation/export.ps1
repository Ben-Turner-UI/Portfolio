# Chrome headless print of the A4 cover letter → ../Ben-Turner-Cover-Letter.pdf
# Requires: file/cv-ai-generation/serve.ps1 (http://127.0.0.1:8765/)

param(
  [string]$Url = 'http://127.0.0.1:8765/file/cover-letter-generation/index.html?print=1',
  [string]$Out
)

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
$repo = Split-Path $here -Parent | Split-Path -Parent
$isMaster = -not $Out
if ($isMaster) {
  $pdfOut = Join-Path $repo 'file\Ben-Turner-Cover-Letter.pdf'
} else {
  if (-not [IO.Path]::IsPathRooted($Out)) { $Out = Join-Path $repo $Out }
  $pdfOut = $Out
}
$pdfTmp = Join-Path $env:TEMP 'Ben-Turner-Cover-Letter-export.pdf'
$url = $Url
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

if (-not (Test-Path $chrome)) {
  throw "Chrome not found at $chrome"
}

try {
  $null = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5
} catch {
  throw "Local server is not serving $url - start file/cv-ai-generation/serve.ps1 first."
}

$profile = Join-Path $env:TEMP 'cover-letter-print-export'
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
  Write-Warning 'PDF has /Pattern or /Shading - use img/cv-wash.jpg only.'
}
