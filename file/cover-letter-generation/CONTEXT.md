# Cover letter

HTML source for Ben Turner’s A4 cover letter. Same sheet treatment as the CV (fonts, peach wash, header). **Text only** in the body: no logos, bullets, or case tags.

## Files

| Path | Role |
| --- | --- |
| `index.html` | Letter source. Edit meta lines and paragraphs per application. |
| `export.ps1` | Chrome headless print → `../Ben-Turner-Cover-Letter.pdf`. |
| `../cv-ai-generation/fonts/` | Shared font files (relative URLs from this HTML). |
| `../cv-ai-generation/img/cv-wash.jpg` | Shared bottom wash (same as CV). |

Job-specific letters can also live under `My Drive\Career\Applications\CVs\{Company} - {Role}\` with `export.ps1 -Out` pointing at that pack’s PDF.

## How to run

1. Start `file/cv-ai-generation/serve.ps1` (port **8765**) if nothing is serving the repo.
2. Preview: `http://127.0.0.1:8765/file/cover-letter-generation/index.html`
3. Edit `index.html` (date, company, role, body copy).
4. `.\export.ps1` from this folder.
5. Optional: `.\export.ps1 -Out "CVs\Company - Role\Ben-Turner-Cover-Letter.pdf"` for a pack.

Print/export URL adds `?print=1`. Do not use CSS gradients on the sheet; reuse the CV JPEG wash only.

## Design

- One A4 sheet, `210mm × 297mm`, `overflow: hidden`.
- Header matches CV: Ben Turner + 2×2 contact grid (links for ATS).
- Body: **14px**, line-height **1.48**, paragraph spacing **14px**. No date/recipient block unless added for a specific application.
- No em-dashes in copy. Warm, direct tone (see apply-role skill for email/letter voice).

## After changes

Re-export and confirm `scrollHeight` ≤ `clientHeight` on `.letter-sheet`. Healthy PDF: real text, `/Pattern` 0, `/Shading` 0.
