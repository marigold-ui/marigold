---
'@marigold/components': minor
'@marigold/docs': patch
---

feat(DST-766): render skeleton rows in a loading Table

`<Table.Body>` takes `skeletonRows`. While the table is `loading` and the body has no rows yet, it shows that many skeleton rows instead of its empty state, with a skeleton per column. Nobody can select a skeleton row, and "select all" is disabled until the data has arrived. Shape a column's skeleton with `skeleton` on `<Table.Column>`, for example a rounded one for a badge, or pass `null` to leave its cells empty. Tables without `skeletonRows` behave as before. If you built skeleton rows by hand, replace them with `skeletonRows` and drop the `disabledKeys` and selection guard that came with them.
