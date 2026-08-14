---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(Table): expandable rows for grouped records

`<Table>` can now nest rows, so records that belong together (a settlement run
and its individual clearings, an order and its line items) share one table
instead of being faked with a button and a menu. Set `treeColumn` to the `id` of
the column that carries the hierarchy and nest `<Table.Row>` inside
`<Table.Row>`; use the new `<Table.ExpandableRows>` when the nested rows come from
data, and mark a row `expandable` when they are fetched only once it is opened.
Nested rows stay real table rows, so their values line up under the same headers
and each one carries its own actions.

The tree column renders the expand control itself, reusing the caret and morph
animation from `<Accordion>`. The caret starts where the column's values start:
its hit target is wider than the caret and hangs back into the cell's edge
padding (`--tree-caret-inset`), so the ghost button's own whitespace is the
gutter rather than something added to it. Behind it every row reserves that
gutter, so a group row and a childless row at the same level start their value at
the same x whether or not there is a control to show. Levels below the root
indent by one gutter (`--tree-indent`), so a nested row's caret starts where its
parent's value starts, and the column's own header label takes the same gutter,
so it sits above the values it heads. Containment is carried by the children
rather than the parent: nested rows share a filled band across the full row, so
what belongs to a group is legible in the leading drag and selection columns
too, which don't indent. Expansion is collapsed by default and can be controlled
with `expandedKeys` / `defaultExpandedKeys` / `onExpandedChange`.

Drop indicators are level-aware: the insertion line starts at the x of the level
the row would land at, so a reorder inside an expanded group reads as landing in
that group, while a root-level drop still spans the row. Moving a row from one
level to another is not supported.

The 32px control keeps that hit target without setting row height: a negative
block margin cancels the surplus over the line box, so a group row is exactly as
tall as a leaf row and the `size` variant's cell padding stays the only thing
that decides — 33 / 41 / 53px for `compact` / `default` / `spacious`.

New theme keys `treeIndent` and `expandButton`. The band is `foreground/8`,
which holds ~1.17:1 whether the rows sit on `surface`, on `background` or inside
a `muted` table, and yields to the hover wash so hovering still reads. `admin`
and `master` rows keep their access colour at every level — who may see a row
outranks where it sits in the tree.

Inline editing composes with it: `Table.EditableCell` renders the tree column's
gutter too, so a row keeps its expand control even when that cell is the editable
one. When the edited value lives outside the row items, pass `dependencies` to
`Table.ExpandableRows` as well as to `Table.Body`. Selection checkboxes, drag
handles and the `compact` / `default` / `spacious` paddings all keep working
alongside the tree column, and the tree column still takes its edge padding from
a `Panel`'s bleed contract.

Selection works on grouped rows but does not cascade: each row selects on its
own, and a group row shows no partial state while only some of its children are
selected. Cascading selection is not part of this release.

**Potentially breaking for opted-in tables:** setting `treeColumn` changes the
table's accessibility role from `grid` to `treegrid`, which is what makes screen
readers announce expanded state and nesting level. Tests asserting
`getByRole('grid')` on such a table need to become `getByRole('treegrid')`.
Tables that don't set `treeColumn` are unaffected.

Collapsed child rows are deliberately not rendered, so searching or deep-linking
to a nested row means expanding its ancestors first. Moving focus to a specific
row is not supported yet, which is tracked in DST-1713. Sorting doesn't reorder
levels for you either, so sort each level in your own data, and there is no
expand all control, so set `expandedKeys` to every group's key when you need one.
