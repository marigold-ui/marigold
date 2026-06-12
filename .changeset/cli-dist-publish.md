---
"@marigold/cli": patch
---

Fix `@marigold/cli` publishing without its `dist/` output. The release build filter excluded the CLI package, so the published tarball shipped without compiled files and the `marigold` bin pointed to a missing entry. The CLI is now built before publish.
