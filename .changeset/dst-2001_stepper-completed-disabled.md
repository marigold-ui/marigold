---
'@marigold/components': patch
---

fix(DST-2001): Stepper keeps the check on a step that is both completed and disabled

A step in both `completedKeys` and `disabledKeys` used to show its number and was announced only as "not available". It now shows the check and is announced as "completed, not available". It still cannot be clicked and its connector stays unfilled. Nothing to change in your code.
