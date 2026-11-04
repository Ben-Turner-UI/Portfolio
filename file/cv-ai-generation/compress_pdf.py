"""Rewrite a PDF with pypdf when installed; otherwise copy unchanged."""
from __future__ import annotations

import shutil
import sys
from pathlib import Path


def main() -> int:
    if len(sys.argv) < 3:
        print("usage: compress_pdf.py in.pdf out.pdf", file=sys.stderr)
        return 2
    src = Path(sys.argv[1])
    dst = Path(sys.argv[2])
    try:
        from pypdf import PdfReader, PdfWriter
    except ImportError:
        shutil.copyfile(src, dst)
        print("pypdf not installed; copied without rewrite")
        return 0
    reader = PdfReader(str(src))
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    if hasattr(writer, "compress_identical_objects"):
        writer.compress_identical_objects()
    for page in writer.pages:
        if hasattr(page, "compress_content_streams"):
            page.compress_content_streams()
    with dst.open("wb") as f:
        writer.write(f)
    print(f"rewrote {dst} ({dst.stat().st_size} bytes, {len(reader.pages)} pages)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
