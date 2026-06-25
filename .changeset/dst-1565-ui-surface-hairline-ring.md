---
'@marigold/theme-rui': patch
---

refa(DST-1565): draw the `ui-surface` border as a translucent outset hairline instead of the gradient `background-clip` trick

`ui-surface` previously faked its border by reserving a `1px solid transparent` border and showing a `border-box`-clipped background gradient (with a darken-toward-bottom bevel) through it. That hijacked the entire `background` property and forced `ui-state-error` to override the border via a `border-*` color.

The border is now a 1px Tailwind `ring` (routed through `--tw-ring-shadow`), so it composes into the same `box-shadow` chain as `shadow-elevation-*` without clobbering them. `background` is a plain fill again, and `ui-state-error` just swaps `--ui-border-color`. The `--ui-border-color` theming contract is unchanged.

Two deliberate properties of the new hairline:

- **Translucent.** The resting color is a new `--color-border-surface` token — the charcoal hue at low alpha (`oklch(from var(--color-charcoal-950) l c h / 0.12)`). Because it is translucent, the edge composites over whatever ground the surface sits on, so its contrast stays consistent on white, the page background, or a tinted panel — where a fixed gray reads heavy on white and washes out on gray. State overrides (focus → `--color-ring`, error → `--color-destructive-accent`) remain opaque on purpose.
- **Outset.** The ring sits just outside the box, so it is painted above child content. A child that bleeds edge-to-edge (e.g. a `Table` inside `Panel.Content bleed`) can no longer cover the left/right border — which an inset ring or a `background-clip` border did.

The opaque `--color-border` token is unchanged and still used for dividers/decoration on a known surface (table rows, panel section rules), which sit on white and have no ground to adapt to.

Visually: the subtle 1px border gradient/bevel is intentionally dropped (a flat ring cannot gradient), the resting edge is a touch softer (translucent vs. opaque charcoal-300), and corners antialias slightly differently. `ui-surface-contrast` keeps its existing gradient treatment.

The three elevation tokens (`--shadow-elevation-border/raised/overlay`) are retuned to match. Now that the ring owns the crisp edge, the shadows carry only lift: the harsh contact layer (previously up to `0.32` alpha) is cut sharply and the darkness spread across lighter layers, lit from above with negative spread so each shadow stays contained inside its own footprint — a dense field of elevated elements stays calm instead of bleeding into a haze. The shadow color is tinted to the warm charcoal hue instead of pure black so the lift sits into the warm-neutral ground.
