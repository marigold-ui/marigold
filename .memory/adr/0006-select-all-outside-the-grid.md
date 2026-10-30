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

**A select-all is rendered outside the grid element by the list itself, switched on by an `allowSelectAll` prop, and the checkbox carries its own visible label.**

The accessibility shape below was the substance of this decision and is independent of how the control is switched on. The switch itself was reopened after the first implementation: three API options were written up and the team chose the boolean (see "Alternatives rejected").

Specifically:

- **The region carries no role.** It is chrome, not data. No faked `columnheader`, no `role="row"`, no `aria-labelledby` pointing at the grid.
- **The checkbox owns its accessible name**, a visible "Select all" label from `intlMessages`. This is the shape that does not promise semantics the collection cannot back.
- **A count sits beside it**, reading "N of M selected". It is not optional, because a boolean leaves the consumer no slot to add one, and the scope of the next action has to stay legible after one press.
- **The component owns the alignment.** The row-padding custom property moves up to the element that wraps both the header and the list, so the header reads the same value the rows do. A test measures the shared `x`, because every class involved is indirection.
- **The parent lifts the selection** (`useControlledState`, as `SelectList` and `TagGroup` already do) and passes `{ keys, selection, onChange, disabled }` straight to the shared `SelectAllHeader`, the way both lists already share `GridSelectionIndicator`.
- **`ListView` reports `'all'`, `SelectList` reports keys.** `'all'` is what React Aria's own Cmd/Ctrl+A reports, so a view's consumer has one shape to resolve either way. A field cannot use it: `HiddenSelection` submits nothing for `'all'`, so `SelectList` resolves the sentinel to the keys it covers.
- **The keys come from the collection the consumer passed**, the data for a dynamic collection and the elements for a static one, with disabled items left out. An item without an `id` is left out and warned about once, in dev.

## Alternatives rejected

**A `role="row"` with a `columnheader` inside the grid.** The shape closest to `<Table>`, and the first candidate on the ticket. Rejected on mechanism before semantics: a GridList's children are collection items, so there is no way to render it there without forking RAC. It would also have shifted every row index and made the header one more row in "N rows" announcements.

**A header outside the grid, associated by `aria-labelledby`.** The ticket's favourite going in. Rejected as indirection with no payoff: with a visible label the checkbox already has a name, and pointing at the grid adds a relationship screen readers announce inconsistently.

**A bridge component inside the grid that publishes the collection state upward.** The only way to get RAC's own `isSelectAll` / `toggleSelectAll` and its exact notion of selectable keys. It would have to live inside a row (the only thing allowed in the grid), publish through a layout effect, and be present N times for N rows. Rejected as invisible machinery: correct, and unexplainable at 3am.

Re-proposed in review with a working spike, alongside a variant where each row registers its own key and the select/clear rules are copied out of React Aria. Both passed twelve cases that the derivation failed nine of, and the spike's bridge is a smaller thing than the one rejected above, so "unexplainable at 3am" is not what kept them out. Its failure mode did. N rows publishing one state object through a layout effect fails as an infinite render rather than as a wrong count, held off by a guard whose test has to be named after "Maximum update depth exceeded" to stay understood. A wrong count is the likelier bug and the cheaper one to be on call for. The layout effect also makes a server-rendered page paint "0 of 0 selected" until hydration, but that is a cost of the docs site rather than of the consumers, and it did not decide this. The copied-rules variant gives up the single source of truth that makes the bridge worth having and keeps the bridge regardless, so it was never the better of the two. Proposed again in review and kept rejected, see "Revisited in review" below.

**A compound part, `ListView.Header` / `SelectList.Header`.** Shipped first, and reverted here. It composes: a count or a "select all 2,431 rows" link fits the same region with no new props, the label is replaceable through children, and `<Sidebar.Toggle>` sets the precedent. It is also what the "no mode booleans" rule in `CLAUDE.md` asks for. Rejected by the team on discoverability: a part does not appear in autocomplete or the props table, so the feature is invisible to anyone not reading the docs page. The cost is accepted knowingly: `allowSelectAll` is a boolean that switches what the component renders, which is the rule it breaks, and every later addition to that region needs another prop. The label is no longer replaceable, and a `selectAllLabel` prop is the next thing this will ask for.

