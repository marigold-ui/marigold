---
'@marigold/theme-rui': patch
---

style(DST-1905, DSTSUP-323): separate Sidebar groups with a wider gap and a caption that reads as a heading

Groups in a long sidebar navigation now read as groups instead of one continuous list, and their labels stand apart from the rows below them.

**Current:** a group label sat 16px below the previous row, about half a row's height, and was set in 11px bold uppercase with wide letter spacing. Once a navigation outgrew the screen, the groups ran together and every label drew the eye.

**New:** a group label sits 24px below the previous row and is set in 12px semibold grey, in sentence case. Navigation rows now use the full text color instead of a slightly lighter one, so a label reads as a heading for its group and not as one more row, even when it shares a word with the first item, as "Module" does with "Modulbibliothek". The active row keeps its highlight and medium weight, and hovering a row now only fills its background. A label at the top of a list keeps its alignment with the text of the first item.

The section panel of `Sidebar.Rail` uses the same group label and rows, and changes with them. Nothing changes in the component API. If you passed uppercase text to `Sidebar.GroupLabel` to match the old look, switch it to sentence case.
