---
'@marigold/components': minor
'@marigold/docs': patch
---

feat(DST-766): render skeleton rows in a loading Table

`<Table.Body>` takes `skeletonRows`. While the table is `loading` and the body has no rows yet, it shows that many skeleton rows instead of its empty state, with a skeleton per column. Nobody can select a skeleton row, and "select all" is disabled until the data has arrived. Each skeleton fills its cell. Before the first load, every cell shows one bar. After that, skeleton rows take the average height of the table's real rows, so the table keeps its height, and each cell shows as many bars as its column had lines. Tables without `skeletonRows` behave as before. If you built skeleton rows by hand, replace them with `skeletonRows` and drop the `disabledKeys` and selection guard that came with them.
