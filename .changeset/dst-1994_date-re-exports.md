---
'@marigold/components': minor
'@marigold/docs': patch
---

feat(DST-1994): import date values and helpers from `@marigold/components`

To give a value to `DatePicker`, `DateField`, `DateRangePicker`, `Calendar`, `RangeCalendar` or `TimeField`, you no longer need to install `@internationalized/date` yourself. `@marigold/components` now exports:

- the date classes `CalendarDate`, `CalendarDateTime`, `ZonedDateTime` and `Time`
- the helpers `parseDate`, `parseDateTime`, `parseZonedDateTime`, `parseTime`, `parseAbsoluteToLocal`, `today`, `now`, `getLocalTimeZone`, `fromDate`, `toCalendarDate`, `toCalendarDateTime`, `toTime`, `isSameDay`, `isWeekend`, `minDate` and `maxDate`
- the types `DateValue`, `TimeValue` and `DateDuration`

```tsx
import { DatePicker, parseDate, type DateValue } from '@marigold/components';
```

Imports from `@internationalized/date` keep working, since the values are the same. The docs no longer call `@internationalized/date` a peer dependency: it has always been a regular dependency of `@marigold/components`.
