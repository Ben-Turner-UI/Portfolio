---
name: edit-cv
description: Edits Ben Turner’s A4 HTML CV. Use when the user asks to change the CV or résumé for the public site, not when tailoring it to a job application.
---

# Edit CV

If the user is applying to a role, drop in a job description, or wants a tailored CV / cover email, use the **apply-role** skill instead. Do not rewrite the master CV for one employer.

1. Read `file/cv-ai-generation/CONTEXT.md` and follow it. That file is the operating brief for layout, copy, wash, and PDF export.
2. Edit `file/cv-ai-generation/index.html` for copy and layout.
3. If the peach wash, dots, or wash height change, update the defaults in `file/cv-ai-generation/generate-wash.ps1` and run that script so `img/cv-wash.jpg` matches.
4. Re-export `file/Ben-Turner-CV.pdf` with `file/cv-ai-generation/export.ps1` (needs `serve.ps1` on port 8765). Bump `?v=` on the homepage CV button.
5. If a new fact is now allowed on the public CV, add it to `C:\Users\reape\My Drive\Career\Applications\_master\claims.md` as well, and copy the updated HTML into `C:\Users\reape\My Drive\Career\Applications\_cv\index.html`.
6. Do not overwrite `file/cv-ai-generation/original.pdf`.
