---
'@marigold/components': minor
---

feat(DST-1587): share wheel-to-horizontal-scroll between `Tabs` and `SegmentedControl`

The wheel handler that lets pointer users without a trackpad reach overflowing `Tabs` is now a shared `useWheelScrollX` hook, and `SegmentedControl` adopts it too. Wheeling vertically over an overflowing `SegmentedControl` track now scrolls it horizontally, matching `Tabs`. No public API change on either component.
