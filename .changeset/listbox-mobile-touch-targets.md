---
"@marigold/system": patch
"@marigold/theme-rui": patch
---

Improve ListBox and Menu usability on mobile screens (DST-1210).

- Align `useSmallScreen` hook with Tailwind's `sm` breakpoint by deriving the value from `defaultTheme.screens.sm` using CSS Media Queries Level 4 range syntax (`width < 640px`)
- Add `max-sm:min-h-11` (44px) to ListBox and Menu items for WCAG 2.1 touch targets on mobile
- Replace `min-[600px]:` with `sm:` in Table editable cell styles for breakpoint consistency
- Refactor `useSmallScreen` to use `MediaQueryList.addEventListener('change')` instead of `window.resize`
- Extract shared `mockMatchMedia` test helper into `test.utils`
