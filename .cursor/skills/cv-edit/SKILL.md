---
name: cv-edit
description: Edits Ben Turner’s public CV from markdown, or builds a per-company pack (.md + PDF). Use for the public site CV, company packs, Markdown-to-PDF CV export, or /cv-edit.
---

# CV edit

1. Read `file/cv-ai-generation/CONTEXT.md`.
2. Edit markdown only. Run `export.ps1`. Never hand-edit `cv.html` or PDFs.
3. After export, sync any named archive `.md` / Downloads copies with the pack `cv.md` so text matches the PDF.
4. Render every PDF page to an image and run the visual quality check before finishing.

## Public site CV

1. Edit `file/cv-ai-generation/cv.md`.
2. Run `file/cv-ai-generation/export.ps1`.
3. Bump `?v=` on the homepage and about CV download links.
4. If a new fact is now allowed publicly, add it to Applications `_master/claims.md` as well.

## Company pack

1. Create `file/cv-ai-generation/packs/{Company} - {Role}/`.
2. Add a tailored `cv.md` (from the public master; reweight only — no new facts).
3. Run:

```powershell
.\export.ps1 -Md "packs\{Company} - {Role}\cv.md"
```

4. Leave `cv.md` and `Ben-Turner-CV.pdf` in the pack folder. Do not overwrite the public `cv.md` or `file/Ben-Turner-CV.pdf` for one employer.
5. If Ben also wants Downloads copies, write `Ben-Turner-CV-{Company}.pdf` (and matching `.md`) there.

## Content rules

- Preserve wording, facts, dates, links and section order unless Ben supplies new copy.
- Do not invent achievements. Do not silently omit text to fit the page.
- Render Markdown properly: headings, bold, bullets, links, horizontal rules. No raw Markdown in the PDF.
- Leave source `.md` as the source of truth; regenerate HTML/PDF from it.

## Design and layout

Visual reference: quiet rendered Markdown (ChatGPT / editor preview). Single column. Same left edge for all content except indented bullets. No tables, floats, sidebars, cards, icons, photos or coloured panels.

### Page setup

- A4 portrait (210 × 297 mm), maximum two pages (one is fine).
- Margins: 15 mm top, 17 mm left/right, 15 mm bottom (usable width 176 mm).
- White background. No running headers, footers or page numbers.
- Disable browser print headers/footers (`--no-pdf-header-footer`).
- No fixed-height content containers. Do not rasterise pages.

### Font and colours

- Source Sans 3 only; embed regular, semibold, bold (and italic if used). No light weights.
- Body `#242424`. Headings `#171717`. Secondary/dates `#606060`. Separators `#DEDEDE`. Links `#305775` with a thin underline.

### Typography

| Element | Size | Weight | Line height |
| --- | --- | --- | --- |
| Name | 26 pt | semibold | 1.1 |
| Professional title | 12 pt | regular | 1.3 |
| Contact | 10 pt | regular | 1.4 |
| Section heading | 13 pt | semibold | 1.25 |
| Role / employer | 11.5 pt | semibold | 1.3 |
| Dates / location | 10 pt | regular | 1.3 |
| Body / bullets | 10.5 pt | regular | 1.4 |

- Inline bold: semibold or bold at the surrounding size.
- Left-align all text. No justify. Normal letter-spacing. No hyphenation.
- Preserve original heading capitalisation.

### Header

- Name left-aligned; 4 pt to the next header element; 6 pt between title and contact when both exist.
- Contact in normal flow; keep original order and wording.
- 14 pt after the full header before the first section.
- Do not invent labels, taglines or extra contact lines.

### Section spacing

- Section headings: 14 pt before, 6 pt after (0 before if the section starts a page).
- Role headings: 10 pt before, 3 pt after.
- Dates under roles: 0 before, 5 pt after.
- Body paragraphs: 0 before, 6 pt after.
- Bullet lists: 3 pt before, 6 pt after; 3 pt between items.
- Collapse adjacent margins (use the larger gap, not the sum).
- Same base stylesheet for every CV.

### Bullets

- Small round discs. Marker ~1 mm inside the text edge; text starts 4.5 mm in.
- Wrapped lines align with the first character of the bullet text.
- Same size/line-height as body. No icons, dashes or decorative markers.

### Horizontal rules

- Render Markdown `---` as 0.5 pt `#DEDEDE` lines across the content width, 8 pt above/below.
- Do not add rules under every heading. Avoid stacking rule + heading gaps.

### Links

- Keep original hrefs and visible text. Clickable in the PDF. Long URLs wrap inside margins.

### Pagination

- Prefer breaks before a role or major section.
- Keep role heading + metadata + at least the first two lines of following copy together.
- Keep section headings with at least two following lines.
- Keep individual bullets intact; a long job may continue onto page two between bullets.
- Do not force a whole job onto one page if that leaves a large blank.
- Widows/orphans: minimum two lines. No “continued” labels. Do not stretch to fill page two.

### Fitting within two pages

Start from the measurements above. If over two pages, adjust in order:

1. Remove accidental blank paragraphs / duplicate spacing (not content).
2. Improve page-break placement.
3. Section spacing 14 pt → 11 pt.
4. Paragraph spacing 6 pt → 4 pt; bullet gap 3 pt → 2 pt.
5. Body line-height 1.4 → 1.32.
6. Top/bottom margins 15 mm → 12 mm.
7. Body 10.5 pt → 10 pt only if still needed.

Do not go below 10 pt body, 15 mm horizontal margins, or 1.3 line-height. Do not compress character spacing or scale the PDF. If it still will not fit, report the conflict — do not delete or invent text.

Shared stylesheet lives in `file/cv-ai-generation/md_to_html.py`. Document-specific page breaks are allowed; typography and spacing stay shared.

## Visual quality check

Render every page to an image and inspect at a readable size. Confirm:

1. At most two A4 pages.
2. Name is the strongest element.
3. Sections and roles are easy to scan.
4. Body text is comfortably readable.
5. Bullets and wraps align consistently.
6. No stranded headings, split bullets, clipping or overlaps.
7. No large accidental gaps from page-break rules.
8. Wording and links match the Markdown.
9. Text extracts in correct reading order.
10. Fonts are embedded; link annotations keep the right destinations.

Do not deliver until these pass.
