---
'@marigold/theme-rui': patch
---

Restructure `tokens.css` and fix three token defects. The public token surface is unchanged — every token consumers can reference still resolves to the same computed value.

- **Fix: the pre-compiled bundle force-generated the wrong palette.** `styles.css` declared `@source inline('{bg}-{stone}-…')`, but the theme's palette is `charcoal`. Consumers writing `bg-stone-500` were getting Tailwind's default stone, never a theme color, and `bg-charcoal-*` did not exist in the bundle at all. The bundle now ships the 11 `bg-charcoal-*` utilities and no longer ships the 9 `bg-stone-*` ones — the only consumer-visible removal in this release.
- **Fix: `<Panel p="collapsed">` referenced an undefined variable.** `collapsed` is a member of `InsetSpacingTokens` and `resolveInsetAxes` appends an axis suffix to every non-numeric token, so it resolved to `var(--spacing-collapsed-x)`, which was never declared — leaving padding at `0` by accident rather than by design. Adds `--spacing-collapsed-x` / `--spacing-collapsed-y`.
- **`--color-border` and `--shadow-elevation-overlay` now take their hue from the palette** via relative color syntax instead of hardcoding `54`. Values are byte-identical today; a rebrand now carries the divider color and the shadow's warm cast with it instead of leaving them behind.
- **`--contrast-*` (7 vars) and `--ui-panel-px` are no longer theme tokens.** The contrast deltas are single-use arguments to the `ui-contrast` utility and now live inside it; `--ui-panel-px` moves to `ui.css` next to the three utilities that read it. Neither was ever in a Tailwind namespace, so neither ever generated a utility — they were private implementation detail sitting on the public `:root` surface.
- Regroups the file so the five boundary tokens sit together, splits radius out of the surface section, renames the `TYPOGRAPHY` section to `FONT FAMILIES` (it holds no type scale), and trims comments that restated their own values or had gone stale.
