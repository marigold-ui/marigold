---
'@marigold/components': patch
---

chore: remove the leftover `react-select` dependency

`<Multiselect>` was removed in v18 and it was the only thing importing `react-select`, but the dependency itself was never dropped. It is now gone from `@marigold/components` and from the root workspace, along with the `external` entry in `tsdown.config.ts` and the `optimizeDeps` pre-bundle entry in `vitest.config.shared.ts` that only existed for it. Nothing imports it anymore, so this is install-size only — no runtime change.
