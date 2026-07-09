---
'@marigold/components': minor
---

feat(DST-1509): add `collapseAt` to `Tag.Group`

`Tag.Group` now accepts a `collapseAt={n}` prop: the first `n` tags render as usual, and the rest collapse behind a "Show N more" / "Show N less" toggle, matching the behavior already available on `Checkbox.Group` and `Radio.Group`.

Unlike those groups, `Tag.Group`'s tags are a RAC collection (selection, removal, keyboard navigation), so collapsed tags stay mounted inside the `<TagList>` and are hidden via the native `hidden` attribute rather than being pulled out into a separate `<Collapsible>`. This keeps `onRemove`, `removeAll`, and `emptyState` working unchanged, and the collapsed count automatically shrinks as tags are removed. If a hidden tag is part of the initial selection, the group expands automatically.

`collapseAt` only applies to static children; dynamic collections (`items` + a render function) are unaffected.

When both `collapseAt` and `removeAll` are used together, "Show N more" now bottom-aligns next to the last visible tag, while "Remove all" moves to its own row below and is styled distinctly (muted, underlined) instead of matching "Show more"'s link style — the two previously looked identical despite doing very different things.

[DST-1509](https://reservix.atlassian.net/browse/DST-1509)
