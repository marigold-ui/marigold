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

| Command             | Description                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- |
| pnpm dev            | Start the documentation app in dev mode.                                              |
| pnpm start          | Start the documentation app in production mode.                                       |
| pnpm sb             | Start Storybook using the components and system source folders.                       |
| pnpm build          | Build components and theme packages.                                                  |
| pnpm build:docs     | Build the documentation app.                                                          |
| pnpm build:sb       | Build the Storybook configuration.                                                    |
| pnpm build:themes   | Build all theme packages.                                                             |
| pnpm registry       | Run the documentation registry task (build registry + appearances).                   |
| pnpm test           | Run tests with Vitest.                                                                |
| pnpm test:coverage  | Run tests with coverage.                                                              |
| pnpm test:ci        | Run tests for CI.                                                                     |
| pnpm test:sb        | Run Storybook component tests.                                                        |
| pnpm clean          | Remove node_modules, dist, .next, .turbo, coverage, and storybook-static directories. |
| pnpm clean:build    | Remove dist folders and coverage reports.                                             |
| pnpm lint           | Lint the repository with ESLint.                                                      |
| pnpm format         | Format files with Prettier.                                                           |
| pnpm format:fix     | Format and attempt to fix with Prettier.                                              |
| pnpm typecheck      | Build docs, then run TypeScript type checking (no emit).                              |
| pnpm typecheck:only | Run TypeScript type checking only (no emit).                                          |
| pnpm contributor    | Run the all-contributors CLI.                                                         |
| pnpm changeset      | Run the Changesets CLI.                                                               |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://github.com/sebald"><img src="https://avatars3.githubusercontent.com/u/985701?v=4?s=120" width="120px;" alt="Sebastian Sebald"/><br /><sub><b>Sebastian Sebald</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=sebald" title="Code">💻</a> <a href="#design-sebald" title="Design">🎨</a> <a href="https://github.com/marigold-ui/marigold/commits?author=sebald" title="Documentation">📖</a> <a href="https://github.com/marigold-ui/marigold/pulls?q=is%3Apr+reviewed-by%3Asebald" title="Reviewed Pull Requests">👀</a> <a href="#example-sebald" title="Examples">💡</a> <a href="#infra-sebald" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-sebald" title="Maintenance">🚧</a> <a href="https://github.com/marigold-ui/marigold/commits?author=sebald" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/sarahgm"><img src="https://avatars.githubusercontent.com/u/38324334?v=4?s=120" width="120px;" alt="sarahgm"/><br /><sub><b>sarahgm</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=sarahgm" title="Code">💻</a> <a href="#design-sarahgm" title="Design">🎨</a> <a href="https://github.com/marigold-ui/marigold/commits?author=sarahgm" title="Documentation">📖</a> <a href="https://github.com/marigold-ui/marigold/pulls?q=is%3Apr+reviewed-by%3Asarahgm" title="Reviewed Pull Requests">👀</a> <a href="#example-sarahgm" title="Examples">💡</a> <a href="#maintenance-sarahgm" title="Maintenance">🚧</a> <a href="https://github.com/marigold-ui/marigold/commits?author=sarahgm" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="20%"><a href="http://benediktgrether.de"><img src="https://avatars.githubusercontent.com/u/27921741?v=4?s=120" width="120px;" alt="Benedikt Grether"/><br /><sub><b>Benedikt Grether</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=benediktgrether" title="Code">💻</a> <a href="#design-benediktgrether" title="Design">🎨</a> <a href="https://github.com/marigold-ui/marigold/commits?author=benediktgrether" title="Documentation">📖</a> <a href="https://github.com/marigold-ui/marigold/pulls?q=is%3Apr+reviewed-by%3Abenediktgrether" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/viktoria-schwarz"><img src="https://avatars1.githubusercontent.com/u/59830437?v=4?s=120" width="120px;" alt="viktoria-schwarz"/><br /><sub><b>viktoria-schwarz</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=viktoria-schwarz" title="Code">💻</a> <a href="https://github.com/marigold-ui/marigold/commits?author=viktoria-schwarz" title="Documentation">📖</a> <a href="#infra-viktoria-schwarz" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/ti10le"><img src="https://avatars2.githubusercontent.com/u/59875255?v=4?s=120" width="120px;" alt="ti10le"/><br /><sub><b>ti10le</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=ti10le" title="Code">💻</a> <a href="https://github.com/marigold-ui/marigold/commits?author=ti10le" title="Documentation">📖</a> <a href="#infra-ti10le" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="http://toshibot.com"><img src="https://avatars3.githubusercontent.com/u/6447213?v=4?s=120" width="120px;" alt="Toshi"/><br /><sub><b>Toshi</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=Toshibot" title="Code">💻</a> <a href="https://github.com/marigold-ui/marigold/commits?author=Toshibot" title="Documentation">📖</a> <a href="#design-Toshibot" title="Design">🎨</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/julianthiel"><img src="https://avatars1.githubusercontent.com/u/59880423?v=4?s=120" width="120px;" alt="Julian Thiel"/><br /><sub><b>Julian Thiel</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=julianthiel" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/johannaracky"><img src="https://avatars.githubusercontent.com/u/86712740?v=4?s=120" width="120px;" alt="johannaracky"/><br /><sub><b>johannaracky</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=johannaracky" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="20%"><a href="https://bandism.net/"><img src="https://avatars.githubusercontent.com/u/22633385?v=4?s=120" width="120px;" alt="Ikko Ashimine"/><br /><sub><b>Ikko Ashimine</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=eltociear" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/andres-dediego2"><img src="https://avatars.githubusercontent.com/u/34473133?v=4?s=120" width="120px;" alt="andres-dediego2"/><br /><sub><b>andres-dediego2</b></sub></a><br /><a href="#design-andres-dediego2" title="Design">🎨</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://github.com/snragund"><img src="https://avatars.githubusercontent.com/u/62615094?v=4?s=120" width="120px;" alt="snragund"/><br /><sub><b>snragund</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=snragund" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/michael-p"><img src="https://avatars.githubusercontent.com/u/531872?v=4?s=120" width="120px;" alt="Michael Partheil"/><br /><sub><b>Michael Partheil</b></sub></a><br /><a href="#ideas-michael-p" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/lauraNawrotzki"><img src="https://avatars.githubusercontent.com/u/104084537?v=4?s=120" width="120px;" alt="lauraNawrotzki"/><br /><sub><b>lauraNawrotzki</b></sub></a><br /><a href="#ideas-lauraNawrotzki" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="20%"><a href="https://osama-abdellatef.vercel.app/"><img src="https://avatars.githubusercontent.com/u/62595605?v=4?s=120" width="120px;" alt="Osama Abdul Latif "/><br /><sub><b>Osama Abdul Latif </b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=OsamaAbdellateef" title="Code">💻</a> <a href="#design-OsamaAbdellateef" title="Design">🎨</a> <a href="#maintenance-OsamaAbdellateef" title="Maintenance">🚧</a> <a href="https://github.com/marigold-ui/marigold/commits?author=OsamaAbdellateef" title="Tests">⚠️</a> <a href="https://github.com/marigold-ui/marigold/commits?author=OsamaAbdellateef" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/aromko"><img src="https://avatars.githubusercontent.com/u/77496890?v=4?s=120" width="120px;" alt="Marcel Köhler"/><br /><sub><b>Marcel Köhler</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=aromko" title="Documentation">📖</a> <a href="https://github.com/marigold-ui/marigold/commits?author=aromko" title="Code">💻</a> <a href="#design-aromko" title="Design">🎨</a> <a href="#example-aromko" title="Examples">💡</a> <a href="https://github.com/marigold-ui/marigold/commits?author=aromko" title="Tests">⚠️</a> <a href="#infra-aromko" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-aromko" title="Maintenance">🚧</a> <a href="https://github.com/marigold-ui/marigold/pulls?q=is%3Apr+reviewed-by%3Aaromko" title="Reviewed Pull Requests">👀</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://github.com/pauleitenbichler"><img src="https://avatars.githubusercontent.com/u/94551682?v=4?s=120" width="120px;" alt="pauleitenbichler"/><br /><sub><b>pauleitenbichler</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=pauleitenbichler" title="Code">💻</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/sinan-rsvx"><img src="https://avatars.githubusercontent.com/u/159138340?v=4?s=120" width="120px;" alt="Sinan Akdesir"/><br /><sub><b>Sinan Akdesir</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=sinan-rsvx" title="Code">💻</a> <a href="https://github.com/marigold-ui/marigold/commits?author=sinan-rsvx" title="Documentation">📖</a> <a href="#example-sinan-rsvx" title="Examples">💡</a> <a href="#design-sinan-rsvx" title="Design">🎨</a> <a href="#maintenance-sinan-rsvx" title="Maintenance">🚧</a> <a href="https://github.com/marigold-ui/marigold/commits?author=sinan-rsvx" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/jim761"><img src="https://avatars.githubusercontent.com/u/146172605?v=4?s=120" width="120px;" alt="Jim Wiedemann"/><br /><sub><b>Jim Wiedemann</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=jim761" title="Code">💻</a> <a href="#design-jim761" title="Design">🎨</a> <a href="https://github.com/marigold-ui/marigold/commits?author=jim761" title="Documentation">📖</a> <a href="#example-jim761" title="Examples">💡</a> <a href="https://github.com/marigold-ui/marigold/commits?author=jim761" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/marekgieldatsh"><img src="https://avatars.githubusercontent.com/u/64067674?v=4?s=120" width="120px;" alt="marekgieldatsh"/><br /><sub><b>marekgieldatsh</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=marekgieldatsh" title="Code">💻</a> <a href="#design-marekgieldatsh" title="Design">🎨</a> <a href="#example-marekgieldatsh" title="Examples">💡</a> <a href="https://github.com/marigold-ui/marigold/commits?author=marekgieldatsh" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<!-- LINKS + BADGES -->

[ci]: https://github.com/marigold-ui/marigold/actions/workflows/build.yml
[ci-badge]: https://github.com/marigold-ui/marigold/actions/workflows/build.yml/badge.svg
[license]: https://github.com/marigold-ui/marigold/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/marigold-ui/marigold?style=flat-square
[package]: https://www.npmjs.com/package/@marigold/components
[version-badge]: https://img.shields.io/npm/v/@marigold/components?style=flat-square
[coverage-badge-gist]: https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Faromko%2F8c5471b20c94ae2845addb4336e80919%2Fraw%2Fvitest-coverage-badge.json&style=flat-square&label=Vitest&style=flat-square&logo=vitest&logoColor=white
