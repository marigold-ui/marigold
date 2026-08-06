---
'@marigold/components': patch
---

fix(DST-1645): align preset quick-selection rows with the tray nav row on small screens. The preset listbox rows reuse the shared `ListBox` `p-1` focus-ring gutter, which insets them narrower than the full-width nav row. On small screens the list now negates that gutter (`-mx-1`) so rows span the tray edge-to-edge and line up with the nav row, while the gutter still keeps each row's focus outline from being clipped by the list's overflow.
