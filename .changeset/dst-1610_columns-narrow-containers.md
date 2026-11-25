---
'@marigold/components': minor
'@marigold/docs': patch
---

fix(DST-1610): keep `Columns` in their ratio and inside their container at every width

A column with content wider than its share used to take that width anyway. This broke the ratio, so two `Columns` stacked as a table stopped lining up, single columns dropped onto the next line, and a column wider than the row overflowed its container. Columns now keep the ratio from `columns` at every width, and wide content stays inside its column. A `fit` column still sizes to its content, capped at the row width.

Check your `Columns` on small screens. Three things render differently:

- Columns no longer wrap by themselves when their content does not fit. They stay in one row. Set `collapseAt` to stack them below a width of your choice.
- A field with a `width` now shrinks to its column. If the column's share is smaller, the value can be cut off. Give that column a larger ratio, use `fit` for it, or set `collapseAt`.
- Content that cannot shrink, such as an image or a plain `<table>`, now spills into the next column instead of widening the row. Give it a horizontal scroll area.
