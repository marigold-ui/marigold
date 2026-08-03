---
'@marigold/docs': patch
---

feat(DST-1625): track `search_docs` MCP tool usage in telemetry so Insights can report call volume, unique callers, error rate, and top-searched doc topics. The event schema is now a discriminated union over `cli_command` and `mcp_tool_call`, and the rate-limit/persist logic moves into `api/telemetry/record.ts` so the MCP route can record in-process instead of the server POSTing to itself. Callers are identified only by an HMAC-SHA256 digest of their Keycloak `sub` (`MCP_TELEMETRY_HASH_SECRET`), never the raw claim, and the public `POST /api/telemetry` endpoint accepts CLI events only.

Two consumer-visible changes for anything reading the telemetry store: the `telemetry:YYYY-MM-DD` daily lists now interleave `mcp_tool_call` entries with `cli_command` ones, and rate-limit keys gain a source prefix (`telemetry:rl:{id}:{date}` → `telemetry:rl:cli:{id}:{date}`), which resets in-flight CLI quotas once on deploy and orphans the old keys until their ≤24h TTL expires.

Also fixes `marigold migrate` telemetry being rejected server-side: the `command` enum was missing `'migrate'`, so every `migrate` event 400'd and was dropped silently. The enum is now asserted against the CLI's `CommandName` union in a test, so future drift fails instead of losing data.
