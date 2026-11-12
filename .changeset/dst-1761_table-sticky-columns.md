---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/docs': patch
---

feat(DST-1761): keep a table's row context visible while it scrolls sideways

`Table.Column` takes a new `sticky` prop. `sticky="start"` on the first column keeps it in place while the other columns scroll sideways, and `sticky="end"` does the same for the last column, typically the row actions. The selection checkbox and drag handle stick together with the first column. A thin line marks each edge while content scrolls under it. `sticky` on any other column is ignored with a warning during development.

Sticky columns combine with `Table.Header sticky` and `Table.Footer sticky`, and keyboard focus never lands on a cell hidden under a sticky column. They need a container that scrolls sideways, such as `Scrollable`. A cell that spans several columns with `colSpan` does not stick.

Some changes apply to every table, with or without sticky columns:

- The table is its own stacking context (`isolation: isolate`), so a sticky header or footer no longer competes with the page. A sticky `TopNavigation` now stays above a sticky table header where the two overlap.
- A sticky header and footer sit at `z-10` instead of `z-1`.
- The focus ring of a row is drawn by its cells instead of as the row's outline. It looks the same.
- Body rows have an opaque background, and the band of nested rows is mixed onto the surface instead of being transparent. Both look the same on the table's own background.
- `Table.Cell` no longer accepts `render`, like `Table.Column`.

The theme adds a `ui-sticky-edge` utility for the edge line.
