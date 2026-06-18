// Isolated so it can be pulled in via a dynamic `import()` for lazy loading
// (see `lazyMotion.tsx`). Keeping the feature set in its own module means the
// dynamic import targets a local file rather than re-importing `motion/react`
// dynamically — the latter makes vite's dep optimizer re-bundle mid-run and
// drop named exports during tests. Bundlers still split this into its own
// async chunk, so the ~30 kB `domMax` feature set stays out of the initial
// bundle.
export { domMax } from 'motion/react';
