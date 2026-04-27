---
'@marigold/docs': patch
---

docs(DST-1076): refresh SelectList page with anatomy, decision tables, and Do/Don't guidance

Rewrites the SelectList docs around the standardized API. Adds an anatomy diagram, a decision table for choosing between `<SelectList>` and lighter controls (`<Radio.Group>`, `<Checkbox.Group>`, `<Select>`, `<Combobox>`, `<TagField>`), and dedicated sections for multi-selection, per-row actions (decision-help and configuration patterns), horizontal orientation, and empty state. Replaces selected prose with Do/Don't guideline tiles, lists Combobox in the alternatives, and tightens the accessibility section to what's specific to SelectList (keyboard model, label requirement, and `textValue` for rich rows).
