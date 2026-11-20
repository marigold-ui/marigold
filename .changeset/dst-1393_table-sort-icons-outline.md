---
'@marigold/components': patch
---

style(DST-1393): draw the Table sort icons as outline arrows

The sort icons in a `Table` column header (ascending, descending and the unsorted icon) are Lucide outline icons, but their arrowheads rendered as solid triangles because a fill was applied on top of the outline.

**Current:** the arrowheads of the sort icons are filled.

**New:** the icons render like every other Lucide icon in Marigold, as open outline arrows in the text color. Size and placement are unchanged, and there is nothing to do in your app. The sort triangles in the legacy `Table` are solid shapes by design and stay as they are.
