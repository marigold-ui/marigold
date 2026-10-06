---
'@marigold/components': patch
---

fix(DSTSUP-283): truncate the current breadcrumb when it does not fit

When auto-collapsed Breadcrumbs are down to the ellipsis and the current item, and the current item still does not fit, it now truncates with an ellipsis. Before, it was clipped mid-word at the container edge. The full label stays available to assistive technology.
