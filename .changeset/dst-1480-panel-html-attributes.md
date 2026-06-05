---
'@marigold/components': minor
---

feat(DST-1480): forward arbitrary HTML attributes on `<Panel>`

`<Panel>` now extends `HTMLAttributes<HTMLElement>` (minus `className`/`style`) and spreads the remaining props onto its root `<section>`, matching the `<Card>` API. Consumers can now pass `id`, `data-*`, event handlers, and other standard attributes directly to a Panel.

A consumer-supplied `aria-labelledby` is preserved instead of being overwritten with `undefined` when no `<Title>` is present — the slot-owned `titleId` still wins when a `<Title>` renders. This mirrors the fallback adopted by `Card` in DST-1373.

[DST-1480](https://reservix.atlassian.net/browse/DST-1480)
