---
'@marigold/theme-rui': minor
'@marigold/components': minor
---

feat(DSTSUP-262): add `large` size to Dialog for wider layouts

`Dialog` (and `ConfirmationDialog`, which inherits the prop) now accepts `size="large"`, which sets the dialog width to `1024px` — matching the Tailwind `lg` breakpoint. Use it for content that doesn't fit the previous `medium` cap of `768px`, e.g. multi-month calendars or wider forms. The existing `min()` width formula keeps the dialog viewport-safe on smaller screens.
