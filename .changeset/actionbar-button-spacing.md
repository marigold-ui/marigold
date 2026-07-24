---
'@marigold/theme-rui': patch
---

fix(DST-1359): align `ActionBar` action button spacing with the regular `Button`. The `actionButton` style in `theme-rui` was missing `gap-2 items-center justify-center`, which caused icons and labels inside ActionBar buttons to render without the proper spacing/alignment used by the ghost/default `Button`. Adding these utilities restores visual parity across the design system.
