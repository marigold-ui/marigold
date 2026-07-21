---
'@marigold/docs': patch
---

docs(DST-1487): move ActionBar docs from "Actions" into the "Collection" section

`<ActionBar>` is the floating toolbar of bulk actions for the current selection in a collection, not a generic action primitive. Its docs page moves from `components/actions/actionbar` to `components/collection/actionbar`, sitting alongside `Table`, `Card`, and `Tag`.

- The page description and intro are reframed around the collection/bulk-selection context, and a `Related` section now links back to `Table` and `Button`.
- Internal links in `ActionButton`, `ActionGroup`, `Button`, and `Drawer` are repointed to the new path. Historical release-note links are left untouched.
