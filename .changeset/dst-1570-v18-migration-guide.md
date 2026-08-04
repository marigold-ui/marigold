---
'@marigold/docs': patch
---

docs(DST-1570): add v18 migration guide (`MIGRATION-v18.md`)

An exhaustive, agent-consumable guide for upgrading a consuming app from Marigold 17 to 18. Root-level Markdown file, split into Section A (app developers) and Section B (custom theme authors). Every breaking change lists what changed, a before→after, why, and gotchas, tagged `[auto]`/`[flagged]`/`[manual]`/`[adopt]` so it composes with the `marigold migrate v18` codemod. Linked from the v18.0.0 release notes.
