---
'@marigold/components': patch
---

fix(DSTSUP-282): show the Sidebar toggle chevron and the Accordion, Panel and Table carets in Safari

Both icons drew their path only through the CSS `d` property, which Safari does not support, so the arrow was missing. The path now also carries a `d` attribute. Browsers that support CSS `d` still animate between states.
