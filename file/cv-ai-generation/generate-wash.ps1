# Generates img/cv-wash.jpg — peach wash + orange dots for the A4 CV.
# Edit the param defaults below (they are the live design). Then:
#   .\generate-wash.ps1
#   .\export.ps1
#
# Do not replace this bitmap with CSS linear-gradient or radial-gradient grain.
# Chrome print turns those into /Shading and /Pattern and the PDF lags.

param(
  [double]$WashHeight = 0.5,
  [double]$WashOpacity = 0.22,
  [double]$DotOpacity = 0.15,
  [double]$CellCss = 4.0,
  [double]$RadiusCss = 1.15,
  [int]$JpegQuality = 92,
  [int]$Dpi = 150
)

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
$out = Join-Path $here 'img\cv-wash.jpg'
$tmp = Join-Path $here 'img\cv-wash.next.jpg'

# A4 at $Dpi. Image is only the wash band (bottom $WashHeight of the sheet).
$w = [int][Math]::Round(210.0 / 25.4 * $Dpi)
$fullH = [int][Math]::Round(297.0 / 25.4 * $Dpi)
$h = [int][Math]::Round($fullH * $WashHeight)
$scale = 2
$cssWidth = 794.0

$code = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class CvWashGenerator {
  public static void Render(
    string jpgPath,
    int w, int h, int scale,
    double cssWidth,
    double washOpacity, double dotOpacity,
    double cellCss, double radiusCss,
    long jpegQuality
  ) {
    int sw = w * scale;
    int sh = h * scale;
    var src = new Bitmap(sw, sh, PixelFormat.Format24bppRgb);
    var data = src.LockBits(new Rectangle(0, 0, sw, sh), ImageLockMode.WriteOnly, PixelFormat.Format24bppRgb);
    var bytes = new byte[Math.Abs(data.Stride) * sh];
    int stride = data.Stride;
    var rng = new Random(11);

    double css = sw / cssWidth;
    double cell = cellCss * css;
    double radius = radiusCss * css;

    for (int y = 0; y < sh; y++) {
      double gy = y / (double)(sh - 1);
      double wash = washOpacity * gy;
      double mask = gy;

      double br = 255 * (1.0 - wash) + 255 * wash;
      double bg = 255 * (1.0 - wash) + 74 * wash;
      double bb = 255 * (1.0 - wash) + 0 * wash;

      double rowC = ((y + 0.5) / cell);
      double cy = (rowC - Math.Floor(rowC) - 0.5) * cell;
      int row = y * stride;

      for (int x = 0; x < sw; x++) {
        double dither = (rng.NextDouble() + rng.NextDouble() - 1.0) * 1.8;
        double colC = ((x + 0.5) / cell);
        double cx = (colC - Math.Floor(colC) - 0.5) * cell;
        double dist = Math.Sqrt(cx * cx + cy * cy);
        double cov = 0;
        double edge = 0.85;
        if (dist <= radius) cov = 1;
        else if (dist < radius + edge) {
          double u = (dist - radius) / edge;
          cov = 1.0 - u * u * (3 - 2 * u);
        }
        double a = dotOpacity * mask * cov;

        double r = br * (1.0 - a) + 255 * a + dither;
        double g = bg * (1.0 - a) + 74 * a + dither;
        double b = bb * (1.0 - a) + 0 * a + dither;

        int i = row + x * 3;
        bytes[i] = (byte)Math.Max(0, Math.Min(255, b + 0.5));
        bytes[i + 1] = (byte)Math.Max(0, Math.Min(255, g + 0.5));
        bytes[i + 2] = (byte)Math.Max(0, Math.Min(255, r + 0.5));
      }
    }

    Marshal.Copy(bytes, 0, data.Scan0, bytes.Length);
    src.UnlockBits(data);

    var dest = new Bitmap(w, h, PixelFormat.Format24bppRgb);
    using (var g = Graphics.FromImage(dest)) {
      g.InterpolationMode = InterpolationMode.HighQualityBicubic;
      g.PixelOffsetMode = PixelOffsetMode.HighQuality;
      g.SmoothingMode = SmoothingMode.HighQuality;
      g.CompositingQuality = CompositingQuality.HighQuality;
      g.DrawImage(src, 0, 0, w, h);
    }
    src.Dispose();

    var codec = Array.Find(ImageCodecInfo.GetImageEncoders(), c => c.FormatID == ImageFormat.Jpeg.Guid);
    var ep = new EncoderParameters(1);
    ep.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, jpegQuality);
    dest.Save(jpgPath, codec, ep);
    dest.Dispose();
  }
}
"@

if (-not ('CvWashGenerator' -as [type])) {
  Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing
}

Write-Host ("wash {0}x{1} ({2:P0} of A4) dots={3} peach={4} q={5}" -f $w, $h, $WashHeight, $DotOpacity, $WashOpacity, $JpegQuality)
[CvWashGenerator]::Render($tmp, $w, $h, $scale, $cssWidth, $WashOpacity, $DotOpacity, $CellCss, $RadiusCss, [int64]$JpegQuality)
Copy-Item $tmp $out -Force
Remove-Item $tmp -Force
$item = Get-Item $out
Write-Host ("wrote {0} ({1:N0} KB)" -f $item.FullName, ($item.Length / 1kb))
Write-Host 'CSS: background-size 100% 50%; background-position center bottom; no sheet border.'
Write-Host 'Next: .\export.ps1'
