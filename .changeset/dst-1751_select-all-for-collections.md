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

A `SelectList` keeps the select-all inside its frame, as the list's first row above the options, separated by a divider of the same weight as the ones between options. A `ListView` has no frame, so its select-all sits above the rows.

The `Theme` type gains `header` and `count` slots on both components, plus `container` on `ListView`. All three are optional, so a custom theme written before this release still compiles and renders: `useClassNames` returns `undefined` for a slot a theme does not supply, and the components render without it. A `SelectList`'s `p` / `px` / `py` props keep writing their custom properties onto the list as well as the new wrapper, so a theme that declares the same variables on its own `list` slot does not win over the prop.

Two fixes to the select-all itself, both on `SelectList`: a disabled option that was preselected is kept when the select-all selects everything or clears it, since the user cannot toggle it either way, and clearing from the header now honours `disallowEmptySelection` the way React Aria's own `clearSelection` does. `ListView`'s header honours it too. A controlled `selectedKeys="all"` is resolved to concrete keys as well, so it submits and validates like any other selection.
