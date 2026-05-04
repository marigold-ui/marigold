---
"@marigold/components": minor
"@marigold/theme-rui": minor
"@marigold/system": minor
---

feat([DST-1134]): add `<RangeCalendar>` component

Adds a new `<RangeCalendar>` for selecting a contiguous (or non-contiguous) date range, built on react-aria's `<RangeCalendar>` and Marigold conventions (`disabled`/`readOnly`/`error`, `dateUnavailable`, themed via `useClassNames`). Supports up to three side-by-side months via `visibleDuration`, with months stacking vertically below the `sm` breakpoint for mobile layouts. Shares context, header, grid, and listbox primitives with `<Calendar>`. Description and error rendering go through `<FieldBase>` for visual parity with the rest of the form-component family.
