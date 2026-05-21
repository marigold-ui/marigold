---
'@marigold/components': minor
---

feat(DST-1462): support `selectionMode="multiple"` in `ComboBox`

`<ComboBox>` now accepts `selectionMode="multiple"`, allowing users to filter and select more than one option from the list. The new `<ComboBox.Value>` (re-export of react-aria's `ComboBoxValue`) can be used to render the selected items in custom layouts. On mobile, the trigger automatically shows a comma-separated list of selected values.

```tsx
<ComboBox label="Animals" selectionMode="multiple">
  <ComboBox.Option id="cat">Cat</ComboBox.Option>
  <ComboBox.Option id="dog">Dog</ComboBox.Option>
  <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
</ComboBox>
```
