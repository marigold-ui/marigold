---
'@marigold/components': major
---

feat(DST-1462): support `selectionMode="multiple"` in `ComboBox` and align prop names with React Aria

`<ComboBox>` now accepts `selectionMode="multiple"`, allowing users to filter and select more than one option from the list. The new `<ComboBox.Value>` (re-export of react-aria's `ComboBoxValue`) can be used to render the selected items in custom layouts. On mobile, the trigger automatically shows a comma-separated list of selected values.

```tsx
<ComboBox label="Animals" selectionMode="multiple" onChange={setSelected}>
  <ComboBox.Option id="cat">Cat</ComboBox.Option>
  <ComboBox.Option id="dog">Dog</ComboBox.Option>
  <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
</ComboBox>
```

**Breaking changes** — prop names now match React Aria Components and Marigold's `<Select>`:

| Before              | After               | Purpose                      |
| ------------------- | ------------------- | ---------------------------- |
| `value`             | `inputValue`        | Controlled input filter text |
| `defaultValue`      | `defaultInputValue` | Default input filter text    |
| `onChange`          | `onInputChange`     | Input filter change handler  |
| `onSelectionChange` | `onChange`          | Selection change handler     |

In multiple selection mode `onChange` receives `Key[]`; in single mode it receives `Key | null` (matching React Aria's `ChangeValueType<M>`).
