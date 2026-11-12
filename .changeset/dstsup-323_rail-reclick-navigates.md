---
'@marigold/components': patch
'@marigold/docs': patch
---

fix(DSTSUP-323): the active rail section navigates instead of collapsing the panel

Selecting the active section in `Sidebar.Rail` again now takes users back to the section's page, for example from a detail page to the list.

**Current:** clicking the rail item of the section you are already in toggled the panel. With the panel open, the click collapsed it, and with the panel collapsed, it reopened it. Either way the click did not navigate, even though the item is a link to the section's page.

**New:** clicking the active section always goes to its page. With the panel open, the panel stays open. With the panel collapsed, the panel reopens and its heading gets focus, as before. Only `Sidebar.Toggle` and Cmd+B / Ctrl+B collapse the panel. A section whose navigation has no link to land on still does not navigate. Nothing changes in the component API.
