---
"@marigold/components": patch
"@marigold/system": patch
"@marigold/theme-b2b": major
"@marigold/theme-core": major
"@marigold/theme-docs": major
"@marigold/theme-rui": major
---

refa([DST-720]): Rename `option` to `item` in styles for `<ListBox>`

**Breaking Change**: This change will break your styles if you use custom styles for the `<ListBox>` Component. `option` is now called `item`.
