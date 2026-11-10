---
'@marigold/components': patch
'@marigold/theme-rui': patch
'@marigold/docs': patch
---

feat(DSTSUP-314): give the mobile Sidebar drawer icons, a clear hierarchy and 44px touch targets

On small screens the Sidebar drawer now keeps what makes the rail easy to scan on desktop. Most of this is about `Sidebar.Rail`, but the rows, the back row, the footer and the close button are shared, so the drawer of a plain `Sidebar` with `Sidebar.Nav` changes too: 16px rows, the marked current section, the section name as a heading row with the chevron chip, 44px footer links and the larger close button. Only the rail icons and the pinned footer items are rail-only.

**Current:** every rail item became a plain text row. The icons were dropped, pinned footer items (like a help center) sat at the end of the scrolling list behind a separator, and nothing at the top level showed which section the current page belongs to. The section name inside a section was a small grey back link, and the close button was 28px.

**New:**

- Every top-level row shows its rail icon, and the text is 16px instead of 14px.
- The section that holds the current page is marked at the top level and announced as the current section (`aria-current="true"`).
- Pinned footer items stay below the list at every level instead of scrolling with it.
- Inside a section, its name is styled as the section heading, with the back chevron in a round chip. The whole row is still the back button.
- The close button and footer links meet the 44 by 44px touch target, like the nav rows already did.

Nothing changes in the component API. Pass a `Sidebar.Header` to `Sidebar.Rail` to show your brand at the top of the drawer. On desktop the rail does not render it.
