---
'@marigold/theme-rui': patch
'@marigold/components': patch
---

fix(DSTSUP-287): always show the Dialog header divider

The Dialog header now always has a divider below it, matching the divider above `Dialog.Actions` and the header and actions of Drawer and Tray. Before, the header line only faded in once the content scrolled, so a dialog that fit its content had a line above the actions and none under the title.

Dividers only border the content: one above it when there is a title, one below it when there are actions. A dialog with only a title and actions has no divider, a `ConfirmationDialog` without `children` no longer leaves a blank band, and a dialog without a title has no divider at its top edge.

The Dialog's header, content and actions now carry a `data-slot` attribute (`header`, `content`, `actions`), which the theme uses to tell which parts are present. The unused `ui-scroll-seam-header` utility is removed from `@marigold/theme-rui`.
