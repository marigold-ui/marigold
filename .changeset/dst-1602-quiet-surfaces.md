---
'@marigold/theme-rui': minor
---

style(DST-1602): quiet surfaces — one shadow tier, raised caps, tonal panels

The next iteration of the surface/elevation model. Nothing in normal document
flow casts a shadow anymore: the single remaining tier,
`shadow-elevation-overlay`, means exactly one thing — a surface floats above the
page (Dialog, Drawer, Menu, Popover, Toast, ActionBar). `shadow-elevation-border`
and `shadow-elevation-raised` are **removed**. The overlay recipe itself is retuned
crisper for the single-tier world — a hairline ring plus three warm-charcoal casts —
so overlays read as clearly floating on the near-white page ground (the `Drawer`'s
hand-rolled halo is dropped now that the ring covers its edge).

- **Secondary Button & Menu trigger → `ui-soft`.** A new standalone modeled
  utility: a near-white convex cap with a modeled ring one step darker than its
  edge base and a soft top glint — the light-end mirror of the dark `ui-contrast`
  cap. No drop shadow; the cap itself is the lift. Backed by new tokens
  `--color-soft`, `--color-soft-hover`, `--color-soft-edge`,
  `--color-soft-edge-hover` and the non-inheriting `--soft-edge` property.
- **Fields are flat wells.** `ui-control` loses its engraved bottom line and its
  elevation; it is now fill plus the dense `--color-control-border` hairline.
  Focus / error / disabled behavior is unchanged.
- **Cards & panels separate by fill.** The page ground stays gray
  (`--color-background` = `charcoal-100`, unchanged), so white panels read as
  layers by the fill delta against it; the decorative rim `--color-surface-border`
  firms to `0.13` (half the density of the `control-border` edge) so it still
  traces the boundary where that delta is small; `Card`, `Panel`, and the
  `Accordion` card variant lose their raised shadow.
- **Structural lines soften.** `--color-border` becomes an opaque
  `oklch(0.9 0.004 54)` (~1.4:1 on white). The app shell's structural lines —
  the `Sidebar` divider and `Sidebar.Separator`, and the `ui-scroll-edge`
  top-nav seam — are repointed from the lighter decorative `--color-surface-border`
  to this structural `--color-border` so they stay perceivable.
- **Lighter modal backdrop.** `--color-overlay-backdrop` drops from 70% to 45%
  now that the overlay shadow carries lift alone.

Removing `--shadow-elevation-border` and `--shadow-elevation-raised` is an
intentional cleanup of the pre-1.0 theme; the neutral Button, Menu trigger, and
every field/control move to the new model automatically. No component API
changes.
