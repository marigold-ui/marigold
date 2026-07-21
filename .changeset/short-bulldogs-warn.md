---
"@marigold/components": patch
---

feat([DST-1396]): mobile-optimized pagination layout

`Pagination` now hides the numbered page buttons on small viewports (`max-sm`) and spreads the previous/next navigation buttons across the full width using `justify-between`. This produces a cleaner, touch-friendly pagination on mobile while preserving the full layout on larger screens.

