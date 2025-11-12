---
"@marigold/components": major
"@marigold/system": major
"@marigold/theme-docs": major
"@marigold/theme-rui": major
---

refa(DST-1109): Remove required indicator from the label's text content

**BREACKING CHANGE:** We removed the `indicator` styling from `<Label>`. The component is no longer a multi-part component. Rather than styling the required indicator through a dedicated part (previsouly `indicator`), you can now apply it anyway you want, for example by using `'group-required/field:after:content-["*"]'`.
