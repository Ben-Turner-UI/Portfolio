"""Convert cv.md into a plain printable HTML body (stdlib only)."""
from __future__ import annotations

import html
import re
import sys
from pathlib import Path


def inline(text: str) -> str:
    parts: list[str] = []
    i = 0
    link_re = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
    bold_re = re.compile(r"\*\*([^*]+)\*\*")
    while i < len(text):
        link = link_re.match(text, i)
        bold = bold_re.match(text, i)
        if link and (not bold or link.start() <= bold.start()):
            label = html.escape(link.group(1))
            href = html.escape(link.group(2), quote=True)
            parts.append(f'<a href="{href}">{label}</a>')
            i = link.end()
            continue
        if bold:
            parts.append(f"<strong>{html.escape(bold.group(1))}</strong>")
            i = bold.end()
            continue
        next_special = len(text)
        for m in (link_re.search(text, i), bold_re.search(text, i)):
            if m:
                next_special = min(next_special, m.start())
        parts.append(html.escape(text[i:next_special]))
        i = next_special
    return "".join(parts)


def convert(md: str) -> str:
    lines = md.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    out: list[str] = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        if line.startswith("# "):
            out.append(f"<h1>{inline(line[2:].strip())}</h1>")
            i += 1
            continue
        if line.startswith("## "):
            out.append(f"<h2>{inline(line[3:].strip())}</h2>")
            i += 1
            continue
        if line.startswith("### "):
            out.append(f"<h3>{inline(line[4:].strip())}</h3>")
            i += 1
            continue
        if line.startswith("- "):
            items: list[str] = []
            while i < len(lines) and lines[i].startswith("- "):
                items.append(f"<li>{inline(lines[i][2:].strip())}</li>")
                i += 1
            out.append("<ul>\n" + "\n".join(items) + "\n</ul>")
            continue
        # Paragraph: gather until blank line; soft-break on trailing spaces or mid-block newlines
        chunk: list[str] = []
        while i < len(lines) and lines[i].strip():
            if lines[i].startswith(("# ", "## ", "### ", "- ")):
                break
            chunk.append(lines[i])
            i += 1
        bits: list[str] = []
        for raw in chunk:
            soft = raw.endswith("  ")
            text = raw.rstrip()
            if soft or (bits and not text.startswith("**") and bits[-1] and not bits[-1].endswith("</strong>")):
                # Prefer <br> when the source used a hard line break (trailing spaces)
                pass
            bits.append(inline(text.rstrip()))
        # Rebuild with <br> where original lines had trailing double-spaces, else join with space
        # Simpler rule matching the CV markdown: consecutive non-list lines in a block use <br>
        if len(chunk) > 1:
            out.append("<p>" + "<br>\n".join(bits) + "</p>")
        else:
            out.append("<p>" + bits[0] + "</p>")
    return "\n".join(out)


TEMPLATE = """<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex">
  <title>Ben Turner CV</title>
  <style>
    @font-face {{
      font-family: "Source Sans 3";
      font-style: normal;
      font-weight: 400;
      src: url("fonts/source-sans-3-400.ttf") format("truetype");
    }}
    @font-face {{
      font-family: "Source Sans 3";
      font-style: normal;
      font-weight: 600;
      src: url("fonts/source-sans-3-600.ttf") format("truetype");
    }}
    @font-face {{
      font-family: "Source Sans 3";
      font-style: normal;
      font-weight: 700;
      src: url("fonts/source-sans-3-700.ttf") format("truetype");
    }}
    @page {{ size: A4; margin: 14mm 14mm 14mm 14mm; }}
    html, body {{
      margin: 0;
      padding: 0;
      background: #fff;
      color: #111;
      font-family: "Source Sans 3", Arial, Helvetica, sans-serif;
      font-size: 10.5pt;
      line-height: 1.38;
      font-variant-ligatures: none;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    h1 {{
      margin: 0 0 0.1em;
      font-size: 20pt;
      font-weight: 700;
      line-height: 1.1;
    }}
    h2 {{
      margin: 1.1em 0 0.35em;
      font-size: 12pt;
      font-weight: 700;
      border-bottom: 1px solid #bbb;
      padding-bottom: 0.15em;
      page-break-after: avoid;
    }}
    h3 {{
      margin: 0.85em 0 0.15em;
      font-size: 11pt;
      font-weight: 700;
      page-break-after: avoid;
    }}
    p {{ margin: 0.28em 0; }}
    ul {{
      margin: 0.25em 0 0.45em;
      padding-left: 1.15em;
    }}
    li {{ margin: 0.18em 0; }}
    strong {{ font-weight: 700; }}
    a {{ color: #111; text-underline-offset: 2px; }}
  </style>
</head>
<body>
{body}
</body>
</html>
"""


def main() -> int:
    here = Path(__file__).resolve().parent
    md_path = here / "cv.md"
    out_path = here / "cv.html"
    if len(sys.argv) > 1:
        md_path = Path(sys.argv[1])
    if len(sys.argv) > 2:
        out_path = Path(sys.argv[2])
    body = convert(md_path.read_text(encoding="utf-8"))
    out_path.write_text(TEMPLATE.format(body=body), encoding="utf-8")
    print(f"wrote {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
