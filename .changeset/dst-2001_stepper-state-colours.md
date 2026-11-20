---
'@marigold/theme-rui': patch
---

style(DST-2001): Stepper shows progress in neutral colours instead of success green

A completed step is now a filled check in the primary colour, with a primary connector after it, so plain progress no longer reads as a success message. Connectors are a slightly thicker line with rounded ends. The current step is an outlined marker with a bold label. Disabled steps use the disabled colours, and every step that cannot be clicked shows a not-allowed cursor on hover. Nothing to change in your code.
