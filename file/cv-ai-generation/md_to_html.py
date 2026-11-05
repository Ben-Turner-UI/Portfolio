"""Convert cv.md into a plain printable HTML body (stdlib only)."""
from __future__ import annotations

import html
import os
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
    after_role = False
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        if line.strip() == "---":
            out.append("<hr>")
            after_role = False
            i += 1
            continue
        if line.startswith("# "):
            out.append(f"<h1>{inline(line[2:].strip())}</h1>")
            after_role = False
            i += 1
            continue
        if line.startswith("## "):
            out.append(f"<h2>{inline(line[3:].strip())}</h2>")
            after_role = False
            i += 1
            continue
        if line.startswith("### "):
            out.append(f"<h3>{inline(line[4:].strip())}</h3>")
            after_role = True
            i += 1
            continue
        if line.startswith("- "):
            items: list[str] = []
            while i < len(lines) and lines[i].startswith("- "):
                items.append(f"<li>{inline(lines[i][2:].strip())}</li>")
                i += 1
            out.append("<ul>\n" + "\n".join(items) + "\n</ul>")
            after_role = False
            continue
        chunk: list[str] = []
        while i < len(lines) and lines[i].strip():
            if lines[i].startswith(("# ", "## ", "### ", "- ")) or lines[i].strip() == "---":
                break
            chunk.append(lines[i])
            i += 1
        bits: list[str] = [inline(raw.rstrip()) for raw in chunk]
        first_raw = chunk[0].rstrip()
        # Under a role heading, **date** then blurb become meta + body
        if (
            after_role
            and len(chunk) > 1
            and re.fullmatch(r"\*\*[^*]+\*\*", first_raw)
        ):
            out.append(f'<p class="meta">{bits[0]}</p>')
            out.append("<p>" + "<br>\n".join(bits[1:]) + "</p>")
        elif len(chunk) > 1:
            out.append("<p>" + "<br>\n".join(bits) + "</p>")
        else:
            out.append("<p>" + bits[0] + "</p>")
        after_role = False
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
      src: url("{fonts}/source-sans-3-400.ttf") format("truetype");
    }}
    @font-face {{
      font-family: "Source Sans 3";
      font-style: normal;
      font-weight: 600;
      src: url("{fonts}/source-sans-3-600.ttf") format("truetype");
    }}
    @font-face {{
      font-family: "Source Sans 3";
      font-style: normal;
      font-weight: 700;
      src: url("{fonts}/source-sans-3-700.ttf") format("truetype");
    }}
    /* Fit cascade: section 11pt, para/bullet tighter, lh 1.32, TB 12mm, body 10pt */
    @page {{
      size: A4;
      margin: 12mm 17mm 12mm 17mm;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      background: #fff;
      color: #242424;
      font-family: "Source Sans 3", Arial, Helvetica, sans-serif;
      font-size: 10pt;
      font-weight: 400;
      line-height: 1.32;
      text-align: left;
      letter-spacing: normal;
      hyphens: none;
      -webkit-hyphens: none;
      font-variant-ligatures: none;
      -webkit-font-smoothing: antialiased;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    h1, h2, h3 {{
      color: #171717;
      text-align: left;
      letter-spacing: normal;
      hyphens: none;
      -webkit-hyphens: none;
    }}
    h1 {{
      margin: 0 0 4pt;
      font-size: 26pt;
      font-weight: 600;
      line-height: 1.1;
    }}
    /* Professional title */
    h1 + p {{
      margin: 0 0 6pt;
      font-size: 12pt;
      font-weight: 400;
      line-height: 1.3;
      color: #242424;
    }}
    h1 + p strong {{
      font-weight: 400;
    }}
    /* Contact block */
    h1 + p + p {{
      margin: 0;
      font-size: 10pt;
      font-weight: 400;
      line-height: 1.4;
      color: #242424;
    }}
    h2 {{
      margin: 11pt 0 6pt;
      font-size: 13pt;
      font-weight: 600;
      line-height: 1.25;
      break-after: avoid;
      page-break-after: avoid;
    }}
    h3 {{
      margin: 10pt 0 3pt;
      font-size: 11.5pt;
      font-weight: 600;
      line-height: 1.3;
      break-after: avoid;
      page-break-after: avoid;
    }}
    /* First role under a section sits tighter */
    h2 + h3 {{
      margin-top: 0;
    }}
    /* Dates / metadata under a role */
    p.meta {{
      margin: 0 0 5pt;
      color: #606060;
      font-size: 10pt;
      font-weight: 400;
      line-height: 1.3;
      break-after: avoid;
      page-break-after: avoid;
    }}
    p.meta strong {{
      font-weight: 400;
      color: #606060;
    }}
    h3, h3 + p, h3 + p.meta {{
      break-inside: avoid;
      page-break-inside: avoid;
    }}
    h3 + p {{
      break-after: avoid;
      page-break-after: avoid;
    }}
    p {{
      margin: 0 0 4pt;
      orphans: 2;
      widows: 2;
    }}
    ul {{
      margin: 2pt 0 4pt;
      padding-left: 4.5mm;
      list-style-type: disc;
      list-style-position: outside;
    }}
    li {{
      margin: 2pt 0 0;
      padding-left: 0;
      font-size: 10pt;
      line-height: 1.32;
      orphans: 2;
      widows: 2;
      break-inside: avoid;
      page-break-inside: avoid;
    }}
    li:first-child {{
      margin-top: 0;
    }}
    strong {{
      font-weight: 600;
    }}
    a {{
      color: #305775;
      text-decoration: underline;
      text-underline-offset: 1.5px;
      text-decoration-thickness: 0.6px;
      overflow-wrap: anywhere;
      word-break: break-word;
    }}
    hr {{
      border: 0;
      border-top: 0.5pt solid #DEDEDE;
      margin: 8pt 0;
      height: 0;
    }}
  </style>
</head>
<body>
{body}
</body>
</html>
"""


def fonts_rel(out_path: Path, fonts_dir: Path) -> str:
    rel = Path(os.path.relpath(fonts_dir, start=out_path.parent))
    return rel.as_posix()


def main() -> int:
    here = Path(__file__).resolve().parent
    fonts_dir = here / "fonts"
    md_path = here / "cv.md"
    out_path = here / "cv.html"
    if len(sys.argv) > 1:
        md_path = Path(sys.argv[1]).resolve()
    if len(sys.argv) > 2:
        out_path = Path(sys.argv[2]).resolve()
    body = convert(md_path.read_text(encoding="utf-8"))
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(
        TEMPLATE.format(body=body, fonts=fonts_rel(out_path, fonts_dir)),
        encoding="utf-8",
    )
    print(f"wrote {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
