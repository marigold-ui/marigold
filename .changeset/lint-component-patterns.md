---
'@marigold/components': patch
'@marigold/icons': patch
---

refactor: clean up internal lint warnings

`Breadcrumbs` now keys its items by their element key instead of their position, and `createFilledIcon` no longer uses `forwardRef`. Custom icons still forward `ref` to the `<svg>`. Nothing changes in how you use these components.
