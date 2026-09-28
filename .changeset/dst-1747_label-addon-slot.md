---
'@marigold/components': minor
'@marigold/docs': patch
---

feat(DST-1747): add an `addon` slot to every form field label

Every form field now takes an `addon` that renders at the end of its label, such as a `<Badge>` for an access level or a `<ContextualHelp>` that explains the field. The slot sizes its content to the label's line, so a label with an addon is as tall as one without and the field below it doesn't move. This covers `Autocomplete`, `Checkbox.Group`, `ComboBox`, `DateField`, `DatePicker`, `DateRangePicker`, `FileField`, `NumberField`, `Radio.Group`, `SearchField`, `SegmentedControl`, `Select`, `SelectList`, `Slider`, `TagField`, `TagGroup`, `TextArea`, `TextField` and `TimeField`.

```tsx
<Select label="Associated Team" addon={<Badge variant="master">Master</Badge>} />
```

`Checkbox`, `Radio` and `Switch` rename their `badge` slot to `addon`, so one name works across all form fields. Replace `badge={…}` with `addon={…}`.

A badge no longer needs `size="inline"` in a field label, since the slot sets it. Labels that built the badge into `label` by hand were 16px tall. Through the slot they stay at the 14px of a bare label.

A `<Badge>` inside a `<ContextualHelp>` popover keeps its own size when the help sits in an addon.
