---
'@marigold/docs': patch
---

fix(DST-1687): key the prop-table cache on the lockfile

`docs/scripts/build-types.ts` caches each `<AutoTypeTable>` extraction under
`.next/cache/`, which Vercel preserves across deploys. But fumadocs-typescript
derives its cache key from the component source file only
(`path:name:content:version`), never from the `.d.ts` files the props are
inherited from. A dependency bump that changes an inherited prop set therefore
leaves every component whose own source did not change serving its pre-bump
props — indefinitely, because nothing ever invalidates the entry.

That is not hypothetical: `keyboardNavigationBehavior` has been missing from the
`<Table>` prop table since react-aria-components moved 1.19 → 1.20 (#5699).
`Table.tsx` last changed the day before that bump, so its cache entry stayed
valid while the prop it should surface arrived via `react-stately` 3.49.0.

The cache directory is now salted with a hash of `pnpm-lock.yaml`, so any
dependency move retires the whole generation, and superseded generations are
pruned so the Vercel cache does not grow without bound. A warm rebuild still
takes under a second; a cold one takes ~30s.
