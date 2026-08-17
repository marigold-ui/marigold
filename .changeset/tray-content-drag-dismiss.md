---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix(Tray): don't dismiss the tray on gestures that start in its content

A vertical swipe inside `<Tray.Content>` was read as drag-to-dismiss, so
scrolling a list or swiping over a calendar closed the tray instead of
scrolling it. including the trays `DatePicker` and `DateRangePicker` open on
mobile. The gesture now only starts on the tray's chrome (drag handle, title,
actions), and the drag handle's row carries a 44px touch target instead of the
6px pill. Motion no longer sets `touch-action: pan-x` on the tray either, so the
content can pan vertically on touch. No opt-in, nothing to change in consumer
code.
