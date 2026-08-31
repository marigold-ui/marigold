---
'@marigold/docs': patch
---

feat(DST-1625): track `search_docs` MCP tool usage in telemetry, so Insights can report call volume, unique callers, error rate and top-searched doc topics. Callers are identified only by an HMAC-SHA256 digest of their Keycloak `sub`, never the raw claim, and no query text or similarity scores are recorded.

Consumer-visible for anything reading the telemetry store: events move from per-day `telemetry:YYYY-MM-DD` lists into a single `telemetry:events` stream, and the stream carries no TTL — reversing the 90-day expiry DST-1475 set, for `cli_command` events too. The public `POST /api/telemetry` endpoint accepts CLI events only.

Layout and quotas are documented in [`docs/app/mcp/README.md`](../docs/app/mcp/README.md); the retention decision in [`.memory/adr/0006-telemetry-retention.md`](../.memory/adr/0006-telemetry-retention.md).
