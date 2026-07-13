---
'@marigold/theme-rui': patch
---

fix(DST-1551): round the `RangeCalendar` hover and focus highlight on days outside the selected range

Days outside the selected range now round their hover and focus highlight to match the selected state, instead of showing a square highlight against the rounded endpoints. In-range cells stay square so the range fill still connects seamlessly.
