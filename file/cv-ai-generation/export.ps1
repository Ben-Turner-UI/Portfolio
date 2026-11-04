# Build a plain 2-page CV PDF from markdown (Source Sans, no wash/logos).
# Default: root cv.md -> file/Ben-Turner-CV.pdf
# Pack:    .\export.ps1 -Md "packs\Acme - Product Designer\cv.md" -Out "packs\Acme - Product Designer\Ben-Turner-CV.pdf"

param(
  [string]$Md,
  [string]$Out
)

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
$fileDir = Split-Path $here -Parent

if (-not $Md) { $Md = Join-Path $here 'cv.md' }
elseif (-not [IO.Path]::IsPathRooted($Md)) { $Md = Join-Path $here $Md }
if (-not (Test-Path $Md)) { throw "Markdown not found: $Md" }

$mdDir = Split-Path $Md -Parent
$html = Join-Path $mdDir 'cv.html'

if (-not $Out) {
  if ($mdDir -eq $here) {
    $pdfOut = Join-Path $fileDir 'Ben-Turner-CV.pdf'
  } else {
    $pdfOut = Join-Path $mdDir 'Ben-Turner-CV.pdf'
  }
} else {
  if (-not [IO.Path]::IsPathRooted($Out)) { $Out = Join-Path $here $Out }
  $pdfOut = $Out
}
if ([IO.Path]::GetFileName($pdfOut) -eq 'original.pdf') {
  throw 'Refusing to overwrite original.pdf'
}

$pythonCmd = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonCmd) { throw 'python not found on PATH' }
$python = $pythonCmd.Source

& $python (Join-Path $here 'md_to_html.py') $Md $html
if ($LASTEXITCODE -ne 0) { throw 'md_to_html.py failed' }

$pdfTmp = Join-Path $env:TEMP 'Ben-Turner-CV-export.pdf'
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
if (-not (Test-Path $chrome)) { throw "Chrome not found at $chrome" }

$profile = Join-Path $env:TEMP 'cv-md-print-export'
if (Test-Path $profile) { Remove-Item $profile -Recurse -Force }
New-Item -ItemType Directory -Force -Path $profile | Out-Null

$uri = ([Uri](Resolve-Path $html).Path).AbsoluteUri
$chromeArgs = @(
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--virtual-time-budget=20000',
  "--user-data-dir=$profile",
  "--print-to-pdf=$pdfTmp",
  $uri
)
Start-Process $chrome -ArgumentList $chromeArgs -Wait | Out-Null
Start-Sleep -Seconds 1
if (-not (Test-Path $pdfTmp)) { throw "Chrome did not write $pdfTmp" }

$gs = @(
  'C:\Program Files\gs\gs10.04.0\bin\gswin64c.exe',
  'C:\Program Files\gs\gs10.03.1\bin\gswin64c.exe',
  'C:\Program Files\gs\gs10.02.1\bin\gswin64c.exe'
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $gs) {
  $gsCmd = Get-Command gswin64c -ErrorAction SilentlyContinue
  if ($gsCmd) { $gs = $gsCmd.Source }
}

$pdfCompressed = Join-Path $env:TEMP 'Ben-Turner-CV-compressed.pdf'
if ($gs) {
  & $gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook `
    -dNOPAUSE -dQUIET -dBATCH "-sOutputFile=$pdfCompressed" $pdfTmp
  if ((Test-Path $pdfCompressed) -and ((Get-Item $pdfCompressed).Length -gt 0)) {
    $pdfTmp = $pdfCompressed
  }
} else {
  $compressPy = Join-Path $here 'compress_pdf.py'
  if (Test-Path $compressPy) {
    & $python $compressPy $pdfTmp $pdfCompressed
    if ((Test-Path $pdfCompressed) -and ((Get-Item $pdfCompressed).Length -gt 0)) {
      $pdfTmp = $pdfCompressed
    }
  }
}

New-Item -ItemType Directory -Force -Path (Split-Path $pdfOut) | Out-Null
Copy-Item $pdfTmp $pdfOut -Force

$bytes = [IO.File]::ReadAllBytes($pdfOut)
$ascii = [Text.Encoding]::ASCII.GetString($bytes)
$pattern = ([regex]::Matches($ascii, '/Pattern')).Count
$shading = ([regex]::Matches($ascii, '/Shading')).Count
$toUnicode = ([regex]::Matches($ascii, '/ToUnicode')).Count
$kb = [Math]::Round((Get-Item $pdfOut).Length / 1kb, 1)
Write-Host ("wrote {0} ({1} KB) Pattern={2} Shading={3} ToUnicode={4}" -f $pdfOut, $kb, $pattern, $shading, $toUnicode)
