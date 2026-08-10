---
'@marigold/components': minor
---

feat(DST-944): add an `onClose` handler to `useToast` and make destructive confirmations settle reliably.

`addToast` now accepts `onClose`, called when the toast closes for any reason: its timeout ran out, it was dismissed, it was closed through `removeToast`, or the queue was cleared. This is what an "Undo" toast commits its deferred work from: React Aria pauses a toast's timer while the toast region is hovered or focused, so a `setTimeout` running alongside the toast drifts out of sync and commits while the "Undo" button is still on screen.

`Dialog.Trigger` no longer blocks <kbd>Escape</kbd> by default. An unset `keyboardDismissable` was inverted into "keyboard dismiss disabled", so every dialog opened from a trigger trapped the keyboard unless the prop was passed explicitly, contradicting both the documentation and the default in `Tray` and `Drawer`. Pass `keyboardDismissable={false}` to opt out. This is a behaviour change for anyone who relied on the previous default.

`ConfirmationDialog` and `useConfirmation` gain four fixes around the same flow:

- Closing a confirmation without pressing a button (<kbd>Escape</kbd>) now resolves `useConfirmation` as `cancelled`. Previously the promise never settled, so an `await confirm(...)` silently stalled and its continuation never ran.
- `ConfirmationDialog` focuses the cancel button by default when `variant="destructive"`, so a reflexive <kbd>Enter</kbd> takes the safe path. Pass `autoFocusButton: 'action'` to focus the confirm button instead.
- `ConfirmationProvider` now forwards the `autoFocusButton` from a `confirm()` config, which it accepted but dropped, and its confirm button falls back to the localized `confirm` message rather than a hardcoded "Confirm" next to a translated "Cancel".
- `ConfirmationDialogProps['variant']` is typed as `'destructive' | (string & {})` so the variant that drives this behaviour is discoverable, rather than an untyped string.

The action buttons call their handler before closing the dialog so that an owner watching `onOpenChange` sees the decision before it sees the close. This is a behaviour change for anyone relying on the previous ordering. They are still called with no arguments.

See the new [Destructive Actions](https://www.marigold-ui.io/patterns/feedback/destructive-actions) pattern for when to confirm and when to offer undo.
