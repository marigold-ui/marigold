---
'@marigold/components': major
'@marigold/system': major
'@marigold/theme-rui': major
'@marigold/cli': patch
'@marigold/docs': patch
---

feat(DST-1866): open the Drawer as a swipeable bottom sheet on small screens

On small screens the `Drawer` now rises from the bottom as a sheet, built on the same internal `Sheet` as the tray. It fills almost the full height, leaves a strip of the dimmed page showing above it and has a handle at its top edge. The desktop Drawer is unchanged.

What changes for users on small screens:

- A swipe down closes the drawer. When the content scrolls, the first swipe scrolls it back to the top and the next one closes it.
- Escape and a press on the dimmed page close it too. Before, only Escape and the close button did.
- `keyboardDismissable={false}` now works on small screens and turns off the swipe, Escape and the press outside together. Before, it was ignored there.
- The close button always shows, whatever `closeButton` is set to, so there is always a one-tap way out. It has a full touch target there.

Check two kinds of drawers. A drawer with its own close control in its content now shows two on small screens, so remove one or hide yours there. A drawer with a form now closes on a swipe or a press outside, so set `keyboardDismissable={false}` while the form has unsaved changes.

The docs describe how to protect unsaved changes: set `keyboardDismissable={false}` while a form is dirty and confirm with `useConfirmation` on the close button and "Cancel".

**Changed DOM.** On small screens the drawer is a single `dialog` named by its title, as before, but the element carrying `role="dialog"` is now the sheet, and the drawer's parts sit in a plain element inside it. Tests that look the drawer up by role and name keep working. Tests or styles that rely on its old full-screen wrapper need updating.

Update `@marigold/theme-rui` together with `@marigold/components`.

### Custom theme migration

On small screens `Sheet` draws the drawer's surface and its drag handle. The handle of every bottom sheet is now one `Sheet.dragHandle` slot, so the Tray's moves there too.

1. Keep the surface styles of `Drawer.container` (background, ring, rounding, shadow, `h-full` and the `size` widths) behind `sm:`, or the sheet shows a second frame inside it.
2. Move a customized `Tray.dragHandle` to `Sheet.dragHandle` and remove it from `Tray`. The handle no longer sits in the tray's grid, so give `Tray.container` three rows (title, content, actions), for example `grid-rows-[auto_1fr_auto]`.
3. Below `sm` the close button is a full touch target. theme-rui uses `max-sm:top-1.5 max-sm:right-1 max-sm:size-touch-target`.

`marigold migrate v19` adds a `Sheet` theme component with theme-rui's handle when your theme has none, and warns about the surface styles and the moved handle. Steps 1 to 3 depend on your customizations, so make them by hand.
