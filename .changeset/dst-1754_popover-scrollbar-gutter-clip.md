---
'@marigold/components': patch
---

fix(DST-1754): keep overlays inside the viewport's clip box at the window edge

A `<Popover>` — and everything built on it: `<Menu>`, `<ActionMenu>`, `<Select>`, `<ComboBox>`, `<ContextualHelp>` — lost its right border and rounded corner when it opened next to the edge of the window, the case a menu in a top bar hits. `<Tooltip>` and the `<Table>` editable-cell overlay had the same defect and are fixed with it.

react-aria keeps an overlay inside its boundary by measuring the visual viewport. On a page that reserves a scrollbar gutter (`html { scrollbar-gutter: stable }`) that measurement is a gutter wider than the box the page is laid out in, so an overlay pinned to the right edge landed inside the gutter — and `body { overflow-x: clip }` made that a hard cut rather than a scroll. The overlay puts the page into that state itself: opening one locks scrolling, which removes the scrollbar while the reserved gutter stays. Measured on the docs in Chrome at 1280px, the menu's right edge sat at 1268 with the page clipping at 1265; it now sits at 1253.

The boundary padding includes the reserved gutter, which is 0 on a page that does not ask for one — so nothing moves for anyone who has not set `scrollbar-gutter`.

Where a gutter *is* reserved, two bounded costs come with it. The padding is symmetric, so the correction applies to every edge, not just the one that was clipping: an overlay at the left edge moves inward by the same amount, a `<Select>`/`<ComboBox>` list has that much less height available, and a placement flip fires that much earlier. And an overlay that does not lock scrolling — a `<Tooltip>`, or a non-modal popover — gets the correction on a page that is already showing its scrollbar and did not need it, so it stops a gutter's width earlier than it had to. Both are bounded by the scrollbar width (15px on a typical desktop).
