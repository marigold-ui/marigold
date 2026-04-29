---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

Replace the `gap` between `CheckboxGroup` and `RadioGroup` items with per-item padding so the full space between items is clickable. Vertical items now meet the 24px target-size minimum; horizontal spacing keeps visual parity. Standalone `Checkbox` is unaffected.

Also align the label and icon: switched the inner row layout from `items-center` to `items-start` so the icon stays on the first line when the label wraps. `Radio` labels now use `leading-4` to match `Checkbox`.
