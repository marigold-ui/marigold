---
'@marigold/components': minor
'@marigold/docs': patch
---

feat(DST-1943): select a range of Table rows with Shift+click on their checkboxes

In a `<Table selectionMode="multiple">`, holding <kbd>Shift</kbd> while clicking a row's checkbox now selects every row between the row last clicked and this one. Before, the checkbox ignored <kbd>Shift</kbd> and toggled only its own row, while a <kbd>Shift</kbd>+click on the row itself already selected the range. Both now behave the same.

A plain click on a checkbox still toggles only its row. Nothing changes in the component API, and single selection is unaffected.
