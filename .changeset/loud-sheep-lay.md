---
'@marigold/components': major
'@marigold/docs': major
---

Migrate Select component to RAC

> [!WARNING]
> **BREAKCING CHANGE** `<Select.Option>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<Select.Option key="something"/>` to `<Select.Option id="something"/>`.