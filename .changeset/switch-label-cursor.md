---
'@marigold/theme-rui': patch
---

Fix the `Switch` cursor so it covers the whole control. Hovering the label text
showed the default arrow instead of the pointer, because `cursor-pointer` sat
only on the track. Moving it to the container also fixes the disabled and
read-only cursors, which the track's own rule was overriding.
