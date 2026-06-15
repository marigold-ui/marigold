---
'@marigold/components': minor
---

build(DST-1315): unbundle the build output for tree-shaking

`@marigold/components` previously shipped its entire ESM build as a single concatenated barrel (`index.mjs` re-exporting 74+ components). Because every export lived in one module, bundlers could not statically prove which parts were unused, so importing a single leaf component (e.g. `Stack`) pulled in essentially the whole library. On rspack this meant ~57 kB (≈82% of the lib) for a `Stack + Text + Card` import.

The build now emits **one file per source module** (`unbundle: true`, the `preserveModules` equivalent) while keeping the `.` barrel import fully backward compatible. Consumer bundlers (rspack, vite, esbuild) can now drop unused components: the same `Stack + Text + Card` import drops to **~0.8 kB**, and a single `Button` import drops from ~57 kB to **~1.7 kB**.

### Why a build flag alone wasn't enough (source changes explained)

Flipping `unbundle: true` is necessary but not sufficient. The old single-barrel build **concatenated every module into one file**, which hid problems that only matter once each module stands on its own and a bundler starts deciding, per module, what it can safely drop. `unbundle` exposed those problems, so the following source changes were required to make tree-shaking actually work — without them the flag delivers little or no benefit:

- **Toast queue: removed a module-scope side effect.** `ToastProvider` exported `const queue = new ToastQueue(...)` at module top level. That constructor runs the moment the module is imported and touches `document` (view-transition setup). The package declares `sideEffects: false`, which tells bundlers "importing any module here does nothing observable, so unused ones are safe to delete." A top-level `new` that touches `document` directly contradicts that promise: it's a real side effect on import, it can break SSR, and it makes the `sideEffects: false` claim dishonest (risking either dropped-needed-code or kept-unneeded-code depending on the bundler). Fix: construct the queue lazily on first use via `getToastQueue()`, keeping the singleton but making the module genuinely side-effect-free. (Tests, stories, and `ToastProvider` were updated to call `getToastQueue()`.)

- **`motion`: switched off the non-shakeable `motion` proxy.** `import { motion } from 'motion/react'` pulls motion's entire feature set, and the `motion.*` proxy is by design not tree-shakeable — referencing `motion.div` drags in the whole renderer (~34 kB). In the old concatenated barrel this cost was paid once and amortized across the whole library, so it was easy to miss. Under `unbundle`, that cost attaches to **each** module that imports `motion` (`ActionBar`, `Tabs`, `Tray`), so importing any one of them would re-pull motion's full bundle — defeating the point. Fix: use the lightweight `m` components from `motion/react-m` (tiny core, no features) and load the `domMax` feature set through a `LazyMotion` boundary via a dynamic `import()` of a local module (`motionFeatures.ts`), so bundlers split it into its own async chunk that only loads when an animated component actually renders. (The dynamic import targets a *local* file rather than `motion/react` directly because importing the dep dynamically made vite's optimizer re-bundle mid-run and drop named exports during tests.)

- **`hooks` barrel: replaced `export *` with explicit named re-exports.** `export * from './hooks'` forces a bundler to pull in and consider the entire namespace of the re-exported module; explicit named re-exports let it trace precisely which symbols are reachable. Minor on its own, but `export *` chains are a classic way to silently anchor unused code.

- **`react-select`: externalized and declared as a dependency.** Under `unbundle`, rolldown copies any non-externalized dependency into the output per-importing-module. `react-select` (~2 MB with `@emotion`) was being **bundled into the dist without even being a declared dependency** — invisible in the old barrel, but under unbundle it bloated every chunk that referenced it. Fix: mark it `external` in `tsdown.config.ts` and add it to `dependencies` so it resolves transitively at install time. It's used only by the deprecated `Multiselect`; drop both together in the next major.

- **Test/mock updates that follow the source changes.** `Tray.test.tsx`'s `vi.mock('motion/react')` had to gain `LazyMotion`/`domMax`, plus a new `vi.mock('motion/react-m')` providing `create`, because `TrayModal` now imports `create` from `motion/react-m`. `Toast.test.tsx`/`Toast.stories.tsx` switched from the removed module-level `queue` export to `getToastQueue()`.

- **A `size-limit` budget gate** (`pnpm --filter @marigold/components size`, run in CI) was added so these wins don't silently regress — e.g. someone re-introducing a `motion` proxy import or a module-scope side effect.

No public API changes: all imports from `@marigold/components` continue to work exactly as before.
