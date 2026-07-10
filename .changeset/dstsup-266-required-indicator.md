---
'@marigold/theme-rui': patch
---

fix(DSTSUP-266): render the required-field asterisk via a `ui-required-indicator` utility

The required indicator (the red `*` after a label) was defined inline as `after:content-["*"]`. That quoted arbitrary value does not survive JS compilation into an extractable class name (`content-["*"]` becomes `content-[\"*\"]`), so consumers that regenerate Tailwind by scanning the compiled theme packages (the Marigold starter, StackBlitz, `@reservix/core`) never generated a rule for it and the asterisk was invisible. It kept working in Storybook and the docs because those read the source or the pre-built CSS.

The indicator is now a named `ui-required-indicator` utility with its value defined in CSS (`ui.css`). The class name is quote-free, so it survives compilation and renders regardless of how a consumer builds its styles.
