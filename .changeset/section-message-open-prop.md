---
'@marigold/components': major
---

fix(DST-1556): rename SectionMessage's controlled visibility prop from `close` to `open`

`<SectionMessage>`'s controlled visibility prop was named `close` but its truthiness meant *visible* ,  `close={true}` showed the message and `close={false}` hid it, the opposite of what the name and docs implied. It's now `open`, matching the polarity used by `<Dialog>`, `<Drawer>`, `<Tray>`, and `<Sidebar>`.

| Before                                           | After                                                          |
| ------------------------------------------------- | ----------------------------------------------------------------- |
| `close={isVisible}` (truthy = visible)             | `open={isVisible}` (truthy = visible)                              |
| `close={!isDismissed}`                             | `open={!isDismissed}`                                              |
| `onCloseChange={setX}` (receives current value)    | `onOpenChange={(open) => ...}` (receives `false` on dismiss)       |

A new `defaultOpen` prop (default `true`) sets the initial visibility in uncontrolled mode. The uncontrolled default behavior (visible, self-dismisses via the close button) is unchanged.
