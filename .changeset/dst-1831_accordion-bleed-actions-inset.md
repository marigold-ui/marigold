---
'@marigold/theme-rui': patch
---

fix(DST-1831): inset Accordion header actions in a bled Panel

Inside `Panel.Content bleed`, the actions passed to `Accordion.Header` now line up with the Panel's horizontal padding instead of sitting flush against its edge. Standalone and non-bled Accordions are unchanged.