**Automatic, from `selectionMode="multiple"` alone.** Exactly what `<Table>` does, one rule for the whole system, nothing to discover or forget. Rejected because it cannot be switched off, and a list where selecting 200 rows at once is a bad idea would get one anyway. Worth recording that if "it must feel like `<Table>`" is ever the goal again, this is the answer, not the boolean.

**Deriving the keys with RAC's `CollectionBuilder`.** Would give exact keys including nested and fragment children. Rejected because it builds the collection a second time and leans on API that exists for RAC's own components. Review established that our version exports it publicly and that React Spectrum 2 uses it for exactly this kind of parent-side logic. It would also hold the keys while rendering rather than after a layout effect, which is what makes it the first thing to spike if this is reopened: exact keys with no bridge, so there is no infinite render to guard against. Reopened as the follow-up to try first if the derivation's limit shows up in use, see "Revisited in review" below.

**One shared part for both lists** (a single `Collection.SelectAll`), as PatternFly's `BulkSelect` does. Moot once the part became a prop, but the implementation went the way it pointed: each list owns its own theme slots, and the header component, the keys hook and the count are shared.

## Revisited in review (DST-1751, PR #5929)

The bridge above was proposed again during review, as approach A: every row hands React Aria's list state up through a context, and the header reads `collection.getKeys()` and calls `selectionManager.toggleSelectAll()`, the same call `<Table>`'s select-all makes. A variant B had the rows register their own key and copied React Aria's select and clear rules instead of calling them. Both were spiked against twelve cases drawn from the review. The spikes passed all twelve, the derivation passed three.

The derivation was kept anyway, and the failure mode is what decided it.

**The failure mode.** N rows publishing one state object through a layout effect needs a guard against the infinite render, and that guard needs a test named after "Maximum update depth exceeded" to stay understood by the next reader. A wrong count is more likely than a hung render, and far cheaper to diagnose.

**The first render is not the reason**, though an earlier revision of this record said it was. A and B learn the keys in a layout effect, so the header would read "0 of 0 selected" and disabled for the first render. Review corrected the premise: the docs site is where this component is shown, not where it runs, and most of the apps that use it are client-rendered. There a layout effect's `setState` is flushed before the browser paints, so that first render is never seen. What is left is the window between server HTML and hydration, where the checkbox reads as disabled for a moment. The mitigation offered for it, a derived count for the first render that hands over once the rows report in, is still worth refusing, because it keeps the derivation in the tree and adds the bridge beside it. That is a reason to take the bridge whole or not at all, not a reason to reject it.

B was rejected for giving up A's single source of truth while keeping A's bridge.

What the review changed instead: the `items` branch renders each item and reads the key in React Aria's own order (`rendered.props.id ?? item.key ?? item.id`), a row disabled in the render function is left out of the selectable set, `lockedKeys` became the selected keys whose row is known to be disabled rather than everything the derivation cannot see, the dev warning names the real cause instead of blaming missing ids, and both docs pages state the constraint ahead of the warning, because it changes what a form submits.

A second round found two bugs in that work. Leaving the `'all'` sentinel in `SelectList`'s state so React Aria could resolve it against the real collection made every row read as selected while `onChange`, the hidden `<select>` and `validate` all saw nothing, so a `required` list looked fully picked and submitted empty. A field submits what it shows, so the sentinel is now always resolved to the keys the derivation can address, and the keys already selected are kept rather than replaced, because a select-all must never deselect a row it cannot see. And `lockedKeys` treated a disabled row as selected under `'all'`, which is not what React Aria does: `SelectionManager.isSelected` answers with `canSelectItem` there, so no disabled row is selected and a clear from `'all'` has none to keep. Both cases now have the UI, the callback and the submitted value asserted together, since the first bug passed a test that only looked at `aria-selected`.

