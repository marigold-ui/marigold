---
'@marigold/components': patch
---

fix(DST-1680): keep the mobile `ComboBox`/`Autocomplete` tray in the accessibility tree.

On small screens both components render a `Tray` instead of RAC's `Popover`. When the listbox opened, `useComboBox` called `ariaHideOutside([inputRef.current, popoverRef.current].filter(el => el != null))` — and because nothing claimed `PopoverContext` and the tray (with its input) portals in a later commit, both refs were `null`. `ariaHideOutside` hides everything *outside* the elements it is given, so an empty list hid the whole document, including the tray itself: screen readers could not reach the tray's dialog, search input or options at all.

`popoverRef` now points at the tray — the dialog element while open, and the container the tray portals into while closed — so the hide pass keeps the tray visible. Background isolation is unchanged; it comes from the tray's own `Modal`, which runs `ariaHideOutside(..., { shouldUseInert: true })`. As a side effect `useComboBox`'s blur handling works again, since it checks whether focus moved into `popoverRef.current` before closing.

`Tray` now also accepts a `ref` to its dialog element.
