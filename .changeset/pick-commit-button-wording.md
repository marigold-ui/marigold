---
'@marigold/docs': patch
---

docs(DST-1651): add a "Naming the commit button" section to the Pick pattern

Promotes the Pick pattern's commit-button guidance from a single bullet into its own "Naming the commit button" section. The rule: the commit button names its outcome with the host task's own verb, so the verb comes from the task ("Add venues" when the set joins a collection, "Assign users" to grant access, "Save venues" when it writes into a record the user edits, as the example does), never a generic label. The staged count is treated as status whose home is the removable-tag rail that already shows the set; the label may echo it ("Add 3 venues") when the count stays short and mirrors the trigger, and stays a bare verb when the label would run long or a minimum or maximum applies. It names the labels that do not fit a commit: neutral progression words like "Next", "Continue", "OK", or "Done" (which belong to multi-step sequences), "Filter" (the wrong mechanism, which is the Filter pattern), and "Save" for a pick whose result is discardable. Docs-only.

[DST-1651](https://reservix.atlassian.net/browse/DST-1651)
