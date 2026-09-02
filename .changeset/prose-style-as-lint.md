---
'@marigold/docs': patch
---

Prose style is now enforced rather than remembered. Vale runs over the docs site, the
changesets and the published READMEs, wired into the pre-commit hook and a CI check, with
the rules in `.vale/styles/Marigold/` and the writing guidance in `CLAUDE.md`.

Three rules block CI: no em dashes, no semicolons in prose, and no en dash asides. Table
cells are exempt, because there an em dash is a legitimate "not applicable" marker, and
ranges keep the en dash so quoted component output stays accurate. All 135 existing
violations across 30 files are rewritten in this change, so the check starts green.

The en dash rule matches only the aside form (a letter, a spaced en dash, then a lowercase
letter). German uses a spaced en dash where English uses an em dash, which makes it an easy
slip, but a range reads as digits or a capital around the dash and stays legal.
