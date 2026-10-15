---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': minor
---

Add a select-all to `ListView` and `SelectList`.

`<Table>` used to be the only collection that could offer a select-all, because it was the only one with a header to put a checkbox in. `<ListView.Header>` and `<SelectList.Header>` now render one for the two multi-select lists, aligned with the row indicators by the component (the padding is a custom property on the list, so a consumer composing a checkbox above it cannot line one up).

```tsx
<ListView aria-label="Uploads" selectionMode="multiple" items={uploads}>
  <ListView.Header />
  {upload => <ListView.Item textValue={upload.name}>…</ListView.Item>}
</ListView>
```

The header is a part rather than a prop, so a list that should not offer a select-all simply does not render one. It appears only in `selectionMode="multiple"`, is mixed while the selection is partial, checked once every selectable row is, and labels itself "Select all" unless children say otherwise. It sits outside the grid element rather than claiming column-header semantics a single-column collection does not have, so the checkbox carries its own visible label.

`ListView` reports `'all'` from its select-all, the same value <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>A</kbd> already reported. `SelectList` reports concrete keys instead, because a field has to submit a value: it now resolves the `'all'` sentinel to the keys it covers, which also fixes <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>A</kbd> in a multi-select `SelectList` submitting nothing at all.

Two smaller fixes come with it. A `Set` passed to `selectedKeys` is no longer copied on every render, which kept React Aria resetting the range anchor and broke <kbd>Shift</kbd>+click on a controlled list. And `ListView` now renders its list inside a wrapper element that owns the row-padding custom property, so the header and the rows read the same value.
