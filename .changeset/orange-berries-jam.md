---
"@marigold/components": patch
---

fix(DST-1110): Remove extra whitespace from `<Container>`

When there is no `<Breakout>` inside the container we do not have to apply the 3 column layout. Otherwise this causes 2 empty columns to be there.
