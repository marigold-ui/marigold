---
id: ADR-0008
status: accepted # accepted | superseded-by ADR-NNNN
date: 2026-11-11
applies_to:
  - 'packages/components/src/Table/**'
  - 'themes/theme-rui/src/ui.css'
---

# 0008. Table columns stick with `sticky`, one per edge, marked by a hairline

## Context

A table wider than its container scrolls every column together, so the column that names each row leaves the screen and the remaining cells lose their label. Two teams hit this within weeks (DST-1761): the ABR-V reclaim overview needs its row identifier and its trailing actions, PriceProfiles needs the "Preiskategorien" label column of a price matrix. Both were about to hand-roll sticky positioning against our markup.

`Table.Header sticky` and `Table.Footer sticky` already solve the vertical half. The ticket left three questions open: how many columns can stick, what the prop is called, and what the boundary looks like.

The cost of the first question is driven by layout. A sticky column's inline offset is the summed width of every column before it. `ResizableTableContainer` lets those widths change at runtime, so arbitrary sticky columns mean measuring and re-offsetting on every resize. The only columns that can sit before the first data column are the drag and selection columns `Table.Header` injects, and those are a fixed 36px (`injectedColumnWidth`) and cannot be resized.

## Decision

**The prop is `sticky="start" | "end"` on `Table.Column`.** It matches `Table.Header`, `Table.Footer` and `TopNavigation`, which all call staying in place while content scrolls `sticky`. A boolean cannot say which edge, so the value names it.

**One column per edge.** `start` applies to the first column only, and the injected drag and selection columns stick along with it. `end` applies to the last column only. `sticky` on any other column is ignored with one dev warning per table. A cell with `colSpan` never sticks, because it would hold every column it spans in place. With only fixed 36px columns in front of a start column, its offset is a constant (`start-0`, `start-[36px]`, `start-[72px]`) and needs no measuring.

**The boundary is a 1px hairline** (`ui-sticky-edge` in `ui.css`), shown only while content scrolls under that edge, through a scroll-driven animation with a static line as fallback. Nothing shows while there is nothing to scroll.

**No automatic switch-off on narrow screens.** The docs ask for one narrow sticky column on small screens instead.

DOM order, focus order and grid keyboard navigation do not change. A focused cell scrolls clear of the sticky columns through `scroll-margin`.

## Alternatives rejected

- **`pinned`.** It is what MUI, AG Grid and TanStack call it, but there it implies the user pins columns at runtime, which is out of scope. Naming it `pinned` would invite that feature request and break the match with `Table.Header sticky`.
- **A boolean `sticky`.** It cannot tell the leading edge from the trailing one, and ABR-V needs both.
- **Any column can stick, or several per edge.** Neither known case needs it, and it turns a constant offset into runtime measurement against resizable widths. It can be added later without an API change: `sticky="start"` on adjacent columns would keep its meaning.
- **A shadow on the edge.** `tokens.css` reserves shadows for overlays (a single-tier hierarchy where nothing in normal flow casts one), and every other scroll-revealed edge in the theme is a hairline.
- **An always-visible edge.** A line with nothing scrolled under it marks a boundary the user cannot perceive yet, and reads as a stray border.

## Consequences

- The offsets in `TableStickyCell.tsx` duplicate `injectedColumnWidth` from `TableHeader.tsx`. If the injected columns ever change width or become resizable, both places have to change, and a per-column CSS variable set by `TableElement` becomes the better design.
- Supporting several columns per edge later means that measurement work. The API already allows it, the implementation does not.
- Every table changes, not only sticky ones: the table is `isolate`, sticky header and footer move from `z-1` to `z-10`, body rows get an opaque `bg-surface`, and the row focus ring moves from the `<tr>` outline to a cell `::before`, because a sticky cell would cover an outline.
- The hairline's visibility depends on `animation-timeline: scroll()`. Without it the line is always shown, which is the fallback rather than a bug.
- A table's own scroll area (#6007) must turn its edge fade off on a sticky edge, or the fade will cover the sticky column.
