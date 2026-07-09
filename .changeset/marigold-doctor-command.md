---
'@marigold/cli': minor
---

feat(DST-1265): add `marigold doctor` — a read-only command that diagnoses a project's Marigold setup (package presence, `@marigold/components`/`@marigold/system` version match, latest-version freshness, MarigoldProvider wrapper, theme prop, Tailwind config, and React peer deps) and prints actionable fixes. Supports `--format text|json` and exits `1` only on deterministic errors, so it is safe to gate CI on and easy for AI agents to consume.
