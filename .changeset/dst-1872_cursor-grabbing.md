---
'@marigold/system': patch
'@marigold/components': patch
---

fix(DST-1872): `cursor="grapping"` now renders the grabbing cursor

The `cursor` prop on `<Text>` mapped `grapping` to `cursor-grapping`, which is not a Tailwind utility, so the cursor never changed. It now maps to `cursor-grabbing`. The correctly spelled `grab` and `grabbing` are added. `grap` and `grapping` keep working but are deprecated and will be removed in the next major.
