---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': minor
---

Add a select-all to `ListView` and `SelectList`.

`<Table>` used to be the only collection that could offer a select-all, because it was the only one with a header to put a checkbox in. `allowSelectAll` now renders one for the two multi-select lists, aligned with the row indicators by the component (the padding is a custom property on the list, so a consumer composing a checkbox above it cannot line one up).

```tsx
<ListView
  aria-label="Uploads"
  selectionMode="multiple"
  allowSelectAll
  items={uploads}
>
  {upload => <ListView.Item textValue={upload.name}>…</ListView.Item>}
</ListView>
```

The checkbox is mixed while the selection is partial, and becomes checked once every selectable row has been picked. It labels itself "Select all" in the current locale, and a count beside it reports how many rows are selected. The prop only takes effect when `selectionMode="multiple"`, since there is nothing for a select-all to do in the other modes. The header sits outside the grid element rather than claiming column-header semantics a single-column collection does not have, so the checkbox carries its own visible label.

`ListView` reports `'all'` from its select-all, the same value <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>A</kbd> already reported. `SelectList` reports concrete keys instead, because a field has to submit a value: it now resolves the `'all'` sentinel to the keys it covers, which also fixes <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>A</kbd> in a multi-select `SelectList` submitting nothing at all.

Two smaller fixes come with it. A `Set` passed to `selectedKeys` is no longer copied on every render, which kept React Aria resetting the range anchor and broke <kbd>Shift</kbd>+click on a controlled list. And `ListView` now renders its list inside a wrapper element that owns the row-padding custom property, so the header and the rows read the same value.

A `SelectList`'s frame moves from its wrapper onto the list element, so the box wraps the options alone and the select-all sits above it. The `Theme` type gains `header` and `count` slots on both components, plus `container` on `ListView`.
