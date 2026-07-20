---
'@marigold/theme-rui': patch
---

fix(DST-1636): simplify the Accordion `icon` slot to `pointer-events-none text-secondary`, matching Panel's `collapsibleIcon`. Drops the redundant `shrink-0` (already baked into `MorphCaret`) and the obsolete `transition-transform duration-250` (the caret morphs its path `d` rather than rotating). No visual change.
