---
'@marigold/components': major
---

feat([DST-1407]): `Drawer` enforces one open at a time.

Opening a second `<Drawer>` while one is already open dismisses the first.
Applies to desktop and mobile, regardless of where the Drawers live in the
tree. The dismissed Drawer's `onOpenChange(false)` is invoked so
controlled-state consumers stay in sync.

**Migration:** No API change. If a flow relied on multiple simultaneous
drawers, refactor to a single drawer with switchable content, or use
`<Modal>` for layered interactions.
