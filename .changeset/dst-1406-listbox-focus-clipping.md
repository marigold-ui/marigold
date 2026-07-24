---
'@marigold/theme-rui': patch
---

fix(DST-1406): restore focus outline on virtualized ListBox items. RAC's virtualizer wrapper sets an inline `z-index: 0` per item, creating a stacking context the option's `focus-visible:z-1` cannot escape — adjacent wrappers paint on top in DOM order and clip the focused outline (most visible when the next item is `selected`). Lift the wrapper containing the focused option above its siblings so the outline is fully visible. Affects all virtualized listboxes (`Select`, `ComboBox`, `Autocomplete`).
