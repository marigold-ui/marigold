---
'@marigold/components': patch
---

fix(DST-1754): keep popovers inside the box that clips them

A `<Menu>` / `<ActionMenu>` opened at the right edge of the window lost its right border and rounded corners. Reported from a product as AVW-6159 and reproducible in our own docs at `/examples` — the user menu in the App Shell top bar was cut by 3.42px at a 1280px viewport.

The mismatch is ours, and it comes out of `@marigold/theme-rui`'s `preflight.css`. `html { scrollbar-gutter: stable }` reserves a gutter, and `body { overflow-x: clip }` makes the body's box the line where anything is cut — 15px narrower than the window on the measured setup. react-aria keeps an overlay inside the **visual viewport**, which still counts that gutter, so it positions against a box wider than the one that clips and the overlay lands in the gutter.

`<Popover>` now folds the gutter into `containerPadding`, the knob react-aria exposes for exactly this. A body that does not clip, or one that is already as wide as the window, measures 0 and keeps the current 12px, so nothing changes there. Covers every overlay that goes through our `<Popover>`: Menu, ActionMenu, Select, ComboBox, ContextualHelp.

Three details are what make it hold up:

- **It is re-measured, not measured once.** RAC's triggers hand the same `children` elements back on every state change, so React bails out of re-rendering the popover's subtree — a padding measured at mount is the padding the popover still uses three zoom levels later. The gutter's width in CSS pixels shrinks as you zoom in and grows as you zoom out, so a stale one leaves the overlay cut off again at any zoom level but the one the page loaded at. The measurement now comes from a `useSyncExternalStore` fed by `visualViewport`'s `resize`, which zoom fires.
- **The width comes from `window.innerWidth`, not `visualViewport.width`.** Opening a modal popover locks the page — the scrollbar comes off screen and the visual viewport grows to the full window. `innerWidth` is already that post-lock width, so one number is right whether or not the page currently shows a scrollbar.
- **It is rounded up**, because `innerWidth` is a whole number while the real width is fractional under zoom. A pixel of padding too much is invisible; a pixel too little is a visible sliver.

The `AtViewportEdge` story reproduces the docs page geometry, and its test opens the same gap with an explicit body margin rather than relying on the platform drawing classic scrollbars — on overlay-scrollbar setups the reserved gutter is 0 and there would be nothing to catch.
