---
'@marigold/components': major
'@marigold/theme-core': major
'@marigold/theme-b2b': major
---

**Breaking changes**

- `Dialog.Headline` has been renamed to `Dialog.Title`. Please update your code accordingly.

- `<Dialog.Content>` and  `<Dialog.Actions>` have been introduced for better organization and flexibility.

- The internal layout now uses grid areas, ensuring consistent ordering and layout of the dialog elements.

- Existing implementations of the `<Dialog>` component will need to be updated to use these new subcomponents.

