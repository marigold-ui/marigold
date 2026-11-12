---
'@marigold/components': patch
---

refactor(DST-1957): `TagGroup` and `Sidebar` pass state to their parts through context

`TagGroup` with `collapseAt` now also hides tags that you wrap in your own component. Before, the wrapper received `hidden` and the tag stayed visible unless the wrapper passed it on.

A `Sidebar.Nav` inside a `Sidebar.Rail` section now respects its own `current` prop. Before, the rail's `current` always replaced it. Without the prop, the nav still follows the rail.
