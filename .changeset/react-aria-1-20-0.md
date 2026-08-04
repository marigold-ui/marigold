---
'@marigold/components': patch
---

chore(DST-1680): update React Aria to the 1.20.0 line.

**What changed:**

- `react-aria-components` 1.19.0 → 1.20.0, which pins `react-aria` 3.51.0 and `react-stately` 3.49.0.
- `@internationalized/date` → 3.12.3 and `@react-types/shared` → 3.36.1. Both are required rather than cosmetic: RAC 1.20.0 declares `^3.12.3` / `^3.36.1`, and pnpm will not move an in-range dependency unless the specifier changes, so leaving the old floors keeps a second (runtime-bearing) `@internationalized/date` copy in the tree.
- The remaining declared floors now match the versions actually installed, which are also the latest published ones: `@react-aria/form` → `^3.2.1`, `@react-aria/live-announcer` → `^3.5.1`, `@react-stately/form` → `^3.3.1`. Every other `@react-aria/*` and `@react-stately/*` entry was already current.

**Impact:**

No API or behavior change in Marigold components. Consumers pick up the upstream 1.20.0 fixes, including Table focus restoration, `FocusScope` restore-without-scrolling, and DatePicker focus handling in Firefox.

`@react-types/{button,checkbox,grid,table}` deliberately stay on their type-only lines. All four latest minors pull `@react-spectrum/provider` — three as a direct dependency and `grid` 3.4.0 as a peer dependency — which drags in `@adobe/react-spectrum` and splits the i18n and overlay contexts. See the hold rule in `.github/renovate.json`.
