---
'@marigold/components': patch
---

fix(DST-1464): keep wide content inside `<AppLayout.Main>` from overflowing the viewport. The shell grid uses `grid-cols-[auto_1fr]` and the main grid item defaulted to `min-width: auto`, so any content wider than the available track (most visibly a `<Select selectionMode="multiple">` with several long selected items) pushed the main column past the viewport and added a horizontal scrollbar. Adding `min-w-0` to `AppLayoutMain` lets the `1fr` track actually shrink, and children like `truncate` on the Select trigger can now clip at the right place.
