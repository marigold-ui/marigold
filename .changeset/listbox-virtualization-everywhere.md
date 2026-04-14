---
"@marigold/components": minor
---

feat(DST-1323): always-on virtualization for `<Select>`, `<ComboBox>`, and `<Autocomplete>` dropdowns

Follow-up to #5307. Large datasets (hundreds to thousands of items) no longer freeze the browser when opening or filtering these components — the internal `<ListBox>` is now virtualized with `react-aria`'s `Virtualizer` + `ListLayout` (same pattern used by `<TagField>`).

- `<Select>`, `<ComboBox>`, `<Autocomplete>`: virtualization is enabled by default on desktop, with no public API change
- `<ListBox>`: the virtualized list now has a bounded height (`max-h: 24rem`) so the virtualizer has a viewport to clip against when used inside a `<Popover>`
