---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(DST-1566): add a general-purpose `Toolbar` component

Adds a composable, accessible `Toolbar` for grouping mixed interactive controls
(buttons, `SearchField`, `Select`, `TagGroup`, ...) with a single tab stop and
arrow-key roving focus (`role="toolbar"`, horizontal orientation).

- Action buttons (`Button`, `IconButton`, `LinkButton`) placed in the toolbar
  collapse, right to left, into a "More" menu (measured automatically) when the
  bar runs out of width, and return as space allows. Other controls, such as a
  `SearchField` or `Select`, stay put — so place inputs on the left. Mark an
  action `pinned` to keep it visible even when the others collapse.
- `Toolbar.Group` clusters related controls with `role="group"` and an
  `aria-label`, and can cascade `disabled` to nested buttons.
- `Toolbar.Separator` renders a vertical divider (`role="separator"`) between
  clusters of controls.
- `variant`/`size` theme the bar itself (container-only) and are not cascaded to
  the children, which keep their own sizing.
- Warns in development when neither `aria-label` nor `aria-labelledby` is set.
