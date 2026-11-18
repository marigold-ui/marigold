---
'@marigold/components': patch
'@marigold/theme-rui': patch
'@marigold/docs': patch
---

fix(DST-1617): keep the ContextualHelp popover inside the screen on small viewports

On narrow screens the ContextualHelp popover could end flush against the edge of the screen. A `medium` popover did so below a 344px viewport and a `large` one below 472px, cutting off its rounded corners and shadow. A popover placed `left` or `right` was squeezed into the little space beside the button, at 320px only 134px wide.

**New:** the popover keeps a 12px distance to both edges of the screen and gets narrower when it would not fit. On small screens, below the `sm` breakpoint, `left` and `right` placements open at the `bottom` instead. Larger screens are unchanged, and there is nothing to do in your app.
