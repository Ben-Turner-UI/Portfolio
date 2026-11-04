# Build a plain 2-page CV PDF from cv.md (Source Sans, no wash/logos).
# Writes file/Ben-Turner-CV.pdf by default.
# Never overwrite original.pdf if it still exists.

param(
  [string]$Out
)

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
$fileDir = Split-Path $here -Parent
if (-not $Out) {
  $pdfOut = Join-Path $fileDir 'Ben-Turner-CV.pdf'
} else {
  if (-not [IO.Path]::IsPathRooted($Out)) { $Out = Join-Path $fileDir $Out }
  $pdfOut = $Out
}
if ([IO.Path]::GetFileName($pdfOut) -eq 'original.pdf') {
  throw 'Refusing to overwrite original.pdf'
}

$pythonCmd = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonCmd) { throw 'python not found on PATH' }
$python = $pythonCmd.Source

& $python (Join-Path $here 'md_to_html.py') (Join-Path $here 'cv.md') (Join-Path $here 'cv.html')
if ($LASTEXITCODE -ne 0) { throw 'md_to_html.py failed' }

$html = Join-Path $here 'cv.html'
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

# Prefer Ghostscript compression when available; otherwise keep Chrome output.
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
  # Fallback: Python strip/rewrite to drop unused objects when pypdf is present.
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
