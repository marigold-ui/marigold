---
'@marigold/components': patch
---

fix(DST-1754): keep overlays inside the viewport's clip box at the window edge

A `<Popover>` — and everything built on it: `<Menu>`, `<ActionMenu>`, `<Select>`, `<ComboBox>`, `<ContextualHelp>` — lost its right border and rounded corner when it opened next to the edge of the window, the case a menu in a top bar hits. `<Tooltip>` and the `<Table>` editable-cell overlay had the same defect and are fixed with it.

react-aria keeps an overlay inside its boundary by measuring `visualViewport.width`. A scrollbar gutter is inside that width but outside the box the page is laid out in, so an overlay pinned to the boundary landed in the gutter — and `body { overflow-x: clip }` made that a hard cut rather than a scroll. Overlays create that state themselves: opening a modal one locks scrolling, which takes the scrollbar off the screen while react-aria reserves its gutter so the page does not shift. Measured on the docs in Chrome at 1280px, the menu's right edge sat at 1268 with the page clipping at 1265; it now sits at 1253, level with its trigger.

The correction is the gutter's width, which is 0 on a page that reserves none and 0 where the platform draws scrollbars as overlays — so nothing moves for anyone who was not affected. It is measured per overlay against the state that overlay will be positioned in: one that locks scrolling is corrected for the gutter it is about to create, while one that leaves scrolling alone — a `<Tooltip>`, a non-modal popover — is not corrected for a scrollbar that is really on screen, because `visualViewport.width` already excludes it.

Two costs remain where a gutter is genuinely reserved, both bounded by the scrollbar width (15px on a typical desktop). The padding is symmetric, so the correction applies to every edge, not just the one that was clipping: an overlay at the left edge moves inward by the same amount, a `<Select>`/`<ComboBox>` list has that much less height available, and a placement flip fires that much earlier.
