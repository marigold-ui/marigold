---
'@marigold/docs': patch
---

docs(DST-1532): add the Pick pattern with demos and a working example

New user-input pattern page documenting picking: finding records in a collection and committing them as a set, the counterpart to filtering, which narrows a view in place. Covers the Filter-vs-Pick distinction, a surface spectrum that scales to collection size (inline multi-select, a searchable `<TagField>`, a `<Dialog>`, and a routed page as the exception), and the load-bearing practices: preserve staged selections while search and filters narrow the list, bound the selection and name the outcome in the commit button, keep the staged set visible as a removable `<Tag.Group>` rail, and narrow rather than paginate large or async collections. Ships four inline demos (`<TagField>`, a multi-select `<Table>` dialog, a `<SelectList>` variant, and an on-page filter-select-act signpost) plus a full `/examples/pick` example: a `size="fullscreen"` dialog that picks from about fifty venues into a report that owns the committed set. Cross-references the pattern from the Filter and Table Records pages.

[DST-1532](https://reservix.atlassian.net/browse/DST-1532)
