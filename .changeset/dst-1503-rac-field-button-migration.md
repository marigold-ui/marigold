---
"@marigold/components": patch
---

chore(DST-1503): Migrate `Checkbox`, `Switch`, and `Radio` off the deprecated react-aria-components single-element exports (`Checkbox`/`Switch`/`Radio`) to the `*Field` + `*Button` composition introduced in `react-aria-components@1.18.0`. This removes the `ts(6385)` deprecation warnings with no change to the public API, behavior, or visual output.
