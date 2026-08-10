---
'@marigold/components': minor
---

feat(DST-944): add `addUndoToast`, gate `FileField` removals with `onBeforeRemove`, and make destructive confirmations settle reliably.

`useToast` gains **`addUndoToast({ title, onUndo, onCommit })`**, which reports a destructive action as done and sends the real request only if the user does not take it back. It owns the parts that are easy to get wrong, so a caller cannot lose a deletion to a drifting timer, an unguarded commit, or a toast that never closes. The [Destructive Actions](https://www.marigold-ui.io/patterns/feedback/destructive-actions) pattern explains each one.

`addToast` now accepts `onClose`, called when the toast closes for any reason: its timeout ran out, it was dismissed, it was closed through `removeToast`, or the queue was cleared. It also accepts `closeButton: false`, which a toast that never auto-dismisses (`warning`, `error`, `timeout: 0`) ignores, since that would leave no way out of it.

**`<FileField>` accepts `onBeforeRemove`**, called with the file a remove button is about to drop. Return `false`, or a promise resolving to `false`, to keep it, which is what puts a confirmation in front of the built-in remove buttons. A handler that throws keeps the file.

**Each `FileField` remove button is now named after its file** ("Remove agb-2026-08-01.pdf") instead of all announcing "Remove file", so the rows of a document list are distinguishable to a screen reader. `FileField.Item` takes `removeLabel` to set that name when you compose items yourself.

`Dialog.Trigger` no longer blocks <kbd>Escape</kbd> by default. An unset `keyboardDismissable` was inverted into "keyboard dismiss disabled", so every dialog opened from a trigger trapped the keyboard unless the prop was passed explicitly, contradicting both the documentation and the default in `Tray` and `Drawer`. Pass `keyboardDismissable={false}` to opt out. This is a behaviour change for anyone who relied on the previous default.

`ConfirmationDialog` and `useConfirmation` gain four fixes around the same flow:

- Closing a confirmation without pressing a button (<kbd>Escape</kbd>) now resolves `useConfirmation` as `cancelled`. Previously the promise never settled, so an `await confirm(...)` silently stalled and its continuation never ran.
- `ConfirmationDialog` focuses the cancel button by default when `variant="destructive"`, so a reflexive <kbd>Enter</kbd> takes the safe path. Pass `autoFocusButton: 'action'` to focus the confirm button instead.
- `ConfirmationProvider` now forwards the `autoFocusButton` from a `confirm()` config, which it accepted but dropped, and its confirm button falls back to the localized `confirm` message rather than a hardcoded "Confirm" next to a translated "Cancel".
- `ConfirmationDialogProps['variant']` is typed as `'destructive' | (string & {})` so the variant that drives this behaviour is discoverable, rather than an untyped string.

The action buttons call their handler before closing the dialog so that an owner watching `onOpenChange` sees the decision before it sees the close. This is a behaviour change for anyone relying on the previous ordering. They are still called with no arguments.

See the new [Destructive Actions](https://www.marigold-ui.io/patterns/feedback/destructive-actions) pattern for when to confirm and when to offer undo.
