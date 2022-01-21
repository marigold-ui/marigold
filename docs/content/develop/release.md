---
title: Release
---

# Release

## Prerequisites

- Make sure your npm account has enabled wo-factor authentication. If not, please follow the instrucations at https://docs.npmjs.com/configuring-two-factor-authentication to do so.
- Make sure you are logged into npm registry. If not, log in via `yarn login`.
- Make sure you have a GitHub personal access token set as `GITHUB_TOKEN` in your environment variables. If not, please create one at https://github.com/settings/tokens/new and add it as the `GITHUB_TOKEN` environment variable.

## Create a new Release

To cut a new release please follow this steps:

1. Make sure the test suite passes (`yarn test`)
2. Make sure everything is linted (`yarn lint`)
3. Make sure there are no type errors (`yarn typecheck`)
4. Review the release status (`yarn release:status`)
5. Bump the version (`yarn release:version`)
6. Push created git tags and changes (`git push && git push --tags`)
7. Build and publish the new version to npm (`yarn release:publish`)
