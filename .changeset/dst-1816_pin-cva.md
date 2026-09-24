---
'@marigold/system': patch
---

fix(DST-1816): pin `cva` to 1.0.0-beta.12

`@marigold/system@18.1.0` declared `cva` as `^1.0.0-beta.1`. Because `cva` is still in beta, that range picks up breaking releases: a fresh install now resolves `1.0.0-beta.12`, which no longer exports `defineConfig` from the package root, and the build fails. The dependency is now pinned to the exact version the package is written against, so a future `cva` beta can't break an install again.
