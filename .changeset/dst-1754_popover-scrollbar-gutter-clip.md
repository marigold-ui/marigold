---
'@marigold/components': patch
---

fix(DST-1754): keep popovers inside the viewport's clip box at the window edge

A `<Menu>` / `<ActionMenu>` opened at the right edge of the window lost its right border and rounded corners, 3.42px worth at a 1280px viewport. `theme-rui` reserves a scrollbar gutter on `<html>` and clips the `<body>`, but react-aria's default boundary is the visual viewport, which does not account for a gutter that is reserved and unfilled.

`<Popover>` and the table's inline editor now hand react-aria a `boundaryElement` spanning the real clip box. It is a live element, so react-aria measures it at position time and nothing has to be kept in sync with zoom or scrolling.

`<Tooltip>` is not covered: RAC's `TooltipProps` has no `boundaryElement`, and its only lever, `containerPadding`, is symmetric, so correcting the right edge would push left-anchored overlays off their trigger. Tracked against adobe/react-spectrum#10131.
