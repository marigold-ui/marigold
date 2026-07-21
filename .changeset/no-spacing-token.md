---
"@marigold/system": minor
"@marigold/components": minor
"@marigold/theme-rui": minor
---

feat(DST-1257): add universal `none` spacing token

- Introduce `NoSpacingToken = 'none'` shared across all spacing token families
- Add `'none'` to `SpacingTokens`, `PaddingSpacingTokens`, and `InsetSpacingTokens`
- Add `--spacing-none: --spacing(0)` CSS custom property to the theme

`'none'` now works wherever a spacing token is accepted: `Stack`/`Inline` gap (`space="none"`), `Inset` axis padding (`spaceX="none"` / `spaceY="none"`), and `Inset` recipes (`space="none"`) — useful for wrappers that should render without adding any spacing (e.g. an edge-to-edge `Table` inside a containing component).
