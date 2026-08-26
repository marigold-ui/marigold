---
'@marigold/components': patch
---

fix(Tray): don't dismiss the tray on gestures that start in its content

A vertical swipe inside `<Tray.Content>` was read as drag-to-dismiss, so
scrolling a list or swiping over a calendar closed the tray instead of
scrolling it, including the trays that `DatePicker` and `DateRangePicker`
open on mobile. The gesture now only starts on the tray's chrome (drag
handle, title, actions), and motion no longer sets `touch-action: pan-x` on
the tray, so content can pan vertically on touch. As a result, text inside
the tray is selectable again — suppressing selection and touch panning is
now scoped to the chrome. No opt-in required; nothing to change in consumer
code.
