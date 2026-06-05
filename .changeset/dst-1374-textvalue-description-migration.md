---
'@marigold/components': patch
'@marigold/theme-rui': patch
'@marigold/system': minor
---

refactor(DST-1374): use `<TextValue>` and `<Description>` for selection-container items

Consumer-facing JSX in component stories and documentation demos for `<Select>`, `<SelectList>`, `<ListBox>`, `<Menu>`, `<ComboBox>`, and `<Autocomplete>` now composes item content with the `<TextValue>` and `<Description>` primitives instead of hand-written `<Text slot="label">` / `<Text slot="description">`. The primitives are drop-in replacements that render the same RAC `<Text>` with the same default slot values, so rendering, `aria-describedby` wiring, and accessibility are identical.

`<Menu.Item>` gains first-class `label` and `description` theme slots, mirroring `<SelectList.Option>`. `MenuItem` merges the Marigold theme classNames into RAC's `TextContext` so nested `<TextValue>` / `<Description>` pick up Menu styling without losing RAC's slot wiring. Menu items adopt a two-column grid layout (icon column + content column) so descriptions render below labels; existing plain-text and icon+text menu items are unaffected.

The `Menu` theme type in `@marigold/system` is extended with required `label` and `description` slot keys. Consumers maintaining a custom theme that overrides `Menu` will need to add these two slots to satisfy the type. `@marigold/theme-rui` is updated accordingly in this release.

No public API change on `Select.Option`, `SelectList.Option`, `ListBox.Item`, `Menu.Item`, `ComboBox.Option`, or `Autocomplete.Option`.
