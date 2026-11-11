---
'@marigold/components': patch
'@marigold/system': patch
'@marigold/icons': patch
'@marigold/theme-rui': patch
---

docs(ai-readiness): give the published packages a real README

The README of each package was a single line. It now says what the package is, how to install and set it up, and where the documentation lives: the docs site, the Markdown version of every page, and the `marigold` CLI. The `@marigold/components` README also lists the conventions that differ from other React libraries, such as `disabled` instead of `isDisabled`, `onPress` instead of `onClick`, and no `className`. This is the first file an AI coding agent reads in `node_modules`, so it no longer has to guess.
