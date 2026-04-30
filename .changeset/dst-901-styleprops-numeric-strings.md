---
'@marigold/system': major
'@marigold/components': minor
'@marigold/theme-rui': patch
---

feat([DST-901]): styleProps for `width`, `maxWidth`, `height`, `space`, `spaceX`, `spaceY`, `pr`, `pl`, `pt`, `pb` now accept both numeric scale values (`4`) and their string equivalents (`"4"`). The public types are now declarative (`Scale | Fraction | WidthKeyword`, etc.) instead of being derived from internal lookup maps.

Components that previously resolved `width`, `maxWidth`, and `height` via class-name lookup (Form, Calendar, legacy Table column header / select-all cell, Slider, Scrollable, Switch, Grid) now resolve them through CSS custom properties (`createWidthVar` / `createHeightVar`) targeting `--width`, `--max-width`, `--height`. These variables are registered as non-inheriting (`@property … inherits: false`) in the RUI theme so they cannot leak into descendants.

`createWidthVar` gained support for the previously missing keywords (`svh`, `lvh`, `dvh`, `px`, `container`), and a new `createHeightVar` helper was added.

**Breaking** (`@marigold/system`): The runtime class-name maps `width`, `maxWidth`, `height`, `gapSpace`, `paddingSpace`, `paddingSpaceX`, `paddingSpaceY`, `paddingRight`, `paddingLeft`, `paddingTop`, `paddingBottom` are no longer exported. Use the prop types (`WidthProp`, `HeightProp`, …) and the CSS-var helpers (`createWidthVar`, `createHeightVar`, `createSpacingVar`) instead. The corresponding TypeScript prop types are unchanged.
