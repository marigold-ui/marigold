---
'@marigold/components': patch
---

fix(DST-1754): keep popovers inside the viewport's clip box at the window edge

A `<Menu>` / `<ActionMenu>` opened at the right edge of the window lost its right border and rounded corners — 3.42px at a 1280px viewport. `theme-rui` reserves a scrollbar gutter on `<html>` and clips the `<body>`, but react-aria positions against the visual viewport, which does not account for a gutter that is reserved and unfilled. So the overlay is kept inside a box wider than the one that cuts.

`<Popover>` now folds the gutter into `containerPadding`. It is measured against the fixed-positioning containing block — the body's own box and `documentElement.clientWidth` are both wrong, in opposite cases — and re-measured on `visualViewport` resize, since the gutter's width in CSS pixels changes with browser zoom. Pages without a reserved gutter measure 0 and keep the current 12px.

Two bounded costs: `containerPadding` is symmetric in react-aria, so the correction also moves a left-edge overlay inward, shortens `<Select>` / `<ComboBox>` lists and makes placement flips fire earlier; and an overlay that does not lock scrolling gets the correction on a page already showing its scrollbar, where it was not needed. Both are bounded by the scrollbar width.
