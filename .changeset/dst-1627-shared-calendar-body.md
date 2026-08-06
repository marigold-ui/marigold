---
'@marigold/components': patch
---

refactor(DST-1627): extract a shared `CalendarBody` for the `Calendar`/`RangeCalendar` grid layout

The multi-month and single-month layout markup was duplicated verbatim in `Calendar` and `RangeCalendar`, so every layout tweak had to be made twice and the copies could silently drift. Both components now render that markup through one internal `<CalendarBody>`, which reads the theme classes, visible months, min/max value, disabled state and a new `isRange` flag off the existing `CalendarContext`, keeping the touch pointerup guard (DSTSUP-257) range-only. Pure refactor: the rendered DOM, the styling and the behavior are unchanged.
