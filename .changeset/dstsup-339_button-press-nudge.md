---
'@marigold/theme-rui': patch
---

fix(DSTSUP-339): pressed buttons move down 1px instead of shrinking, so their border stays sharp

While held down, a button shrank slightly. On screens without high pixel density this blurred the top and bottom edge of its border, which looked as if the button were cut off. Buttons, menu triggers and other pressable controls now move down by 1px while pressed. Nothing to change on your side.
