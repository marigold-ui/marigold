---
'@marigold/theme-rui': patch
---

fix(DST-1565): restore the ToggleButtonGroup divider, fix segment focus, and match Pagination hover

Three polish fixes on the control surfaces:

- **ToggleButtonGroup divider.** Segments in a group had a transparent right border, so no line separated them. The divider is restored with the opaque `border` token (the structural-line token, opaque on purpose so it never doubles up), removed on the last segment.
- **ToggleButtonGroup focus (DST-1597).** The group was `overflow-hidden`, which clipped the focus outline of a full-height segment so it was hard to tell which segment was focused. The group no longer clips. The end segments round their own outer corners to match the frame, so the standard focus outline now renders unclipped around any segment.
- **Pagination hover.** Unselected page numbers now pick up the same translucent ghost hover as the prev/next arrows. The selected page keeps its control fill and is left untouched.
