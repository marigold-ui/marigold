---
'@marigold/components': minor
---

feat(DST-1404): add `renderValue` prop to `<Select>` for custom trigger rendering. When provided, the callback receives the selected items and replaces the default trigger render. Useful when the trigger should look different from the option (e.g. avatar plus name in the trigger, avatar plus name plus role in the dropdown). The placeholder still renders when nothing is selected.
