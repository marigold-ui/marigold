---
'@marigold/components': patch
---

fix(DSTSUP-256): show `cursor-not-allowed` on disabled TagField

The hidden trigger button inside TagField had `cursor-pointer` hardcoded, so hovering a
disabled TagField showed the text/caret cursor instead of `not-allowed` — inconsistent with
Select and ComboBox. Added `disabled:cursor-not-allowed` to the trigger button so the cursor
now matches the rest of the form components.
