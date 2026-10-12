---
'@marigold/components': patch
---

fix(DST-1836): `<Table>` columns follow their container when it narrows again

In a parent that sizes itself to its content, such as `Columns` or a `Panel`
with `min-width: fit-content`, a `<Table>` only ever grew. React Aria sizes the
columns to the table's container, and the container took its width from the
table, so after the window widened, the columns kept their widest width.

The container no longer takes its width from the table. It keeps the sum of the
column minimums as its own minimum width, so a parent that sizes to its content
still makes room for the columns.
