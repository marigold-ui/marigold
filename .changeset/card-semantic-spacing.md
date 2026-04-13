---
"@marigold/components": minor
---

feat(DST-1306): migrate Card padding props to semantic spacing tokens

- Refactor Card to use `createSpacingVar` instead of static padding class maps
- `space` prop (gap between children) continues to accept relational `SpacingTokens` (`tight`, `related`, `regular`, `group`, `section`) and numeric scale values
- `p` prop (all sides) now accepts `InsetSpacingTokens` (`square-*`, `squish-*`, `stretch-*`) and numeric scale values
- `px`/`py`/`pt`/`pb`/`pl`/`pr` now accept `PaddingSpacingTokens` (`padding-tight`, `padding-snug`, `padding-regular`, `padding-relaxed`, `padding-loose`) and numeric scale values
