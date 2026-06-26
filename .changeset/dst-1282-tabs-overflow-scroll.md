---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': minor
---

feat(DST-1282): scroll the Tabs row horizontally when it overflows

When more tabs are rendered than fit the available width, `Tabs.List` now scrolls
horizontally instead of wrapping onto multiple lines or pushing the page wide. Tabs
keep their natural width (`shrink-0`) and snap gently into place (`proximity`) as you
scroll, with the adjacent tab kept peeking past the edge so the scrollability stays
discoverable. A vertical mouse wheel scrolls the row horizontally (pointer users
without a trackpad), without hijacking normal page scroll. Horizontal overscroll is
contained so it does not trigger browser back/forward gestures, and scrolling is
smooth for users who allow motion. On browsers that support scroll-driven animations
the overflowing edges fade out (`ui-scroll-mask-x`); elsewhere it falls back to a
plain scroll container. When all tabs fit, nothing changes visually.

The sliding selection indicator stays correct while react-aria scrolls an off-screen
tab into view (the scroll container is a `layoutScroll` motion element). No API change.
