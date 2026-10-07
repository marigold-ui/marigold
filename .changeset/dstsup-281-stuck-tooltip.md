---
'@marigold/components': patch
---

fix(DSTSUP-281): stop tooltips from getting stuck in the top left corner

A tooltip that another tooltip had replaced could come back after a click on its trigger, pinned to the top left corner of the screen and never closing. This showed up most often on the icon-only `Sidebar.Rail`. Closed tooltips now unmount, so they can no longer return unpositioned.
