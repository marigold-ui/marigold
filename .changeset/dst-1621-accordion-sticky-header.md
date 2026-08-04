---
'@marigold/components': minor
---

fix(DST-1621): keep `Accordion` `stickyHeader` pinned when the header has actions

`Accordion.Header` now accepts an `actions` prop for content shown next to the title, such as buttons. Previously actions were added by wrapping `Accordion.Header` in a layout component, which shrank the sticky header's containing block to the header row so `stickyHeader` could no longer pin the header while scrolling. Passing actions through `actions` keeps the sticky wrapper a direct child of the item, so the header stays pinned together with its actions.
