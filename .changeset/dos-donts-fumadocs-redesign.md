---
'@marigold/docs': patch
---

fix: redesign Do/Don't guideline cards to match fumadocs

Replaces the legacy Do/Don't design with a tinted card layout that uses fumadocs design tokens (`--color-fd-success`/`--color-fd-error`) and `lucide-react` icons. Adds proper dark mode support, which was previously broken due to hardcoded light-mode colors.

[DST-1348](https://reservix.atlassian.net/browse/DST-1348)
