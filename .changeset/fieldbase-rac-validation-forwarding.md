---
'@marigold/components': patch
---

fix(FieldBase): forward `isInvalid`, `isRequired`, and `isDisabled` to RAC components passed via `as`

When `FieldBase` renders through a React Aria Components element (e.g. `as={RACComponent}`), validation props are now forwarded so the underlying RAC element receives them. Plain DOM elements continue to skip these props to avoid unknown attribute warnings.
