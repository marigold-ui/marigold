---
"@marigold/docs": patch
"@marigold/components": patch
"@marigold/system": patch
"@marigold/theme-b2b": patch
---

refa(listbox): Allow sections in `<Combobox>` and `<Autocomplete>`, adjust Section API in `<Select>`, `<Combobox>` and `<Autocomplete>`.

- Added the possibility to use sections with `<Combobox>` and `<Autocomplete>`
- Refactored the `<Section>` (from `<Listbox>`) to fit our API, no need for the extra `<Header>` anymore. Instead you can do `<Select.Section header="My header">`, same for the other components
- Renamed `<Item>` to `<Option>` in `<Combobox>` and `<Autocomplete>` to align with `<Select>`
- Updated the docs for `<Select>`, `<Combobox>` and `<Autocomplete>`
- Updated Storybook for `<Select>`, `<Combobox>` and `<Autocomplete>` with section stories
- Renamed the part of the `<ListBox>` accordingly (from `sectionTitle` to `header`)

  **BREAKING CHANGE:** We changed the API of the `<Section>` component that is used in `<Select>`, `<Combobox>` and `<Autocomplete>`. It is no longer necessary to add a `Header` within the `<Section>`.
  
  Use the newly added `header` prop instead. Additionally, to unify the APIs all choices of  `<Select>`, `<Combobox>` and `<Autocomplete>` are now called `<Option>` instead of `<Item>`.