---
'@marigold/components': patch
---

fix(DST-1684): ignore virtualized ListBox row measurements taken before the list has a width

`ListLayout` sizes each virtualized row from the virtualizer's own width, which is `0` on the
first layout pass and non-finite in browser-mode test runs. Either way the row wrapper collapses,
and since `wrap-anywhere` removed the `min-width: auto` floor on options (DSTSUP-269), a row
measured in that state wraps character by character and reports a height in the hundreds of pixels.
The resulting scroll-into-view put every option behind React Aria's 300ms `pointer-events: none`
cooldown, swallowing clicks right after reopening a `Select`, `ComboBox`, `Autocomplete` or
`TagField`.
