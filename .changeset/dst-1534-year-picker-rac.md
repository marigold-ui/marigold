---
'@marigold/components': patch
---

refactor(DST-1534): build the `Calendar` year dropdown on react-aria's `CalendarYearPicker`

The year dropdown now consumes react-aria's `CalendarYearPicker` render-prop (mirroring how the month dropdown already uses `CalendarMonthPicker`), replacing the hand-rolled year list and its localized `aria-label` workaround. This was unblocked by react-aria's June 2026 fix that makes `maxValue` inclusive, so the boundary year is reachable. Unbounded calendars keep the ±20-year window and bounded ranges stay fully reachable at both ends. When only one bound is set, the open side now widens to keep that bound reachable instead of staying at a fixed ±20 years.
