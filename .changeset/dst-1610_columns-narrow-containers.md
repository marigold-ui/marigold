---
'@marigold/components': minor
---

fix(DST-1610): keep `Columns` in their ratio and inside their container at every width

A column with content wider than its share used to take that width anyway. This broke the ratio, so two `Columns` stacked as a table stopped lining up, single columns dropped onto the next line, and a column wider than the row overflowed its container. Columns now keep the ratio from `columns` at every width, and wide content stays inside its column. A `fit` column still sizes to its content, capped at the row width.

Layouts that relied on columns wrapping by themselves when their content no longer fit now stay on one line. Set `collapseAt` to stack them below a width of your choice.
