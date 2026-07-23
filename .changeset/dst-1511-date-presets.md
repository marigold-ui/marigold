---
'@marigold/components': minor
'@marigold/system': minor
'@marigold/theme-rui': minor
---

Add relative date presets to `Calendar`, `RangeCalendar`, `DatePicker`, and `DateRangePicker` via a new `presets` prop. On desktop the presets render as a quick-selection list beside the calendar. On small screens the grid renders first with a "Quick selection" row: inline calendars open the preset list in a bottom sheet, while the pickers switch their existing sheet to the list in place. Ships built-in localized presets (`today`, `yesterday`, `tomorrow`, `this-week`, `next-7-days`, `next-30-days`, `last-7-days`, `last-30-days`, `this-month`, `this-quarter`), supports custom presets with value resolvers, and exports `useDatePresets`/`useDateRangePresets` for userland compositions.
