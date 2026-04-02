---
'@marigold/components': patch
---

fix(DSTSUP-241): remove redundant label from mobile Menu tray

The Menu component's `label` prop serves as trigger button text. On mobile,
it was also rendered as `<Tray.Title>`, duplicating the label the user just
tapped. Unlike form components (Select, ComboBox, DatePicker) where the label
describes a field, the Menu label has no additional context value inside the
tray. Removing it keeps the mobile tray clean and avoids showing non-text
labels (e.g. icons from ActionMenu) as tray titles.
