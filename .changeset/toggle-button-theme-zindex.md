---
'@marigold/theme-rui': patch
---

fix(DST-1730): drop the duplicated focus z-index from `ToggleButton`'s theme styles.

`in-[.group]:focus-visible:z-10` sat in both the theme's `button` slot and `ToggleButton` itself.
Rendered output is unchanged — `cn()` was deduping the pair, which the component's inline class
snapshots confirm by still passing untouched. What it removes is the drift: two copies of one
stacking decision, either of which could be changed without the other.

Stacking order is a guarantee the component makes, not something a theme should be able to
reorder. `pnpm check:theme-zindex` now fails CI on any z-index in a `*.styles.ts`.
