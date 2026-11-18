---
'@marigold/cli': patch
---

fix(DST-1981): write the whole output before the CLI exits

Output larger than 64 KB was cut off when it was piped or captured, for example by an AI agent, `$(...)` or `| jq`. `marigold docs Table --format json` then returned truncated JSON that could not be parsed. The CLI now waits until its output has been written. Nothing to change on your side.
