---
'@marigold/components': patch
---

refactor: components carry their public name

React DevTools and React's own warnings now show components by the name you import, for example `Button` instead of `_Button`. Compound components show their root part, for example `TableRoot`. Nothing changes in how you use them.

`ToggleButtonGroup` now logs its development warning about `selectionMode` after the first render instead of during it.
