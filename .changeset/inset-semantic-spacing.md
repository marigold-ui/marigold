---
"@marigold/system": minor
"@marigold/components": minor
---

feat(DST-1239): migrate Inset component to semantic spacing tokens

- Refactor Inset to use `createSpacingVar` instead of static padding class maps
- Add `InsetSpacingTokens` type for inset-specific tokens (`square-*`, `squish-*`, `stretch-*`)
- `space` prop now accepts inset spacing tokens alongside numeric scale values
- `spaceX`/`spaceY` props now accept relational spacing tokens (`tight`, `related`, `regular`, `group`, `section`)
