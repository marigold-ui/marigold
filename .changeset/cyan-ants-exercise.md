---
"@marigold/docs": patch
"@marigold/components": minor
"@marigold/theme-b2b": patch
"@marigold/theme-core": patch
---

RAC: Menu react aria components

> [!WARNING]
> **BREAKCING CHANGE** `<Menu.Item>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<Menu.item key="something"/>` to `<Menu.item id="something"/>`.
