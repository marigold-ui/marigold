---
'@marigold/theme-rui': patch
---

Give Menu items and the FileField drop zone a real keyboard focus indicator.

Both signalled focus with a background wash alone — 1.11:1 for a menu item, ~1.05:1 for the drop zone — well under the 3:1 WCAG 1.4.11 asks of a state indicator. In a menu the wash is doubly unreliable, since focus follows the mouse there and the same wash fires on hover.

Adds `ui-state-focus-item`, the missing counterpart to `ui-state-focus`. `ui-state-focus` is a two-part indicator: the border flips to full-opacity `--color-ring` and the outline is a soft halo around it. On an element with no border to flip it degrades to the halo alone, which measures 2.08:1. `ui-state-focus-item` is for those borderless rows — a full-opacity inset ring (4.97:1 over the focus wash, 3.14:1 on the contrast ground), inset so overflow-hidden overlays like Popover cannot clip it.

Only keyboard focus changes. Hover, selection and pointer interaction are untouched.
