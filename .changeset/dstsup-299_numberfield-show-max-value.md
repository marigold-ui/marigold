---
'@marigold/components': minor
'@marigold/system': minor
'@marigold/theme-rui': minor
'@marigold/cli': patch
---

feat(DSTSUP-299): NumberField can show its maximum next to the value

Set `showMaxValue` on a `NumberField` with a `maxValue` to show the value and the maximum together, for example "1 / 2". Screen readers hear "of 2" as part of the field's description when focus enters the field. The maximum uses the field's `formatOptions`. Nothing is shown without a finite `maxValue` or without the prop. Themes can style the maximum through the new optional `maxValue` slot of `NumberField`, and `marigold migrate v18` adds that slot to consumer themes.
