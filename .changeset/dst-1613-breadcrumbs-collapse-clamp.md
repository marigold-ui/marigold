---
'@marigold/components': patch
---

Fix auto-collapsing `Breadcrumbs` overflowing when all but one crumb fits.

At widths where auto-collapse found room for every crumb except one, it asked for as many visible slots as there are crumbs. That reads as "nothing to collapse", so the full trail rendered at its natural width and spilled past the container, clipping the current crumb. It now collapses in that case, moving the extra crumb under the ellipsis. Surfaced by `TopNavigation` at the 320px minimum supported width.
