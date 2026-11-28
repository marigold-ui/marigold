---
'@marigold/components': patch
'@marigold/docs': patch
---

fix(DST-2025): show the more row of a CommandPalette group without rows

A `CommandPalette.Group` with `more` and a `prefix` now renders its title and the more row even when it has no rows, for example a group whose rows come from a server search that only runs once people narrow to it. Before, the group rendered nothing until it had rows, so its more row never showed.

A group whose rows come from your own search now also shows its more row while those rows load and when the search finds nothing, in place of the loading message and the empty state. If the row would mislead there, set `more` only when there are more records to find.
