---
'@marigold/cli': minor
'@marigold/docs': patch
---

feat(DST-1969): `marigold migrate` records applied migrations

After an applied run, `marigold migrate` records the last migration in the `package.json` that declares `@marigold/components`:

```json
"marigold": { "migrated": "v19" }
```

Commit this field with the migrated code. It decides what a bare `marigold migrate` proposes: only migrations newer than the recorded one, and only once their major version is installed. Upgrade first, then migrate. On a version older than the next migration, the CLI now says to upgrade instead of proposing it.

Running a recorded migration by name prints a warning and changes nothing, so a second run can no longer rename props it already renamed. A partial run is recorded too, and lists what it skipped with the `--only` command that applies it later.
