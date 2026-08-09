# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project shape

This is a dependency-free, offline-first static web app. There is no package manifest, bundler, framework, or automated test runner. The primary entry point is `index.html`; it must continue to work when opened directly with `file://`.

## Commands

Open the app without a server:

```bash
open index.html
```

Serve it locally when browser developer tools or HTTP behavior are needed:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
# then open http://127.0.0.1:8765/index.html
```

Check JavaScript syntax:

```bash
node --check script.js
```

Validate the standalone JSON data and connection targets:

```bash
python3 - <<'PY'
import json
from pathlib import Path
items = json.loads(Path("data.json").read_text())
ids = {item["id"] for item in items}
missing = sorted({target for item in items for target in item["connections"] if target not in ids})
assert len(ids) == len(items), "duplicate evidence IDs"
assert not missing, f"missing connection targets: {missing}"
assert all(item["type"] in {"person", "code", "event", "item"} for item in items)
print(f"validated {len(items)} evidence records")
PY
```

There is no single-test command or test suite. For a targeted regression check, launch the page and exercise the affected path: card pointer drag, keyboard Enter/Space selection, expand/collapse, category filtering, sidebar relation navigation, or reset.

## Architecture

- `index.html` is the static application shell. JavaScript depends on its stable DOM IDs: `pinboard`, `connections-svg`, `sidebar-content`, `board-wrapper`, `visible-count`, `reset-layout-btn`, and `record-clock`.
- `styles.css` owns the entire noir visual system, fixed 1800×1240 evidence canvas, card/category treatments, SVG thread states, sidebar, accessibility states, and responsive layouts at 1120px, 880px, and 620px.
- `script.js` contains both the embedded evidence database and all application behavior. Keeping data embedded is intentional: fetching `data.json` would break direct `file://` use because of browser CORS restrictions.
- `data.json` is the standalone/API copy of the evidence records. `black-org-evidence-data.json` is the same data under its deployment filename.
- `black-org-evidence-board.html` is a generated, self-contained distribution file with `styles.css` and `script.js` inlined. Treat the split source files as authoritative; do not make standalone-only edits.

## State and rendering model

`script.js` is a small imperative renderer rather than a component framework:

- `activeNodeId` identifies the selected dossier.
- `currentFilter` controls category visibility.
- `expandedNodeIds` determines which nodes expose their neighbors.
- `positions` stores mutable card coordinates; `INITIAL_POSITIONS` defines the five-node core view.
- `renderBoard()` preserves current coordinates, recreates visible cards, updates visual state, and then calls `drawConnections()`.
- `drawConnections()` derives curved SVG paths from the currently rendered card elements and deduplicates bidirectional links.
- Sidebar content is built with DOM methods and `textContent`; retain that pattern when adding externally sourced text.
- Dragging uses Pointer Events and pointer capture so one implementation supports mouse and touch. A movement threshold distinguishes drag from selection.

## Data invariants

Each evidence record has exactly these conceptual fields:

- `id`: unique stable identifier
- `type`: `person`, `code`, `event`, or `item`
- `name`
- `description`: short sidebar summary
- `connections`: IDs of related records

When evidence changes, keep the embedded `evidenceData` in `script.js`, `data.json`, and `black-org-evidence-data.json` synchronized. Connections should normally be reciprocal even though rendering tolerates one-sided links. Update the hard-coded total shown in `index.html` if the record count changes.

After modifying `index.html`, `styles.css`, or `script.js`, regenerate `black-org-evidence-board.html` by inlining the current source files rather than editing the generated file independently.
