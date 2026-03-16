---
"@marigold/components": minor
---

feat([DST-1208]): Introduce AppLayout Component

- CSS Grid layout with `Sidebar`, `Header`, and `Main` slot sub-components
- Full viewport height (`100dvh`) with scrollable main content area and fixed sidebar/header
- Compound component pattern with `forwardRef` support
- CSS custom property `--app-layout-header-height` for configurable header height
- App Shell pattern documentation with full-page demo
- Updated TopNavigation demos to use `Sidebar.Toggle`
- Aligned Sidebar header height with AppLayout header via shared CSS custom property
