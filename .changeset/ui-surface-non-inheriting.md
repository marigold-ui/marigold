---
'@marigold/theme-rui': patch
---

fix: register `--ui-background-color`, `--ui-border-color`, and `--ui-highlight-color` as non-inheriting custom properties

Previously, setting one of these variables on a themed surface (e.g. a destructive Panel overriding `--ui-border-color`) would cascade the value into every nested element that also reads `ui-surface`, tinting Inputs, Buttons, Cards, etc. with the parent's color.

These three custom properties are now registered via `@property { inherits: false }`, so each surface resolves its own fallback via the existing `var(..., var(--color-…))` pattern and nested surfaces keep their defaults.
