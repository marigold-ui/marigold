---
"@marigold/system": minor
"@marigold/components": minor
---

feat(DST-1306): migrate Card padding props to semantic spacing tokens

- Refactor Card to use `createSpacingVar` instead of static padding class maps
- `p` prop now accepts inset spacing tokens (`square-*`, `squish-*`, `stretch-*`) alongside numeric scale values
- `px`/`py`/`pt`/`pb`/`pl`/`pr` props now accept relational spacing tokens (`tight`, `related`, `regular`, `group`, `section`)
- Add `InsetSpacingTokens` type to `@marigold/system`
