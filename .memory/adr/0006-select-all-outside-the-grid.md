---
id: ADR-0006
status: accepted # accepted | superseded-by ADR-NNNN
date: 2026-10-07
applies_to:
  - 'packages/components/src/ListView/**'
  - 'packages/components/src/SelectList/**'
  - 'packages/components/src/utils/SelectAll.tsx'
---

# 0006. Put a list's select-all outside the grid, with its own label

## Context

`<Table>` was the only Marigold collection that could offer a select-all. `TableHeader` renders a `<Checkbox slot="selection">` into the header row's checkbox column, and RAC wires it from the table's own state. `ListView` and `SelectList` are both multi-select and had no header region at all, so the Bulk Actions pattern was written around `<Table>` and `ListView`'s docs had to send readers to a table for a flow the pattern described generically (DST-1751).

Two things had to be settled: what the control's accessibility shape is, and where its state comes from.

**The accessibility shape.** A table has genuine `columnheader` semantics to hang a select-all on. A GridList does not: it is a single logical column whose rows carry one `gridcell` each, so there is no column for a header cell to head. Three shapes were on the table: a `role="row"` inside the grid containing a `columnheader`, a header outside the grid associated by `aria-labelledby`, and a plain labelled region whose checkbox owns its own accessible name. RAC's `GridListHeader` does not help, it labels a `GridListSection` and is alpha.

**Where the state comes from.** This turned out to decide the first question. RAC publishes `ListStateContext` _inside_ the `GridList` element, around the collection root, and a GridList's children are built into collection items by RAC's collection builder. So nothing that is not an item can be rendered inside the grid's React subtree, which rules out a header row inside the grid regardless of its semantics. The state has to be lifted into the component that renders the grid.

**The alignment is the part a consumer cannot do.** Both lists declare their row padding as a custom property on the list element itself (`--listview-item-px`, `--selectlist-item-px`), so no sibling above the list can read it. DST-1665 measured four placements outside the collection (stacked above, in a toolbar beside a search field, with a visible label, top-right) and all four read as an orphaned control, because a checkbox that promises column-header semantics and cannot deliver them looks like a mistake wherever it sits.

## Decision

**A select-all is a compound part rendered outside the grid element, and the checkbox carries its own visible label.** `ListView.Header` and `SelectList.Header`, not an `allowsSelectAll` boolean: a part that is absent costs nothing, and a boolean that switches what a component renders is the `CLAUDE.md` rule this would break.

Specifically:

- **The region carries no role.** It is chrome, not data. No faked `columnheader`, no `role="row"`, no `aria-labelledby` pointing at the grid.
- **The checkbox owns its accessible name**, a visible "Select all" label from `intlMessages`, overridable through children. This is the shape that does not promise semantics the collection cannot back.
- **The component owns the alignment.** The row-padding custom property moves up to the element that wraps both the header and the list, so the header reads the same value the rows do. A test measures the shared `x`, because every class involved is indirection.
- **The parent lifts the selection** (`useControlledState`, as `SelectList` and `TagGroup` already do) and publishes `{ keys, selection, onChange, disabled }` on one internal context that both lists' header parts consume, the way they already share `GridSelectionIndicator`.
- **`ListView` reports `'all'`, `SelectList` reports keys.** `'all'` is what React Aria's own Cmd/Ctrl+A reports, so a view's consumer has one shape to resolve either way. A field cannot use it: `HiddenSelection` submits nothing for `'all'`, so `SelectList` resolves the sentinel to the keys it covers.
- **The keys come from the collection the consumer passed**, the data for a dynamic collection and the elements for a static one, with disabled items left out. An item without an `id` is left out and warned about once, in dev.

## Alternatives rejected

**A `role="row"` with a `columnheader` inside the grid.** The shape closest to `<Table>`, and the first candidate on the ticket. Rejected on mechanism before semantics: a GridList's children are collection items, so there is no way to render it there without forking RAC. It would also have shifted every row index and made the header one more row in "N rows" announcements.

**A header outside the grid, associated by `aria-labelledby`.** The ticket's favourite going in. Rejected as indirection with no payoff: with a visible label the checkbox already has a name, and pointing at the grid adds a relationship screen readers announce inconsistently.

**A bridge component inside the grid that publishes the collection state upward.** The only way to get RAC's own `isSelectAll` / `toggleSelectAll` and its exact notion of selectable keys. It would have to live inside a row (the only thing allowed in the grid), publish through a layout effect, and be present N times for N rows. Rejected as invisible machinery: correct, and unexplainable at 3am.

**An `allowsSelectAll` prop.** Rejected under the "no mode booleans" rule in `CLAUDE.md`.

**Deriving the keys with RAC's `CollectionBuilder`.** Would give exact keys including nested and fragment children. Rejected because it builds the collection a second time and leans on API that exists for RAC's own components.

**One shared part for both lists** (a single `Collection.SelectAll`), as PatternFly's `BulkSelect` does. Rejected for the part, kept for the implementation: each list owns its own theme slot and its own docs page, so the part is per component and the checkbox, the keys hook and the context are shared.

## Consequences

**What this buys.** Both lists can carry the flow the Bulk Actions pattern describes, and the pattern could be rewritten for collections generally. The alignment is the component's problem, which is the only reason the part has to exist. A list that should not offer a select-all renders no part and pays nothing.

**What it costs.**

- **The lists now own their selection state.** Every list is controlled internally, which is one more place a selection bug can live. A `Set` handed to `selectedKeys` must be passed through rather than copied, or React Aria resets the range anchor on every render and Shift+click stops extending. That is a real bug this introduced once already.
- **The keys are derived, not read from the collection.** An item without an `id` is invisible to a select-all, and the dev warning is the only thing that says so. RAC knows better and will not tell us.
- **`ListView` reports `'all'` and `SelectList` reports keys.** Defensible per component, surprising when read side by side.
- **`ListView` gained a wrapper element.** Its root is no longer the `role="grid"` element. Nothing in the public API changed, but a test or a selector reaching for `firstChild` would notice.
- **Children are inspected.** `splitCollectionHeader` flattens arrays to find the part, which is the collection exception in [ADR-0005](0005-css-layout-over-children-manipulation.md) rather than a new licence to sort children. It also means the header can be found wherever the author put it, including beside a render function, which the collection's own `children` type cannot express and the helper casts around.

**Not enforced.** No check verifies any of this. Advisory, like every record here.
