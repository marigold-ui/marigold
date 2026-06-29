---
'@marigold/theme-rui': minor
---

feat(DST-1565): unify the button family on one dimensional surface model

Primary Button uses `ui-surface-contrast` (dark fill, darker edge, top glow + 1px top highlight). The destructive and default Buttons did not, so beside primary they read flat — destructive was a solid fill and default was flat white. Menu's default trigger and ToggleButton were on the older flat-white recipe too. They now all share one surface model.

Two new surface utilities, both reusing the existing surface model:

- **`ui-surface-destructive`** — the destructive sibling of `ui-surface-contrast`. The contrast surface reads every layer (ring, glow, top highlight, gradient) off `--ui-background-color`, so this just swaps that token to `--color-destructive-bold` and the foreground to match. One source of truth for the dark-lift look; no duplicated gradient/shadow.
- **`ui-surface-muted`** — the quiet counterpart for neutral, medium-emphasis controls (the loud↔muted pair with `ui-surface-contrast`). Builds on `ui-surface` (white fill, hairline ring, box-shadow chain) and adds the same top-lit gesture inverted for a light face: a faint `charcoal-50 → charcoal-100` gradient plus a 1px white gloss on the top edge, so the surface reads as gently raised without going dark.

Variant changes:

- **`secondary`** (the default Button variant) uses `ui-surface-muted`. On hover it keeps the gloss gradient but brightens it a step (`white → charcoal-50`) so the surface lifts instead of flattening, and the edge stays a translucent hairline, just firmed from `0.1` to `0.2` alpha (new `--color-surface-border-hover`) rather than going to a hard opaque line. The `expanded` (menu-open) state keeps the resting fill and only firms the edge to that same `0.2` hairline, so a hovered trigger (brightens) and an open one (firm edge) stay distinguishable.
- **`destructive`** uses `ui-surface-destructive`. Hover retints the whole surface via `--ui-background-color`.
- **primary and destructive hover now lighten** (`--color-primary-hover` / `--color-destructive-bold-hover`, both `l + 0.05`) instead of darkening — darkening on these already-dark fills crushed them toward flat black and killed the glow; lifting the fill reads as the surface "lighting up".
- **Menu** default trigger and **ToggleButton** adopt the `ui-surface-muted` look with the same brighten-on-hover and soft `0.2` hairline. Because `ui-surface-muted` hardcodes its gradient fill, these state overrides set `background` directly (not `--ui-background-color`).

ToggleButton "on" state — a **sunken dark-gray surface** (new `--color-toggle-selected` / `--color-toggle-selected-edge` tokens):

- A lighter charcoal than `selected-bold`/primary (charcoal-900) so a pressed toggle is never mistaken for a primary button; the recessed treatment carries the rest. Drops elevation, swaps the white gloss for a dark inner-top inset, and recolors the ring to a visible dark edge — the faint surface-border hairline vanishes on a dark fill, which made a grouped segment look shorter than its neighbours. The edge derives from the fill, so the two stay coupled if the gray is retuned.
- The toggle flip is `transition-none`: the fill is instant, so an animated box-shadow would smear the off-state gloss over the on-state dark fill, and the off/on shadow layer counts differ so it can't tween cleanly anyway. Instant matches the fill and is the right feel for a discrete toggle.

`ui-surface-contrast` itself got two small fixes in the process:

- The top glow is dimmed (`--contrast-glow-l: 0.15`) and softened against the edge so the dark surface no longer shows a hard line where the glow meets the rim.
- The glow now derives from `--ui-background-color` (it previously hard-referenced `--color-primary`). This is what lets `ui-surface-destructive` tint the glow red, and it also means a primary Button's hover retints the glow along with the rest of the surface instead of leaving a fixed charcoal glow.

The magic numbers behind the contrast surface are now tokens in `tokens.css` rather than literals in the utility: the lightness deltas / alphas each layer shifts from the fill (`--contrast-edge-l`, `--contrast-glow-l` / `--contrast-glow-a`, `--contrast-highlight-l` / `--contrast-highlight-a`, `--contrast-fill-top-l`, `--contrast-fill-bottom-l`). The colors stay computed in the utility on purpose — each reads the fill off `--ui-background-color` on the element, so a fill override retints every layer; hoisting the resolved colors to `:root` would freeze them to the primary color. The button hover colors are tokens too (`--color-primary-hover`, `--color-destructive-bold-hover`), replacing inline `oklch(from … calc(l − …))` in `Button.styles.ts`.
