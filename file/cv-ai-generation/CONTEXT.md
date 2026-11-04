# CV

Public-site A4 generator at `file/cv-ai-generation`. Two pages. Source for `file/Ben-Turner-CV.pdf`.

`original.pdf` is a visual reference only. **Do not overwrite `original.pdf`.**

Preview: `http://127.0.0.1:8765/file/cv-ai-generation/index.html`  
Print/export: add `?print=1`.

## Files

| Path | Role |
| --- | --- |
| `CONTEXT.md` | This brief |
| `index.html` | Designed A4 CV (2 pages) |
| `generate-wash.ps1` | Builds `img/cv-wash.jpg` |
| `export.ps1` | Chrome headless print → `../Ben-Turner-CV.pdf` |
| `serve.ps1` | Portfolio root on port **8765** |
| `img/` | Logos + wash |
| `fonts/` | Source Sans 3 local files |

## How to run

1. `.\serve.ps1` if nothing is on 8765.
2. Edit `index.html`.
3. Wash changes: `.\generate-wash.ps1` then `.\export.ps1`.
4. Copy-only: `.\export.ps1`.
5. Bump `?v=` on homepage / about CV links after export.

Do not use CSS gradients for the peach wash. Use `img/cv-wash.jpg` only (Chrome print turns CSS gradients into slow `/Shading` / `/Pattern`).

## Design rules

- Two A4 pages: `.cv` is `210mm × 297mm`, `overflow: hidden`, no sheet border.
- Body Source Sans 3, `font-variant-ligatures: none`.
- Orange period on the name is `#ff4d00`.
- Job title stays **Product Designer** (agency line may say UX Designer as in the design). Do not claim Senior.
- Do not overwrite `original.pdf`.
