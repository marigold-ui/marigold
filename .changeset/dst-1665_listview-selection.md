---
'@marigold/system': minor
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/docs': patch
---

feat(DST-1665): add selection to `<ListView>`

`<ListView>` shipped with selection deliberately omitted: all six selection props were stripped from its public type and `selectionMode` was hardcoded to `"none"`. It now takes `selectionMode="single"` or `"multiple"`, defaulting to `"none"` so a list that does not ask for selection is byte-identical to before.

The selection is **view state, not a field value**. Read it through `onSelectionChange`, hold it yourself, and decide when it commits. `<ListView>` has no `FieldBase` wiring, no hidden input, and no `name`, `form` or `validate`, and it will not grow them: a selection that has to submit and validate with a form is what `<SelectList>` is for. That split is what keeps two `GridList` wrappers from being redundant, now that both render a nearly identical stack of rows.

`onSelectionChange` receives React Aria's raw `Selection` (`'all' | Set<Key>`), deliberately not `<SelectList>`'s mode-typed `onChange`, because `'all'` is meaningful for a view and unsubmittable for a field. `disallowEmptySelection` passes React Aria's default through in both modes, unlike `<SelectList>`, which defaults it to `true` in single mode for radio-group semantics. A view's selection has to be abandonable, and `true` would also disable Escape-to-clear.

`selectionBehavior` is fixed to `"toggle"` and stays unexposed, matching `<Table>`. There is no equivalent of React Spectrum's `selectionStyle="highlight"`, so no press replaces the whole selection and <kbd>Shift</kbd>+click does not take a range.

**Row layout**

The row's named-area grid gains a leading `indicator` region, so the template goes from `'label actions' 'description actions'` to `'indicator label actions' 'indicator description actions'`. The `ListView` slot union in `@marigold/system` gains `indicator` to match. Spacing rides on the cell (`me-3`) rather than a column gap, mirroring how `actions` carries `ms-3`, so with nothing in the area the `auto` track sizes to 0 and the margin does not exist.

The indicator is centred against the whole text stack and pinned to the start of its column. Pinning matters once the column widens, which it does when a row carries an unslotted child.

That is worth knowing when authoring: a child claiming none of the row's three regions, a `<Badge>` being the likely case, is auto-placed by the grid and lands in the indicator column, widening it and pushing the text of **every** row in the list out of line. Nest it in `<TextValue>` or `<Description>` instead. Before selection this misplaced a badge onto its own line; now it misaligns the list.

**Selecting and opening a row**

`onAction` still works alongside `selectionMode`, and which gesture a press performs depends on whether anything is selected. With an empty selection a row press, or <kbd>Enter</kbd>, opens the item, and the checkbox or <kbd>Space</kbd> selects without opening. Once anything is selected a press marks a row instead and nothing opens. <kbd>Escape</kbd> clears the selection and opening works again.

One rough edge in that second state, measured rather than inferred: <kbd>Enter</kbd> does nothing at all. It neither opens nor toggles, so a keyboard user gets no response of any kind, where a mouse click at least marks the row. React Aria's own guidance covers only clicking and taps, so this is undocumented upstream. A story test pins all four keys.

**Bulk actions**

A multi-select list composes with `<ActionBar>` with no new API. The bar carries `sticky bottom-(--actionbar-offset)` in the component, so rendered inside the list's scroll container it pins itself to the bottom. Drive it with the exported `useActionBar` hook, which holds the selection, fills in the count and clear button, and measures the bar so you can reserve its height in `padding-bottom` and `scroll-padding-bottom`.

**Select-all is not included.** The Bulk Actions pattern puts it in a header checkbox and a list has no header row to hold one, so a flow where users select every visible record still wants a `<Table>`. Tracked separately.

**Internal**

`SelectList/SelectionIndicator.tsx` moves to `utils/GridSelectionIndicator.tsx` and is shared by both wrappers. Nothing here was publicly exported, so this is internal naming only, chosen because three separate things share the bare name `SelectionIndicator`: `ListBox`'s, this one, and React Aria's own.

**Documentation**

`/components/collection/listview` gains a Selection section covering the modes, the view-state rule, the gesture switch, and the bulk-actions composition, with three new demos. The indicator is added to the anatomy. Both component pages lead with one decision test, "does the selection need to submit with the form?", with one exception named: a pick that never submits but needs a visible label, helper text, or a validation message is still a `<SelectList>`, because `<ListView>` renders none of those.

The Pick pattern moves with it. Its "List or table" section now chooses by surface, and the people pick, a dialog that stages a selection and commits it with its own button, migrates from `<SelectList>` to `<ListView>`. The Abonnement pick stays a `<SelectList>`, being the labelled-field case.
