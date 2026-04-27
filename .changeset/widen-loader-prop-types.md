---
'@marigold/components': patch
---

fix(DST-1355): widen `variant` and `size` prop types on `Loader` and `ProgressCircle` to accept arbitrary strings via `| (string & {})`. Matches the pattern already used by `Button`, `Panel`, and other components, and lets consumer themes register their own variant/size tokens without TypeScript errors while preserving IDE autocomplete for the built-in RUI values.
