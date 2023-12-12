---
"@marigold/docs": major
"@marigold/components": major
---

RAC: Autocomplete 

> [!WARNING]
> **BREAKCING CHANGE** `<Autocomplete.Item>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<Autocomplete.item key="something"/>` to `<Autocomplete.item id="something"/>`.
