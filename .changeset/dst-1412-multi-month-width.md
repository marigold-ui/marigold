---
'@marigold/theme-rui': patch
---

fix([DST-1412]): fix multi-month Calendar/RangeCalendar layout at non-default widths. With three months at `width="1/2"` the third month overflowed the calendar wrapper because `min-w-[250px]` only sized for a single month; with `width="full"` the date grids stayed at content size while their columns expanded, leaving header text floating over empty space. Switch the calendar minimum to `min-w-fit` so multi-month grows to fit its natural content, and add `w-full` to `calendarGrid` so the date table fills its column.

[DST-1412](https://reservix.atlassian.net/browse/DST-1412)
