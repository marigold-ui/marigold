<p align="center"> 
  <img width="494" align="center" alt="type_logo" src="https://user-images.githubusercontent.com/59875255/75779675-530ca980-5d5a-11ea-8910-7e92ded472e3.png">
</p>
<br>
<br>

[![ci][ci-badge]][ci] [![coverage][coverage-badge]][coverage] [![MIT License][license-badge]][license] [![version][version-badge]][package]

# Marigold

React implementation of the Marigold Design System built on [Emotion](https://emotion.sh/).

## Usage 💡

Use the styles for your component from a global `theme` object. To provide the theme in context, wrap your component into the `MarigoldProvider`. You can add custom styles via style props.

```
// basic usage
import React from 'react'
import { MarigoldProvider } from '@marigold/system'
import { Text, theme } from '@marigold/components'

<MarigoldProvider theme={theme}>
  <Text mx="2">Lorem ipsum</Text>
</MarigoldProvider>
```

## Documentation 📖

Start your local storybook server via

```
yarn start
```

to access the Marigold documentation pages.

## Setup 🔧

```sh
# after first release:
# with npm
npm install marigold-ui --save

# with yarn
yarn add marigold-ui

# for now:
git clone https://github.com/marigold-ui/marigold.git
cd marigold
yarn install
```

## For Developers

- Coverage: `yarn coverage`
- Linting: `yarn lint`
- Test: `yarn test` (with optional `--watch`)
- Type checking: `yarn typecheck`
- Create new component: `yarn create:component <name>`

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/sebald"><img src="https://avatars3.githubusercontent.com/u/985701?v=4" width="100px;" alt=""/><br /><sub><b>Sebastian Sebald</b></sub></a><br /><a href="https://github.com/rx/marigold/commits?author=sebald" title="Code">💻</a> <a href="https://github.com/rx/marigold/commits?author=sebald" title="Documentation">📖</a> <a href="#infra-sebald" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/viktoria-schwarz"><img src="https://avatars1.githubusercontent.com/u/59830437?v=4" width="100px;" alt=""/><br /><sub><b>viktoria-schwarz</b></sub></a><br /><a href="https://github.com/rx/marigold/commits?author=viktoria-schwarz" title="Code">💻</a> <a href="https://github.com/rx/marigold/commits?author=viktoria-schwarz" title="Documentation">📖</a> <a href="#infra-viktoria-schwarz" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/ti10le"><img src="https://avatars2.githubusercontent.com/u/59875255?v=4" width="100px;" alt=""/><br /><sub><b>ti10le</b></sub></a><br /><a href="https://github.com/rx/marigold/commits?author=ti10le" title="Code">💻</a> <a href="https://github.com/rx/marigold/commits?author=ti10le" title="Documentation">📖</a> <a href="#infra-ti10le" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://toshibot.com"><img src="https://avatars3.githubusercontent.com/u/6447213?v=4" width="100px;" alt=""/><br /><sub><b>Toshi</b></sub></a><br /><a href="https://github.com/rx/marigold/commits?author=Toshibot" title="Code">💻</a> <a href="https://github.com/rx/marigold/commits?author=Toshibot" title="Documentation">📖</a> <a href="#design-Toshibot" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/julianthiel"><img src="https://avatars1.githubusercontent.com/u/59880423?v=4" width="100px;" alt=""/><br /><sub><b>Julian Thiel</b></sub></a><br /><a href="https://github.com/rx/marigold/commits?author=julianthiel" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
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
