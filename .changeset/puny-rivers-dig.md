---
'@marigold/components': patch
---

docs: improve `AutoTypeTable` prop rendering

Centralizes the display of design-system aliases in the component docs'
prop tables. Props whose types reference aliases from `@marigold/system`
or `@marigold/types` (e.g. `SpacingTokens`, `Scale`, `WidthProp`,
`NonZeroPercentage`) now render with a meaningful summary in the main
cell **and** the full list of resolvable literal values on row expand —
instead of a wall of literals in the cell and a redundant alias name on
expand.

Before:

- Cell: `SpacingTokens<Tokens>` (a fabricated generic, inconsistent across components)
- Expand: `SpacingTokens | Scale | undefined` (same alias names, no new info)

After:

- Cell: `SpacingTokens | Scale` (accurate, derived from the real type)
- Expand: `"96" | "80" | ... | "tight" | "related" | 0` (every concrete value)

Under the hood this replaces 27 per-prop `@remarks \`TypeName\`` JSDoc
overrides with a single fumadocs-typescript transform in the docs site,
so future components pick up the same behavior automatically. A
`@remarks` tag on a prop still wins as an escape hatch.

`Multiselect.width` and `ComboBox.width` now use `WidthProp['width']`
directly instead of `FieldBaseProps<'label'>['width']` — structurally
identical, no runtime change.
