---
'@marigold/docs': patch
---

fix(DST-1673): keep example tables readable when they outgrow their container

Example tables declared no column widths, so every column fell back to
react-aria's 75px default. In the examples shell a 768px viewport still gives
the sidebar 352px, leaving 401px for content, which pinned all five columns of
`/examples/users` at that floor and let the nowrap name-and-email cell paint
146px over the Title column.

Columns now carry widths (a fraction plus a floor for the flexible ones, a
fixed width for the predictable ones), and the users, dashboard, report and
picker tables sit in `Scrollable`, so they scroll instead of overlapping. On
the dashboard that also stops the activity table inflating its panel, which is
what could wrap the 2:1 pair before `collapseAt` asked for it.

The filter table keeps the widths but no `Scrollable`: its `actionBar` overlay
renders inside `Table` as `sticky bottom-…`, so wrapping the component from
outside would re-anchor it. Its cells no longer overlap, but the columns past
the container edge stay unreachable until `Table` can own that scroll
container itself.
