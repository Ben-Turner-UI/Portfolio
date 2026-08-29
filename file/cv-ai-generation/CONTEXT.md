# CV

The A4 CV is `index.html` in this folder. Edit that file. Preview it locally; the homepage download is a generated PDF, not this HTML.

`original.pdf` is the old visual reference only. **Do not overwrite `original.pdf`.**

## Files

| Path | Role |
| --- | --- |
| `index.html` | The designed A4 CV. Source of truth for layout and copy. |
| `img/perforce.jpg`, `img/budibase.jpg`, `img/dawson-andrews.jpg` | Company logos. |
| `img/cv-wash.jpg` | Peach wash + grain as **one image**. Used as the sheet background on screen and in print. |
| `fonts/` | Local Source Sans 3 (TTF 400/600/700) and Big Shoulders 600 (woff2). Do not switch back to variable Google fonts for the CV. |
| `../Ben-Turner-CV.pdf` | Site download. Homepage button: `file/Ben-Turner-CV.pdf`. |
| `original.pdf` | Reference only. Never overwrite. |

Site live URL for case studies: `https://benturner.work/`. Local preview is usually `http://127.0.0.1:8765/file/cv-ai-generation/index.html`.

## Design rules

- One A4 page: `.cv` is `210mm × 297mm` with `overflow: hidden`. After layout or type changes, measure `scrollHeight` vs `clientHeight`. If it overflows, it clips.
- Body is Source Sans 3 at **12px**, line-height **1.34**. **1.4 overflows A4.** Name is Big Shoulders; orange period `#ff4d00`.
- Contact sits **top right** of the name: site, phone, email, LinkedIn. Outlined SVG icons (not filled). Links are underlined. More gap between icon and label than between clusters.
- Each job: **Product Designer** bold, then a quiet company line with a short what-it-is, dates on the right. Case studies are **pills under the bullets**, circular company-logo thumbs, sentence case, no underline.
- Current pills: Shipping in production, Owning P4 DAM, Automations overhaul, CityFibre rebrand. **No CityFibre portal pill.**
- No em-dashes. Company names in text, not only on logos.
- Job title stays **Product Designer**. Do not claim Senior. “Lead” is a verb or “lead product designer for CityFibre”, not a job title of Lead.

## Copy rules

- Homepage case studies are the public proof for metrics. Do not invent job numbers.
- Dawson Andrews: do **not** claim Ben owned product design for GSMA, GAA, public sector, or large organisations. Those are clients he shipped work for. CityFibre portal and website he designed; do not stack “I owned / I owned / I owned”.
- Ben has authorized some claims that are not on the homepage (Hyperoptic, five hires, agency growth, Perforce new customers, CityFibre ~2,000 people, whole-product ownership at Budibase, AI-enabled features). Do not add more unpublished metrics unless he asks.

## Background and PDF performance

Do **not** use CSS `linear-gradient` or a `radial-gradient` grain on `.cv` for print. Chrome turns those into `/Shading` and `/Pattern` objects. A 75KB PDF then takes seconds to scroll.

The wash and grain live in `img/cv-wash.jpg`. Point `.cv` at that image (`background-size: cover`). Keep `isolation: auto` in print. `?print=1` adds `html.cv-print` for a flat print sheet (no box-shadow).

The download PDF **must stay real text** (ATS). Never replace it with a screenshot or flattened image of the page.

## After you change the CV

1. Check it still fits one A4.
2. Re-export the PDF with Chrome headless print (not `--disable-remote-fonts`) from:

   `http://127.0.0.1:8765/file/cv-ai-generation/index.html?print=1`

3. Overwrite `file/Ben-Turner-CV.pdf` only (not `original.pdf`).
4. Bump the cache-bust query on the homepage CV button in `/index.html` (`?v=...`).
5. A healthy export is roughly 150–200KB, `/Pattern` 0, `/Shading` 0, `/ToUnicode` present. Cursor PDF tabs cache the old file; close them before judging lag.

## Do not

- Overwrite `original.pdf`.
- Rebuild a pile of export/ATS helper scripts unless asked.
- Claim Senior, or ownership Ben cannot back up.
