---
"@marigold/docs": minor
"@marigold/components": minor
---

feat(dialog): Introduce a dedicated button to cancel a dialog

Make it more convenient to have a button that closes the `<Dialog>`. With this, there is less need to use the child function to access the `close` method. Instead you can now use `<Dialog.Cancel>` to render a standarized cancel button.
