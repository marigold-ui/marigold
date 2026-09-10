<p align="center"> 
  <img width="494" align="center" alt="type_logo" src="https://raw.githubusercontent.com/marigold-ui/marigold/45a5ac5c3ef740a5698958f2a3244743ef9b3338/Marigold-Logo.svg">
</p>
<br>
<br>

[![ci][ci-badge]][ci] [![MIT License][license-badge]][license] [![version][version-badge]][package]

[![Open in Visual Studio Code](https://shields.io/badge/-Open%20in%20Visual%20Studio%20Code-blue?logo=visualstudiocode&style=for-the-badge)](https://open.vscode.dev/marigold-ui/marigold)

# Marigold

React implementation of the Marigold Design System based on [react-aria](https://react-spectrum.adobe.com/react-aria/) and [Tailwind CSS](https://tailwindcss.com/).

## Release notes

Check out our latest [release notes](https://www.marigold-ui.io/releases/overview)

## Documentation

Do you want to start using the Marigold Design System?

Then get started in the [Marigold documentation](https://www.marigold-ui.io/getting-started/installation).

## Techstack

[![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=000)](https://react.dev)
[![React Aria](https://img.shields.io/badge/-React%20Aria-FA0F00?style=for-the-badge&logo=adobe&logoColor=fff)](https://react-spectrum.adobe.com/react-aria/)
[![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=fff)](https://vitest.dev)
[![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=fff)](https://storybook.js.org/)
[![Next.js](https://img.shields.io/badge/-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=fff)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)

## Local Development

### Setup & Usage

Open a terminal and navigate to a folder of your choice:

- clone the project `git clone https://github.com/marigold-ui/marigold.git`
- navigate to the new folder `cd marigold`
- install the packages using `pnpm install`

### Storybook

To start storybook use the following command in the root:

- `pnpm sb`
- open [localhost:6006](http://localhost:6006)

### Marigold Documentation

To start documentation follow these steps:

- navigate to the documentation `cd docs`
- start the development server `pnpm dev`
- open [localhost:3000](http://localhost:3000).

### Command overview

| Command                    | Description                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------- |
| pnpm dev                   | Start the documentation app in dev mode.                                              |
| pnpm start                 | Start the documentation app in production mode.                                       |
| pnpm sb                    | Start Storybook using the components and system source folders.                       |
| pnpm build                 | Build components and theme packages.                                                  |
| pnpm build:docs            | Build the documentation app.                                                          |
| pnpm build:sb              | Build the Storybook configuration.                                                    |
| pnpm build:themes          | Build all theme packages.                                                             |
| pnpm registry              | Run the documentation registry task.                                                  |
| pnpm build:component-props | Generate/build component props tables for the docs.                                   |
| pnpm test                  | Run tests with Vitest.                                                                |
| pnpm test:coverage         | Run tests with coverage.                                                              |
| pnpm test:ci               | Run tests for CI.                                                                     |
| pnpm test:sb               | Run Storybook component tests.                                                        |
| pnpm clean                 | Remove node_modules, dist, .next, .turbo, coverage, and storybook-static directories. |
| pnpm clean:build           | Remove dist folders and coverage reports.                                             |
| pnpm lint                  | Lint the repository with ESLint.                                                      |
| pnpm lint:prose            | Lint docs prose with Vale.                                                            |
| pnpm format                | Format files with Prettier.                                                           |
| pnpm format:check          | Check formatting without writing (what CI runs).                                      |
| pnpm format:fix            | Format and attempt to fix with Prettier.                                              |
| pnpm typecheck             | Build docs, then run TypeScript type checking (no emit).                              |
| pnpm typecheck:only        | Run TypeScript type checking only (no emit).                                          |
| pnpm changeset             | Run the Changesets CLI.                                                               |

### Releasing

Releases are published by CI, not locally. `.github/workflows/release.yml` runs
[`changesets/action`](https://github.com/changesets/action) on every push to `main`: it either opens a
"release: version packages" PR that consumes the pending changesets, or, once that PR is merged,
publishes the bumped packages to npm.

So the only thing you do by hand is add a changeset with `pnpm changeset` when your change should
cause a version bump.

#### Prereleases

Prereleases use [changesets pre mode](https://github.com/changesets/changesets/blob/main/docs/prereleases.md),
which lives on `main` (there is no separate release branch). The mode is recorded in
`.changeset/pre.json`, and `pnpm changeset publish` derives the npm dist-tag from its `tag` field,
so while pre mode is active, everything publishes to that tag instead of `latest`.

```sh
pnpm changeset pre enter rc   # start publishing 18.0.0-rc.x to the "rc" dist-tag
pnpm changeset pre exit       # go back to regular releases on "latest"
```

Two things worth knowing:

- The prerelease counter comes from the current version in `package.json`, not from the tag. Switching
  channel mid-prerelease continues the count (`18.0.0-beta.4` → `18.0.0-rc.5`) rather than resetting it.
- Switching channel leaves the old dist-tag pinned at its last version. Consumers on the old tag keep
  resolving a stale version without any error, so repoint (`npm dist-tag add <pkg>@<new-version> <old-tag>`)
  or remove (`npm dist-tag rm <pkg> <old-tag>`) it per package after the first publish on the new channel.

<!-- LINKS + BADGES -->

[ci]: https://github.com/marigold-ui/marigold/actions/workflows/build.yml
[ci-badge]: https://github.com/marigold-ui/marigold/actions/workflows/build.yml/badge.svg
[license]: https://github.com/marigold-ui/marigold/blob/main/LICENSE
[license-badge]: https://img.shields.io/github/license/marigold-ui/marigold?style=flat-square
[package]: https://www.npmjs.com/package/@marigold/components
[version-badge]: https://img.shields.io/npm/v/@marigold/components?style=flat-square
