---
'@marigold/theme-rui': patch
'@marigold/components': patch
---

fix(DSTSUP-287): show Dialog dividers only where the content is cut off

The divider under the Dialog title and the divider above `Dialog.Actions` now follow the same rule: each one shows only where the content is cut off by scrolling. Before, the title divider faded in once the content scrolled, but the actions divider was always shown, so a dialog that fit its content had a line above the actions and none under the title. Content that fits now shows no dividers. A fullscreen dialog always shows both, because it often scrolls an inner region, such as a table, which the dividers cannot detect. In browsers without scroll-driven animations (Firefox today), both dividers are always shown.

A dialog with only a title and actions has no divider, a `ConfirmationDialog` without `children` no longer leaves a blank band, and a dialog without a title has no divider at its top edge. A bare `Dialog.Title` and a `Dialog.Header` now space the title the same way.

Both dividers are scroll-revealed seams again: the title keeps `ui-scroll-seam-header` and `Dialog.Actions` now uses `ui-scroll-seam-footer`, like the Sidebar footer. `ui-scroll-seam-header` honors `--seam-fallback-color` like the footer seam. The header, content and actions of Dialog, Drawer and Tray carry a `data-slot` attribute (`header`, `content`, `actions`).
