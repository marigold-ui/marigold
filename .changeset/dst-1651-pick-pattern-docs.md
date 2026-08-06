---
'@marigold/docs': patch
---

docs(DST-1651): expand the Pick pattern guidance, examples, and commit-button behavior

Rounds out the Pick pattern docs (`/patterns/user-input/pick`) and its example (`/examples/pick`).

**Commit button stays active.** Aligns the pattern with the Button page's "avoid disabled buttons" guidance. The commit button no longer disables when the staged set is empty or below the minimum. Pressing it refuses the commit and reveals a `<SectionMessage variant="error">` at the top of the surface that says what is still needed and announces itself to assistive technology, instead of a disabled control that gives no reason and drops out of the keyboard tab order. Applies to the guidance text and all four commit examples (the fullscreen example plus the dialog, select-list, and inline abonnement demos).

**"Naming the commit button" section.** Promotes the commit-button label guidance into its own section. The button names its outcome with the host task's own verb ("Add venues", "Assign users", "Save venues"), never a generic label. The staged count is status that lives on the removable-tag rail. The label may echo it ("Add 3 venues") when it stays short and mirrors the trigger, and stays a bare verb when the label would run long or a min or max applies. Names the labels that do not fit a commit: "Next", "Continue", "OK", "Done" (multi-step words), "Filter" (the wrong mechanism), and "Save" for a discardable result.

**"Selection limits" section.** Promotes the terse "Bound the selection" bullet into its own subsection. States the rule up front in helper text ("Pick at least three", "Choose up to seven") and keeps a live count in the staged-tag rail ("Staged (3 of 5)"). A minimum is checked on press and surfaces the message rather than disabling the button. A maximum makes the ceiling visible, disables the unchecked rows once reached and says why, and keeps deselection free so the user can swap a pick.

**In-page date-pick demo.** Adds a second stay-on-the-page example to "Choose the surface by collection size": assembling a season subscription (an Abonnement) from concert dates without a dialog, over a `<SelectList>` with sold-out entries disabled and a running count beside a verb-only commit.

**Faceted example filters.** The `/examples/pick` venue picker's Type, Region, and Status filters now reference one another. Each option carries the count it would yield under the other active filters and the search ("Bavaria (3)"), options that would return nothing are disabled, and the current value is never disabled so a filter can always be changed back. Counts derive from the same predicate that filters the table, so they never disagree.

Docs-only.

[DST-1651](https://reservix.atlassian.net/browse/DST-1651)
