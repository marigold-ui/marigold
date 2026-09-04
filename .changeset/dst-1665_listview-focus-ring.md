---
'@marigold/theme-rui': patch
---

fix(DST-1665): draw `<ListView>`'s row focus ring inside the row

A focused row used `ui-state-focus`, which paints a 3px outline outside the border box. Rows are siblings painting in tree order, so the next row down covered the focused row's bottom edge with its own background. The divider did it faintly at rest; a selected neighbour did it across the full width. The ring looked cut off along the bottom.

The row now uses an inset ring, `inset-ring-2 inset-ring-ring/50`, the same treatment `<SelectList>` applies to its options. An inset ring is painted within the border box, so no sibling can reach it and the four edges read the same weight.

Selection is what made this systematic rather than occasional, which is why the fix ships here: before this release no `<ListView>` row had a selected background to paint over its neighbour.

Two related notes. The theme documents `ui-state-focus` as carrying its weight only on something with a border to flip, naming `ui-state-focus-item` for borderless rows instead; that utility is the same inset mechanism at full opacity. This change matches `<SelectList>`'s `/50` for visual parity between the two, and the ring opacity question across both is tracked in DST-1590 and DST-1662.

Expect a visual diff on every focused `<ListView>` row.
