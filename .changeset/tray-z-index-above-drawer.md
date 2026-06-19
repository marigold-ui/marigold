---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix: make Select and Menu overlay appear above Drawer on small screens

On small screens, `Select` and `Menu` render their options in a `Tray` (bottom sheet). The `Tray` overlay had `z-40` in the theme while the `Drawer` overlay uses `z-50`, so the tray rendered behind an open drawer and was unreachable.

Moved the `z-index` from the theme style file into the `TrayModal` component implementation (matching the project's z-index architecture rule), and raised it to `z-50`. Both the `Drawer` and `Tray` portal to `document.body`; at equal z-index, DOM order determines stacking. The `Tray` is always mounted after the `Drawer`, so it correctly appears on top.
