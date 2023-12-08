---
"@marigold/docs": minor
"@marigold/components": minor
"@marigold/theme-b2b": minor
"@marigold/theme-core": minor
---

RAC: `<Table>` as react aria component

> [!WARNING]
> **BREAKCING CHANGE** `<Table.Column>` and `<Table.Row>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<Table.Column key="something"/>` to `<Table.Column id="something"/>`.
