---
'@marigold/docs': patch
---

docs(DST-1651): give the Pick pattern's min and max their own subsection

Promotes the terse "Bound the selection" bullet into a "Selection limits" subsection under The pick dialog. States the rule up front in helper text ("Pick at least three", "Choose up to seven") and keeps a live count in the staged-tag rail ("Staged (3 of 5)") rather than enforcing the limit silently. A minimum holds the commit disabled until it is met (the example's min-of-one floor); a maximum makes the ceiling visible, disables the unchecked rows once reached and says why, and keeps deselection free so the user can swap a pick. Pairs with the commit-button guidance, where the button stays a bare verb when a min or max applies. Docs-only.

[DST-1651](https://reservix.atlassian.net/browse/DST-1651)
