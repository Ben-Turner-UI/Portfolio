param($file)
$t = Get-Content $file -Raw
$b = [regex]::Match($t, '(?s)<main>.*</main>').Value
$s = [regex]::Replace($b, '<[^>]+>', ' ')
($s -split '\s+' | Where-Object { $_ }).Count
