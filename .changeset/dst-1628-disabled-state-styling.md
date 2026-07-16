---
'@marigold/theme-rui': patch
---

fix(DST-1628): apply the disabled state to the `Slider` track, fill, thumb, and value, and dim the description text of disabled `SelectList`, `ListBox`, and `Menu` items. The Slider slots drove their disabled styles off the bare `disabled:` variant on plain `<div>`s, where it never matches, so they now key off `group-disabled/field:`. The item description slots hardcoded `text-secondary`, which overrode the inherited disabled color, so they now add `group-disabled/option:text-disabled`.
