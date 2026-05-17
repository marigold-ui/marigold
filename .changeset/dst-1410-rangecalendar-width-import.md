---
'@marigold/components': patch
---

fix([DST-1410]): restore RangeCalendar build by using `createWidthVar` for the width prop. The component still imported the `width` runtime map from `@marigold/system`, which DST-901 removed when it migrated dimension props to CSS variables. This broke `main` for everyone — typecheck, unit tests, and Storybook tests all failed on every open PR. Apply the same migration pattern Calendar already uses: `w-(--width)` className plus `style={createWidthVar('width', width)}`.

[DST-1410](https://reservix.atlassian.net/browse/DST-1410)
