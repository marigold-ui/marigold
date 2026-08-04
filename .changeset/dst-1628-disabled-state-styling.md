---
'@marigold/theme-rui': patch
---

fix(DST-1628): apply the disabled state to the `Slider` track, fill, thumb, and value, dim the description text of disabled `SelectList`, `ListBox`, and `Menu` items, and show the not-allowed cursor on disabled items. The Slider slots drove their disabled styles off the bare `disabled:` variant on plain `<div>`s, where it never matches, so they now key off `group-disabled/field:`. The item description slots hardcoded `text-secondary`, which overrode the inherited disabled color, so they now add `group-disabled/option:text-disabled`. Disabled `SelectList` and `ListBox` items still showed the pointer cursor because the interactive `data-selection-mode:cursor-pointer` utility outranked `disabled:cursor-not-allowed` on source order, so the selectable cursor is now gated behind `not-disabled:`. `Menu` gained the `disabled:cursor-not-allowed` it was missing.
