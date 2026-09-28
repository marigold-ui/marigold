---
'@marigold/components': minor
---

feat(DST-1741): wire `<FileField>` into the form validation system

`<FileField>` was the only field-shaped component that could not validate. A
required upload could not block submission, and a file rejected by `accept`
disappeared with no message and nothing announced.

It now takes `required`, `error`, `errorMessage`, `description`, `form`,
`validate` and `validationBehavior` like every other field, plus `maxSize` to
cap a single file in bytes. Errors render through the same `HelpText` path as a
`<TextField>`, so they look identical, and they are associated with the upload
button so a screen reader reads them.

A file rejected by `accept` or by `maxSize` now produces a localised error
instead of vanishing. Only drag and drop can deliver such a file, because the
file browser already filters by `accept`.

Server errors arrive through `<Form validationErrors>`, keyed by the field's
`name`. Resetting the form clears the selection together with any error.

One behaviour change worth knowing: the hidden input now renders even when no
`name` is given, because constraint validation needs the element inside the
form. `name` still decides whether the file is submitted.
