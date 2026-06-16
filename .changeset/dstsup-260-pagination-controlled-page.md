---
'@marigold/components': patch
---

fix(DSTSUP-260): `Pagination` follows the controlled `page` prop after mount

Previously the `page` prop only seeded internal state, so external updates (e.g. resetting to page 1 on a filter change) were ignored — the page indicator and the accessible `<nav>` label kept showing the stale page. `Pagination` now uses `useControlledState` from react-stately: when `page` is set, it is the single source of truth and `onChange` reports requested page changes; `defaultPage` remains the uncontrolled initial value. As part of this, `onChange` no longer fires when the active page is selected again, and the reset-to-page-1 behavior on `pageSize` changes only triggers when `pageSize` actually changed.
