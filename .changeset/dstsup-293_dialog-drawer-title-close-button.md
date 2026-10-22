---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix(DSTSUP-293): keep long Dialog and Drawer titles clear of the close button

With `closeButton`, the header now reserves the close button's width plus a gap on its end side, so a long title wraps before the button instead of running under it. Headers without a close button keep their even padding.
