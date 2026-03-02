---
"@marigold/theme-rui": minor
---

Export `appearances` map from `@marigold/theme-rui/appearances`

The theme package now exports a typed `appearances` object (and `Appearances` type) via `@marigold/theme-rui/appearances`. This map is auto-generated during the build from component style files and contains the available `variant`/`size` keys for each themed component.

This removes the duplicated `build-appearances.mjs` scripts that previously existed in both `docs` and `fumadocs`, replacing them with a single source of truth in the theme package.
