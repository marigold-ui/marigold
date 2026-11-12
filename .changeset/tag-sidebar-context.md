---
'@marigold/components': patch
---

refactor(DST-1957): `TagGroup` and `Sidebar` pass state to their parts through context

`TagGroup` with `collapseAt` now also hides tags that you wrap in your own component. Before, the wrapper received `hidden` and the tag stayed visible unless the wrapper passed it on.

A `Sidebar.Nav` inside a `Sidebar.Rail` section now respects its own `current` and `aria-label` props. Before, the rail's `current` and the panel title always replaced them, so the nav landmark was always named after the panel. Without the props, the nav still follows the rail and is named after the panel title.
