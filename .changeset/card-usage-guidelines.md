---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/docs': patch
---

feat(DST-876): add Card usage guidelines

Renames the `Card.Preview` slot to `Card.Media` across components, theme, and docs. This is a breaking change: consumers using `<Card.Preview>`, the `data-card-preview` selector, or the `preview` theme slot key must migrate to `Card.Media`, `data-card-media`, and the `media` slot key respectively.


Adds a "Usage" section to the Card docs covering when to use cards, media slot guidance.