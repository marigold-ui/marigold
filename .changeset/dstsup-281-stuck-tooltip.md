---
'@marigold/components': patch
---

fix(DSTSUP-281): stop tooltips from getting stuck in the top left corner

A tooltip that another tooltip had replaced could come back after a click on its trigger, pinned to the top left corner of the screen and never closing. This showed up most often on the icon-only `Sidebar.Rail`. Closed tooltips now unmount, so they can no longer return unpositioned.

`Tooltip` no longer accepts `defaultOpen` and `onOpenChange`. They never worked on `Tooltip` itself. Set them on `Tooltip.Trigger` instead, which is where `open` moved in v18.
