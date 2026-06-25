---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(DST-1566): add a general-purpose `Toolbar` component

Adds a composable, accessible `Toolbar` for grouping mixed interactive controls
(buttons, `SearchField`, `Select`, `TagGroup`, ...) with a single tab stop and
arrow-key roving focus (`role="toolbar"`, horizontal orientation).

- `Toolbar.Actions` wraps the trailing action buttons. When the bar runs out of
  width its buttons collapse, right to left, into a "More" menu (measured
  automatically) and return as space allows. Controls placed directly in the
  toolbar, such as a `SearchField`, stay put — so place inputs on the left.
- `Toolbar.Group` clusters related controls with `role="group"` and an
  `aria-label`, and can cascade `disabled` to nested buttons.
- `Toolbar.Separator` renders a vertical divider (`role="separator"`) between
  clusters of controls.
- `variant`/`size` theme the bar itself (container-only) and are not cascaded to
  the children, which keep their own sizing.
- Warns in development when neither `aria-label` nor `aria-labelledby` is set.
