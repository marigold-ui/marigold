---
'@marigold/components': patch
---

fix(DSTSUP-252): make `Drawer` content scroll on small screens. On the mobile breakpoint the `Drawer` falls back to a `Modal`/`Dialog` overlay, but the `Modal` wrapper had no defined height. That made `Dialog`'s `h-full` collapse to the content's intrinsic height, so the `grid-template-rows: auto 1fr auto` layout and `Drawer.Content`'s `overflow-y-auto` never engaged — long content extended the drawer past the viewport and clipped both the content tail and the action bar. The mobile wrapper now uses `h-(--visual-viewport-height)` (the React Aria-recommended approach, which tracks mobile browser chrome), so the dialog is constrained to the visible viewport and `Drawer.Content` scrolls correctly while title and actions stay pinned.
