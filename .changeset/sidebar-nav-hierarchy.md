---
'@marigold/theme-rui': minor
---

style(Sidebar): quieter navigation hierarchy and a unified app-shell hairline

The sidebar navigation now carries hierarchy with semantic tokens instead of raw
charcoal values. The current page is an inset rounded pill (`selected` fill,
`foreground` text); idle rows sit a step lighter on `secondary` and preview the
pill in the `hover` charcoal. Section labels stay on `secondary` so they meet
WCAG AA contrast and read as their own tier through treatment — uppercase,
smaller, heavier, tracked — with an even gap opening above every section. The
drill-in back action shares the nav-row pill geometry, so it aligns to the same
content column and reads at the same weight as a nav item.

The navigation is also denser: rows sit at a fixed 30px height with a tighter
horizontal inset, section labels keep one even rhythm, and the sidebar toggle
steps down to the small control size with a lighter icon — more rows per screen
without losing the pill affordance.

Every line in the app shell — the sidebar's content divider, header and footer,
plus the `TopNavigation` bottom border — now shares one faint hairline (the
translucent surface edge) instead of a heavier solid border.
