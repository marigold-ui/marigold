---
'@marigold/components': patch
'@marigold/system': minor
'@marigold/theme-rui': patch
---

chore(DST-1364): migrate `ListBox` item label/description styling off descendant selectors

`ListBox` now exposes `label` and `description` as first-class theme entries, and `ListBox.Item` injects their classNames into react-aria's `TextContext` (merging rather than replacing, so RAC's `aria-describedby` wiring is preserved) instead of styling `[slot=description]` via a descendant selector on `item`. This also benefits `Select.Option`, `ComboBox.Option`, and `Autocomplete.Option`, which re-export `ListBox.Item`.

The `Theme` type in `@marigold/system` now requires `label` and `description` keys on the `ListBox` record, so custom themes implementing `ListBox` must add these entries. No public API change in `@marigold/components`; visually identical except `description` now explicitly sets `font-normal` (parity with `SelectList`).
