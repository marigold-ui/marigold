# TagGroup: Broken FieldError / errorMessage support

## Summary

Marigold's `TagGroup` component wraps its content in `FieldBase` and therefore accepts `errorMessage` via `FieldBaseProps`, but the error message is **never rendered**. The required `FieldErrorContext` is never populated, so `HelpText` (and the `FieldError` it renders internally) silently do nothing.

`TagGroup` currently has no way to display validation errors to the user.

## Affected component

- `packages/components/src/TagGroup/TagGroup.tsx`
- Indirectly any consumer — `TagField` also renders as `<FieldBase as={ReactAriaSelect}>` internally and is unaffected, but anything that uses `TagGroup` directly is affected.

## Root cause

`HelpText` (`packages/components/src/HelpText/HelpText.tsx:37-43`) decides whether to render an error by reading `FieldErrorContext` from `react-aria-components`:

```tsx
const ctx = useContext(FieldErrorContext);

if (!description && !ctx?.isInvalid) {
  return null;
}
```

And the underlying `<FieldError>` (line 46) also short-circuits on `!ctx?.isInvalid`.

`FieldErrorContext` is only populated by RAC field primitives that run their own validation state (e.g. `TextField`, `Select`, `RadioGroup`, `CheckboxGroup`, `NumberField`). Those RAC components internally call `useFormValidationState` → `useFormValidation` → `FieldErrorContext.Provider`.

**RAC's `TagGroup` does not do any of this.** It is a presentation + selection primitive; it provides `ListStateContext` (for the selection), and it forwards `descriptionProps` / `errorMessageProps` into a `TextContext` with slots — but it never creates a `FieldErrorContext` and never runs validation state.

Marigold's `TagGroup.tsx:58` wraps the RAC primitive with `<FieldBase as={TagGroup}>`. Nothing on that path injects `FieldErrorContext`, so the context is `null` when `HelpText` reads it, and the error message path never renders.

Confirmed by inspection of:

- `node_modules/.pnpm/react-aria-components@*/dist/private/TagGroup.js` — no `FieldErrorContext.Provider`, no `useFormValidationState` call
- `packages/components/src/HelpText/HelpText.tsx:37-46,79` — every render branch depends on `ctx?.isInvalid`
- `packages/components/src/TagGroup/TagGroup.tsx` — no `FieldErrorContext` bridge

## Additional gaps on TagGroup (while we're here)

Even if `FieldErrorContext` were bridged manually, the following are also missing versus a first-class form element like `RadioGroup`/`CheckboxGroup`:

1. No `validate` prop (client-side validation callback).
2. No integration with `<Form validationErrors={...}>` — server-side errors keyed by `name` are not picked up, because no call to `useFormValidationState` is made.
3. No native browser validation on submit — `TagGroupHiddenInput` (`packages/components/src/TagGroup/TagGroupHiddenInput.tsx`) renders `<input type="checkbox" checked readOnly>` nodes without a `required` attribute and without a ref bound to `useFormValidation`, so `isRequired` does not block form submission.
4. No `validationBehavior` inheritance from an ancestor `<Form>` (no `useSlottedContext(FormContext)` read).
5. No `isInvalid` → data attribute / styling signal on the group wrapper.
6. `isRequired` is removed from the public props via `RemovedProps` in `TagGroup.tsx:10`, so consumers can't even pass it — but the underlying RAC types support it. Whether this removal is intentional should be revisited.

## Repro

```tsx
<TagGroup
  label="Fruits"
  name="fruits"
  errorMessage="You must pick a fruit"
  // No way to force this to display. Passing `isInvalid` does nothing visible.
>
  <Tag>Apple</Tag>
  <Tag>Banana</Tag>
</TagGroup>
```

Expected: error message renders below the tag list when invalid.
Actual: nothing renders. `HelpText` short-circuits because `FieldErrorContext` is `null`.

## Suggested fix

Two options, in order of increasing completeness:

### Option A — Shallow bridge (matches what `Multiselect.tsx:254-261` already does)

Wrap the content in a manually constructed `FieldErrorContext.Provider` driven by an `error` / `isInvalid` prop:

