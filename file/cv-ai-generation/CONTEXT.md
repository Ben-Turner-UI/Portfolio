# CV

The A4 CV is `index.html` in this folder. Edit that file. Preview it locally; the homepage download is a generated PDF, not this HTML.

`original.pdf` is the old visual reference only. **Do not overwrite `original.pdf`.**

## Files

| Path | Role |
| --- | --- |
| `index.html` | The designed A4 CV. Source of truth for layout and copy. |
| `img/perforce.jpg`, `img/budibase.jpg`, `img/dawson-andrews.jpg` | Company logos. |
| `img/cv-wash.jpg` | Peach wash + grain as **one image**. Used as the sheet background on screen and in print. |
| `fonts/` | Local Source Sans 3 (TTF 400/600/700), Big Shoulders 600, and Material Symbols Outlined (woff2). Do not switch body type back to variable Google fonts. |
| `../Ben-Turner-CV.pdf` | Site download. Homepage button: `file/Ben-Turner-CV.pdf`. |
| `original.pdf` | Reference only. Never overwrite. |

Site live URL for case studies: `https://benturner.work/`. Local preview is usually `http://127.0.0.1:8765/file/cv-ai-generation/index.html`.

## Design rules

- One A4 page: `.cv` is `210mm × 297mm` with `overflow: hidden`. After layout or type changes, measure `scrollHeight` vs `clientHeight`. If it overflows, it clips.
- Body is Source Sans 3 at **11.5px**, line-height **1.36**. Sheet padding is tight (**5.5mm 6.5mm 6mm**) so Experience jobs can have real air between them. Name is Big Shoulders; orange period `#ff4d00`.
- Contact sits **top right** of the name on **one line**, in the same 28px header row as the name, vertically centered with it: site, phone, email, LinkedIn. Do not wrap LinkedIn onto a second row. Header label is “LinkedIn”; the full URL lives in the experience note. Icons are **Material Symbols Outlined** (`language`, `call`, `mail`, `work`), locally hosted in `fonts/material-symbols-outlined.woff2`. Underline the **label text only**, never the icons. More gap between icon and label than between clusters.
- Section `h2` underline needs air underneath (about 9px). Do not crush heading and body together.
- Each job: **header row** is logo + Product Designer / company / scope / dates. **Bullets and pills sit under that header**, same left edge as Summary. Bullet *markers* indent like Summary (`padding-left` on the `ul`); do not indent the whole list under the title. DOM order is title → dates → company + scope → bullets → pills.
- Job copy: **Product Designer** bold, dates on the right. Title, company, and scope are **#111**. Company logos are **27px** (about 25% smaller than the old 36px squares) so they sit with the two-line title block instead of taller than it. The header block is **vertically centered** with the logo. `img/budibase.jpg` has extra white inset so the mark sits between Perforce/DA weight and the old edge-to-edge file (~60% of the square). Next line is company name **not bold**, with the what-it-is beside it (Perforce + P4 Plan/DAM, Budibase + open-source, Dawson Andrews + product design agency). Tight gap under the title. No `Company · products` middot mashup.
- Case studies are **tags under the bullets**, small rounded corners (not pills), matching rounded-rect thumbs, sentence case, no underline. No extra stroke on tag thumbs. Current tags: Shipping in production, Owning P4 DAM, Automations overhaul, CityFibre rebrand. **No CityFibre portal pill.**
- Experience jobs need a clear gap between companies (**32px** between roles). Do not crush that to steal space for other sections.
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
