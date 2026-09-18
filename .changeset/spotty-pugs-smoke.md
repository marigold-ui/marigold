---
'@marigold/components': patch
---

fix(DST-1719): apply a string `thumbLabels` to the whole thumb, not its first character

`Slider` indexed `thumbLabels` positionally without normalising the string case, so `thumbLabels="Anteil Reservix"` named the thumb `"A"`. It is now normalised the same way the sibling `name` prop already was. The tuple form keeps working unchanged.
