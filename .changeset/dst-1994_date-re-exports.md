---
'@marigold/components': minor
'@marigold/docs': patch
'@marigold/cli': minor
---

feat(DST-1994): import date values and helpers from `@marigold/components`

To give a value to `DatePicker`, `DateField`, `DateRangePicker`, `Calendar`, `RangeCalendar` or `TimeField`, you no longer need to install `@internationalized/date` yourself. `@marigold/components` now exports:

- the date classes `CalendarDate`, `CalendarDateTime`, `ZonedDateTime` and `Time`
- the helpers `parseDate`, `parseDateTime`, `parseZonedDateTime`, `parseTime`, `parseAbsoluteToLocal`, `today`, `now`, `getLocalTimeZone`, `fromDate`, `toCalendarDate`, `toCalendarDateTime`, `toTime`, `isSameDay`, `isWeekend`, `minDate` and `maxDate`
- the types `DateValue`, `TimeValue` and `DateDuration`

```tsx
import { DatePicker, parseDate, type DateValue } from '@marigold/components';
```

The docs no longer call `@internationalized/date` a peer dependency: it has always been a regular dependency of `@marigold/components`.

### Migration

Nothing breaks: imports from `@internationalized/date` keep working, since the values are the same. To drop the extra dependency, import the names above from `@marigold/components` instead and remove `@internationalized/date` from your `package.json` once nothing imports it any more.

```tsx
// Before
import { DatePicker } from '@marigold/components';
import { parseDate, type DateValue } from '@internationalized/date';

// After
import { DatePicker, parseDate, type DateValue } from '@marigold/components';
```

`marigold migrate v19` makes this change for you with the `date-imports` step. It moves the names Marigold re-exports, keeps aliases and `type` imports, and leaves everything else, such as `DateFormatter` or a namespace import, on `@internationalized/date`. It does not remove the dependency from `package.json`.
