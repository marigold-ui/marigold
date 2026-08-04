---
'@marigold/theme-rui': minor
---

style(DST-1602): quiet surfaces — one shadow tier, raised caps, tonal panels

The next iteration of the surface/elevation model: nothing in normal document
flow casts a shadow anymore.

- **One shadow tier.** `shadow-elevation-overlay` is the only remaining tier and
  means one thing — a surface floats above the page (Dialog, Drawer, Menu,
  Popover, Toast, ActionBar). `shadow-elevation-border` and
  `shadow-elevation-raised` are **removed**.
- **Raised caps, not shadows.** Secondary Button and Menu trigger move to the new
  `ui-soft` cap; the cap itself is the lift, no drop shadow.
- **Flat controls, tonal panels.** Fields become flat wells; Card, Panel, and the
  Accordion card variant separate from the gray page by fill instead of elevation.
- **Softer structural lines & lighter backdrop.** `--color-border` and the modal
  backdrop are quieted to match the flatter surfaces.

No component API changes — components using the removed shadow tokens are migrated
in this release. Consumers referencing `--shadow-elevation-border` or
`--shadow-elevation-raised` directly should move to `shadow-elevation-overlay` or
a flat surface.
