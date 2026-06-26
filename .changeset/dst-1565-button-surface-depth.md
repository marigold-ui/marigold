---
'@marigold/theme-rui': minor
---

feat(DST-1565): give the destructive and default Buttons the same dimensional lift as primary

Primary Button uses `ui-surface-contrast` (dark fill, darker edge, top glow + 1px top highlight). The destructive and default Buttons did not, so beside primary they read flat — destructive was a solid fill and default was flat white.

Two new surface utilities bring them in line, both reusing the existing surface model:

- **`ui-surface-destructive`** — the destructive sibling of `ui-surface-contrast`. The contrast surface reads every layer (ring, glow, top highlight, gradient) off `--ui-background-color`, so this just swaps that token to `--color-destructive-bold` and the foreground to match. One source of truth for the dark-lift look; no duplicated gradient/shadow.
- **`ui-surface-bright`** — the light counterpart for neutral, medium-emphasis controls. Builds on `ui-surface` (white fill, hairline ring, box-shadow chain) and adds the same top-lit gesture inverted for a light face: a faint `charcoal-50 → charcoal-100` gradient plus a 1px white gloss on the top edge, so the surface reads as gently raised without going dark.

Button changes:

- `secondary` (the default variant) now uses `ui-surface-bright`. Hover/expanded replace the resting gloss gradient with the flat `hover` fill.
- `destructive` now uses `ui-surface-destructive`, with hover darkening the whole surface via `--ui-background-color` (mirroring how primary darkens on hover).

`ui-surface-contrast` itself got two small fixes in the process:

- The top glow is darkened a touch (`l + 0.22`, was `l + 0.26`).
- The glow now derives from `--ui-background-color` (it previously hard-referenced `--color-primary`). This is what lets `ui-surface-destructive` tint the glow red, and it also means a primary Button's hover now darkens the glow along with the rest of the surface instead of leaving a fixed charcoal glow.

The magic numbers behind the contrast surface are now tokens in `tokens.css` rather than literals in the utility: the lightness deltas / alphas each layer shifts from the fill (`--contrast-edge-l`, `--contrast-glow-l` / `--contrast-glow-a`, `--contrast-highlight-l` / `--contrast-highlight-a`, `--contrast-fill-top-l`, `--contrast-fill-bottom-l`). The colors stay computed in the utility on purpose — each reads the fill off `--ui-background-color` on the element, so a fill override retints every layer; hoisting the resolved colors to `:root` would freeze them to the primary color. The button hover colors are tokens too (`--color-primary-hover`, `--color-destructive-bold-hover`, `--color-border-hover`), replacing inline `oklch(from … calc(l − …))` in `Button.styles.ts`.
