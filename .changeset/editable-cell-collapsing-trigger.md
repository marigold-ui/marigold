---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix(DST-1354): collapse `Table.EditableCell` edit trigger at rest and force content truncation

Replaces the previous overlay/ring affordance with a collapsing edit button: the pencil trigger takes zero layout space at rest (`w-0 overflow-hidden`) and expands on row hover or button focus. The cell itself is clickable for touch targets. Enabled editable cells always truncate their content to stay aligned with column headers and match the single-line editing controls; disabled cells behave like regular `Table.Cell`.
