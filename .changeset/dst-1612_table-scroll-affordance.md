---
'@marigold/components': patch
'@marigold/system': patch
'@marigold/theme-rui': patch
---

fix(DST-1612): mark the edge of a `Table` that has columns out of view

A `Table` that is wider than its container scrolls sideways instead of painting over it. Nothing said so. macOS and iOS hide the scrollbar until you scroll, so on a phone the table read as a complete, narrower table and there was no reason to swipe.

**Current:** at the 320px minimum supported width, a three column table shows two columns in a tidy `Panel` and the third is simply absent. The content is reachable, but only by someone who already knows it is there.

**New:** while the table scrolls, whichever edge still has columns behind it fades out. The fade clears at each end of the travel, so it also says which directions are left. A table that fits its container is unchanged, and nothing changes in the component API.

One new optional theme part carries it, `Table.container`, backed by the existing `ui-scroll-mask-x` utility in `theme-rui`. Set `--sc-mask-width` to change how far the fade reaches. A theme that defines the part as nothing still scrolls, it just shows a plain scrollbar. The same applies without support for CSS scroll-driven animations: the utility keeps the native scrollbar there instead of fading.
