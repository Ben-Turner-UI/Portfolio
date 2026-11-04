---
name: edit-cv
description: Edits Ben Turner’s public CV from markdown, or builds a per-company pack (.md + PDF). Use for the public site CV or when he asks to build a company CV here; not for Applications HTML packs unless he points there.
---

# Edit CV

1. Read `file/cv-ai-generation/CONTEXT.md`.

## Public site CV

1. Edit `file/cv-ai-generation/cv.md`.
2. Run `file/cv-ai-generation/export.ps1`.
3. Bump `?v=` on the homepage and about CV download links.
4. If a new fact is now allowed publicly, add it to Applications `_master/claims.md` as well.

## Company pack (when Ben asks to build one)

1. Create `file/cv-ai-generation/packs/{Company} - {Role}/`.
2. Add a tailored `cv.md` in that folder (from the public master; reweight only — no new facts).
3. Run:

```powershell
.\export.ps1 -Md "packs\{Company} - {Role}\cv.md"
```

4. Leave `cv.md` and `Ben-Turner-CV.pdf` in the pack folder. Do not overwrite the public `cv.md` or `file/Ben-Turner-CV.pdf` for one employer.

Do not hand-edit `cv.html` or PDFs.
