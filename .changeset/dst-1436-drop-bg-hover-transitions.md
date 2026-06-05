---
'@marigold/theme-rui': patch
---

fix(DST-1436): drop `background` from hover transitions across `ui-surface`, `ui-surface-contrast`, `Button`, `Tabs`, `Table` (row + edit buttons), `LegacyTable`, `Sidebar` (navLink + backButton), `Calendar` cells, `SelectList`, and `ActionBar.clearButton`. Hover background flips now happen instantly, making high-frequency controls feel snappier and aligning Button variants (primary/secondary previously transitioned the background while ghost/destructive were already instant). Color, border, box-shadow, and transform transitions are preserved.
