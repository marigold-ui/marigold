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
fixed width for the predictable ones), and the users, dashboard and report
tables sit in `Scrollable`, so they scroll instead of overlapping. The picker
dialog's table already scrolled and only gains the widths. On the dashboard
that scroll container also stops the activity table inflating its panel, which
is what could wrap the 2:1 pair before `collapseAt` asked for it.

The filter table gets fraction-only widths and no floors. It cannot have a
`Scrollable` of its own yet, because its `actionBar` overlay renders inside
`Table` as `sticky bottom-…` and an outer wrapper would re-anchor it. Since a
static width also becomes that column's floor, floors on eleven columns would
push the table past its container at 1440px with nothing to scroll. Fractions
leave the floor where it already was, so the table keeps filling its container
at desktop width, where the name cell no longer overlaps, and narrow viewports
stay as they are until `Table` can own that scroll container itself.
