---
'@marigold/components': patch
---

fix(DST-1906): keep focus in place when a confirmed action removes its trigger

`useConfirmation` now resolves once the confirmation dialog has closed and returned focus, instead of on the button press. Deleting the row whose button opened the confirmation no longer drops focus out of the surrounding overlay: a list inside a dialog, drawer or popover moves focus to the next row. The promise still resolves to `confirmed` or `cancelled`, only slightly later, after the dialog's closing animation.
