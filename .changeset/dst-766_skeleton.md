---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': patch
'@marigold/docs': patch
---

feat(DST-766): add a `<Skeleton>` placeholder for content that is still loading

`<Skeleton>` draws a pulsing shape where content will appear, so a page keeps its layout during the first load. Size it with `width` (a spacing-scale value, a fraction or `"full"`) and `height` (default: one line of body text), and use `variant="rounded"` for avatars and badges. Arrange several to mirror the content they stand in for, for example skeleton rows inside a `<Table loading>`.

A skeleton is always hidden from screen readers. Announce the load once for the whole region instead: `loading` on a `<Table>` does this already, elsewhere add one status message. The pulse stops when reduced motion is requested.

If your app has its own skeleton component, you can replace it with this one. The docs page covers when to use a skeleton instead of a `<Loader>`, and the Loading States pattern now includes skeletons.
