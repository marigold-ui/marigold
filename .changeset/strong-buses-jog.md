---
"@marigold/docs": patch
"@marigold/components": major
---

refa: Improve behavior of `<Stack>` and remove option to render it as a list (use `<List>` instead)

- `<Stack>` will no longer align items by default, since this will cause children to not take all the available space
- `<Stack as="ul|ol">` will no longer work, we have a `<List>` comopnent for that
