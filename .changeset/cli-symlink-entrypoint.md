---
'@marigold/cli': patch
---

fix: run the CLI when invoked via a symlinked bin. The entry-point guard compared `import.meta.url` (always the realpath) against `path.resolve(process.argv[1])`, so symlinked global bins (`npm install -g`, manual links) exited silently with code 0. `argv[1]` is now resolved through `realpathSync`.
