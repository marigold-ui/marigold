---
"@marigold/storybook-config": major
"@marigold/components": major
"@marigold/system": major
"@marigold/theme-docs": major
"@marigold/theme-rui": major
---

style: Slightly improved contrast of elements that represent a surface (inputs, select, card, dialog, ...).

**BREAKING CHANGE:** In oder to increase the contrast and add more depth to the elements the `Textarea` styles are now a multi part element: `container` and `textarea`. 
If you only want to migrate and do not need style adjustments, move the styles to the `textarea` part.

- Added a utility to apply surface attributes (bg, border, shadow, ...) to elements. This utility has a slighty better contrast than before. Note that this required a `::before` element and in some cases (e.g. inputs) we need to add a wrapper to the components to achieve this styling.
- Dedicated utilities `state-*` to apply consisten state styles. old ones had to be adjusted because of the way we render surfaces now
- Deprecated and removed the `util-focus-*` utilities
- `<Textarea>` has now an additional `container` style and is now a multipart component (breaking change)
- `<Input>` has now a `container` part to style
- `<DateInput>` has now a `input` part to style