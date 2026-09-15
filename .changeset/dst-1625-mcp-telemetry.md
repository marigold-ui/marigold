---
'@marigold/docs': patch
---

feat(DST-1625): track `search_docs` MCP tool usage in telemetry. Events now go into a single `telemetry:events` stream with no TTL instead of per-day `telemetry:YYYY-MM-DD` lists (old data is not migrated), MCP callers are identified only by an unkeyed SHA-256 of their Keycloak `sub` (CLI events carry no identifier at all), and `POST /api/telemetry` charges its endpoint-wide quota only at the write step, so a throttled caller can no longer spend it. Layout, quotas and the retention decision are documented in [`docs/app/api/telemetry/README.md`](../docs/app/api/telemetry/README.md).
