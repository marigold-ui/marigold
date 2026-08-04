---
'@marigold/theme-rui': patch
---

fix(DSTSUP-269): wrap long unbreakable option labels inside the list instead of letting them widen the item

A listbox item is a grid, so a label without any break opportunity (a long word with no spaces) set the automatic minimum of the label track to its own width and pushed the item out of a narrow `Select`, `ComboBox`, `Autocomplete`, `TagField`, `ListBox` or the Calendar's preset list. Items now break anywhere, matching how labels with spaces already wrapped.
