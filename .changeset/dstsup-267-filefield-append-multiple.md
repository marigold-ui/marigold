---
'@marigold/components': patch
---

fix(DSTSUP-267): `FileField` appends files across selections when `multiple` is set

Previously, when `multiple` was set, selecting or dropping files in a second interaction replaced the existing selection instead of adding to it — only files chosen in a single action were kept. `FileField` now accumulates files across separate selections and drops, de-duplicating identical files (matched by name, size, and last-modified time). Behavior with `multiple` unset is unchanged: the latest single file still wins.
