---
'@marigold/components': minor
---

feat(DST-1984): `ListView` infers the item type from `items`

The render function now receives the type of your items, so `{venue => <ListView.Item id={venue.id}>…</ListView.Item>}` needs no cast. `ListViewProps` takes the item type as an optional argument, `ListViewProps<Venue>`. Without one it stays `object`, so existing code compiles unchanged.
