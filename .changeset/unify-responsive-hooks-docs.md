---
'@marigold/docs': patch
---

docs(DST-1344): unify responsive hooks into the Responsive Design foundations page

Folds the `useResponsiveValue` and `useSmallScreen` documentation into the existing `Responsive Design` foundations page so all screen-size guidance lives in one place. Adds a combined import block, a dedicated section and interactive demo for each hook, and notes that both hooks read breakpoints from `theme.screens` with a `--breakpoint-*` CSS fallback. Removes the standalone `useResponsiveValue` page under hooks-and-utils and repoints internal links (the TopNavigation mobile-navigation note and the on-page references) to the consolidated page.
