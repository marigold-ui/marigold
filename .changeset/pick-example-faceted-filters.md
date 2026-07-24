---
'@marigold/docs': patch
---

docs(DST-1651): make the Pick example's filters reference each other

Updates the `/examples/pick` venue picker so its Type, Region, and Status filters are aware of one another instead of operating independently. Each option now carries the number of venues it would yield under the other active filters and the search (for example "Bavaria (3)"), and options that would return nothing are disabled, so the user is steered toward productive combinations rather than landing on an empty table (picking "Theater" then a region with no theaters was the reported case). Counts are derived from the same predicate that filters the table, so they never disagree with the results, and the currently selected value is never disabled so a filter can always be changed back. The empty state remains as the fallback.
