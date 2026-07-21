---
'@marigold/components': minor
---

fix([DST-1363]): make `<TagGroup>` `errorMessage` render and bridge it to form validation

`<TagGroup>` accepted `errorMessage` via `<FieldBase>` but never rendered it because RAC's `TagGroup` does not populate `FieldErrorContext`. The internal `<HelpText>` short-circuits on a missing context, so the error path was a silent no-op and `<Form>`-level validation never reached the user.

Bridges `<TagGroup>` to validation the same way `<SelectList>` does: `useFormValidationState` + `useFormValidation` on a hidden `<select>` (replacing the previous `<input type="checkbox">` shim), with `<FormContext>` inheritance for `validationBehavior`. The shared hidden control lives at `HiddenSelection/` and is now consumed by both `<SelectList>` and `<TagGroup>` so future fixes only happen once.

New props on `<TagGroup>`: `error`, `required`, `disabled`, `validate`, `validationBehavior`, `form`. Public API normalised to Marigold's convention — `isInvalid` / `isRequired` / `isDisabled` are removed and `onSelectionChange` is renamed to `onChange`. `selectionMode` now defaults to `'multiple'`. `disabled` now propagates to each `<Tag>` via context so interaction is blocked alongside the form-disabled state.

[DST-1363](https://reservix.atlassian.net/browse/DST-1363)
