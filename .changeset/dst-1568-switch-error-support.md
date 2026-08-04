---
'@marigold/components': minor
---

feat(DST-1568): add `error` and `errorMessage` support to `Switch` and `Checkbox`

When `error` is set, the field is marked invalid and the `errorMessage` is shown in place of the `description`, wired to the input via `aria-describedby`. When both are unset, rendering is unchanged.

Internally, `Switch` and `Checkbox` now render their `HelpText` inside the RAC field (`SwitchField`/`CheckboxField`), relying on RAC's native `aria-describedby` and `FieldErrorContext` wiring instead of re-plumbing it by hand. No other public API change.
