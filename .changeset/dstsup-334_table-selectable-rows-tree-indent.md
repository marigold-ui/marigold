---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(DSTSUP-334): select one level of a grouped Table and line its children up with the group label

A `Table` with grouped rows (`treeColumn`) takes two new optional props. Nothing changes for tables that don't set them.

`selectableRows` sets which level of rows can be selected, with `"all"` (the default, as before), `"top-level"` or `"nested"`. Use it when the bulk actions act on one level only, for example price levels whose articles are only their contents. Rows outside that level show no checkbox, their cell stays empty so the columns don't shift, and they are left out of select-all and range selection. They stay focusable, expandable and keep their row actions, and they are not announced as selectable or disabled. This replaces putting such rows into `disabledKeys` with `disabledBehavior="selection"`, which showed a checkbox that could never be checked. Keep `disabledKeys` for rows that can be selected in principle but not right now. They keep their disabled checkbox. After select-all, `onSelectionChange` still receives `'all'`, which now means every row on the selectable level, so resolve it from that level's items rather than from every key. Once a row is deselected after that, the selection lists only rendered rows, so the children of a collapsed group drop out of it.

`treeIndent="aligned"` lines the first nested level up with its group's label instead of indenting it one step further, while deeper levels still indent. Use it when every top-level row is a group. It replaces overriding the indent with a negative margin.

Refs DSTSUP-335.
