---
'@marigold/components': patch
---

`Popover` no longer loses its right edge when it opens next to the edge of the
window — the case a `Menu` or `ActionMenu` in a top bar hits.

react-aria keeps an overlay inside its boundary by measuring the visual
viewport, which still counts the gutter that `html { scrollbar-gutter: stable }`
reserves. The body is that much narrower and clips at its own box
(`body { overflow-x: clip }`), so an overlay pinned to the edge landed inside
the gutter and was sliced, losing its border and rounded corners. The boundary
padding now includes the reserved gutter, so the overlay stops at the body's
clip box. Pages without a reserved gutter are unaffected.
