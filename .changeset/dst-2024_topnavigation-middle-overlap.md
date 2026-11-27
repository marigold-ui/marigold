---
'@marigold/components': patch
'@marigold/docs': patch
---

fix(DST-2024): `TopNavigation.Middle` no longer overlaps the start content on narrow bars

`TopNavigation.Middle` keeps at least the width of its content. Before, it could shrink to zero and its content, such as a link, was painted over the breadcrumbs in `TopNavigation.Start`. The start content now gets narrower instead, and long breadcrumbs are cut off with an ellipsis.
