---
'@marigold/components': patch
---

fix: restore focus outline on `Table.EditableCell` edit trigger

The wrapper around the edit trigger button collapses to `w-0 overflow-hidden` at rest and expands on hover/focus. Because `overflow-hidden` stayed applied after expansion, the button's 3px focus outline was clipped on the left and right edges when keyboard-focused. The wrapper now also switches to `overflow-visible` when expanded, so the focus outline renders fully around the button.
