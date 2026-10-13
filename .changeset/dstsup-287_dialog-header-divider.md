---
'@marigold/theme-rui': patch
'@marigold/components': patch
---

fix(DSTSUP-287): show Dialog dividers only where the content is cut off

The divider under the Dialog title and the divider above `Dialog.Actions` now follow the same rule: each one shows only where the content is cut off by scrolling. Before, the title divider faded in once the content scrolled, but the actions divider was always shown, so a dialog that fit its content had a line above the actions and none under the title. Content that fits now shows no dividers. In browsers without scroll-driven animations (Firefox today) and in forced-colors mode, both dividers are always shown.

A dialog with only a title and actions has no divider, a `ConfirmationDialog` without `children` no longer leaves a blank band, and a dialog without a title has no divider at its top edge. A bare `Dialog.Title` and a `Dialog.Header` now space the title the same way.

The Dialog's header, content and actions carry a `data-slot` attribute (`header`, `content`, `actions`), which the theme uses to tell which parts are present. `@marigold/theme-rui` adds the `ui-scroll-dividers-y` utility and removes the unused `ui-scroll-seam-header`.
