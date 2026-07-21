---
'@marigold/components': major
---

fix(DST-1559): remove dead and mis-named props from `TextField`, `FileTrigger`, and `Loader`.

- `TextField`: drop the `min`/`max` props. They were never forwarded to the underlying `<input>` (react-aria filters them out of both the input and wrapper props), so they had no effect. Numeric constraints belong on `NumberField`.
- `FileTrigger`: remove the mis-named singular `acceptedFileType` prop. Its key did not match react-aria's `acceptedFileTypes`, so file-type filtering silently never applied. Use the inherited `acceptedFileTypes` instead.
- `Loader`: fix the `loaderType` JSDoc, which documented a non-existent `cycle` value. The accepted values are `xloader` and `circle` (default `circle`).
