---
'@marigold/components': patch
---

chore: extract shared `useMergedTextSlots` helper for RAC `TextContext` slot styling

`ListBox.Item` and `SelectList.Option` both merged `label`/`description` theme classNames into react-aria's `TextContext` (spreading the parent slot first to preserve RAC's `aria-describedby` `id`). That accessibility-critical logic — and its `SlottedContextValue` type — now lives in a single `useMergedTextSlots` hook that both consume. No public API or visual change.
