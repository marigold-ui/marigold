---
'@marigold/theme-rui': patch
'@marigold/components': patch
---

Fix the keyboard focus ring of `Breadcrumbs` and `Tabs`.

Breadcrumb links, tabs and the tab panel now show the theme's full-contrast inset focus ring. Before, breadcrumb links fell back to the browser's default outline, and tabs showed a faint halo below the 3:1 contrast a focus indicator needs. Both were clipped by their scroll or overflow container.

The tab panel gains 4px of inline padding, offset by a matching negative margin, so the ring clears its content without moving it. Breadcrumbs' auto-collapse now measures the link padding too, so it collapses at the right width.
