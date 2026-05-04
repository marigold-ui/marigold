---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': minor
'@marigold/docs': patch
---

feat([DST-1134]): add `<RangeCalendar>` component (alpha)

Adds a new `<RangeCalendar>` for selecting a contiguous or non-contiguous date range, built on react-aria's `<RangeCalendar>` with Marigold conventions (`disabled`, `readOnly`, `error`, `dateUnavailable`, `allowsNonContiguousRanges`). Supports up to three side-by-side months via `visibleDuration`, stacking vertically below the `sm` breakpoint; the same responsive stacking now applies to multi-month `<Calendar>` for parity. `description` and `errorMessage` route through `<FieldBase>` so the help/error UI matches the rest of the form-component family (TriangleAlert icon + HelpText container). Ships as an alpha component with a stub docs page under the form section.

[DST-1134](https://reservix.atlassian.net/browse/DST-1134)
