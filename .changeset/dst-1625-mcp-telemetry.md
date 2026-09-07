---
'@marigold/docs': patch
---

feat(DST-1625): track `search_docs` MCP tool usage in telemetry, so Insights can report call volume, unique callers, error rate and top-searched doc topics. Callers are identified only by an HMAC-SHA256 digest of their Keycloak `sub`, never the raw claim, and no query text or similarity scores are recorded.

Consumer-visible for anything reading the telemetry store: events move from per-day `telemetry:YYYY-MM-DD` lists into a single `telemetry:events` stream, appended with `XADD` and read with `XRANGE`. The stream carries no TTL, so `cli_command` events are no longer dropped after 90 days either; existing data in the old daily lists is not migrated and is no longer read by anything. The public `POST /api/telemetry` endpoint accepts CLI events only, and now charges its endpoint-wide daily quota only when a write is actually about to happen — a caller already past its own per-caller ceiling no longer spends the shared budget.

Layout, quotas and the retention decision are documented in [`docs/app/api/telemetry/README.md`](../docs/app/api/telemetry/README.md).
