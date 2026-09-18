---
'@marigold/components': patch
---

fix(DST-1684): ignore virtualized ListBox row measurements taken before the list has a width

`ListLayout` sizes each virtualized row from the virtualizer's own width, which is `0` on the
first layout pass and non-finite in browser-mode test runs. Either way the row wrapper collapses,
and since `wrap-anywhere` removed the `min-width: auto` floor on options (DSTSUP-269), a row
measured in that state wraps character by character and reports a height in the hundreds of pixels.
The resulting scroll-into-view puts the list behind React Aria's 300ms `pointer-events: none`
cooldown, which swallows a click on an option.

The observable failure was confined to browser-mode test runs, where the width never becomes
finite. In a real browser the first-pass window never reaches the DOM, because `ScrollView` settles its
width before commit, so no change in behaviour is expected for `Select`, `ComboBox`,
`Autocomplete` or `TagField`. `ListBoxLayout` now rejects measurements taken in that state, closing
both paths.
