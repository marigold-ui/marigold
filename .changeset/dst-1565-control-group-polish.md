---
'@marigold/theme-rui': patch
---

fix(DST-1565): restore the ToggleButtonGroup divider, fix segment focus, and match Pagination hover

Three polish fixes on the control surfaces:

- **ToggleButtonGroup divider.** Segments in a group had a transparent right border, so no line separated them. The divider is restored with the opaque `border` token (the structural-line token, opaque on purpose so it never doubles up), removed on the last segment.
- **ToggleButtonGroup focus (DST-1597).** The group is `overflow-hidden`, which clipped the default focus outline so a focused segment was hard to distinguish. Focus now draws an inset ring that renders inside the clip; on the selected (dark) segment it switches to the light focus color so it stays visible on the charcoal fill.
- **Pagination hover.** Unselected page numbers now pick up the same translucent ghost hover as the prev/next arrows; the selected page keeps its control fill and is left untouched.
