---
'@marigold/components': minor
---

build(DST-1315): unbundle the build output for tree-shaking

`@marigold/components` previously shipped its entire ESM build as a single concatenated barrel (`index.mjs` re-exporting 74+ components). Because every export lived in one module, bundlers could not statically prove which parts were unused, so importing a single leaf component (e.g. `Stack`) pulled in essentially the whole library. On rspack this meant ~57 kB (≈82% of the lib) for a `Stack + Text + Card` import.

The build now emits **one file per source module** (`unbundle: true`, the `preserveModules` equivalent) while keeping the `.` barrel import fully backward compatible. Consumer bundlers (rspack, vite, esbuild) can now drop unused components: the same `Stack + Text + Card` import drops to **~0.8 kB**, and a single `Button` import drops from ~57 kB to **~1.7 kB**.

Additional changes that make the tree-shaking real:

- **`react-select` is now a declared dependency and externalized from the build.** It was previously bundled into the output (~2 MB, untree-shaken) without being declared. It is used only by the deprecated `Multiselect`; both will be removed together in the next major.
- **`motion` features load lazily.** Components that animate (`ActionBar`, `Tabs`, `Tray`) now use the lightweight `m` components from `motion/react-m` plus a `LazyMotion` boundary that fetches the `domMax` feature set (~30 kB) in its own async chunk. Components that don't animate no longer pay for motion's feature bundle up front.
- **Toast queue is lazily initialized.** The shared `ToastQueue` was constructed at module scope, which ran on first import and touched `document` — violating the package's `sideEffects: false` contract and risking SSR errors. It is now created on first use via `getToastQueue()`, preserving the singleton.
- **The `hooks` barrel re-export is now explicit** (named exports instead of `export *`) so bundlers can reason about it.
- **A `size-limit` budget gate** (`pnpm --filter @marigold/components size`) runs in CI to catch bundle-size regressions.

No public API changes: all imports from `@marigold/components` continue to work exactly as before.
