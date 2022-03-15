<p align="center"> 
  <img width="494" align="center" alt="type_logo" src="https://user-images.githubusercontent.com/59875255/75779675-530ca980-5d5a-11ea-8910-7e92ded472e3.png">
</p>
<br>
<br>

[![ci][ci-badge]][ci] [![coverage][coverage-badge]][coverage] [![MIT License][license-badge]][license] [![version][version-badge]][package]

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/marigold-ui/marigold)

# Marigold

React implementation of the Marigold Design System based on [Emotion](https://emotion.sh/) and [theme-ui](https://theme-ui.com/).

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
npm install @marigold/theme-unicorn --save

# with yarn
yarn add @marigold/theme-unicorn
```

## Usage 💡

Use the styles for your component from a global `theme` object. To provide the theme in context, wrap your component into the `MarigoldProvider`.

```
// basic usage
import React from 'react'
import { MarigoldProvider, Text } from '@marigold/components'
import unicornTheme from '@marigold/theme-unicorn'

<MarigoldProvider theme={unicornTheme}>
  <Text>Lorem ipsum</Text>
</MarigoldProvider>
```

## For Developers

### Setup & Usage

Open a terminal and navigate to a folder of your choice. Clone the project `git clone https://github.com/marigold-ui/marigold.git` and navigate to the new folder `cd marigold`. Install the yarn packages using `yarn` command in the root and use `yarn start` to start storybook. Open [localhost:6005](http://localhost:6005) to see the components in storybook.
Navigate to the documentation `cd docs` and start the development server `gatsby develop`, which opens the documentation site on [localhost:8000](http://localhost:8000).
When working on the components, use the following commands for development.

- Coverage: `yarn coverage`
- Linting: `yarn lint`
- Test: `yarn test` (with optional `--watch`)
- Type checking: `yarn typecheck`

For a release on NPM, change the version numbers and use `yarn release` and check all the packages you want to publish.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/sebald"><img src="https://avatars3.githubusercontent.com/u/985701?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sebastian Sebald</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=sebald" title="Code">💻</a> <a href="https://github.com/marigold-ui/marigold/commits?author=sebald" title="Documentation">📖</a> <a href="#infra-sebald" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/viktoria-schwarz"><img src="https://avatars1.githubusercontent.com/u/59830437?v=4?s=100" width="100px;" alt=""/><br /><sub><b>viktoria-schwarz</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=viktoria-schwarz" title="Code">💻</a> <a href="https://github.com/marigold-ui/marigold/commits?author=viktoria-schwarz" title="Documentation">📖</a> <a href="#infra-viktoria-schwarz" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/ti10le"><img src="https://avatars2.githubusercontent.com/u/59875255?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ti10le</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=ti10le" title="Code">💻</a> <a href="https://github.com/marigold-ui/marigold/commits?author=ti10le" title="Documentation">📖</a> <a href="#infra-ti10le" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://toshibot.com"><img src="https://avatars3.githubusercontent.com/u/6447213?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Toshi</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=Toshibot" title="Code">💻</a> <a href="https://github.com/marigold-ui/marigold/commits?author=Toshibot" title="Documentation">📖</a> <a href="#design-Toshibot" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/julianthiel"><img src="https://avatars1.githubusercontent.com/u/59880423?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Julian Thiel</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=julianthiel" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/johannaracky"><img src="https://avatars.githubusercontent.com/u/86712740?v=4?s=100" width="100px;" alt=""/><br /><sub><b>johannaracky</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=johannaracky" title="Documentation">📖</a></td>
    <td align="center"><a href="https://bandism.net/"><img src="https://avatars.githubusercontent.com/u/22633385?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ikko Ashimine</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=eltociear" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/andres-dediego2"><img src="https://avatars.githubusercontent.com/u/34473133?v=4?s=100" width="100px;" alt=""/><br /><sub><b>andres-dediego2</b></sub></a><br /><a href="#design-andres-dediego2" title="Design">🎨</a> <a href="https://github.com/marigold-ui/marigold/commits?author=andres-dediego2" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/sarahgm"><img src="https://avatars.githubusercontent.com/u/38324334?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sarahgm</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=sarahgm" title="Code">💻</a> <a href="#design-sarahgm" title="Design">🎨</a> <a href="https://github.com/marigold-ui/marigold/commits?author=sarahgm" title="Documentation">📖</a> <a href="#infra-sarahgm" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/snragund"><img src="https://avatars.githubusercontent.com/u/62615094?v=4?s=100" width="100px;" alt=""/><br /><sub><b>snragund</b></sub></a><br /><a href="https://github.com/marigold-ui/marigold/commits?author=snragund" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<!-- LINKS + BADGES -->

[ci]: https://github.com/marigold-ui/marigold/actions
[ci-badge]: https://github.com/marigold-ui/marigold/workflows/Validate/badge.svg
[license]: https://github.com/marigold-ui/marigold/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/marigold-ui/marigold?style=flat-square
[package]: https://www.npmjs.com/package/@marigold/components
[version-badge]: https://img.shields.io/npm/v/@marigold/components?style=flat-square
[coverage]: https://coveralls.io/github/marigold-ui/marigold?branch=master
[coverage-badge]: https://img.shields.io/coveralls/github/marigold-ui/marigold/master?style=flat-square
