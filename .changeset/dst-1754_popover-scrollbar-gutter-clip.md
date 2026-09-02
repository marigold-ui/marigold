---
'@marigold/components': patch
---

fix(DST-1754): keep overlays inside the viewport's clip box at the window edge

A `<Popover>` — and everything built on it: `<Menu>`, `<ActionMenu>`, `<Select>`, `<ComboBox>`, `<ContextualHelp>` — lost its right border and rounded corner when it opened next to the edge of the window, the case a menu in a top bar hits. `<Tooltip>` and the `<Table>` editable-cell overlay had the same defect and are fixed with it.

react-aria keeps an overlay inside its boundary by measuring the visual viewport. On a page that reserves a scrollbar gutter (`html { scrollbar-gutter: stable }`) without rendering a scrollbar, that measurement is 15px wider than the box the page is laid out in, so an overlay pinned to the right edge landed inside the gutter — and `body { overflow-x: clip }` made that a hard cut rather than a scroll. Measured in Chrome at 1280px: the overlay's right edge sat at 1268 with the page clipping at 1265. The boundary padding now includes however far react-aria's measurement overshoots the box that actually clips, which puts the same overlay at 1253. Where react-aria is already right the correction measures 0 and nothing changes.

That padding is symmetric, so where a gutter *is* reserved the correction applies to every edge, not just the one that was clipping: an overlay at the left edge moves inward by the same amount, a `<Select>`/`<ComboBox>` list has that much less height available, and a placement flip fires that much earlier. The amount is bounded by the scrollbar width (15px on a typical desktop).
