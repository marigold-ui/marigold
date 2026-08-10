---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(Table): expandable rows for grouped records

`<Table>` can now nest rows, so records that belong together — a settlement run
and its individual clearings, an order and its line items — share one table
instead of being faked with a button and a menu. Set `treeColumn` to the `id` of
the column that carries the hierarchy and nest `<Table.Row>` inside
`<Table.Row>`; use the new `<Table.ExpandableRows>` when the nested rows come from
data, and mark a row `expandable` when they are fetched only once it is opened.
Nested rows stay real table rows, so their values line up under the same headers
and each one can be selected, linked to and scrolled to on its own.

The tree column renders the expand control itself, reusing the caret and morph
animation from `<Accordion>`. The control sits in a leading gutter every row
reserves, so a group row, its children and an ungrouped row all start their value
at the same x — the identifier column stays a single scannable column instead of
being staggered by nesting level. Containment is carried by the group row, which
is filled with the new `band` token and emphasised automatically. Expansion is
collapsed by default and can be controlled with `expandedKeys` /
`defaultExpandedKeys` / `onExpandedChange`.

New theme keys `treeIndent` and `expandButton`, and a new `--color-band` token
for the fill that marks a row as heading a group. It is an alpha rather than a
palette step, so it holds one contrast (~1.11:1) whether the row sits on
`surface`, on `background`, inside a `muted` table or under a hover wash.

Selection works with grouped rows but does not cascade: each row selects on its
own and a group row shows no partial state, because a nested row is a real
record whose checkbox already means "this record". Select-all yields the `'all'`
sentinel, which does cover collapsed nested rows — but it can't be iterated, so
resolve it against your own data rather than the rendered rows. Documented, with
the workaround.

**Potentially breaking for opted-in tables:** setting `treeColumn` changes the
table's accessibility role from `grid` to `treegrid` — that is what makes screen
readers announce expanded state and nesting level. Tests asserting
`getByRole('grid')` on such a table need to become `getByRole('treegrid')`.
Tables that don't set `treeColumn` are unaffected.

Collapsed child rows are deliberately not rendered, so searching or deep-linking
to a nested row means expanding its ancestors first. The Table docs include a
recipe and a working demo for that.
