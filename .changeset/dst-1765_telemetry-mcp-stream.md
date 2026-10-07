---
'@marigold/docs': patch
---

feat(DST-1765): record MCP telemetry in its own `telemetry:mcp` stream

Each source now has one stream named after it, `telemetry:cli` and `telemetry:mcp`. The older daily lists and the shared `telemetry:events` stream are migrated into them, with CLI events anonymised the way a current event is stored. The layout and the migration are documented in the [telemetry endpoint README](https://github.com/marigold-ui/marigold/blob/main/docs/app/api/telemetry/README.md).
