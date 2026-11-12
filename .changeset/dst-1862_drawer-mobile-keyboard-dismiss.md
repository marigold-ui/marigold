---
'@marigold/components': patch
---

fix(DST-1862): respect `keyboardDismissable` on the mobile Drawer

`<Drawer keyboardDismissable={false}>` now also stays open on Escape on small screens, where it renders as a sheet. Before, the prop only reached the desktop drawer.
