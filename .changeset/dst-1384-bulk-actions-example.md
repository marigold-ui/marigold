---
'@marigold/docs': patch
---

docs(DST-1384): add the Bulk Actions working example

New full-page example at `/examples/bulk-actions` that wires the whole bulk-actions pattern together as one real product surface: a paginated, searchable events table with page-bounded selection, a floating `ActionBar` (Publish, Edit, Export, overflow menu, Delete), direct publish with a deterministic partial-failure path whose failed records stay selected and are fixable via the bulk-edit `Drawer` (mixed values, explicit price opt-in, re-keyed per selection), a destructive confirm `Dialog` with count and reservation impact, button-loading and running-count progress, and toasts for every outcome. Backed by a stateless `/api/events` route plus a `/api/events/bulk` authorizer; all session changes are client-owned and ride along in the query key, so filters always see the visitor's world. Search, status filter, and page persist in the URL via nuqs. The pattern page's `DemoLinks` now resolves and its "in progress" callout is gone.

[DST-1384](https://reservix.atlassian.net/browse/DST-1384)
