---
'@marigold/components': patch
---

fix(DST-1754): keep popovers inside the viewport's clip box at the window edge

A `<Menu>` / `<ActionMenu>` opened at the right edge of the window lost its right border and rounded corners. Reported from a product as AVW-6159 and reproducible in our own docs at `/examples` — the user menu in the App Shell top bar was cut by 3.42px at a 1280px viewport.

The mismatch comes out of `@marigold/theme-rui`'s `preflight.css`. `html { scrollbar-gutter: stable }` reserves a gutter, and `body { overflow-x: clip }` propagates a clip to the viewport, so the box that cuts is a gutter's width narrower than the window. react-aria keeps an overlay inside the **visual viewport**, which does not account for a reserved-but-unused gutter, so it positions against a box wider than the one that clips and the overlay lands in the gutter.

`<Popover>` now folds the gutter into `containerPadding`, the knob react-aria exposes for exactly this. Pages that do not reserve a gutter measure 0 and keep the current 12px. Covers every overlay that goes through our `<Popover>`: Menu, ActionMenu, Select, ComboBox, ContextualHelp.

Three details are what make it hold up:

- **The clip box is measured with a fixed-position probe**, not `document.body.getBoundingClientRect()` and not `documentElement.clientWidth`. `body { overflow-x: clip }` propagates the clip to the viewport, so the body's own box is not the line that cuts — a body or html margin moves it without moving anything real. And `clientWidth` does not subtract a gutter the browser has reserved but not filled, which is precisely the failing case. Measured against where an absolutely positioned child actually stops being painted, the fixed-positioning containing block is the only candidate that matches in every configuration.
- **It is re-measured, not measured once.** RAC's triggers hand back the same `children` elements on every state change, so React bails out of re-rendering the popover's subtree — a padding measured at mount is the padding the popover still uses three zoom levels later, and the gutter's width in CSS pixels changes with zoom. The value now comes from a `useSyncExternalStore` fed by `visualViewport`'s `resize`, which zoom fires, and is cached against `window.innerWidth` so the probe runs once per viewport width rather than once per render of every menu and select.
- **The width compared against is `window.innerWidth`**, because opening a modal popover locks the page — the scrollbar comes off screen while the reserved gutter keeps the layout narrower. `innerWidth` is already that post-lock width, so one number is right whether or not the page currently shows a scrollbar. It is rounded up, since `innerWidth` is a whole number while the real width is fractional under zoom.

Two bounded costs, both worth stating: `containerPadding` is symmetric in react-aria, so the correction also moves a left-edge overlay inward, shortens the available height for `<Select>` / `<ComboBox>` lists, and makes placement flips fire that much earlier. And an overlay that does not lock scrolling gets the correction on a page already showing its scrollbar, where it was not needed. Both are bounded by the scrollbar width and are 0 on any page that does not set `scrollbar-gutter`.

The gutter measurement has no automated test: no headless browser reserves a gutter, so the case cannot be produced. What the story test pins is the lever — that `containerPadding` reaches react-aria and holds the overlay that far off the boundary, with a value far larger than any real gutter so it cannot pass by accident. The gutter case itself is verified by hand in a headed Chrome.
