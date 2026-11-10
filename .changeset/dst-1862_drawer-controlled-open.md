---
'@marigold/components': minor
'@marigold/docs': patch
---

feat(DST-1862): open and close a Drawer without `Drawer.Trigger`

`<Drawer>` now takes `open`, `defaultOpen` and `onOpenChange` directly, the same way `<Dialog>` does. A drawer opened from a table row, an ActionBar action or a route no longer needs a `Drawer.Trigger` with a hidden button inside it.

The close button, `slot="close"` buttons, Escape and another drawer opening all call `onOpenChange(false)`, on desktop and in the mobile sheet. Before, a drawer with only `open` could not be closed, and on small screens it did not render at all.

Inside a `Drawer.Trigger`, the drawer's own `open` or `defaultOpen` takes precedence over the trigger's state, as in React Aria. Setting only `onOpenChange` on a drawer inside a trigger logs a development warning to move it to the trigger. If you set `open` on both the trigger and the drawer, the drawer now owns its state, so its close button, Escape and another drawer opening no longer reach the trigger's `onOpenChange`. Set `onOpenChange` on the drawer too, or leave `open` on the trigger only. Other `Drawer.Trigger` usage is unchanged.
