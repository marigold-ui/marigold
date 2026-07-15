---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': minor
---

feat(DST-990): enrich `<Menu>` with selection visuals, keyboard shortcuts, and dividers

`<Menu>` gains richer building blocks for advanced menus:

- **Selected-item visuals.** In `selectionMode="single"` or `"multiple"`, items show a leading checkmark and a highlighted row, aligned like `<ListBox>`. Command menus (no `selectionMode`) render exactly as before.
- **Keyboard-shortcut hints** via a new shared `<Keyboard>` primitive (a sibling to `<TextValue>` and `<Description>`). Place it inside a `Menu.Item` to render a muted, right-aligned `<kbd>` that inherits react-aria's `aria-describedby` wiring.
- **`Menu.Divider`** (and `ActionMenu.Divider`) group related items with a `role="separator"` line, reusing the shared `<Divider>`.

The `Menu` record in the `@marigold/system` `Theme` type now requires a `keyboard` key, so custom themes implementing `Menu` must add it. All `@marigold/components` additions are backward compatible.
