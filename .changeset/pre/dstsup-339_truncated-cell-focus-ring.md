---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix(DSTSUP-339): keep the focus ring of a control in a truncated table cell visible

In a `Table` with `overflow="truncate"`, or a cell with that override, the cell clipped the top and bottom of the focus ring of a button or link inside it. The ring now shows in full. Cell size and where text truncates are unchanged, and the expand chevron of an expandable row keeps its full click target. Nothing to change on your side.
