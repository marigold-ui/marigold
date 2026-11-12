---
'@marigold/components': patch
'@marigold/docs': patch
---

chore(DST-1956): update React Aria to 1.22.1.

**What changed:**

- `react-aria-components` 1.21.1 → 1.22.1, which pins `react-aria` 3.53.1 and `react-stately` 3.51.0.
- The `react-aria-components` floor moves to `^1.22.1`, so consumers can't resolve a version without `Sheet`, which the Tray rewrite in DST-1865 builds on.
- `@internationalized/date` → `^3.12.4` and `@react-types/shared` → `^3.37.0`, matching what RAC 1.22.1 declares.
- The individual `@react-aria/*` and `@react-stately/*` packages had no new release, so their floors stay as they are.

**Impact:**

No API change in Marigold components. 1.22.1 also reverts a keyboard-handler change to `useMenu`, `useDateField`, `useDatePicker` and `useDateRangePicker` that 1.22.0 shipped, so those components behave as they did on 1.21.
