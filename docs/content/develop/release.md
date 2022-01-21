---
title: Release
---

# Release

To cut a new release please follow this steps:

1. Make sure the test suite passes (`yarn test`)
2. Make sure everything is linted (`yarn lint`)
3. Make sure there are no type errors (`yarn typecheck`)
4. Review the release status (`yarn release:status`)
5. Bump the version (`yarn release:version`)
6. Build and publish the new version to npm (`yarn release:publish`)
