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

`<FileField>` also used to spread its remaining props onto both the field
wrapper and the drop zone. Those are `DropZone` props, so they now reach the
drop zone only, and the component applies its own wiring after them. An
`onDrop` passed by a consumer no longer replaces the internal handler, which
used to stop files being added at all. An `aria-describedby` passed by a
consumer is merged with the id of the description or error instead of
replacing it. `id` and `slot` now land on the drop zone rather than on the
wrapper. With `size="small"` there is no drop zone, so they stay on the
wrapper as before.
