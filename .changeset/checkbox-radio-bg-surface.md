---
'@marigold/theme-rui': patch
---

Paint `Checkbox` and `Radio` controls with `bg-surface` so the inner area follows the theme surface token. Keeps the controls visually distinct over containers that paint a non-default background — e.g. a hovered or selected `SelectList` row. `Radio` already used `bg-surface` (added in DST-878 token polish); this brings `Checkbox` in parity.
