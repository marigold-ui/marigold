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
reserves, so a group row and a childless row at the same level start their value
at the same x whether or not there is a control to show. Levels below the root
indent by one gutter (`--tree-indent`), so a nested row's control starts where
its parent's value starts, and the column's own header label takes the same
gutter, so it sits above the values it heads. Containment is also carried by the
group row, which is filled and emphasised automatically. Expansion is collapsed
by default and can be controlled with `expandedKeys` / `defaultExpandedKeys` /
`onExpandedChange`.

Drop indicators are level-aware: the insertion line starts at the x of the level
the row would land at, so a reorder inside an expanded group reads as landing in
that group, while a root-level drop still spans the row. Moving a row from one
level to another is not supported.

New theme keys `treeIndent` and `expandButton`. The group row's fill is
`foreground/5`, which holds ~1.10:1 whether the row sits on `surface`, on
`background`, inside a `muted` table or under a hover wash.

Inline editing composes with it: `Table.EditableCell` renders the tree column's
gutter too, so a row keeps its expand control even when that cell is the editable
one. Selection checkboxes, drag handles and the `compact` / `default` /
`spacious` paddings all keep working alongside the tree column, and the tree
column still takes its edge padding from a `Panel`'s bleed contract.

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