```tsx
import { FieldErrorContext, Provider } from 'react-aria-components';

<Provider
  values={[
    [
      FieldErrorContext,
      {
        isInvalid: !!error,
        validationDetails: {} as ValidityState,
        validationErrors: [],
      },
    ],
  ]}
>
  <FieldBase
    as={TagGroup}
    isInvalid={!!error}
    errorMessage={errorMessage}
    {...rest}
  >
    {/* ... */}
  </FieldBase>
</Provider>;
```

This fixes the "error message doesn't render" bug but does not integrate with native form validation, `validate`, or `<Form validationErrors>`.

### Option B — Full bridge (matches RAC `RadioGroup`/`CheckboxGroup` feature parity)

Use `useFormValidationState` from `@react-stately/form` and `useFormValidation` from `@react-aria/form` on the hidden-input ref. This gives TagGroup the same validation capabilities as first-class form components:

```tsx
import { FormContext, useSlottedContext } from 'react-aria-components';
import { useFormValidation } from '@react-aria/form';
import { useFormValidationState } from '@react-stately/form';

const formCtx = useSlottedContext(FormContext) || {};
const validationBehavior =
  props.validationBehavior ?? formCtx.validationBehavior ?? 'native';

const validationState = useFormValidationState({
  name,
  value: Array.from(selectedKeys),
  isInvalid: props.isInvalid,
  validate: props.validate,
  validationBehavior,
});

const hiddenInputRef = useRef<HTMLInputElement>(null);
useFormValidation(
  { validationBehavior, focus: () => listRef.current?.focus() },
  validationState,
  hiddenInputRef
);

<FieldErrorContext.Provider value={validationState.displayValidation}>
  {/* ... */}
</FieldErrorContext.Provider>;
```

Recommendation: go with Option B so `TagGroup` behaves like the other form fields in the system (consistent with planned `SelectList` form-field work).

## Relationship to SelectList work

This bug was discovered while researching how to convert `SelectList` into a form field. `SelectList` uses `GridList` under the hood; `GridList` has the same property as `TagGroup` (provides `ListStateContext`, does not provide `FieldErrorContext`). The fix on `SelectList` will therefore look almost identical to the fix proposed here for `TagGroup`. Aligning both under the same pattern at the same time would prevent drift.

### Follow-up: extract shared hidden-input primitive

Once both `TagGroup` and `SelectList` are bridged to `FieldErrorContext` via `useFormValidationState` + `useFormValidation`, the two implementations of the hidden form input become near-duplicates:

- `packages/components/src/TagGroup/TagGroupHiddenInput.tsx` — currently renders `<input type="checkbox" checked readOnly>` per selected key, no validation wiring.
- `packages/components/src/SelectList/SelectListHiddenSelect.tsx` — renders a hidden `<select>` (single or multiple) and is fully wired to `useFormValidation`.

Both serve the same purpose: project a RAC selection state into a real form control so the browser submits it (and, with native validation, focuses something useful when invalid). After Option B above, both will need:

- a `name` / `form` association,
- a hidden focusable element bound to `useFormValidation`,
- selection-mode-aware value projection (single key vs key set),
- a `required` attribute when `validationBehavior === 'native'`.

Opportunity: extract a shared `useHiddenSelectionInput` hook (or a `<HiddenSelection>` component) under `packages/components/src/SelectList/` or a new shared location, parameterized by selection mode and value projection. Both `TagGroup` and `SelectList` would consume it, removing the duplication and ensuring future fixes (e.g. native-validation focus behavior) only happen once.

Scope note: this is a follow-up refactor, not part of the immediate `TagGroup` bug fix. Land Option B for both components first, then unify.

## Evidence / references

- `packages/components/src/TagGroup/TagGroup.tsx` — no `FieldErrorContext` provider
- `packages/components/src/HelpText/HelpText.tsx:37-43` — short-circuits without `FieldErrorContext`
- `packages/components/src/HelpText/HelpText.tsx:79` — description path also depends on `ctx`
- `packages/components/src/Multiselect/Multiselect.tsx:254-261` — precedent for manual `FieldErrorContext` bridge
- `node_modules/.pnpm/react-aria-components@*/dist/private/TagGroup.js` — confirmation that RAC's TagGroup does not bridge `FieldErrorContext`
- `node_modules/.pnpm/@react-stately+form@*/dist/useFormValidationState.module.js` — `useFormValidationState` API
- `node_modules/.pnpm/@react-aria+form@*/dist/useFormValidation.module.js` — `useFormValidation` API
