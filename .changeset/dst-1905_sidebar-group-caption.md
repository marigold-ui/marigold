---
'@marigold/theme-rui': patch
---

style(DST-1905): separate Sidebar groups with a wider gap and a quieter caption

Groups in a long sidebar navigation now read as groups instead of one continuous list.

**Current:** a group label sat 16px below the previous row, about half a row's height, and was set in 11px bold uppercase with wide letter spacing. Once a navigation outgrew the screen, the groups ran together and every label drew the eye.

**New:** a group label sits 24px below the previous row and is set in 12px medium, in sentence case. The spacing now does the separating, and the label works as a quiet landmark for the group below it. A label at the top of a list keeps its alignment with the text of the first item.

The section panel of `Sidebar.Rail` uses the same group label and changes with it. Nothing changes in the component API. If you passed uppercase text to `Sidebar.GroupLabel` to match the old look, switch it to sentence case.
