---
'@marigold/theme-rui': patch
---

style(DST-1954): add an alpha scale and make Keyboard key caps translucent

The theme now has a five-step alpha scale (`--alpha-50` to `--alpha-400`: 5, 10, 14, 26 and 45%) for translucent edges, washes and veils. The ghost hover, `border`, `control-border` and the overlay backdrop read from it and look exactly as before.

The `Keyboard` key cap takes its border and fill from its text colour instead of an opaque fill, so it blends into a highlighted or coloured row instead of showing as a white box.

Key caps also use the UI font now. Before, they showed in the browser's monospace font.
