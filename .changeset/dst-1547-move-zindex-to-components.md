---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

chore(DST-1547): move z-index classes out of theme style files into component implementations

Per the z-index management rule (`CLAUDE.md`), `z-*` utilities belong in component implementations, never in theme `*.styles.ts` files. The local focus/drop/sticky stacking classes for `Calendar`/`RangeCalendar`, `LegacyTable`, `ListBox`, `Table`, `ToggleButton` and `SegmentedControl` have been moved from their `theme-rui` styles into the matching component `className` (via `cn()`), preserving the exact modifiers and important flag. No visual or stacking change.
