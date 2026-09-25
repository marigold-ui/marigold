---
'@marigold/cli': major
'@marigold/docs': patch
---

feat(DST-1819): default the CLI to JSON output when stdout is not a terminal

When `--format` is omitted, `docs`, `list`, `search`, `examples`, `doctor` and `validate` now print `json` whenever their output is piped or captured, as it is for an AI agent, a script, CI or a redirect to a file. In an interactive terminal nothing changes: `docs`, `list`, `search` and `examples` still print `markdown`, and `doctor` and `validate` still print `text`. An explicit `--format` always wins.

**Breaking:** a script that reads the default output of one of these commands through a pipe now receives JSON. Pass `--format markdown`, `--format plain` or `--format text` to keep the previous output. The programmatic `run*()` exports are unchanged and keep their `markdown`/`text` fallback.
