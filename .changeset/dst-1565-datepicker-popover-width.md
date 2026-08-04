---
'@marigold/components': patch
---

fix(DST-1565): stop the DatePicker and DateRangePicker popover from stretching to the trigger width

The shared `Popover` forces its width to at least the trigger's via `min-w-(--trigger-width)`. That is right for field dropdowns (Select, ComboBox) whose list should line up with the field, but wrong for a calendar, whose width is its own. A new `matchTriggerWidth` prop (default `true`, so every existing popover is unchanged) lets DatePicker and DateRangePicker opt out, so the calendar sizes to its content instead of the full field width.
