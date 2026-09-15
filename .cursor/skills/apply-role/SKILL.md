---
name: apply-role
description: Creates or revises a per-role application pack for Ben Turner (brief, reweighted A4 CV, cover email, PDF). Use when the user pastes or attaches a job description, asks to apply for a UX, product design, design systems, research, or similar role, wants a tailored CV or cover letter, or iterates an application by voice.
---

# Apply to a role

Packs live at `C:\Users\reape\My Drive\Career\Applications`. Read `_master/CONTEXT.md` and `_master/claims.md` there first. Then `_cv/CONTEXT.md` for layout and copy law.

Do not edit `file/cv-ai-generation/index.html` or overwrite `file/Ben-Turner-CV.pdf` for one employer. Voice follow-ups: append `notes.md` in the pack, patch that pack, re-export.

## New pack

Working directory: `C:\Users\reape\My Drive\Career\Applications`

1. Name the slug: `company-role`, lowercase hyphens.
2. Scaffold:

```powershell
.\_master\new-application.ps1 -Slug "company-role" -Company "Name" -Role "Title" -JdPath "C:\path\to\jd.pdf"
```

If the JD was pasted, write `{slug}/jd.md` yourself. Put extra screenshots in `assets/`.

3. Fill `brief.md`. Classify archetypes. Score fit honestly. Lead / bury / do-not-claim must drive the CV, not the other way round.
4. Reweight `{slug}/cv/index.html` only: reorder, relabel summary prefixes, trim off-target lines. Same jobs, dates, title (**Product Designer**), and numbers. No new facts.
5. Write `email.md` the user can send. Short paragraphs. Their language, not ours. Portfolio: https://benturner.work
6. Export (needs `.\_cv\serve.ps1` on port **8766**):

```powershell
.\_cv\export.ps1 -Url "http://127.0.0.1:8766/{slug}/cv/index.html?print=1" -Out "{slug}\Ben-Turner-CV.pdf"
```

7. Confirm the sheet still fits one A4. Return the email, the fit line, and the folder path.

## Existing pack

Same folder. Append `notes.md`. Patch HTML and/or `email.md`. Re-export. Do not scaffold again unless they ask for a reset (`-Force` wipes brief and email).

## Archetypes (mix as needed)

| If the JD is about | Lead | Bury |
| --- | --- | --- |
| Design systems / tokens / Figma systems | design-systems, ai-tooling | conversion-growth unless they sell craft-plus-impact |
| Lead / principal / “what we should build” | product-ownership, research, mentoring | Claude shipping-velocity as the headline |
| Insights / dashboards / data viz | research, data-complexity, conversion-growth | PSNI, air-gap, DesignOps. Name the gap in Fit |
| AI product / generative UI | ai-tooling, design-systems | PSNI unless defence |
| Defence / gov / regulated / AccessNI | secure-public-sector, design-systems | CityFibre conversion as the opener |
| Agency / studio / pace | agency-pace, visual-craft, conversion-growth | air-gap |
| Visual / brand / craft | visual-craft, conversion-growth | frontend 25% as the opener |
| Enterprise SaaS | enterprise-saas, product-ownership | PSNI |

E-commerce / UGC / 8+ years: say so in Fit. Do not invent a dashboard or year count.

## Email

Warm, direct, no em-dashes. Do not call a product company an agency. Do not apologise at length for emailing. Offer a call; do not write “anytime, anywhere, anyplace.”
