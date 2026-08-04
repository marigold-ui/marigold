---
'@marigold/components': major
---

feat([DST-1407]): `Drawer` enforces one open at a time.

Opening a sibling `<Drawer>` while one is already open dismisses the first.
Applies to desktop and mobile. The dismissed Drawer's `onOpenChange(false)`
is invoked so controlled-state consumers stay in sync.

A `<Drawer.Trigger>` nested *inside* an already-open Drawer is treated as a
sub-flow: the nested Drawer opens over its parent and the parent stays
mounted. Dismissing the parent in that situation would also unmount the
nested trigger and tear down the new Drawer.

**Migration:** No API change. If a flow relied on multiple simultaneous
sibling drawers, refactor to a single drawer with switchable content, or
use `<Modal>` for layered interactions.
