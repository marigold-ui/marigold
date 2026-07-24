---
'@marigold/system': major
'@marigold/theme-rui': major
---

feat(DST-1237): theme-owned breakpoints with CSS fallback

Breakpoint resolution is now theme-driven: `useSmallScreen` and `useResponsiveValue` read `theme.screens` from the ThemeProvider context instead of relying on hardcoded values in `defaultTheme`. If no theme provides screens, the hooks fall back to reading Tailwind v4's `--breakpoint-*` CSS custom properties.

- Added `screens` to `@marigold/theme-rui` (matches Tailwind v4 defaults)
- Removed `screens` from `defaultTheme` in `@marigold/system`
- Added `resolveScreens` utility for theme-first, CSS-fallback resolution
