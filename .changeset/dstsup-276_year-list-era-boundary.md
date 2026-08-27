---
'@marigold/components': patch
---

fix(DSTSUP-276): anchor the `Calendar` year list at year 1

Opening the year dropdown on a year below 21 produced a list that counted down and then back up — focused on AD 5 it read `16 15 14 … 2 1 1 2 3 … 25`, with two options sharing the accessible name `1`.

`CalendarYearPicker` centres a fixed `visibleYears` window on the focused year, so a 41-year window reaches 20 years back. There is no year 0 in the Gregorian calendar, so from AD 5 that lands in 16 BC, and react-aria renders an era marker only when the *focused* date is BC — never the individual entries. The first 16 options were BC years wearing bare AD numbers.

The window is now anchored at year 1 rather than centred whenever the focused year sits too close to the boundary to centre it. This applies to the Gregorian calendar only, whose era floor is the cause; other calendar systems change era every few decades, so their windows stay centred and keep crossing eras as before. `Calendar` and `RangeCalendar` both keep a 41-year list: AD 5 offers `1 … 41`, as does AD 1. Since react-aria only shifts its window for `minValue`, which this component does not own, the window is instead sized to guarantee 41 in-era years and the entries that rolled into the previous era are dropped.

Calendars with a `minValue` or `maxValue` are untouched — the bounded window still reaches whichever bound is farther and renders every in-range year.
