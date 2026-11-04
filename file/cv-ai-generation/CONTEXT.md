# CV

Markdown-first public CV. Edit `cv.md`, then run `export.ps1` to build `file/Ben-Turner-CV.pdf`.

Plain Source Sans, no wash, logos, or case-study chrome. Target: two A4 pages, small PDF.

## Files

| Path | Role |
| --- | --- |
| `cv.md` | Source of truth. Edit this. |
| `md_to_html.py` | Turns `cv.md` into `cv.html` |
| `cv.html` | Generated preview (do not hand-edit) |
| `export.ps1` | MD → HTML → Chrome PDF → `../Ben-Turner-CV.pdf` |
| `compress_pdf.py` | Optional pypdf rewrite if Ghostscript is missing |
| `fonts/source-sans-3-*.ttf` | Embedded body font |

## How to run

From this folder:

```powershell
.\export.ps1
```

That overwrites `file/Ben-Turner-CV.pdf`. After a content change, bump `?v=` on the homepage / about CV download links.

Preview the HTML in a browser: open `cv.html` after export.

## Rules

- Job title stays **Product Designer** (agency line may say UX Designer if that is in `cv.md`).
- Do not invent facts. New public claims also go in Applications `_master/claims.md`.
- Do not hand-edit `Ben-Turner-CV.pdf` or `cv.html`.
