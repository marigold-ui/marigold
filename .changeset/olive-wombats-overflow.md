---
'@marigold/components': minor
---

feat(DST-1646): add `OverflowRegion`, a single-row layout primitive that hides trailing items instead of wrapping when horizontal space runs out, and restores them as space returns. Hidden items stay mounted (state preserved) but are removed from paint, tab order, and the accessibility tree. Space its items with the `space` prop (like `Inline`), and pair it with the `indicator` render prop or the `onOverflowChange` callback so hidden items stay reachable through another surface, e.g. quick filters demoting into a filter panel.
