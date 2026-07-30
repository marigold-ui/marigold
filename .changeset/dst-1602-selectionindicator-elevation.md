---
'@marigold/components': patch
---

style(DST-1602): drop the removed elevation shadow from SelectionIndicator

`SelectList`'s `SelectionIndicator` no longer applies `shadow-elevation-border`,
which is removed from `theme-rui` in the accompanying change. The indicator keeps
its `border` and surface fill.
