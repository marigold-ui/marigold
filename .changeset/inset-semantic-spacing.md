---
"@marigold/system": minor
"@marigold/components": minor
---

feat(DST-1239): migrate Inset component to semantic spacing tokens

- `space` prop accepts padding recipe tokens (`square-*`, `squish-*`, `stretch-*`) and numeric scale values
- `spaceX`/`spaceY` props accept single-value inset tokens (`inset-tight`, `inset-snug`, `inset-regular`, `inset-relaxed`, `inset-loose`) and numeric scale values
- Add `PaddingSpacingTokens` type for multi-value padding recipes
- Add `InsetSpacingTokens` type for single-value per-axis inset tokens
- Add `--spacing-inset-*` CSS custom properties to theme
