using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using System.Text;

public static class FindCards {
  public static string Run(string path) {
    Bitmap src = new Bitmap(path);
    int w = src.Width, h = src.Height;
    BitmapData data = src.LockBits(new Rectangle(0,0,w,h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
    int stride = data.Stride;
    byte[] px = new byte[stride * h];
    Marshal.Copy(data.Scan0, px, 0, px.Length);
    src.UnlockBits(data);

    StringBuilder sb = new StringBuilder();
    sb.AppendLine("size " + w + "x" + h);

    int y;
    for (y = 0; y < h; y += 8) {
      int x = 0;
      while (x < w) {
        while (x < w) {
          int i = y * stride + x * 4;
          bool white = px[i+2] >= 245 && px[i+1] >= 245 && px[i] >= 245;
          if (white) break;
          x++;
        }
        int x0 = x;
        while (x < w) {
          int i = y * stride + x * 4;
          bool white = px[i+2] >= 245 && px[i+1] >= 245 && px[i] >= 245;
          if (!white) break;
          x++;
        }
        int run = x - x0;
        if (run > 80) {
          sb.AppendLine("y=" + y + " white " + x0 + "-" + x + " w=" + run);
        }
      }
    }
    src.Dispose();
    return sb.ToString();
  }
}
