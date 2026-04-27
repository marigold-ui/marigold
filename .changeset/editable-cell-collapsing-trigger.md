---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix(DST-1354): restore collapsing `Table.EditableCell` edit trigger

The overlay/ring affordance introduced in #5250 (DST-1275) did not read as editable in user testing: sighted users did not associate the hover ring with inline editing, and there was no discoverable trigger for keyboard or touch. This change reverts that approach and restores the explicit pencil edit button.

The trigger collapses to zero layout space at rest (`w-0 overflow-hidden`) and expands on row hover or keyboard focus, so static layout remains clean while the affordance is discoverable the moment the user interacts with the row. When expanded, the wrapper switches to `overflow-visible` so the button's focus outline is not clipped. The cell itself stays clickable as a touch target. Enabled editable cells always truncate their content to stay aligned with column headers and match the single-line editing controls; disabled cells behave like a regular `Table.Cell`.
