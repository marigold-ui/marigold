---
"@marigold/components": minor
---

feat([DST-1208]): Introduce AppLayout Component

- L-shape CSS Grid layout with `Sidebar`, `Header`, and `Main` slot sub-components
- Full viewport height with scrollable main content area and fixed sidebar/header
- Compound component pattern with `forwardRef` support
- CSS custom property `--app-layout-header-height` for configurable header height
