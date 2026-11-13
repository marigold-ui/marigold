---
'@marigold/components': minor
'@marigold/system': minor
'@marigold/theme-rui': minor
---

feat(DSTSUP-299): NumberField can show its maximum next to the value

Set `showMaxValue` on a `NumberField` with a `maxValue` to show both together, for example "1 / 2". Screen readers hear "of 2" as part of the field's description when focus enters the field. The maximum uses the field's `formatOptions`. Without a finite `maxValue` nothing is shown. Nothing changes for fields that don't set the prop. Name the counted unit in the label, because the maximum has none of its own. Themes can style the maximum through the new optional `maxValue` slot of `NumberField`.
