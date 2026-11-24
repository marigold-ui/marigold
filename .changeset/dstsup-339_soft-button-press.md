---
'@marigold/theme-rui': patch
---

fix(DSTSUP-339): keep button outlines sharp while pressed, and ease the press

A pressed primary, secondary or destructive button, or a menu trigger, shrank as a whole. That blurred its 1px outline whenever an edge landed between device pixels and left a light seam between outline and fill, so the button looked cut off. The label still shrinks, but the frame now stays in place and its outline moves inside, so the button reads 1px smaller on every side without blurring. The corners of these buttons and of the action bar also no longer show a faint light seam at rest.

These surfaces now paint their fill and outline on a `::before` and form their own stacking context.

The press also no longer jumps. Every button variant now eases into the pressed state in 90ms and back out in 180ms. Nothing to change on your side.
