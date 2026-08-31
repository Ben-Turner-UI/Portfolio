---
name: edit-cv
description: Edits Ben Turner’s A4 HTML CV. Use when the user asks to change the CV or résumé.
---

# Edit CV

1. Read `file/cv-ai-generation/CONTEXT.md` and follow it. That file is the operating brief for layout, copy, wash, and PDF export.
2. Edit `file/cv-ai-generation/index.html` for copy and layout.
3. If the peach wash, dots, or wash height change, update the defaults in `file/cv-ai-generation/generate-wash.ps1` and run that script so `img/cv-wash.jpg` matches.
4. Re-export `file/Ben-Turner-CV.pdf` with `file/cv-ai-generation/export.ps1` (needs `serve.ps1` on port 8765). Bump `?v=` on the homepage CV button.
5. Do not overwrite `file/cv-ai-generation/original.pdf`.
