---
'@marigold/components': patch
---

docs: centralize design-system alias display in AutoTypeTable

Replaces the per-prop `@remarks \`TypeName\`` JSDoc convention with a centralized
fumadocs-typescript transform. Props whose types reference aliases from
`@marigold/system` or `@marigold/types` now display the alias name (e.g.
`SpacingTokens | Scale`) in the prop table, with the full expanded literal
union available on row expand. Removes 27 now-obsolete `@remarks` overrides.

`Multiselect.width` and `ComboBox.width` now use `WidthProp['width']` directly
instead of `FieldBaseProps<'label'>['width']` — structurally identical, no
runtime change.
