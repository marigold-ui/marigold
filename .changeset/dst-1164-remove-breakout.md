---
"@marigold/components": major
---

chore(DST-1164): remove the unused `Breakout` component and the now-dead `align` API from `Container`.

`Breakout` had 0% usage across all scanned production repositories, so it is removed entirely (component, stories, tests, and docs). `Container`'s `align` prop, together with its internal `gridColumn`/`gridColsAlign` grid setup, only ever took effect via a `[data-breakout]` child, so it became dead code once `Breakout` was gone and is removed as well.

Migration: remove any `align` prop from `<Container>` usages. The `contentLength`, `alignItems`, and `space` props are unchanged.
