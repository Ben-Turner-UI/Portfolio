# CV

This folder is the agentic CV system for Ben Turner. `index.html` is the designed A4 source. The homepage download is a generated PDF, not this HTML.

Read this file before any CV change. After copy, layout, or wash edits, reprint the PDF.

`original.pdf` is the old visual reference only. **Do not overwrite `original.pdf`.**

Site live URL for case studies: `https://benturner.work/`. Local preview: `http://127.0.0.1:8765/file/cv-ai-generation/index.html`. Print/export URL adds `?print=1`.

## Files

| Path | Role |
| --- | --- |
| `CONTEXT.md` | This operating brief. Keep it true when the system changes. |
| `index.html` | The designed A4 CV. Source of truth for layout and copy. |
| `generate-wash.ps1` | Builds `img/cv-wash.jpg`. Tunables are the script’s `param` defaults. |
| `export.ps1` | Chrome headless print → `../Ben-Turner-CV.pdf`. Needs `serve.ps1` running. |
| `serve.ps1` | Local static server at `http://127.0.0.1:8765/` (TTF/WOFF2 MIME included). |
| `img/perforce.jpg`, `img/budibase.jpg`, `img/dawson-andrews.jpg` | Company logos. |
| `img/cv-wash.jpg` | Peach wash + quiet orange dots, **bottom 50%** of the sheet, dithered JPEG. |
| `fonts/` | Local Source Sans 3 (TTF 400/600/700), Big Shoulders 600, Material Symbols Outlined (woff2). Do not switch body type back to variable Google fonts. |
| `../Ben-Turner-CV.pdf` | Site download. Homepage button: `file/Ben-Turner-CV.pdf?v=...`. |
| `original.pdf` | Reference only. Never overwrite. |

Job-pack CVs live in `C:\Users\reape\My Drive\Career\Applications`. Do not export a job variant over this HTML, the site PDF, or `original.pdf`.

## How to run the system

1. `.\serve.ps1` if nothing is already on port 8765.
2. Edit `index.html` for copy/layout. Preview at the local URL above.
3. If the wash, dots, or peach height change: `.\generate-wash.ps1` then `.\export.ps1`.
4. If only copy/layout change: `.\export.ps1`.
5. Bump `?v=` on the homepage CV button in `/index.html`.
6. Measure A4 fit: `.cv` `scrollHeight` vs `clientHeight`. Overflow clips.

Do not use `--disable-remote-fonts` on the Chrome print. Fonts are local files; that flag is unrelated and has caused missing type before.

## Design rules

- One A4 page: `.cv` is `210mm × 297mm` with `overflow: hidden`. After layout or type changes, measure fit. If it overflows, it clips.
- **No sheet border.** `.cv` is `border: none` on screen and in print. On-screen only: a light `box-shadow` so the sheet reads on the grey page. `?print=1` / `@media print` drop the shadow. Do not put a 1px frame around the PDF.
- Body is Source Sans 3 at **11.5px**, line-height **1.36**, **`font-variant-ligatures: none`** so ATS does not split words (`software`, `after`, `Summary`). Sheet padding is tight (**5.5mm 6.5mm 5mm**). Name is Big Shoulders with Arial fallback; orange period `#ff4d00`.
- Contact sits **to the right of the name**, same type size as the body, in a 2×2 grid: site and phone on the first row, email and LinkedIn on the second. All four are links. No location in this block. Each item has an inline SVG icon (not an icon font; icon fonts extract as `?` in ATS). Underline link labels only. **More experience on linkedin.com/in/benturnerwork** sits between Experience / DawsonAndrews and Skills.
- `.cv` is a column with `justify-content: space-between` and a 10px minimum gap. Leftover sheet space goes between the sections so Hobbies sits on the bottom padding. Education and Hobbies are separate sections, still single column. Do not leave a band of empty sheet under Hobbies.
- Section `h2` underline needs air underneath (about 9px). Do not crush heading and body together.
- Each job: **header row** is logo + Product Designer / company / scope / dates. **Bullets and pills sit under that header**, same left edge as Summary. Bullet *markers* indent like Summary (`padding-left` on the `ul`); do not indent the whole list under the title. DOM order is title → dates → company + scope → bullets → pills.
- Do not hyperlink company or education names in body copy. Underlined links stay on the contact row, the LinkedIn note, the Read more link in the How I work summary bullet (`https://benturner.work/about.html`), and case-study tags. Always write the Perforce employer line as **Perforce**. Write the agency as **DawsonAndrews**.
- Case studies are **tags under the bullets**, small rounded corners (not pills), matching rounded-rect thumbs, sentence case, no underline. No extra stroke on tag thumbs. Current tags: **Shipping production code**, Increasing sales opportunities, Owning P4 DAM, Automations overhaul, Branches, permissions, calculations, CityFibre rebrand, SportsWork. **No CityFibre portal pill.**
- Experience jobs need a clear gap between companies (**22px** between roles). Education then Hobbies, **single column** (two-column split interleaves in ATS). Dates use **Present**, not today.
- No em-dashes. Company names in text, not only on logos.
- Job title stays **Product Designer**. Do not claim Senior. “Lead” is a verb or “lead product designer for CityFibre”, not a job title of Lead.

