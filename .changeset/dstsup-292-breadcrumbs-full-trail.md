---
'@marigold/components': patch
---

Fix auto-collapsing `Breadcrumbs` shrinking to `… > current page` although the full trail fits.

Auto-collapse measured each crumb at the surrounding font size instead of the trail's own, so crumbs read about 10% too wide at the `small` and `default` sizes. In a slot sized by its content, such as `TopNavigation.Start`, each collapse also made the slot narrower, so the trail kept collapsing and never expanded again. Crumbs are now measured at the size they render, and the slot keeps room for the full trail, so it shows every crumb that fits and expands again when space comes back.
