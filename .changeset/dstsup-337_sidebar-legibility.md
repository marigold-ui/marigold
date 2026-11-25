---
'@marigold/theme-rui': patch
---

style(DSTSUP-337): more space between rail entries, and sidebar group headings in full ink

Users reported that the sidebar's entries run together and that the group headings in the panel read weaker than the links below them.

- **Rail:** the entries are now 6px apart instead of 2px, using the `tight` spacing token. The tiles and their hover and current fills keep their size, on the collapsed rail too. A rail with many sections is a few pixels taller per entry and starts to scroll sooner.
- **Group headings:** `Sidebar.GroupLabel` captions now use `foreground` instead of `secondary`, the same ink as the links. Size, weight and the space above them still mark them as headings.

Rail labels keep their size and colour.
