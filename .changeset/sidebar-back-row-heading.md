---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix(DST-1948): give a drilled-in Sidebar level a real heading

The section name beside the back button is now an `h2` instead of the button's label, so screen-reader heading navigation finds it on mobile and desktop. The back button keeps its "Back to …" name and still covers the whole row, and the level's region is named by the heading. Headings inside a nav now step down from the heading they sit under. Group labels on a drilled-in level move to level 3, under the section heading. In the desktop `Sidebar.Rail` panel, the nav's group labels and drill-down headings start at level 3, under the panel title. Nothing changes visually.

For custom themes: the `backButton` slot now styles the back row, which holds the chevron `button` and the heading (`[data-slot=title]`). The row is not focusable, so move `focus-visible:` styles to `has-[:focus-visible]:` and reset the button's outline with `[&>button]:outline-none`, and point `span` selectors at `button` or `[data-slot=title]`. Until then the button keeps the browser's focus ring.
