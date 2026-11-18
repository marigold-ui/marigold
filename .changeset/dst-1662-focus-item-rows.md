---
'@marigold/theme-rui': patch
---

style(DST-1662): Table, ListView, SelectList and ghost SegmentedControl show a keyboard focus ring with at least 3:1 contrast

Focused table rows, cells and column headers, ListView rows, SelectList options and ghost SegmentedControl segments used a half-opacity ring that measured about 2:1 against its background. They now use the full-opacity `ui-state-focus-item` ring, which reaches at least 3:1 on rest, hover and selected backgrounds.
