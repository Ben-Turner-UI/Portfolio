"""Preview the homepage dot portrait. Settings match js/home-portrait.js."""
from PIL import Image, ImageDraw

SRC = r"img/portrait-cutout.png"
OUT = r"img/portrait-dots.png"

COLUMNS = 72
CONTRAST = 1.35
BRIGHTNESS = 0.14
MAX_RADIUS = 0.4
MIN_ALPHA = 40
# Fractions of the cutout. Tight on hair, face and upper shoulders.
CROP = (0.02, 0.0, 0.96, 0.92)
COLOR = (250, 249, 245, 255)
OUT_W = 560  # 2x the 280px display width


def main():
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    x0 = int(w * CROP[0])
    y0 = int(h * CROP[1])
    x1 = int(w * CROP[2])
    y1 = int(h * CROP[3])
    crop = im.crop((x0, y0, x1, y1))
    cw, ch = crop.size
    cols = COLUMNS
    rows = max(1, round(cols * ch / cw))
    sample = crop.resize((cols, rows), Image.Resampling.BOX)
    px = sample.load()
    out_h = round(OUT_W * rows / cols)
    cell = OUT_W / cols
    out = Image.new("RGBA", (OUT_W, out_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(out)
    for row in range(rows):
        for col in range(cols):
            r, g, b, a = px[col, row]
            if a < MIN_ALPHA:
                continue
            lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
            v = (lum - 0.5) * CONTRAST + 0.5 + BRIGHTNESS
            v = 0 if v < 0 else 1 if v > 1 else v
            radius = v * cell * MAX_RADIUS
            if radius < 0.45:
                continue
            cx = (col + 0.5) * cell
            cy = (row + 0.5) * cell
            draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=COLOR)
    out.save(OUT)
    plate = Image.new("RGBA", out.size, (20, 20, 19, 255))
    plate.alpha_composite(out)
    plate.convert("RGB").save(r"file/_portrait_preview.png")
    print(out.size, "cols", cols, "rows", rows)


if __name__ == "__main__":
    main()
