---
'@marigold/theme-rui': patch
---

fix(DSTSUP-287): always show the Dialog header divider

The Dialog header now always has a bottom divider, matching the divider above `Dialog.Actions` and the header and actions of Drawer and Tray. Before, the header line only faded in once the content scrolled, so a dialog that fit its content had a line above the actions and none under the title. A dialog with only a title and actions shows a single divider between them instead of two stacked lines.
