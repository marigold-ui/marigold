---
'@marigold/theme-rui': patch
---

Replace fixed `hover:bg-hover hover:text-foreground` with `hover:bg-current/10` on ghost-style buttons. The new value uses `currentColor` at 10% opacity so the hover background adapts to any container (light or dark) without forcing a fixed stone-100 background or overriding text color. Applied consistently to `Button` (ghost, destructive-ghost), `IconButton`, `Pagination`, `Tabs`, and `Table` editable-cell action buttons.
