<p align="center"> 
  <img width="494" align="center" alt="type_logo" src="blob:https://reservix.atlassian.net/09adfe1d-e0ae-4333-b815-f565718276cd">
</p>
<br>
<br>

[![ci][ci-badge]][ci] [![coverage][coverage-badge]][coverage] [![MIT License][license-badge]][license] [![version][version-badge]][package]

[![Open in Visual Studio Code](https://shields.io/badge/-Open%20in%20Visual%20Studio%20Code-blue?logo=visualstudiocode&style=for-the-badge)](https://open.vscode.dev/marigold-ui/marigold)

# Marigold

React implementation of the Marigold Design System based on [react-aria](https://react-spectrum.adobe.com/react-aria/) and [Tailwind CSS](https://tailwindcss.com/).

## Installation 🔧

```sh
# with npm
npm install @marigold/components --save

# with yarn
yarn add @marigold/components

# for development:
git clone https://github.com/marigold-ui/marigold.git
cd marigold
yarn install
```

If you want to use a marigold theme you have to install them seperatly like:

```sh
# with npm
npm install @marigold/theme-b2b --save

# with yarn
yarn add @marigold/theme-b2b
```

## Usage 💡

Use the styles for your component from a global `theme` object. To provide the theme in context, wrap your component into the `MarigoldProvider`.

```
// basic usage
import React from 'react'
import { MarigoldProvider, Text } from '@marigold/components'
import b2bTheme from '@marigold/theme-b2b'

<MarigoldProvider theme={b2bTheme}>
  <Text>Lorem ipsum</Text>
</MarigoldProvider>
```

## For Developers

### Setup & Usage

Open a terminal and navigate to a folder of your choice. Clone the project `git clone https://github.com/marigold-ui/marigold.git` and navigate to the new folder `cd marigold`. Install the packages using `pnpm install` command in the root and use `pnpm dev` to start storybook. Open [localhost:1337](http://localhost:1337) to see the components in storybook.
Navigate to the documentation `cd docs` and start the development server `pnpm start`, which opens the documentation site on [localhost:3000](http://localhost:3000).
When working on the components, use the following commands for development.

- Coverage: `pnpm test:coverage`
- Linting: `pnpm lint`
- Test: `pnpm test` (with optional `--watch`)
- Type checking: `pnpm typecheck`

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="20%"><a href="https://github.com/sebald"><img src="https://avatars3.githubusercontent.com/u/985701?v=4?s=120" width="120px;" alt="Sebastian Sebald"/><br /><sub><b>Sebastian Sebald</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=sebald" title="Code">💻</a> <a href="#design-sebald" title="Design">🎨</a> <a href="https://github.com/marigold-ui/marigold/commits?author=sebald" title="Documentation">📖</a> <a href="https://github.com/marigold-ui/marigold/pulls?q=is%3Apr+reviewed-by%3Asebald" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/sarahgm"><img src="https://avatars.githubusercontent.com/u/38324334?v=4?s=120" width="120px;" alt="sarahgm"/><br /><sub><b>sarahgm</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=sarahgm" title="Code">💻</a> <a href="#design-sarahgm" title="Design">🎨</a> <a href="https://github.com/marigold-ui/marigold/commits?author=sarahgm" title="Documentation">📖</a> <a href="https://github.com/marigold-ui/marigold/pulls?q=is%3Apr+reviewed-by%3Asarahgm" title="Reviewed Pull Requests">👀</a></td>
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
      <td align="center" valign="top" width="20%"><a href="https://github.com/aromko"><img src="https://avatars.githubusercontent.com/u/77496890?v=4?s=120" width="120px;" alt="Marcel Köhler"/><br /><sub><b>Marcel Köhler</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=aromko" title="Documentation">📖</a> <a href="https://github.com/marigold-ui/marigold/commits?author=aromko" title="Code">💻</a> <a href="#design-aromko" title="Design">🎨</a> <a href="#example-aromko" title="Examples">💡</a> <a href="https://github.com/marigold-ui/marigold/commits?author=aromko" title="Tests">⚠️</a></td>
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
[coverage]: https://codecov.io/github/marigold-ui/marigold/branch/main
[coverage-badge]: https://codecov.io/github/marigold-ui/marigold/branch/main/graph/badge.svg?token=YIIcKX7TZu
