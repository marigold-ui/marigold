---
"@marigold/components": minor
"@marigold/theme-rui": minor
---

feat([DST-1092]): Add TagField component and deprecate Multiselect

- Add `<TagField>` component: a multi-select field that displays selected items as removable tags with a searchable dropdown, built on react-aria's Select, Autocomplete, and TagGroup
- Support for controlled/uncontrolled selection, disabled state, error state, disabled keys, sections, and custom empty state
- Deprecate `<Multiselect>` component with updated docs pointing to `<TagField>`