A third round found the same class of bug on `ListView`. It kept the `'all'` sentinel for every press, and under `'all'` `isSelected` answers with `canSelectItem`, so a preselected disabled row read as unselected. That is a select-all deselecting a row the user cannot toggle back, and the opposite of what the same press does on a `SelectList`, where the union keeps it. A press on `ListView`'s header now resolves to concrete keys whenever the selection holds a locked key, the way `SelectList` always does, and keeps the sentinel otherwise, where it still covers rows the derivation cannot address as well as rows added later. <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>A</kbd> is left as React Aria sends it, since intercepting the keyboard path of a view component is a larger decision than this bug, and the ListView page already tells consumers to resolve a `Selection` before counting it.

Clearing is deliberately not the mirror of selecting. A clear from either header keeps the locked keys and drops everything else, selected rows the derivation cannot see included, while a select adds to the selection rather than replacing it. The asymmetry is the point: a select-all that dropped a row it cannot see would take away a selection the user cannot get back, while a clear that kept one would be a clear that does not clear, and those rows can still be unticked by hand.

**What would supersede this.** The case the derivation cannot serve is a consumer's own row component, a `<VenueRow>` wrapping a `<ListView.Item>`. Every row has an `id`, and the select-all still reads "0 of 0". If that turns up in real usage rather than in review, `CollectionBuilder` is the first thing to spike, since it has the keys while rendering and so needs no bridge to guard.

## Consequences

**What this buys.** Both lists can carry the flow the Bulk Actions pattern describes, and the pattern could be rewritten for collections generally. The alignment is the component's problem, which is the only reason this cannot be composed by a consumer. A list that should not offer a select-all leaves the prop off and pays nothing.

**What it costs.**

- **The lists now own their selection state.** Every list is controlled internally, which is one more place a selection bug can live. A `Set` handed to `selectedKeys` must be passed through rather than copied, or React Aria resets the range anchor on every render and Shift+click stops extending. That is a real bug this introduced once already.
- **The keys are derived, not read from the collection.** An item without an `id` is invisible to a select-all, and the dev warning is the only thing that says so. RAC knows better and will not tell us. The sharper limit is a row that comes out of the consumer's own component: every row has an `id`, and the select-all still cannot see it, because the derivation walks the JSX the list was handed. The warning names that cause and both docs pages state the constraint, and that is the whole of what a consumer gets. If it turns up in real usage rather than in review, it is the signal to supersede this record rather than patch around it.
- **`ListView` reports `'all'` and `SelectList` reports keys.** Defensible per component, surprising when read side by side. `ListView` also drops the sentinel for concrete keys when the selection holds a locked key, so a consumer cannot count on getting one or the other.
- **`ListView` gained a wrapper element.** Its root is no longer the `role="grid"` element. Nothing in the public API changed, but a test or a selector reaching for `firstChild` would notice.
- **`SelectList`'s header sits inside the field's frame.** Outside the grid element, but inside the box, as the list's first row with a divider under it. The first implementation moved the frame onto the list element so the header sat above the box, and review found that it then read as a second label under the field's own (DST-1751). `ui-surface` is a ring rather than a border, so it takes no layout space and the two checkbox columns still resolve to the same `x`. A `ListView` has no frame, so its header is simply above the rows.
- **The region cannot grow without new props.** A count is built in; anything after it ("select all 2,431 rows", a label override) is another prop on a component that now has one boolean deciding a layout. This is the known ceiling of the choice, not an oversight.
- **Children are no longer inspected.** Dropping the part took `splitCollectionHeader` with it, and with it a crash: JSX leaves a text node in `<List.Header /> {/* comment */}`, and a RAC collection's renderer has no `createTextNode` to put it in.

**Not enforced.** No check verifies any of this. Advisory, like every record here.
