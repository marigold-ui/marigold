---
'@marigold/theme-rui': patch
---

fix(DSTSUP-290): keep a gap between the header text and the actions in Panel and Page

A `Panel.Header` or `Page.Header` with actions put no space between its title and description and the actions, so a wrapping description ran flush into the button. The actions now keep a 16px gap at every width. A header without actions is unchanged.
