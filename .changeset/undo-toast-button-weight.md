---
'@marigold/components': patch
---

style(DST-1711): give the undo toast's action button a visible weight.

`addUndoToast` rendered its Undo button as `variant="ghost"`, which has no fill and no border until it is hovered. It is now the default `secondary` button, so the way back out of a deletion is visible at a glance.

Review feedback on the [Destructive Actions](https://www.marigold-ui.io/patterns/feedback/destructive-actions) pattern found the button easy to overlook: the toast arrives far from the control that triggered it and leaves again after five seconds, which is the worst case for an affordance that only appears on hover. It is deliberately not a `destructive` button — undo is the safe action, and red beside a completed deletion reads as a second delete.
