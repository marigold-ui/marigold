---
'@marigold/theme-rui': minor
---

style(Sidebar): quieter navigation hierarchy and a unified app-shell hairline

The sidebar navigation now carries hierarchy with semantic tokens instead of raw
charcoal values. The current page is an inset rounded pill (`selected` fill,
`foreground` text); idle rows sit a step lighter on `secondary` and preview the
pill in the `hover` charcoal. Section labels stay on `secondary` so they meet
WCAG AA contrast and read as their own tier through treatment — uppercase,
smaller, heavier, tracked — with a wider gap opening above a section than below
its label. The drill-in back action shares the nav-row pill geometry, so it
aligns to the same content column and reads at the same weight as a nav item.

Every line in the app shell — the sidebar's content divider, header and footer,
plus the `TopNavigation` bottom border — now shares one faint hairline (the
translucent surface edge) instead of a heavier solid border.
