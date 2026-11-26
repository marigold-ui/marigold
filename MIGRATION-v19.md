# Migrating to Marigold v19

This guide takes a consuming app from Marigold **18** to **19**. It is meant to be
read top to bottom, by a person or by an AI agent. Every change lists what
changed, a before→after, why, and the gotchas.

---

## 1. How to use this guide (with or without an AI agent)

Point Claude at this file plus `marigold docs <Component>` for live prop data.
The recommended flow:

- **Step 0: run the codemod first.** From your app, run
  `marigold migrate v19 <path> --dry-run`, read the report, then run it again
  without `--dry-run` to apply. It performs the mechanical edits for you and flags
  everything it will not guess. The version argument is optional. Run
  `marigold migrate` and it detects your installed `@marigold/components` and
  proposes the matching migration.
- **Step 1: work the rest by hand** using the sections below. Each entry is
  tagged so you know whether the codemod already handled it.

### What the codemod does vs. what you do

| Tag             | Meaning                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| **`[auto]`**    | The codemod edits this for you. Documented here so you understand it and can catch the fallback cases. |
| **`[flagged]`** | The codemod finds it and warns, but does not change it. You apply the fix.                             |
| **`[manual]`**  | The codemod cannot see or safely change this. Fully hand-done.                                         |
| **`[adopt]`**   | Not a required change. Guidance for taking on the new patterns.                                        |

---

# Section A: App developers

## A1. Forms

### A1.1 Date values and helpers come from `@marigold/components` `[auto]` `[adopt]`

**What changed.** `@marigold/components` re-exports what an app needs to give a
value to `DatePicker`, `DateField`, `DateRangePicker`, `Calendar`,
`RangeCalendar` and `TimeField`:

- the classes `CalendarDate`, `CalendarDateTime`, `ZonedDateTime` and `Time`
- the helpers `parseDate`, `parseDateTime`, `parseZonedDateTime`, `parseTime`,
  `parseAbsoluteToLocal`, `today`, `now`, `getLocalTimeZone`, `fromDate`,
  `toCalendarDate`, `toCalendarDateTime`, `toTime`, `isSameDay`, `isWeekend`,
  `minDate` and `maxDate`
- the types `DateValue`, `TimeValue` and `DateDuration`

The codemod step `date-imports` moves these imports for you.

```diff
- import { DatePicker } from '@marigold/components';
- import { parseDate, type DateValue } from '@internationalized/date';
+ import { DatePicker, parseDate, type DateValue } from '@marigold/components';
```

**Why.** These names used to need a direct install of `@internationalized/date`,
and the docs wrongly called it a peer dependency. It has always been a regular
dependency of `@marigold/components`, so the app does not need its own copy. The
docs examples now import from `@marigold/components`.

**Gotchas.**

- Nothing breaks if you skip this. Imports from `@internationalized/date` keep
  working, since the values are the same.
- Marigold re-exports a fixed list, not the whole package. Anything else, such
  as `DateFormatter`, another calendar system or `startOfWeek`, stays on
  `@internationalized/date`, and so does a namespace import
  (`import * as date from '@internationalized/date'`). The codemod leaves those
  where they are. For formatting a date, `<DateFormat>` usually replaces
  `DateFormatter`.
- The codemod does not touch `package.json`. Once nothing imports
  `@internationalized/date` any more, remove it from your dependencies yourself.
