---
'@marigold/docs': patch
---

feat(DST-1625): track `search_docs` MCP tool usage in telemetry, so Insights can report call volume, unique callers, error rate and top-searched doc topics. Callers are identified only by an HMAC-SHA256 digest of their Keycloak `sub`, never the raw claim, and no query text or similarity scores are recorded.

Consumer-visible for anything reading the telemetry store: events move from per-day `telemetry:YYYY-MM-DD` lists into a single `telemetry:events` stream, and the stream carries no TTL — reversing the 90-day expiry DST-1475 set, for `cli_command` events too. The public `POST /api/telemetry` endpoint accepts CLI events only. `mcp_tool_call` events carry a new `hashPeriod` field, and their `hashedCallerId` is salted with that period — so a caller's digest is stable within a calendar quarter and deliberately unlinkable across quarters. Anything counting unique callers should group by period rather than over an arbitrary window.

Layout, quotas and the retention decision are documented in [`docs/app/api/telemetry/README.md`](../docs/app/api/telemetry/README.md).
