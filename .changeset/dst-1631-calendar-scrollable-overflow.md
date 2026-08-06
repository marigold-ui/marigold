---
'@marigold/theme-rui': patch
---

fix(DST-1631): keep the `RangeCalendar` within its container on small screens. Each month carried a hard `min-w-[250px]` with no breakpoint guard, so below `sm` (where the months stack) the calendar could not shrink and overflowed a narrow Panel. The floor is now gated to `sm` and up (`min-w-0 sm:min-w-[250px]`), letting the flexible-cell grid shrink to fit while the desktop two-across layout is unchanged.
