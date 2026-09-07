---
'@marigold/docs': patch
---

feat(DST-1625): track `search_docs` MCP tool usage in telemetry — events now go into a single `telemetry:events` stream with no TTL instead of per-day `telemetry:YYYY-MM-DD` lists (old data is not migrated), callers are identified only by an HMAC of their Keycloak `sub`, and `POST /api/telemetry` charges its endpoint-wide quota only when a write actually happens; layout, quotas and the retention decision are documented in [`docs/app/api/telemetry/README.md`](../docs/app/api/telemetry/README.md).
