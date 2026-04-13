---
"@marigold/system": minor
"@marigold/components": minor
---

feat(DST-1239): migrate Inset component to semantic spacing tokens

- `space` prop accepts inset recipe tokens (`square-*`, `squish-*`, `stretch-*`) and numeric scale values
- `spaceX`/`spaceY` props accept single-value padding tokens (`padding-tight`, `padding-snug`, `padding-regular`, `padding-relaxed`, `padding-loose`) and numeric scale values
- Add `InsetSpacingTokens` type for multi-value inset recipes
- Add `PaddingSpacingTokens` type for single-value per-axis padding
- Add `--spacing-padding-*` CSS custom properties to theme