## Copy rules

Write for a recruiter at another company with **no** context on Perforce, Budibase, or DawsonAndrews.

- Name the company when quoting a metric. Do not mash Perforce and CityFibre numbers into one unattributed summary bullet. The Perforce 25% / six-to-two line must say Ben ships production front-end, or it reads as a headcount fact with no cause.
- Say what the products are in the scope line: P4 Plan and P4 DAM are planning and digital asset management software for games and media (do not stack “secure” on that line). Budibase is open-source low-code for internal apps, automations and AI agents. Air-gapped detail stays in the Budibase bullets.
- The Perforce 25% line must name the baseline: feature output rose 25% **above the pre-cut rate** after six developers went to two, because Ben shipped production front-end.
- Mentoring (at least 10 designers) lives in DawsonAndrews experience, not only Summary. Skills include Typography, Visual hierarchy, Micro-interactions for visual craft.
- Do not use internal jargon: **Force UI**, “first-layer frontend”, “IC” as a job label, “refinements” as if everyone knows sprint jargon. Prefer “planning meetings”, “production front-end”, “hands-on designer”.
- Do not list Force UI in Skills. Frontend is production HTML/CSS/Git, not a Perforce design-system name.
- Homepage case studies are the public proof for metrics. Do not invent job numbers.
- DawsonAndrews: do **not** claim Ben owned product design for GSMA, GAA, or large organisations as a whole. Those are clients he shipped work for. He **has** authorized: he led and created design systems for CityFibre, GSMA, and SportsWork; SportsWork was zero-to-one (brand, product, live site) and is now an independent, profitable startup; also public sector, private, and corporate clients; CityFibre portal and website he designed. Do not stack “I owned / I owned / I owned”.
- Ben has authorized some claims that are not on the homepage (Hyperoptic, five hires, agency growth (CityFibre homepage success helped DawsonAndrews grow from small to medium-sized), Perforce new customers, CityFibre ~2,000 people, whole-product ownership at Budibase, AI-enabled features, owns sections of the Perforce design system and Claude skills around context building and generative AI workflows, not the whole system or the Claude plugin, Claude systems he built won Best Designed at the company AI hackathon in 2026, mentored at least 10 designers across companies, Budibase air-gapped/self-hosted secure environments, Perforce interfaces holding secure enterprise data, SportsWork now an independent profitable startup, public sector / private / corporate clients at DawsonAndrews, one of the lead designers at the PSNI). Ben removed the PSNI summary sentence from the public CV on 2026-09-25. Do not put it back unless he asks. Do not add more unpublished metrics unless he asks.

## Background and PDF performance

Do **not** use CSS `linear-gradient` or a `radial-gradient` grain on `.cv` for print. Chrome turns those into `/Shading` and `/Pattern` objects. A small PDF then takes seconds to scroll.

The wash and dots are **one bitmap**, `img/cv-wash.jpg`, built by `generate-wash.ps1`:

| Setting | Live value | Notes |
| --- | --- | --- |
| Height | **50%** of A4 | CSS: `background-size: 100% 50%`; `background-position: center bottom` |
| Peach | `rgba(255, 74, 0, 0.22)` at the bottom edge, fading to white at the top of the band | Same orange as the site header |
| Dots | **0.15** opacity, 4 CSS px grid, ~1.15 CSS px radius | Quiet speckle. 0.48 was too loud; the old JPEG was too faint |
| Dither | triangular ±1.8 on the wash | Stops 8-bit/JPEG banding on the long 50% ramp |
| Format | JPEG quality **92**, ~1240×877 at 150 dpi | PNG of a dithered wash is ~1MB; JPEG stays PDF-fast |
| Sheet edge | no border | Print has no frame |

Point `.cv` at that image. Keep `isolation: auto` in print. `?print=1` adds `html.cv-print` for a flat print sheet (no box-shadow, no border).

If you change height, peach, or dot opacity, change the defaults in `generate-wash.ps1`, run it, then `export.ps1`. Do not freehand a new JPEG in a chat without updating that script.

The download PDF **must stay real text** (ATS). Never replace it with a screenshot or flattened image of the page.

## After you change the CV

1. Check it still fits one A4.
2. Re-export with `.\export.ps1` (Chrome headless print of `?print=1`). Do not pass `--disable-remote-fonts`.
3. Overwrite `file/Ben-Turner-CV.pdf` only (not `original.pdf`).
4. Bump the cache-bust query on the homepage CV button in `/index.html` (`?v=...`).
5. A healthy export is roughly **150–260KB**, `/Pattern` 0, `/Shading` 0, `/ToUnicode` present. Cursor PDF tabs cache the old file; close them before judging lag.

## Do not

- Overwrite `original.pdf`.
- Add extra ATS/export helpers beyond `generate-wash.ps1`, `export.ps1`, and `serve.ps1`.
- Put CSS gradients or CSS dot-grain on `.cv` for print.
- Put a border around the sheet.
- Claim Senior, or ownership Ben cannot back up.
- Mention Force UI.
