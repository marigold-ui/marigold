---
'@marigold/components': patch
---

chore: single-source NonModal's overlay state to close a cross-copy react-aria seam

`NonModal` previously created its overlay state and types from the umbrella `react-stately` while reading `OverlayTriggerStateContext` from `react-aria-components`. When a duplicate `react-aria`/`react-stately` is installed, those resolve to different copies and the overlay context silently splits — the same failure mode the `Calendar` fix addressed in this release. `useOverlayTriggerState`, `OverlayTriggerState`, and `OverlayTriggerProps` now come from the granular `@react-stately/overlays` package, matching the convention the rest of the package already follows. The umbrella `react-stately` direct dependency is dropped (its only remaining consumer, a Table story, now uses the local `useListData` re-export).
