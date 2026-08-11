#!/usr/bin/env python3
"""Build the self-contained HTML distribution from authoritative source files."""

import json
from base64 import b64encode
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX_PATH = ROOT / "index.html"
STYLES_PATH = ROOT / "styles.css"
SCRIPT_PATH = ROOT / "script.js"
FAVICON_PATH = ROOT / "favicon" / "2-magnifier-clue.svg"
CARD_ART_DIR = ROOT / "assets" / "card-art"
CARD_ART_SOURCES_PATH = CARD_ART_DIR / "SOURCES.json"
OUTPUT_PATH = ROOT / "black-org-evidence-board.html"

EXPECTED_CARD_ART_IDS = {
    "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11",
    "c1", "c2", "c3", "c4", "e1", "e2", "i1", "i2",
}
IMAGE_MIME_TYPES = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
}


def replace_once(document: str, old: str, new: str, label: str) -> str:
    count = document.count(old)
    if count != 1:
        raise RuntimeError(f"Expected exactly one {label}; found {count}")
    return document.replace(old, new, 1)


def inline_card_art(script: str) -> str:
    manifest = json.loads(CARD_ART_SOURCES_PATH.read_text(encoding="utf-8"))
    assets = manifest.get("assets")
    if not isinstance(assets, list):
        raise RuntimeError("Card-art manifest must contain an assets array")

    ids = [asset.get("id") for asset in assets]
    if len(ids) != len(set(ids)):
        raise RuntimeError("Card-art manifest contains duplicate IDs")
    if set(ids) != EXPECTED_CARD_ART_IDS:
        missing = sorted(EXPECTED_CARD_ART_IDS - set(ids))
        extra = sorted(set(ids) - EXPECTED_CARD_ART_IDS)
        raise RuntimeError(f"Card-art ID mismatch; missing={missing}, extra={extra}")

    manifest_files = set()
    for asset in assets:
        filename = asset.get("file")
        if not isinstance(filename, str) or Path(filename).name != filename:
            raise RuntimeError(f"Invalid card-art filename for {asset.get('id')}: {filename}")

        image_path = CARD_ART_DIR / filename
        if not image_path.is_file():
            raise RuntimeError(f"Missing card-art file: {filename}")

        suffix = image_path.suffix.lower()
        mime_type = IMAGE_MIME_TYPES.get(suffix)
        if not mime_type:
            raise RuntimeError(f"Unsupported card-art type: {filename}")

        image_bytes = image_path.read_bytes()
        if not image_bytes:
            raise RuntimeError(f"Card-art file is empty: {filename}")

        relative_path = f"./assets/card-art/{filename}"
        if script.count(relative_path) != 1:
            raise RuntimeError(
                f"Expected exactly one script reference to {relative_path}; "
                f"found {script.count(relative_path)}"
            )

        encoded = b64encode(image_bytes).decode("ascii")
        script = script.replace(relative_path, f"data:{mime_type};base64,{encoded}", 1)
        manifest_files.add(filename)

    local_files = {
        path.name
        for path in CARD_ART_DIR.iterdir()
        if path.is_file() and path.name != CARD_ART_SOURCES_PATH.name
    }
    if local_files != manifest_files:
        missing = sorted(manifest_files - local_files)
        extra = sorted(local_files - manifest_files)
        raise RuntimeError(f"Card-art file mismatch; missing={missing}, extra={extra}")

    return script


def main() -> None:
    document = INDEX_PATH.read_text(encoding="utf-8")
    styles = STYLES_PATH.read_text(encoding="utf-8").rstrip()
    script = inline_card_art(SCRIPT_PATH.read_text(encoding="utf-8").rstrip())
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
