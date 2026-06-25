---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(DST-1566): add a general-purpose `Toolbar` component

Adds a composable, accessible `Toolbar` for grouping mixed interactive controls
(buttons, `SearchField`, `Select`, `TagGroup`, ...) with a single tab stop and
arrow-key roving focus (`role="toolbar"`, horizontal orientation).

- `Toolbar.Action` describes a collapsing action. The toolbar renders it as a
  button in the bar or, when space runs short, as an item in an automatically
  measured "More" menu — folding right to left and returning as space allows.
  Give it an `icon` and a `label` and the toolbar wires up an icon-only button,
  its `aria-label`, and a tooltip for you. Everything else in the bar — a
  `SearchField`, a `Select`, a plain `Button` — stays put, so place the inputs
  first and use a plain `Button` for any action that must always stay visible.
- `Toolbar.Group` clusters related controls with `role="group"` and an
  `aria-label`, and can cascade `disabled` to nested buttons.
- `Toolbar.Separator` renders a vertical divider (`role="separator"`) between
  clusters of controls.
- `variant`/`size` theme the bar itself (container-only) and are not cascaded to
  the children, which keep their own sizing.
- Warns in development when neither `aria-label` nor `aria-labelledby` is set.
