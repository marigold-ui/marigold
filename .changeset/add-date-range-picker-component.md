---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(DST-1551): add `DateRangePicker` component

New `<DateRangePicker>` lets users enter or select a start–end date range through a single field, mirroring `<DatePicker>`'s API and behaviour. Two date inputs (`start`/`end`) sit in one field group with a calendar button that opens a `<RangeCalendar>` in a popover on desktop and a tray on small screens. Supports per-input paste (ISO/EU/US formats), `granularity` (inline time segments), `visibleDuration` (up to three months), and the usual Marigold field props (`disabled`, `readOnly`, `required`, `error`, `errorMessage`, `description`, `minValue`, `maxValue`, `dateUnavailable`, `width`, `variant`, `size`). Adds a matching `DateRangePicker` theme entry to `theme-rui`.
