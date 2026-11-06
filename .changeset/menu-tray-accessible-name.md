---
'@marigold/components': patch
---

fix(DSTSUP-326): give the small-screen Menu and ActionMenu tray an accessible name

On small screens, `<Menu>` and `<ActionMenu>` open their items in a tray dialog that screen readers announced without a name. The tray now takes its name from the menu's `aria-label` or `aria-labelledby`. A `<Menu>` without either is named after the visible text of its trigger.
