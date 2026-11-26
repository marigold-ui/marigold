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
- The close button always shows, whatever `closeButton` is set to, so there is always a one-tap way out.

The docs describe how to protect unsaved changes: set `keyboardDismissable={false}` while a form is dirty and confirm with `useConfirmation` on the close button and "Cancel".

**Changed DOM.** On small screens the drawer is a single `dialog` named by its title, as before, but the element carrying `role="dialog"` is now the sheet, and the drawer's parts sit in a plain element inside it. Tests that look the drawer up by role and name keep working. Tests or styles that rely on its old full-screen wrapper need updating.

Update `@marigold/theme-rui` together with `@marigold/components`.

### Custom theme migration

The `Drawer` theme component gains a `dragHandle` slot, and on small screens `Sheet.container` draws the drawer's surface.

1. Add `dragHandle` to your `Drawer` theme component. theme-rui uses `cva({ base: 'bg-border mx-auto mt-2 h-1.5 w-12 rounded-full' })`.
2. Keep the surface styles of `Drawer.container` (background, ring, rounding, shadow, `h-full` and the `size` widths) behind `sm:`, or the sheet shows a second frame inside it. Below `sm`, `Drawer.container` lays out a four-row grid: handle, title, content and actions.
3. If your close button is positioned from the top, move it down below `sm` to clear the handle. theme-rui uses `max-sm:top-5`.

`marigold migrate v19` adds an empty `dragHandle` slot, adds a `Sheet` theme component when your theme has none, and warns about the surface styles. Steps 1 to 3 depend on your customizations, so make them by hand.
