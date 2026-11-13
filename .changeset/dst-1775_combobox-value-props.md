---
'@marigold/components': major
'@marigold/cli': minor
'@marigold/docs': patch
---

feat(DST-1775): `value` means the selected key on ComboBox and Autocomplete

`<ComboBox>` and `<Autocomplete>` now use `value`, `defaultValue` and `onChange` for the selected option, the same as `<Select>` and react-aria. The input text moves to `inputValue`, `defaultInputValue` and `onInputChange`. Use the new `value` props in place of `selectedKey`, `defaultSelectedKey` and `onSelectionChange`, which react-aria has deprecated.

```diff
  <ComboBox
-   value={filterText}
-   onChange={setFilterText}
-   selectedKey={animal}
-   onSelectionChange={setAnimal}
+   inputValue={filterText}
+   onInputChange={setFilterText}
+   value={animal}
+   onChange={setAnimal}
    label="Animal"
  >
```

A string `value` still compiles after the upgrade, because a key can be a string, but it is then looked up as an option `id` and the input stays empty. After upgrading, run `marigold migrate v19 <path> --dry-run`, read the report, then run `marigold migrate v19 <path>` to apply it before writing new code. It renames both prop sets on every ComboBox and Autocomplete and skips elements that already use the `inputValue` props. The CLI then records the migration in your `package.json`, so it never offers to rename the same props twice.

The codemod only sees props written on the element. Spread props get a warning: a react-hook-form `{...field}` spread hides the change from the typechecker too, so pass the handler explicitly as `onInputChange={field.onChange}` for text or `onChange={field.onChange}` for a selection. Your own wrapper components that pass `value` through are not flagged at all, so check those by hand.

On `<Autocomplete>`, a consumer `onChange` no longer disables `onSubmit`. Both now run when an option is picked.
