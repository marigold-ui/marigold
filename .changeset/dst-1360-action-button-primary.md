---
'@marigold/components': minor
'@marigold/theme-rui': patch
---

feat(DST-1360): add a `primary` variant to `ActionButton`

`<ActionButton>` gains a `primary` variant for the prominent action of a slot-configured container — most notably the page-level call to action inside a `<Page.Header>`, where the action must be slot-aware to claim the header's action cell. A standalone primary action that isn't part of a container's chrome still uses `<Button>`.
