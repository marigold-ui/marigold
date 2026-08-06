---
'@marigold/components': patch
---

fix: apply `alignX` from `Table.Column` to first column cells

`TableCellContent` used a truthy check on `columnIndex`, causing it to skip the `alignX` lookup when `columnIndex` was `0` (first column). Replaced with a nullish check so all columns correctly inherit their alignment.
