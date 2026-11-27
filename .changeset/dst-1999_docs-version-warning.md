---
'@marigold/cli': minor
---

feat(DST-1999): `marigold docs` and `marigold search` warn when your installed `@marigold/components` is an older minor or major version than the docs

The docs always describe the latest release, and new components and props ship in minor releases. When the installed minor or major version is older, both commands print a one-line warning naming both versions on stderr, so piped output stays clean. `marigold docs --format json` carries it as a `warning` field instead. When the versions match, nothing changes.
