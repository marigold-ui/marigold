---
'@marigold/components': patch
---

Fix auto-collapsing `Breadcrumbs` not collapsing when all but one crumb fits.

At widths where auto-collapse found room for every crumb except one, it asked for as many visible slots as there are crumbs. That reads as "nothing to collapse", so the full trail rendered and the current crumb was truncated to fit. Auto-collapse now reports "everything fits" separately from a slot count, so the collapse it decided on actually happens and the current crumb stays readable. Surfaced by `TopNavigation` at the 320px minimum supported width.

One visible change beyond that: a two crumb trail too narrow for both crumbs now collapses to `… > Event Details` where it used to render `Home > Event Det…`. Trails of three crumbs or more are unaffected.
