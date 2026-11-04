---
'@marigold/components': patch
'@marigold/system': patch
'@marigold/theme-rui': patch
---

fix(DST-1612): mark the edge of a `Table` that has columns out of view

A `Table` that is wider than its container scrolls sideways instead of painting over it. Nothing said so. macOS and iOS hide the scrollbar until you scroll, so on a phone the table read as a complete, narrower table and there was no reason to swipe.

**Current:** at the 320px minimum supported width, a three column table shows two columns in a tidy `Panel` and the third is simply absent. The content is reachable, but only by someone who already knows it is there.

**New:** while the table scrolls, a scrim sits on whichever edge still has columns behind it. It clears at each end of the travel, so it also says which directions are left. A table that fits its container is unchanged, and nothing changes in the component API.

The scrim paints over the rows rather than fading them. At the widths where a table scrolls, the cut usually falls in the whitespace between two columns, where a fade has no content to work with and the edge still reads as finished.

`Table` renders one more element for this: the box it was already kept inside now carries the scrim, and the scroll area is a child of it. A pseudo-element of the scroll area would be positioned against the scrolled content and would travel out of view with it.

Two new optional theme parts carry it, `Table.container` and `Table.scroller`, backed by the `ui-scroll-shadow-x` and `ui-scroll-shadow-x-timeline` utilities in `theme-rui`. Set `--scroll-shadow-color` or `--scroll-shadow-width` to change the look. A theme that defines neither part still scrolls, it just shows nothing at the edge. Without support for CSS scroll-driven animations the trailing scrim stays on, which is correct at the resting position and stale after that.
