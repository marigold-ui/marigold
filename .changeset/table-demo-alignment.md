---
'@marigold/docs': patch
---

docs(DST-1361): fix column alignment in Table documentation demos. Several demos contradicted the alignment guidelines described in the Table docs (numeric right, text left, center only for icons/status). The action-menu demo centered its row actions with `<Inline alignX="center">` while the column header was left-aligned, and the `table-editable`, `table-links`, and `table-sticky` demos had numeric Rating / Capacity columns rendered left-aligned. The demos now match the documented alignment rules.
