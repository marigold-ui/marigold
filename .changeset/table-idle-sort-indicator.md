---
'@marigold/components': minor
---

feat(DST-1098): persistent idle sort indicator on sortable columns

`Table.Column` with `allowsSorting` now shows a Lucide `arrow-down-up` icon when the column is sortable but not currently the active sort column. The active ascending/descending icons (`SortAscending` / `SortDescending`) are unchanged.
