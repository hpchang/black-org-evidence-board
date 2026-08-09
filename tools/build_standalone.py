#!/usr/bin/env python3
"""Build the self-contained HTML distribution from authoritative source files."""

from base64 import b64encode
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX_PATH = ROOT / "index.html"
STYLES_PATH = ROOT / "styles.css"
SCRIPT_PATH = ROOT / "script.js"
FAVICON_PATH = ROOT / "favicon" / "2-magnifier-clue.svg"
OUTPUT_PATH = ROOT / "black-org-evidence-board.html"


def replace_once(document: str, old: str, new: str, label: str) -> str:
    count = document.count(old)
    if count != 1:
        raise RuntimeError(f"Expected exactly one {label}; found {count}")
    return document.replace(old, new, 1)


def main() -> None:
    document = INDEX_PATH.read_text(encoding="utf-8")
    styles = STYLES_PATH.read_text(encoding="utf-8").rstrip()
    script = SCRIPT_PATH.read_text(encoding="utf-8").rstrip()
    favicon = b64encode(FAVICON_PATH.read_bytes()).decode("ascii")

    document = replace_once(
        document,
        '<link rel="icon" href="./favicon/2-magnifier-clue.svg" type="image/svg+xml">',
        f'<link rel="icon" href="data:image/svg+xml;base64,{favicon}" type="image/svg+xml">',
        "favicon link",
    )
    document = replace_once(
        document,
        '  <link rel="stylesheet" href="styles.css">',
        f"  <style>\n{styles}\n  </style>",
        "stylesheet link",
    )
    document = replace_once(
        document,
        '  <script src="script.js"></script>',
        f"  <script>\n{script}\n  </script>",
        "script tag",
    )

    OUTPUT_PATH.write_text(document, encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH.name}")


if __name__ == "__main__":
    main()
