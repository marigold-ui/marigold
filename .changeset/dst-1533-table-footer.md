---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(DST-1533): add `Table.Footer` component

New `<Table.Footer>` renders a semantic `<tfoot>` after `<Table.Body>` for summary rows like totals, counts, or averages, composed from `<Table.Row>` and `<Table.Cell>` just like the body. Supports a `sticky` prop that pins the footer to the bottom of the viewport while scrolling, mirroring sticky table headers. Adds a matching `footer` theme entry to `theme-rui`.
