---
'@marigold/docs': patch
---

docs(DST-1651): keep the Pick commit button active instead of disabling it

Aligns the Pick pattern with the Button page's "avoid disabled buttons" guidance. The commit button now stays active when the staged set is empty or below the minimum. Pressing it refuses the commit and reveals a `<SectionMessage variant="error">` that says what is still needed and announces itself to assistive technology, instead of a disabled control that gives no reason and drops out of the keyboard tab order. Updates the guidance text and all four commit examples (the fullscreen example plus the dialog, select-list, and inline abonnement demos).

[DST-1651](https://reservix.atlassian.net/browse/DST-1651)
