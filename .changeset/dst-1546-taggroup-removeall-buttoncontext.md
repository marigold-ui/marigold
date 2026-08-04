---
'@marigold/components': patch
'@marigold/theme-rui': patch
'@marigold/system': patch
---

refactor(DST-1546): replace the bespoke TagGroup "Remove all" wrapper with a plain `<Button>` via a `ButtonContext` cascade

`TagGroup` now provides a `link`/`small` `ButtonContext` around its internal
`RemoveAll` render, so the "Remove all" action is a bare Marigold `<Button>`
instead of the raw react-aria `Button` with hand-rolled link styling. This
mirrors the cascade pattern already used by `ActionBar` and `Panel.Header`.

The change is internal-only. `TagGroupRemoveAll` is not part of the public API
(`TagGroup` renders it itself), the authoring API (`removeAll` / `onRemove`) is
unchanged, and there is no behavioral or accessibility change.

The redundant `removeAll` theme style is removed from `Tag.styles.ts` (the
`link` variant at `size="small"` reproduces it), and the now-unused `removeAll`
key is dropped from the `Tag` theme type.
