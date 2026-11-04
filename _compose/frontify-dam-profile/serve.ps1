# Serves _compose so fonts and images resolve for print export.
# http://127.0.0.1:8771/frontify-dam-profile/

$ErrorActionPreference = 'Stop'
$port = 8771
$root = Split-Path $PSScriptRoot -Parent

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$port/")
$listener.Start()
Write-Host "Serving $root at http://127.0.0.1:$port/  (Ctrl+C to stop)"

$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'application/javascript'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.png'  = 'image/png'
  '.svg'  = 'image/svg+xml'
  '.ttf'  = 'font/ttf'
  '.woff' = 'font/woff'
  '.woff2'= 'font/woff2'
  '.pdf'  = 'application/pdf'
  '.md'   = 'text/markdown; charset=utf-8'
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $res = $ctx.Response
  try {
    $rel = [Uri]::UnescapeDataString($req.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($rel)) { $rel = 'frontify-dam-profile/index.html' }
    $path = Join-Path $root ($rel -replace '/', [IO.Path]::DirectorySeparatorChar)
    if ((Test-Path $path -PathType Container)) {
      $path = Join-Path $path 'index.html'
    }
    if (-not (Test-Path $path -PathType Leaf)) {
      $res.StatusCode = 404
      $buf = [Text.Encoding]::UTF8.GetBytes('404')
      $res.OutputStream.Write($buf, 0, $buf.Length)
    } else {
      $ext = [IO.Path]::GetExtension($path).ToLowerInvariant()
      $res.ContentType = $(if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' })
      $bytes = [IO.File]::ReadAllBytes($path)
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    }
  } catch {
    $res.StatusCode = 500
  } finally {
    $res.OutputStream.Close()
  }
}
