---
'@marigold/theme-rui': patch
---

fix([DST-1408]): drop `position: relative` from body in theme-rui preflight

`themes/theme-rui/src/preflight.css` previously set
`body { position: relative; overflow-x: clip }` to contain
`@react-aria/live-announcer`'s portal. Empirically that containment
isn't needed: the live-announcer node is a 1×1 px element with
`overflow: hidden` and `clip-path: inset(50%)`, so its content cannot
expand the document's scrollable area in any state — a synthetic
test toggling `body.position` between `relative` and `static` with
the announcer mounted produces identical `body.scrollWidth/scrollHeight`.

Meanwhile, `position: relative` on `<body>` makes it the containing
block for absolute portals (Tooltip, Popover, Menu, Select dropdown).
React-aria's `useOverlayPosition` then takes a special-case branch
that adds the page's scroll offset on top of itself when computing
"available space above the trigger", producing a near-zero number
even when the viewport has hundreds of pixels of headroom. Every
overlay with a `top` placement (notably `<Tooltip>`) flips to
`bottom`, and forcing `placement="top"` positions the overlay far
off-screen because the same math is broken in both directions.

Removing `position: relative` while keeping `overflow-x: clip`
restores correct overlay placement without losing the defensive
horizontal-scroll guard. `clip` does not establish a containing
block for absolute descendants (per CSS Overflow Module Level 3), so
the bug cannot reappear from this rule alone — but the file's
comment now warns that `position`, `transform`, `contain`,
`filter`, `backdrop-filter`, or `will-change: transform` on `<body>`
would re-introduce it.
