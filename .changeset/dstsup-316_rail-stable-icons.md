---
'@marigold/theme-rui': patch
---

style(DSTSUP-316): keep Sidebar.Rail icons in place when the rail collapses

The icons in `Sidebar.Rail` no longer slide up and down when the rail collapses or expands.

**Current:** collapsing folded away the label row under each icon, so every tile got shorter. The shift added up down the list, and the bottom icon moved by around 100px in a rail with six or seven sections. On the collapsed rail, the active item was marked by a fill on the whole tile.

**New:** the label fades out but keeps its space, so every icon stays exactly where it was. Each label reserves room for two lines, which keeps the spacing between icons even in both states. On the collapsed rail, the current item and the active section are marked by a pill around the icon, and the focus ring follows it.

Collapsed tiles are now as tall as expanded ones, so a long rail starts scrolling a little sooner when collapsed. Nothing changes in the component API.
