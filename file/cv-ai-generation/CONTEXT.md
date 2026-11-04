# CV

Markdown-first public CV. Edit `cv.md`, then run `export.ps1` to build `file/Ben-Turner-CV.pdf`.

Plain Source Sans (same as site body copy), no wash, logos, or case-study chrome. Target: two A4 pages, small PDF.

## Files

| Path | Role |
| --- | --- |
| `cv.md` | Public master. Edit this for the site CV. |
| `md_to_html.py` | Turns markdown into HTML |
| `cv.html` | Generated preview next to its `.md` (do not hand-edit) |
| `export.ps1` | MD → HTML → Chrome PDF |
| `compress_pdf.py` | Optional pypdf rewrite if Ghostscript is missing |
| `fonts/source-sans-3-*.ttf` | Embedded body font |
| `packs/{Company} - {Role}/` | Per-company application packs (see below) |

## How to run (public CV)

From this folder:

```powershell
.\export.ps1
```

That overwrites `file/Ben-Turner-CV.pdf`. After a content change, bump `?v=` on the homepage / about CV download links.

Preview: open the generated `cv.html` in a browser.

## Company packs

When Ben asks to build a CV for a company (or company + role):

1. Create a folder under `packs/` named `{Company} - {Role}` (human-readable; include the role).
2. Put a tailored `cv.md` in that folder (start from the public master; reweight only — same jobs, dates, title, and numbers; no invented facts).
3. Export a PDF into the same folder:

```powershell
.\export.ps1 -Md "packs\Acme - Product Designer\cv.md"
```

That writes `packs\Acme - Product Designer\Ben-Turner-CV.pdf` (and a generated `cv.html` beside the markdown).

Each pack folder must contain at least:

- `cv.md` — the tailored copy Ben edits or sends
- `Ben-Turner-CV.pdf` — the export he attaches or uploads

Optional in the pack: `jd.md` / `jd.pdf`, notes. Do not change the public `cv.md` or `file/Ben-Turner-CV.pdf` for one employer.

## Rules

- Job title stays **Product Designer** (agency line may say UX Designer if that is in the markdown).
- Do not invent facts. New public claims also go in Applications `_master/claims.md`.
- Do not hand-edit PDFs or generated `cv.html`.
