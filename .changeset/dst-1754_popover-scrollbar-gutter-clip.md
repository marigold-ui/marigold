---
'@marigold/components': patch
---

fix(DST-1754): keep overlays inside the viewport's clip box at the window edge

A `<Popover>` — and everything built on it: `<Menu>`, `<ActionMenu>`, `<Select>`, `<ComboBox>`, `<ContextualHelp>` — lost its right border and rounded corner when it opened next to the edge of the window, the case a menu in a top bar hits. `<Tooltip>` and the `<Table>` editable-cell overlay had the same defect and are fixed with it.

react-aria keeps an overlay inside its boundary by measuring the visual viewport, which still counts the gutter that `html { scrollbar-gutter: stable }` reserves. The box that actually clips is narrower — `body { overflow-x: clip }` propagates the clip to the viewport — so an overlay pinned to the edge landed inside the gutter and was sliced. The boundary padding now includes however far react-aria's measurement overshoots the clip box, so the overlay stops at the line that clips. Where react-aria is already right the correction measures 0 and nothing changes.

That padding is symmetric, so where a gutter *is* reserved the correction applies to every edge, not just the one that was clipping: an overlay at the left edge moves inward by the same amount, a `<Select>`/`<ComboBox>` list has that much less height available, and a placement flip fires that much earlier. The amount is bounded by the scrollbar width (15px on a typical desktop).
