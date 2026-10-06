---
'@marigold/theme-rui': patch
---

Fix the keyboard focus ring of `Breadcrumbs` and `Tabs`.

Breadcrumb links, tabs and the tab panel now show the theme's full-contrast inset focus ring. Before, breadcrumb links fell back to the browser's default outline, and tabs showed a faint halo below the 3:1 contrast a focus indicator needs. Both were clipped by their scroll or overflow container.
