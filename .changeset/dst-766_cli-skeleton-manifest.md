---
'@marigold/cli': patch
---

fix(DST-766): `marigold migrate` knows the new `Skeleton` component

The v18 theme manifest now lists `Skeleton`, so the theme codemods of `marigold migrate` treat a `Skeleton` entry in your theme as a known component.
