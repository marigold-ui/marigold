---
'@marigold/theme-rui': patch
---

refa(DST-1565): unify surfaces and controls on one boundary and elevation model

`theme-rui` drew edges two different ways with no rule for which to use: a `background-clip` gradient border on surfaces, and an opaque `border` on controls. Both are replaced with a single model built on two independent axes.

- The **boundary encodes role**. Surfaces (Card, Panel, Dialog, Menu) wear `ui-surface`: a quiet translucent hairline. Controls (Input, Select, fields, the neutral Button family, SegmentedControl) wear `ui-surface-control`: the same charcoal stroke about 2.5× denser, reading as something to operate. Both are translucent, so the edge composites over its ground and stays consistent on white, the page background, or a tinted panel.
- **Elevation encodes depth**, independently. Now that the ring owns the crisp edge, the three `shadow-elevation-*` tiers carry only lift; controls sit on the lowest tier.

Mechanics:

- The surface boundary is a 1px Tailwind `ring` in the `box-shadow` chain, replacing the `1px solid transparent` plus `border-box` gradient that hijacked `background` and got covered by edge-to-edge children. `ui-state-error` swaps `--ui-border-color`; the theming contract is unchanged.
- New `--color-surface-border` (decorative surface rim) and `--color-control-border` (functional control edge). `--color-border` narrows to structural lines (dividers, grid lines, table rules) and stays opaque, because crossing translucent strokes double-darken at their intersections.
- `ui-surface-contrast` (primary Button, ActionBar) uses the same model inverted: a crisp dark ring plus light on the face (top glow, top-down gradient, top-edge highlight), all derived from `--ui-background-color`. `ui-surface-destructive` is that recipe retinted red.
- Elevation shadows retuned: the contact layer is cut and spread across lighter, warm-tinted, contained layers so dense fields stay calm.
- The `Popover` owns the overlay surface; ListBox, Calendar, Menu, and Dialog render flat inside it and keep their own surface only when standalone.

No breaking changes: visual refinement plus additive tokens.
