---
'@marigold/docs': patch
---

docs(DST-1651): add a "Naming the commit button" section to the Pick pattern

Promotes the Pick pattern's commit-button guidance from a single bullet into its own "Naming the commit button" section. Following the established convention that action buttons name their outcome rather than using a generic label, the section states the rule that a pick's commit button uses the host task's own verb and carries the staged count, so the verb comes from the task: "Add 3 venues" when the set joins a collection, "Assign 3 users" to grant access, or "Save 3 venues" when it writes into a record the user edits, as the example does. It names the labels that do not fit a commit: neutral progression words like "Next", "Continue", "OK", or "Done" (which belong to multi-step sequences), "Filter" (the wrong mechanism, which is the Filter pattern), and "Save" for a pick whose result is discardable. Docs-only.

[DST-1651](https://reservix.atlassian.net/browse/DST-1651)
