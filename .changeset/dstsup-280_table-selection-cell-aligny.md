---
'@marigold/components': patch
---

fix(DSTSUP-280): align the Table selection and drag-handle cells with `alignY`

The checkbox cell that `selectionMode` adds, and the drag-handle cell that drag and drop adds, now follow the table's `alignY` like every other cell. With `alignY="top"`, the checkbox used to stay vertically centered on tall rows.
