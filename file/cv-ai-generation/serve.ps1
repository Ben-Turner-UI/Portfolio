# Static server for the public-site CV preview and PDF export.
# http://127.0.0.1:8765/file/cv-ai-generation/
# Port 8765 matches the portfolio site convention.

$ErrorActionPreference = 'Stop'
$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
if (-not (Test-Path (Join-Path $root 'index.html'))) {
  $root = Split-Path $PSScriptRoot -Parent
  $root = Split-Path $root -Parent
}
# Serve Portfolio repo root so /file/cv-ai-generation/ resolves.
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$port = 8765
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$port/")
try {
  $listener.Start()
} catch {
  Write-Host "START_FAIL: $_"
  Write-Host 'Port 8765 is probably already in use. If the CV preview loads, you can ignore this.'
  exit 1
}
Write-Host "Serving $root on http://127.0.0.1:$port/"
Write-Host "CV: http://127.0.0.1:$port/file/cv-ai-generation/index.html"
$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'text/javascript; charset=utf-8'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.svg'  = 'image/svg+xml'
  '.ico'  = 'image/x-icon'
  '.pdf'  = 'application/pdf'
  '.woff2'= 'font/woff2'
  '.ttf'  = 'font/ttf'
  '.txt'  = 'text/plain'
  '.md'   = 'text/plain; charset=utf-8'
}
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($ctx.Request.Url.LocalPath)
  if ($path -eq '/') { $path = '/index.html' }
  $rel = $path.TrimStart('/').Replace('/', '\')
  if ($rel.Contains('..')) {
    $ctx.Response.StatusCode = 400
    $ctx.Response.Close()
    continue
  }
  $file = Join-Path $root $rel
  if ((Test-Path $file -PathType Container)) {
    $file = Join-Path $file 'index.html'
  }
  if (Test-Path $file -PathType Leaf) {
    $ext = [IO.Path]::GetExtension($file).ToLowerInvariant()
    $type = $mime[$ext]
    if (-not $type) { $type = 'application/octet-stream' }
    $bytes = [IO.File]::ReadAllBytes($file)
    $ctx.Response.ContentType = $type
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
  }
  $ctx.Response.Close()
}
