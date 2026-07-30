---
'@marigold/docs': patch
---

docs(DST-1543): document `marigold migrate` on the CLI page

Adds a `marigold migrate` section to `/getting-started/cli`, alongside the other commands: what the codemods cover (theme slot restructures and baseline swaps, application-code renames, report-only design-token checks), the optional version and path positionals, the `--dry-run` and `--only` flags, and the safety model (warnings instead of guesses, idempotent runs, the typecheck as the completeness check).
