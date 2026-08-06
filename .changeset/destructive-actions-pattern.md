---
'@marigold/components': minor
---

feat(DST-944): add an `onClose` handler to `useToast` and make destructive confirmations settle reliably.

`addToast` now accepts `onClose`, called when the toast closes for any reason: its timeout ran out, it was dismissed, it was closed through `removeToast`, or the queue was cleared. This is what an "Undo" toast commits its deferred work from: React Aria pauses a toast's timer while the toast region is hovered or focused, so a `setTimeout` running alongside the toast drifts out of sync and commits while the "Undo" button is still on screen.

`ConfirmationDialog` and `useConfirmation` gain four fixes around the same flow:

- Closing a confirmation without pressing a button (<kbd>Escape</kbd>) now resolves `useConfirmation` as `cancelled`. Previously the promise never settled, so an `await confirm(...)` silently stalled and its continuation never ran.
- `ConfirmationDialog` focuses the cancel button by default when `variant="destructive"`, so a reflexive <kbd>Enter</kbd> takes the safe path. Pass `autoFocusButton` to override.
- `ConfirmationProvider` now forwards the `autoFocusButton` from a `confirm()` config, which it accepted but dropped.
- `ConfirmationDialogProps['variant']` is typed as `'destructive' | (string & {})` so the variant that drives this behaviour is discoverable, rather than an untyped string.

The action buttons call their handler before closing the dialog so that an owner watching `onOpenChange` sees the decision before it sees the close. This is a behaviour change for anyone relying on the previous ordering.

See the new [Destructive Actions](https://www.marigold-ui.io/patterns/feedback/destructive-actions) pattern for when to confirm and when to offer undo.
