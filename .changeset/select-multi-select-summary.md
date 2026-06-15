---
'@marigold/components': minor
---

feat(DST-1513): improve `<Select>` multi-select trigger rendering. When more than one option is selected, the trigger now shows a localized "N selected" summary instead of listing every value (which overflowed the trigger). The value display and `renderValue` now also work when options are provided as static `<Select.Option>` children, not just via the `items` prop, because the trigger now gates on the raw selection count instead of the non-null-filtered items. Single-select rendering and `items`-driven `renderValue` are unchanged.
