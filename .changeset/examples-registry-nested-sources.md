---
'@marigold/docs': patch
---

fix(DST-1434): ship nested example sources in the examples registry

`build-examples.mjs` collected only the top level of an example folder, so any
example keeping code in a subdirectory shipped importers without their imports.
The `filter` payload carried 7 files while all six of its key files import from
`./hooks/…`, and `bulk-actions` was missing 8 of its 16 — snippets that could
not be built by whoever copied them. The walk is now recursive, with paths
POSIX-relative to the example root so they match the import specifiers, and
`key_files` may point into a subdirectory.

Also completes the `filter` sidecar so its copyable snippet typechecks: the
`@/lib/data/venues` stub was missing `venueCities`, `MAX_CAPACITY`, `MAX_PRICE`,
the `Venue` type and the `nextAvailable` field, and `@/lib/data/venues-query`
had no stub at all despite being imported by a key file. `peer_deps` gains
`@internationalized/date`, `@tanstack/react-query` and `react-error-boundary`,
and drops `zod`, which nothing imports.

The scripts/ tests that guard this were never running: `docs/vitest.config.mjs`
and `docs/vitest.config.ts` both existed, vitest resolved the latter, and its
`include` covered only `app/` and `lib/`, so `pnpm --filter @marigold/docs test`
passed on an empty selection. The two configs are merged into one.
