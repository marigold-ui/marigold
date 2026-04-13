<p align="center"> 
  <img width="494" align="center" alt="type_logo" src="https://raw.githubusercontent.com/marigold-ui/marigold/45a5ac5c3ef740a5698958f2a3244743ef9b3338/Marigold-Logo.svg">
</p>
<br>
<br>

[![ci][ci-badge]][ci] [![Coverage][coverage-badge-gist]] [![MIT License][license-badge]][license] [![version][version-badge]][package]

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
| pnpm format                | Format files with Prettier.                                                           |
| pnpm format:fix            | Format and attempt to fix with Prettier.                                              |
| pnpm typecheck             | Build docs, then run TypeScript type checking (no emit).                              |
| pnpm typecheck:only        | Run TypeScript type checking only (no emit).                                          |
| pnpm contributor           | Run the all-contributors CLI.                                                         |
| pnpm changeset             | Run the Changesets CLI.                                                               |
