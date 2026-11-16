---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

fix(DST-1885): Pagination keeps keyboard focus when a button becomes unusable or disappears

"Previous" on the first page, "Next" on the last page and the "1" shown when there are no pages are no longer natively disabled. They now use `aria-disabled`, ignore presses and stay reachable with Tab, so focus is not dropped to the page body when you reach either end. Tests that check these buttons with `toBeDisabled()` or `be.disabled` need to assert `aria-disabled="true"` instead. When the focused page button is removed, for example because `totalItems` shrank, focus moves to the current page's button.
