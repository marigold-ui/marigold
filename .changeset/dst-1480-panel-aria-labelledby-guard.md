---
'@marigold/components': patch
---

fix(DST-1480): only set `aria-labelledby` on Panel when a Title is present

`<Panel>` previously rendered `aria-labelledby={titleId}` whenever no `aria-label` was given, even if no `<Title>` was present. That left the `<section>` landmark pointing at an id no element carried, producing a broken/empty accessible name.

The guard now also checks `hasTitle`, so `aria-labelledby` is only applied when a `<Title>` actually renders. This mirrors the stricter guard adopted by `Card` in DST-1373.

[DST-1480](https://reservix.atlassian.net/browse/DST-1480)
