---
'@marigold/docs': patch
---

docs(DST-1383): add the Bulk Actions pattern

New user-input pattern page documenting how to let users select many records in a collection and act on all of them at once, built by composing existing Marigold components (`<Table>` selection, `<ActionBar>`, `<Dialog>` via `useConfirmation`, `<Drawer>`, `<Toast>`). Covers the full flow in build order: when (not) to use the pattern, structure, choosing actions, selection and its visible-scope boundary, direct actions, confirming destructive actions, multi-field bulk edit, progress feedback, and result/partial-failure handling. Includes an anatomy diagram, seven inline demos, Do/Don't guidance, an accessibility section, and an implementation section with the load-bearing practices (derive the acted-on set once, clear selection on scope change, keep failed records selected, re-key the bulk-edit form).

[DST-1383](https://reservix.atlassian.net/browse/DST-1383)
