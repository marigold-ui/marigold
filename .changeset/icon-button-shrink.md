---
'@marigold/theme-rui': patch
---

fix(DST-1489): an icon `Button` keeps its square in any flex container.

`size="icon"` now carries `shrink-0`. An icon button is a fixed square, so in a tight flex row it could previously lose its aspect ratio to make room for a neighbour that won't compress — invisible until its hover fill revealed the squashed box.

This replaces a `[&>*]:shrink-0` that briefly sat on `ButtonGroup`. Putting it on the control that needs it protects icon buttons everywhere (a `Panel.Header`, a `Table` cell, an `ActionBar`), not only inside a group, and stops `ButtonGroup` pinning children it knows nothing about. Text buttons are unaffected either way: `ui-button-base` sets `whitespace-nowrap`, so their min-content floor is their own label.
