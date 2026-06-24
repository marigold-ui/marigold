---
'@marigold/theme-rui': patch
---

fix(DST-1560): use the defined `ui-scrollbar` utility on Drawer and Sidebar

`Drawer` and `Sidebar` referenced `util-scrollbar`, which is not defined in the theme (only `ui-scrollbar` exists in `ui.css`), so they rendered without the themed scrollbar while Dialog, Tray, and ContextualHelp got it. Corrected both to `ui-scrollbar`.
