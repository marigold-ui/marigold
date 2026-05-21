---
'@marigold/components': major
---

feat(DST-1462): support `selectionMode="multiple"` in `ComboBox` and align prop names with React Aria

`<ComboBox>` now supports multi-select via `selectionMode="multiple"`, mirroring the API on `<Select>`. While at it, the props for selection vs. input filtering are renamed to match React Aria Components and `<Select>`.

```tsx
<ComboBox label="Animals" selectionMode="multiple" onChange={setSelected}>
  <ComboBox.Option id="cat">Cat</ComboBox.Option>
  <ComboBox.Option id="dog">Dog</ComboBox.Option>
  <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
</ComboBox>
```

Additions:

- New generic signature `ComboBoxProps<T, M extends SelectionMode>`; `M` defaults to `'single'`.
- New `renderValue?: (selectedItems: T[]) => ReactNode` prop for customizing the mobile trigger when items are selected.
- The mobile trigger uses `<ComboBoxValue>` internally, so a comma-separated list of selected items renders in both single and multi modes.
- Re-exports react-aria's `ComboBoxValue` as `ComboBox.Value` for rendering selected items in custom layouts.

**Breaking changes** — prop names now match React Aria Components and Marigold's `<Select>`:

| Before              | After               | Purpose                      |
| ------------------- | ------------------- | ---------------------------- |
| `value`             | `inputValue`        | Controlled input filter text |
| `defaultValue`      | `defaultInputValue` | Default input filter text    |
| `onChange`          | `onInputChange`     | Input filter change handler  |
| `onSelectionChange` | `onChange`          | Selection change handler     |

In multiple selection mode `onChange` receives `Key[]`; in single mode it receives `Key | null` (matching React Aria's `ChangeValueType<M>`).
