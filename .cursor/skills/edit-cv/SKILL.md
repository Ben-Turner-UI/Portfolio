---
name: edit-cv
description: Edits Ben Turner’s public CV from markdown. Use when the user asks to change the CV or résumé for the public site, not when tailoring it to a job application.
---

# Edit CV

If the user is applying to a role, drop in a job description, or wants a tailored CV / cover email, use the **apply-role** skill instead. Do not rewrite the master CV for one employer.

1. Read `file/cv-ai-generation/CONTEXT.md`.
2. Edit `file/cv-ai-generation/cv.md` (source of truth).
3. Run `file/cv-ai-generation/export.ps1` to rebuild `file/Ben-Turner-CV.pdf`.
4. Bump `?v=` on the homepage and about CV download links.
5. If a new fact is now allowed on the public CV, add it to `C:\Users\reape\My Drive\Career\Applications\_master\claims.md` as well.
6. Do not hand-edit `cv.html` or `Ben-Turner-CV.pdf`.
