---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix(Tray): keep `Tray.Actions` reachable when the viewport shrinks

`Tray.Content` pinned its `min-height` to the height it measured at mount and never let go of it. When the viewport shrank afterwards, the tray box shrank but that grid row could not, so the grid overflowed and `Tray.Actions` walked off the bottom of the screen: at a 390px viewport the close/confirm buttons ended up 432px below the fold, with no way to reach them. Rotation, the on-screen keyboard opening in a ComboBox or Autocomplete tray, and mobile browser UI appearing all trigger it.

The pin is still measured once, since it is what stops the tray resizing while a list filters down, but it is now capped at the height the viewport actually leaves for it. The content area absorbs the difference by scrolling, which is what it is for. The cap is a CSS `min()` against the tray's own maximum height, so the browser re-resolves it on every viewport change and a filtered list is never re-measured.

The tray container also capped itself at `95vh`. On mobile `vh` is the _large_ viewport, so the tray could be laid out taller than what is actually visible while browser UI is showing. It now uses the visual viewport height that `Drawer` already used, applied in the component rather than the theme, so no theme has to know about it.
