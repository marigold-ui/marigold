---
'@marigold/components': patch
'@marigold/system': patch
'@marigold/theme-rui': patch
---

fix(DST-1612): keep a Table inside its container when the columns no longer fit

A `Table` whose column minimums add up to more than the space available painted outside its container instead of staying in it. At 320px, the minimum supported viewport width, that was every table with more than a couple of columns, and the rows ran across the edge of the surrounding `Panel`.

**Current:** the columns never shrink below the sum of their minimum widths, and the table simply overflowed whatever box it was in. The content past the container's edge was only reachable by scrolling the page sideways, if the page scrolled at all.

**New:** when less width than that is available, the table scrolls sideways inside its own container, so nothing paints over the container's edge and every column stays reachable. While it scrolls, whichever edge still has columns behind it fades out, and the fade clears at each end of the travel, so it also says which directions are left. A container that can give the columns their minimums is left alone, and nothing changes in the component API.

While a table scrolls sideways, a sticky header or footer and the `actionBar` pin to that scroll area rather than to the page, because it is the nearest scrollport. A table wrapped in a `<Scrollable>` is left alone, since that scroll area already contains the table and has a height of its own to pin them to. Tables that fit keep following the page as before.

The guard that leaves a table alone looks for a `Scrollable` rather than reading the scroll parent's `overflow-x`. CSS computes `overflow-x` to `auto` whenever `overflow-y` is not `visible`, so every vertically scrolling ancestor would otherwise report itself as a sideways scroll area: inside a `Dialog`, a `Drawer` or an app shell whose main region scrolls, the table would keep overflowing its panel.

One new optional theme part carries the fade, `Table.container`, backed by the existing `ui-scroll-mask-x` utility in `theme-rui`. Set `--sc-mask-width` to change how far the fade reaches. A theme that defines the part as nothing still scrolls, it just shows a plain scrollbar. The same applies without support for CSS scroll-driven animations: there is no fade, only the scrollbar.

`ui-scroll-mask-x` no longer hides the native scrollbar, because a scroll affordance should not take away the one the browser gives you. Hiding it is now a separate `ui-scrollbar-none` utility, which `Tabs` and `SegmentedControl` opt into so they look as they did. A horizontal scrollbar under a row of tabs is unconventional chrome a fade can replace, but under a table it is what a pointer user reaches for, so `Table.container` pairs the fade with `ui-scrollbar` and keeps it. If you used `ui-scroll-mask-x` in your own code and want no scrollbar, add `ui-scrollbar-none`.
