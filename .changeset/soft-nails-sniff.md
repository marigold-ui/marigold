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
