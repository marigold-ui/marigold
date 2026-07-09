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

The app shell keeps exactly one structural line: the sidebar divider, now at
full surface-hairline strength (it bounds the nav column so the branch rows'
trailing chevrons anchor against it, and it stays perceivable at low vision).
Every other shell line is gone — the sidebar header/footer hairlines and the
`TopNavigation` bottom border — so regions separate on whitespace and the
content panels carry the structure. The sticky `TopNavigation` reveals a bottom
hairline only once page content scrolls underneath it (`ui-scroll-edge`, a
scroll-driven progressive enhancement; non-supporting browsers simply stay
borderless). The mobile sidebar drawer wears the overlay elevation,
`Sidebar.Separator` steps up to the full-strength surface hairline, and the
sidebar footer quiets its links (secondary color, normal weight) so escape
hatches never compete with navigation.

When the nav scrolls, the sidebar's own sticky header and footer reveal a seam
so mid-list rows never butt against them without a divider. Because the nav is
a grid sibling between the two (not their ancestor), the seam is driven by a
named scroll timeline the nav declares, hoisted into scope for the header via
`timeline-scope` — a set of `ui-sidebar-seam-*` utilities marked non-reusable
since they are specific to this layout. The header seam fades in as content
scrolls under it; the footer seam shows while content remains below and fades
out as the list bottoms out. Without scroll-driven animation support it falls
back to an always-on hairline.
