---
'@marigold/components': minor
---

feat(DST-1513): `<Select>`'s `renderValue` now receives a second `details` argument with the selection `count`, and works when options are provided as static `<Select.Option>` children (previously it was silently skipped unless the options came from the `items` prop).

This makes it easy to summarise a multi-select trigger instead of listing every value, e.g. ``renderValue={(items, { count }) => `${count} selected`}``. The default trigger rendering is unchanged: without `renderValue`, a multi-select still lists the selected values.
