---
'@marigold/docs': patch
---

docs(DSTSUP-339): note that ui-soft and ui-contrast draw on ::before

The elevation page now says that caps draw on `::before` and create a stacking context, so custom elements with `ui-soft` or `ui-contrast` should not use `::before` themselves or set `overflow: hidden`.
