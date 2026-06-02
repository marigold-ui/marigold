---
'@marigold/components': patch
---

fix(DSTSUP-255): honor minValue/maxValue in Calendar and RangeCalendar year picker

The year picker used to always show 41 years (the focused year ±20) and just greyed out the
ones outside the allowed range. With `minValue` set, it opened on a list of disabled past
years that you had to scroll past first. The year list is now derived from `minValue`/`maxValue`
(both bounds inclusive), so out-of-range years simply aren't shown, while the month picker still
shows all twelve months with out-of-range ones disabled.

When a picker opens, the selected option is now scrolled to the middle of the list instead of
the bottom.

The open year/month picker now exposes a localized accessible name ("year"/"month") instead of
an internal identifier, so screen readers announce it correctly.

This also fixes a follow-up problem with the RangeCalendar month/year dropdown (from
DSTSUP-257): if you had started picking a range and then used the dropdown to jump to another
month or year, that tap could wrongly finish the range. The dropdown now only changes the
view, and picking an option still works on touch.
