---
'@marigold/components': minor
---

Add `nonModal` prop to `<Menu>` and `<ActionMenu>` that disables background scroll locking when the menu is open. This prevents `overflow: hidden` on the root element from breaking sticky or fixed headers.
