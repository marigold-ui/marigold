---
"@marigold/docs": major
"@marigold/components": major
---

refa: Migrate `ComBox` to RAC

> [!WARNING]
> **BREAKCING CHANGE** `<ComboBox.Item>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<ComboBox.item key="something"/>` to `<ComboBox.item id="something"/>`.
