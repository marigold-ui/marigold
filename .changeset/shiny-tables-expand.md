---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(Table): expandable rows for grouped records

`<Table>` can now nest rows, so records that belong together — a settlement run
and its individual clearings, an order and its line items — share one table
instead of being faked with a button and a menu. Set `treeColumn` to the `id` of
the column that carries the hierarchy and nest `<Table.Row>` inside
`<Table.Row>`; use the new `<Table.ChildRows>` when the child rows come from
data. Nested rows stay real table rows, so their values line up under the same
headers and each one can be selected, linked to and scrolled to on its own.

The tree column renders the expand control and the indentation itself, reusing
the caret and morph animation from `<Accordion>`. Rows without children reserve
the same width so values stay aligned, and group rows are emphasised
automatically. Expansion is collapsed by default and can be controlled with
`expandedKeys` / `defaultExpandedKeys` / `onExpandedChange`. New theme keys:
`treeIndent` and `expandButton`.

**Potentially breaking for opted-in tables:** setting `treeColumn` changes the
table's accessibility role from `grid` to `treegrid` — that is what makes screen
readers announce expanded state and nesting level. Tests asserting
`getByRole('grid')` on such a table need to become `getByRole('treegrid')`.
Tables that don't set `treeColumn` are unaffected.

Collapsed child rows are deliberately not rendered, so searching or deep-linking
to a nested row means expanding its ancestors first. The Table docs include a
recipe and a working demo for that.
