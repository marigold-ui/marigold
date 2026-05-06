---
'@marigold/components': minor
---

feat(DST-1404): add `renderValue` prop to `<Select>` for custom trigger rendering. When provided, the callback receives the selected items and replaces the default trigger render — useful when the trigger should look different from the option (e.g. avatar + name in the trigger, avatar + name + role in the dropdown). The placeholder still renders when nothing is selected. A dev-mode warning fires if `renderValue` returns interactive children, since the trigger is itself a button.
