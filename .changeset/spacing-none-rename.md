---
'@marigold/system': patch
'@marigold/theme-rui': patch
---

Rename universal spacing token from `none` to `collapsed` to avoid a Tailwind v4 collision. `--spacing-none` inside `@theme static` caused `leading-none` to resolve to `0` instead of `line-height: 1`. The new name `collapsed` is a semantic design term (cf. CSS margin collapse) that reads naturally in both gap (`space="collapsed"`) and padding (`inset="collapsed"`) contexts.
