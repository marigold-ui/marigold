---
'@marigold/components': patch
---

fix: Breadcrumbs auto-collapse now works correctly inside flex containers (e.g. TopNavigation). The hidden measurement wrapper uses `min-w-0 w-full` to prevent a feedback loop where collapsed content would shrink the container, keeping breadcrumbs permanently collapsed.
