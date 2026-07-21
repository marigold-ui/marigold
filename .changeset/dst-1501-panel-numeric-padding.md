---
'@marigold/components': patch
---

fix(DST-1501): `<Panel p={number}>` now applies padding

A numeric `p` (e.g. `p={4}`) silently produced no padding: the value was suffixed with `-x`/`-y` and resolved to a non-existent `var(--spacing-4-x)`. A scale value is now applied directly (`calc(var(--spacing) * 4)`) on both axes, matching `px`/`py` and `<Page>`. Named inset tokens are unchanged.
