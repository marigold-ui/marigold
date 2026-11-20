---
'@marigold/theme-rui': patch
'@marigold/components': patch
'@marigold/docs': patch
---

style(DST-2001): Stepper shows progress in neutral colours instead of success green

A completed step is now a filled check in the primary colour, with a primary connector after it, so plain progress no longer reads as a success message. Connectors are a slightly thicker line with rounded ends. The current step is an outlined marker with a bold label. Disabled steps use the disabled colours, and every step that cannot be clicked shows a not-allowed cursor on hover.

A step in both `completedKeys` and `disabledKeys` used to show its number and was announced only as "not available". It now shows the check and is announced as "completed, not available". It still cannot be clicked and its connector stays unfilled.

The Stepper docs put Back on the far left and Continue on the far right in the multi-step form examples, without icons, and end on a "Place order" button that confirms the order. The Button page no longer lists wizards under right-to-left button order.

Nothing to change in your code.
