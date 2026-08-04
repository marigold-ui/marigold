---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': major
---

feat(DST-990): enrich `<Menu>` with selection visuals, keyboard shortcuts, and dividers

`<Menu>` gains richer building blocks for advanced menus:

- **Selected-item visuals.** In `selectionMode="single"` or `"multiple"`, items show a leading checkmark and a highlighted row, aligned like `<ListBox>`. Command menus (no `selectionMode`) render exactly as before.
- **Keyboard-shortcut hints** via a new shared `<Keyboard>` primitive (a sibling to `<TextValue>` and `<Description>`). It renders a `<kbd>` key-cap on its own and adapts to its container, so inside a `Menu.Item` it becomes a muted, right-aligned hint wired to react-aria's `aria-describedby`.
- **Dividers.** Drop the shared `<Divider>` between `<Menu.Item>`s to separate groups with a `role="separator"` line.

**Breaking (`@marigold/system`):** the `Menu` record in the `Theme` type now requires a `keyboard` key. Custom themes implementing `Menu` must add it to keep compiling. All `@marigold/components` additions are backward compatible.
