---
'@marigold/theme-rui': patch
---

fix(DST-1665): centre `<SelectList>`'s selection indicator against the text stack

The `indicator` slot occupied `row-start-1` only, so on a two-line option the radio or checkbox aligned to the label row and sat high against the label-plus-description block. The `action` slot beside it already spanned both rows. The indicator now carries `row-span-2` to match.

This lands here because `<ListView>` gained the same region in this release and had to pick a rule. Centring against the whole text stack is the one both wrappers now follow, so the two cannot be told apart on this point and neither needs a comment explaining why it differs. The alternative was shipping a divergence plus a ticket to undo it.

Expect a visual diff on description-bearing options, where the indicator drops by roughly 8px. Single-line options are unchanged, since one row and two rows centre identically.
