---
'@marigold/components': patch
---

Fix `Autocomplete`'s public `onSubmit` type, which declared `(value, key)` while the implementation, JSDoc, and both docs demos all used `(key, value)`. The type now matches the actual `(key, value)` signature — no runtime behavior changes.