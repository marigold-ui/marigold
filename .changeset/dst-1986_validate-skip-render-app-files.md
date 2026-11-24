---
'@marigold/cli': patch
---

fix(DST-1986): `marigold validate` skips the rendered checks on files it cannot render, instead of timing out

With the default `--checks all`, `validate` rendered every file in a sandbox that loads only that one file. On an ordinary app file this failed in two ways:

- A file with a local import, such as `import { Header } from './Header'`, waited out the full 45 second render budget, then reported an error with a hint to install Playwright.
- A file whose component was only a named export reported "No component found" as an error.

Both made `validate` exit with an error on valid code.

**Now** `validate` checks the file before it starts the browser. When the file imports a local module, or has neither a default export nor a named export called `App`, it skips the layout and accessibility checks and prints one warning that says why. The static checks still run and decide the exit code. An import used only for types does not count, because it is removed before the file runs. When you ask for only the rendered checks, for example `--checks a11y`, the warning says that nothing was checked.

A file that does render but has an import the sandbox cannot resolve, such as a path alias, now fails within seconds instead of waiting out the budget. The hint under a render failure now matches its cause: install hints only when the render toolchain is missing.
