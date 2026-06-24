---
'@marigold/theme-rui': patch
---

fix(DST-1560): align IconButton and Pagination to the control sizing token

IconButton and Pagination hardcoded `h-9`/`size-9` instead of the `h-control`/`size-control` token that every other `ui-button-base` button uses. The values are identical today (`--spacing-control` = `2.25rem` = `h-9`), so there is no rendered change, but the literals would silently drift if the token were retuned. Also dropped IconButton's redundant `disabled:text-disabled disabled:cursor-not-allowed` classes, which `ui-button-base` already applies via `disabled:ui-state-disabled`.
