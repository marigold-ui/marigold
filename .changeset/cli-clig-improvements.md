---
'@marigold/cli': minor
---

feat: align the CLI with the Command Line Interface Guidelines (clig.dev)

- **First-run telemetry notice.** Because telemetry is opt-out, the CLI now prints a one-time disclosure (to `stderr`, so JSON/stdout stays clean) explaining that anonymous usage data is collected and how to opt out (`marigold telemetry disable` or `DO_NOT_TRACK=1`). Mirrors the .NET SDK model. The "shown" flag is persisted only after the notice actually prints on an interactive terminal, so agent/pipe runs never consume it before a human sees it. The invocation that shows the notice is itself **not** tracked — no data leaves the machine before the user has seen the disclosure and had a chance to opt out; tracking begins on the next run.
- **"Did you mean?" suggestions.** Unknown commands now suggest the nearest valid command via edit distance (e.g. `marigold serach` → *Did you mean "search"?*), matching the error-recovery pattern used by `git`/`cargo`/`npm`.
