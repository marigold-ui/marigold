---
'@marigold/components': patch
---

fix(DSTSUP-257): commit RangeCalendar month/year dropdown selection on touch

The dropdown overlay attached an unconditional `pointerup` `stopPropagation` listener to guard against react-aria's range-commit on overlay taps. On touch devices that also swallowed the event before react-aria's `usePress` click-completion fallback could run, so tapping a month or year never fired `onPress` and the selection was silently lost (the dropdown stayed open and the grid did not switch). The guard now skips `role="option"` targets, letting option taps bubble through while still protecting taps on empty overlay area. Desktop mouse behaviour is unchanged.
