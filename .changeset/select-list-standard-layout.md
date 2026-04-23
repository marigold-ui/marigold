---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(SelectList): standardized item layout and visual distinction from ListBox (DST-1076)

`<SelectList>` now ships a first-class item skeleton:

- **Selection indicator** — single-select rows now render a visible radio circle; multi-select keeps the existing checkbox. No more invisible placeholder indicator in single mode.
- **Label & description slots** — use `<Text slot="label">` and `<Text slot="description">` inside `<SelectList.Item>` (mirroring the Select/ComboBox/Autocomplete convention). Row anatomy is now `selection · image (optional) · label + description · action (optional)`.
- **Image slot** — drop a plain `<img alt="…">` (or any element) inside `<SelectList.Item>`; the theme places and sizes it as a leading visual.
- **`variant` prop** — `"default"` (bigger two-line rows separated by dividers, selection fills the row) or `"bordered"` (each item is its own rounded, outlined container with a gap between items; selection strengthens the border).
- **Own theme entry** — SelectList no longer borrows ListBox styles; a new `SelectList` theme component is registered in `@marigold/theme-rui`. Consumers with custom themes need to add a `SelectList` entry (the `ListBox`-based fallback is removed).

No breaking changes to the public API: `<SelectList>`, `<SelectList.Item>`, and `<SelectList.Action>` keep their signatures. Stories and tests are updated to cover the new slots and variant.
