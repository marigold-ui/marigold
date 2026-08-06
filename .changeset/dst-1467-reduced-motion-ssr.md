---
'@marigold/components': patch
---

fix(DST-1467): make `MorphCaret` SSR-safe

The shared `reducedMotion` constant in `utils/reducedMotion.ts` sampled `window.matchMedia` at module evaluation, so the server bundle always resolved to `false` while a client with `prefers-reduced-motion: reduce` resolved to `true` — producing a React 19 hydration mismatch (silently absorbed in production, logged as an error in dev). `MorphCaret` now reads the preference via `useReducedMotion()` from `motion/react`, matching `SidebarToggleIcon` and `TrayModal`. The obsolete `utils/reducedMotion.ts` has been removed.
