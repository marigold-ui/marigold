# @marigold/system

## 6.9.0

## 6.8.0

## 6.7.0

## 6.6.4

## 6.6.3

## 6.6.2

## 6.6.1

## 6.6.0

### Minor Changes

- [#3416](https://github.com/marigold-ui/marigold/pull/3416) [`7704debbe`](https://github.com/marigold-ui/marigold/commit/7704debbea339917eedf8182e2e5986798b34aff) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - [DST-38]: Implement mobile optimization for `DatePicker`

## 6.5.1

## 6.5.0

## 6.4.0

### Minor Changes

- [#3429](https://github.com/marigold-ui/marigold/pull/3429) [`3e328198c`](https://github.com/marigold-ui/marigold/commit/3e328198ca5ab18ef4218c8252463ea5d76091bd) Thanks [@sebald](https://github.com/sebald)! - feat: adjust `<SliderOutput>` position

- [#3424](https://github.com/marigold-ui/marigold/pull/3424) [`5a2a03ae0`](https://github.com/marigold-ui/marigold/commit/5a2a03ae0766a417c208c8624d8b6a0f370edcd9) Thanks [@sebald](https://github.com/sebald)! - feat: add styles to checkbox and radio groups

### Patch Changes

- Updated dependencies [[`e5869b2f3`](https://github.com/marigold-ui/marigold/commit/e5869b2f3bf0f3b69a2e37f377d51786d23ccc56)]:
  - @marigold/types@1.1.0

## 6.3.1

## 6.3.0

## 6.2.6

## 6.2.5

## 6.2.4

## 6.2.3

## 6.2.2

## 6.2.1

## 6.2.0

## 6.1.0

### Minor Changes

- [#3250](https://github.com/marigold-ui/marigold/pull/3250) [`989f094e7`](https://github.com/marigold-ui/marigold/commit/989f094e76510e9ff6f4f8d675a9dd6f768099da) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - [DST-111]: enhance styling tabs

### Patch Changes

- [#3297](https://github.com/marigold-ui/marigold/pull/3297) [`566ec30e4`](https://github.com/marigold-ui/marigold/commit/566ec30e43454719b05adc3d3ca3864887280546) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-143]: rename token name

- [#3295](https://github.com/marigold-ui/marigold/pull/3295) [`8a4ef1805`](https://github.com/marigold-ui/marigold/commit/8a4ef1805a57a878f2f050c5523af2f921111bfd) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-145]:update fontsize

## 6.0.1

### Patch Changes

- [#3232](https://github.com/marigold-ui/marigold/pull/3232) [`fd10c294a`](https://github.com/marigold-ui/marigold/commit/fd10c294a352642f1f98a8c2d70eb4fbd7d93a22) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - [DST-65]: Spacing of Popover can me customized based on themes

## 6.0.0

### Major Changes

- [#3117](https://github.com/marigold-ui/marigold/pull/3117) [`79be927e6`](https://github.com/marigold-ui/marigold/commit/79be927e6b2f73c9f75487dfe14a3ce56444afaa) Thanks [@sebald](https://github.com/sebald)! - Switch @marigold/styles to Tailwind CSS, replaces Emotion CSS & Theme-UI

## 5.6.0

## 5.5.0

## 5.4.0

### Patch Changes

- Updated dependencies [[`b3d577339`](https://github.com/marigold-ui/marigold/commit/b3d577339e16e73185d2fb80707479ce689e7f7f), [`8972cbaca`](https://github.com/marigold-ui/marigold/commit/8972cbaca29ccce9c17a15b772ab0c7a3e921d20)]:
  - @marigold/types@1.0.1

## 5.3.0

### Minor Changes

- [#2826](https://github.com/marigold-ui/marigold/pull/2826) [`aaf6b55c6`](https://github.com/marigold-ui/marigold/commit/aaf6b55c6c2b07f7baea9e7af1cab69e70c333e8) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Improved `<Input>` with icons/actions

- [#2845](https://github.com/marigold-ui/marigold/pull/2845) [`80cdbe062`](https://github.com/marigold-ui/marigold/commit/80cdbe062445b6c4b8073cb72976ce9ce4bcefb1) Thanks [@sebald](https://github.com/sebald)! - refa: `<SVG>` css prop can overrde size (height/width)

## 5.2.0

### Minor Changes

- [#2806](https://github.com/marigold-ui/marigold/pull/2806) [`f11e2d7db`](https://github.com/marigold-ui/marigold/commit/f11e2d7dbb3d6b4ee4b8651f48b52736f64fd778) Thanks [@sebald](https://github.com/sebald)! - feat: expose `keyframes` helper

## 5.1.0

### Patch Changes

- [#2773](https://github.com/marigold-ui/marigold/pull/2773) [`6d7d6f621`](https://github.com/marigold-ui/marigold/commit/6d7d6f621788dc42aadd2f38aa90abfdb9438364) Thanks [@sebald](https://github.com/sebald)! - fix: `<Global>` selector prop applies styles from `body`

## 5.0.0

### Major Changes

- [#2764](https://github.com/marigold-ui/marigold/pull/2764) [`1ff29cc0c`](https://github.com/marigold-ui/marigold/commit/1ff29cc0ca5416eed14b54d0dda8ec1aad762cda) Thanks [@sebald](https://github.com/sebald)! - refa: fix polymorph types + remove style props from `<Box>`

  **BREAKING CHANGE:**

  We deprecated the available short hands for styling on the `<Box>` component (also known as style props), for example `<Box p="small">`. This way it is more clear what to use when -> always the `css` prop.

  _How to update your code:_ Basically move all style props to the `css` prop. E.g. `<Box p="small" bg="primary">` becomes `<Box css={{ p: "small, bg; "primary" }}>`.

### Patch Changes

- Updated dependencies [[`1ff29cc0c`](https://github.com/marigold-ui/marigold/commit/1ff29cc0ca5416eed14b54d0dda8ec1aad762cda), [`0f539b788`](https://github.com/marigold-ui/marigold/commit/0f539b788a72654e834c374810ef677c307fdadb)]:
  - @marigold/types@1.0.0

## 4.2.2

## 4.2.1

## 4.2.0

## 4.1.5

### Patch Changes

- Updated dependencies [[`832da2a6`](https://github.com/marigold-ui/marigold/commit/832da2a69f9bad5adcbcc57cba3cb215dfaa51e2)]:
  - @marigold/types@0.5.7

## 4.1.4

## 4.1.3

## 4.1.2

### Patch Changes

- [#2659](https://github.com/marigold-ui/marigold/pull/2659) [`de5df9b6`](https://github.com/marigold-ui/marigold/commit/de5df9b649d2b8ddc840846e83efa7a33d1d8a5e) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: icon size in button

## 4.1.1

## 4.1.0

### Patch Changes

- [#2628](https://github.com/marigold-ui/marigold/pull/2628) [`312a23cf`](https://github.com/marigold-ui/marigold/commit/312a23cf95352beba4b2798a479fa9e0cdbfa20a) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @theme-ui/css to v0.15.4

- [#2627](https://github.com/marigold-ui/marigold/pull/2627) [`d250fc00`](https://github.com/marigold-ui/marigold/commit/d250fc0041f2beca498107d3e60e2d50e9ffb293) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update babel monorepo

- Updated dependencies [[`080b1fed`](https://github.com/marigold-ui/marigold/commit/080b1fedc582511e0155a9199aa3b2b995cfb609)]:
  - @marigold/types@0.5.6

## 4.0.0

### Patch Changes

- [#2591](https://github.com/marigold-ui/marigold/pull/2591) [`be3f2060`](https://github.com/marigold-ui/marigold/commit/be3f20600b195f62d8d5bc1b784329d7bf152d9a) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @babel/core to v7.19.6

- [#2609](https://github.com/marigold-ui/marigold/pull/2609) [`4554b26e`](https://github.com/marigold-ui/marigold/commit/4554b26ef49986d2ebf457cc000284db5d8d85e8) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @emotion/react to v11.10.5

- Updated dependencies [[`f38ae20a`](https://github.com/marigold-ui/marigold/commit/f38ae20a23badf8cf141f582f0c20d85fdd6534b)]:
  - @marigold/types@0.5.5

## 3.0.6

### Patch Changes

- [#2593](https://github.com/marigold-ui/marigold/pull/2593) [`d8fc387d`](https://github.com/marigold-ui/marigold/commit/d8fc387df8ce1afef229bc421ed5cee114e24190) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency csstype to v3.1.1

## 3.0.5

## 3.0.4

## 3.0.3

## 3.0.2

### Patch Changes

- [#2545](https://github.com/marigold-ui/marigold/pull/2545) [`e65171c6`](https://github.com/marigold-ui/marigold/commit/e65171c6b30f0091491a7e0394e5ddafc0d72bf4) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @babel/core to v7.19.3

- [#2551](https://github.com/marigold-ui/marigold/pull/2551) [`d9974f91`](https://github.com/marigold-ui/marigold/commit/d9974f91b03531ac46715a4cf85965141ee64dfd) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: improve core theme

## 3.0.1

### Patch Changes

- Updated dependencies [[`4af6c016`](https://github.com/marigold-ui/marigold/commit/4af6c01618922473fa126786550fba74475bf7da), [`eb7e453c`](https://github.com/marigold-ui/marigold/commit/eb7e453c23f310d70d58514c24e8fe0d0cd375d4)]:
  - @marigold/types@0.5.4

## 3.0.0

### Patch Changes

- [#2478](https://github.com/marigold-ui/marigold/pull/2478) [`a795f29a`](https://github.com/marigold-ui/marigold/commit/a795f29ae0977ab5d386cba0e12be29457f748ff) Thanks [@sebald](https://github.com/sebald)! - feat: improve `&:hover` selector to adhere CSS specificity

## 2.2.0

### Minor Changes

- [#2411](https://github.com/marigold-ui/marigold/pull/2411) [`a4ccb92f`](https://github.com/marigold-ui/marigold/commit/a4ccb92f294129dce1dd050513044dbd7bd96e28) Thanks [@sebald](https://github.com/sebald)! - feat: `css` props supports array (again) + padding props for `<Card>`

### Patch Changes

- [#2416](https://github.com/marigold-ui/marigold/pull/2416) [`f76f4870`](https://github.com/marigold-ui/marigold/commit/f76f48703fc03f6ceae09ff5c0b8bd60ea811564) Thanks [@sebald](https://github.com/sebald)! - fix: correctly interpret design tokens in `<SVG>`

- [#2437](https://github.com/marigold-ui/marigold/pull/2437) [`23a78264`](https://github.com/marigold-ui/marigold/commit/23a78264cf713ebf439c264a45ff946fd58472de) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update testing (major)

- Updated dependencies [[`75128374`](https://github.com/marigold-ui/marigold/commit/75128374e5209a24bd2b0914c1d9455c02fcfc92)]:
  - @marigold/types@0.5.3

## 2.1.3

### Patch Changes

- [#2391](https://github.com/marigold-ui/marigold/pull/2391) [`d3143f65`](https://github.com/marigold-ui/marigold/commit/d3143f65fd4dc207d21006f21078b03c6123ff62) Thanks [@sebald](https://github.com/sebald)! - fix: remove responsivness from SVGs by default

- [#2400](https://github.com/marigold-ui/marigold/pull/2400) [`f6b49c37`](https://github.com/marigold-ui/marigold/commit/f6b49c37a0293e4d060db292d22a085fcf0bbc65) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: improve useResponsiveStyle and add story

## 2.1.2

## 2.1.1

## 2.1.0

## 2.0.0

### Minor Changes

- [#2247](https://github.com/marigold-ui/marigold/pull/2247) [`8e9ea3da`](https://github.com/marigold-ui/marigold/commit/8e9ea3daaa0b3ea666394badabcfc3e76eba5512) Thanks [@sebald](https://github.com/sebald)! - feat: improve theme type

### Patch Changes

- [#2273](https://github.com/marigold-ui/marigold/pull/2273) [`4c63400f`](https://github.com/marigold-ui/marigold/commit/4c63400fef291181f29f994c7f8a8b020772cbee) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @emotion/react to v11.10.0

* [#2265](https://github.com/marigold-ui/marigold/pull/2265) [`88a3d4b0`](https://github.com/marigold-ui/marigold/commit/88a3d4b030e67e46a4af429b01a884195601b7a2) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @babel/core to v7.18.10

## 1.3.0

### Patch Changes

- [#2221](https://github.com/marigold-ui/marigold/pull/2221) [`c60f8527`](https://github.com/marigold-ui/marigold/commit/c60f8527cc4d61c3b7d8eeb2ec29a0cd7679e8dc) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @babel/core to v7.18.9

## 1.2.2

## 1.2.1

### Patch Changes

- [#2164](https://github.com/marigold-ui/marigold/pull/2164) [`b43464fc`](https://github.com/marigold-ui/marigold/commit/b43464fce6f7e2662b27313c6f74190e8c0f540f) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: update to React 18

- Updated dependencies [[`b43464fc`](https://github.com/marigold-ui/marigold/commit/b43464fce6f7e2662b27313c6f74190e8c0f540f)]:
  - @marigold/types@0.5.2

## 1.2.0

### Minor Changes

- [#2144](https://github.com/marigold-ui/marigold/pull/2144) [`82c376a9`](https://github.com/marigold-ui/marigold/commit/82c376a9c34c69104456e6e356231132f53c3efe) Thanks [@sebald](https://github.com/sebald)! - feat: Improve usage of Marigold when not used as a full page app

## 1.1.1

## 1.1.0

## 1.0.1

### Patch Changes

- [#2102](https://github.com/marigold-ui/marigold/pull/2102) [`23c1a5ce`](https://github.com/marigold-ui/marigold/commit/23c1a5cece356465f07b7206a0fe0f65512f3350) Thanks [@sebald](https://github.com/sebald)! - feat: Remove all occurances of `React.FC`

- Updated dependencies [[`23c1a5ce`](https://github.com/marigold-ui/marigold/commit/23c1a5cece356465f07b7206a0fe0f65512f3350), [`bfa0caea`](https://github.com/marigold-ui/marigold/commit/bfa0caeac9fdb817ceed7ee30dbcce0819460f30)]:
  - @marigold/types@0.5.1

## 1.0.0

### Major Changes

- [#2074](https://github.com/marigold-ui/marigold/pull/2074) [`3aa2c100`](https://github.com/marigold-ui/marigold/commit/3aa2c100fce8884cf0e1ae8e848516923f0d8456) Thanks [@sebald](https://github.com/sebald)! - refa: Remove "variant" prop from <Box>, use `useComponentStyles` instead

### Minor Changes

- [#2041](https://github.com/marigold-ui/marigold/pull/2041) [`02d13e84`](https://github.com/marigold-ui/marigold/commit/02d13e84a27ac075587f7278c8c858aeee884f64) Thanks [@sebald](https://github.com/sebald)! - feat: Support for `:focus-visible` and `:selected` pseudos

* [#2048](https://github.com/marigold-ui/marigold/pull/2048) [`2ab80ae6`](https://github.com/marigold-ui/marigold/commit/2ab80ae677be0785cfa6e2bdf9f7ff2f3d38baec) Thanks [@sebald](https://github.com/sebald)! - refa: <Select>

- [#2063](https://github.com/marigold-ui/marigold/pull/2063) [`f5128944`](https://github.com/marigold-ui/marigold/commit/f512894439dff2b5769fe2e5aa23f61a28b3d14e) Thanks [@sebald](https://github.com/sebald)! - feat: Add shorthands for group selectors

* [#2056](https://github.com/marigold-ui/marigold/pull/2056) [`3abbc813`](https://github.com/marigold-ui/marigold/commit/3abbc8130c8b5156f3ca62f237dd59278354eb7c) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce <NumberFields>

### Patch Changes

- Updated dependencies [[`02d13e84`](https://github.com/marigold-ui/marigold/commit/02d13e84a27ac075587f7278c8c858aeee884f64)]:
  - @marigold/types@0.5.0

## 1.0.0-beta.0

### Minor Changes

- [#2041](https://github.com/marigold-ui/marigold/pull/2041) [`02d13e84`](https://github.com/marigold-ui/marigold/commit/02d13e84a27ac075587f7278c8c858aeee884f64) Thanks [@sebald](https://github.com/sebald)! - feat: Support for `:focus-visible` and `:selected` pseudos

* [#2048](https://github.com/marigold-ui/marigold/pull/2048) [`2ab80ae6`](https://github.com/marigold-ui/marigold/commit/2ab80ae677be0785cfa6e2bdf9f7ff2f3d38baec) Thanks [@sebald](https://github.com/sebald)! - refa: <Select>

- [#2063](https://github.com/marigold-ui/marigold/pull/2063) [`f5128944`](https://github.com/marigold-ui/marigold/commit/f512894439dff2b5769fe2e5aa23f61a28b3d14e) Thanks [@sebald](https://github.com/sebald)! - feat: Add shorthands for group selectors

* [#2056](https://github.com/marigold-ui/marigold/pull/2056) [`3abbc813`](https://github.com/marigold-ui/marigold/commit/3abbc8130c8b5156f3ca62f237dd59278354eb7c) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce <NumberFields>

### Patch Changes

- Updated dependencies [[`02d13e84`](https://github.com/marigold-ui/marigold/commit/02d13e84a27ac075587f7278c8c858aeee884f64)]:
  - @marigold/types@0.5.0-beta.0

## 0.9.0

### Patch Changes

- [#1979](https://github.com/marigold-ui/marigold/pull/1979) [`424f1705`](https://github.com/marigold-ui/marigold/commit/424f1705159d7a03dce368adadbae152acc80687) Thanks [@sebald](https://github.com/sebald)! - feat: transform state to corresponding css selector and data-attr

* [#1972](https://github.com/marigold-ui/marigold/pull/1972) [`dbc55934`](https://github.com/marigold-ui/marigold/commit/dbc55934775a6c2362525f0078ecf1595475ddc8) Thanks [@sebald](https://github.com/sebald)! - feat: introduce `useComponentStyles` hook

- [#1994](https://github.com/marigold-ui/marigold/pull/1994) [`3dff2282`](https://github.com/marigold-ui/marigold/commit/3dff2282b75ca91547f478f3305b138d1d409670) Thanks [@sarahgm](https://github.com/sarahgm)! - Refa: card-styles-structur

* [#1988](https://github.com/marigold-ui/marigold/pull/1988) [`7c1129dc`](https://github.com/marigold-ui/marigold/commit/7c1129dc140d435e5312f80a57fd48f8498c33ee) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Field Component restructure

* Updated dependencies [[`7c1129dc`](https://github.com/marigold-ui/marigold/commit/7c1129dc140d435e5312f80a57fd48f8498c33ee)]:
  - @marigold/types@0.4.1

## 0.8.0

### Minor Changes

- [#1935](https://github.com/marigold-ui/marigold/pull/1935) [`382ac6cc`](https://github.com/marigold-ui/marigold/commit/382ac6cca1865d033ba601ad269247f26ee0a13e) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): improve SVG to handle width and height prop

* [#1915](https://github.com/marigold-ui/marigold/pull/1915) [`2f45aa5d`](https://github.com/marigold-ui/marigold/commit/2f45aa5d236f861ab8187a4a574a7113d6c1f1b8) Thanks [@sebald](https://github.com/sebald)! - feat(system): theme getter

- [#1919](https://github.com/marigold-ui/marigold/pull/1919) [`5319745c`](https://github.com/marigold-ui/marigold/commit/5319745cbc20919a423dda49f4fb8ac4608009e1) Thanks [@sebald](https://github.com/sebald)! - feat: SVG supports size token from theme

## 0.7.0

## 0.6.0

### Minor Changes

- [#1817](https://github.com/marigold-ui/marigold/pull/1817) [`4cc0ad3b`](https://github.com/marigold-ui/marigold/commit/4cc0ad3b85b993e01b4d85b6f30b1a81cdee2351) Thanks [@sebald](https://github.com/sebald)! - feat(system): Add textSizeAdjust to globals

* [#1842](https://github.com/marigold-ui/marigold/pull/1842) [`e053b7b9`](https://github.com/marigold-ui/marigold/commit/e053b7b903f02c56cf10e6b9aecbedd29399895d) Thanks [@ti10le](https://github.com/ti10le)! - feat: extend svg fill prop to handle theme color

### Patch Changes

- [#1809](https://github.com/marigold-ui/marigold/pull/1809) [`539d4198`](https://github.com/marigold-ui/marigold/commit/539d41987118db125ee37a4a83231335ea15830a) Thanks [@sebald](https://github.com/sebald)! - feat(create-theme): Introduce helper package to create themes with sensible defaults

## 0.5.1

### Patch Changes

- [#1795](https://github.com/marigold-ui/marigold/pull/1795) [`a178eafe`](https://github.com/marigold-ui/marigold/commit/a178eafe8c8380ee23b4587d953ee52b231414ff) Thanks [@ti10le](https://github.com/ti10le)! - refa: use interface instead of type

## 0.5.0

### Minor Changes

- [#1723](https://github.com/marigold-ui/marigold/pull/1723) [`5936de75`](https://github.com/marigold-ui/marigold/commit/5936de75e5a0134584438117c53c5edfe15c6c5d) Thanks [@sebald](https://github.com/sebald)! - feat(system): add hook that allows to use values based on screen size

## 0.4.0

### Minor Changes

- [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942) Thanks [@sebald](https://github.com/sebald)! - chore: Use `tsup` to build packages

* [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942) Thanks [@sebald](https://github.com/sebald)! - Improved size in node_modules

### Patch Changes

- Updated dependencies [[`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942)]:
  - @marigold/types@0.4.0

## 0.3.1

### Patch Changes

- [#1676](https://github.com/marigold-ui/marigold/pull/1676) [`379041bc`](https://github.com/marigold-ui/marigold/commit/379041bc7d4502bca98029a95afe43ce693222cd) Thanks [@ti10le](https://github.com/ti10le)! - remove the last mdx stories

## 0.3.0

### Minor Changes

- [#1163](https://github.com/marigold-ui/marigold/pull/1163) [`51af6693`](https://github.com/marigold-ui/marigold/commit/51af669330fd52e4e31fe5ad71d2b202ab8d2231) Thanks [@sebald](https://github.com/sebald)! - feat(system): Expose helper to transpile style object

### Patch Changes

- [#1549](https://github.com/marigold-ui/marigold/pull/1549) [`c030aa85`](https://github.com/marigold-ui/marigold/commit/c030aa85156356c294bafe9831024f6b6f2ce4db) Thanks [@sebald](https://github.com/sebald)! - refa: use emotion's theme function in <Element>

* [#1515](https://github.com/marigold-ui/marigold/pull/1515) [`8eda245f`](https://github.com/marigold-ui/marigold/commit/8eda245f01a918fcdaa9f0ac211889ed869aa375) Thanks [@sebald](https://github.com/sebald)! - feat: add normalization for body and html & fix emotion leak

- [#1491](https://github.com/marigold-ui/marigold/pull/1491) [`5a04de11`](https://github.com/marigold-ui/marigold/commit/5a04de110637d004f5824679697ee4d6a90eaf34) Thanks [@ti10le](https://github.com/ti10le)! - remove useStyles from Element

* [#1440](https://github.com/marigold-ui/marigold/pull/1440) [`c1da52c0`](https://github.com/marigold-ui/marigold/commit/c1da52c0f035b141608fd606e6ba3bc2b5482dc1) Thanks [@ti10le](https://github.com/ti10le)! - feature: use Element in Box + necessary fix changes

- [#1591](https://github.com/marigold-ui/marigold/pull/1591) [`1448ddca`](https://github.com/marigold-ui/marigold/commit/1448ddcaa0f647f48b018fa74a8686af30eccc53) Thanks [@sebald](https://github.com/sebald)! - feat(jest): Improve snapshot readability

* [#1514](https://github.com/marigold-ui/marigold/pull/1514) [`5107b943`](https://github.com/marigold-ui/marigold/commit/5107b943cb3085eb3137d84e79966acad6173a26) Thanks [@sebald](https://github.com/sebald)! - feat(system): Use emotion's context

- [#1647](https://github.com/marigold-ui/marigold/pull/1647) [`cd3a0d3e`](https://github.com/marigold-ui/marigold/commit/cd3a0d3edb3f2ddc1f561e8007e1c20000f7855a) Thanks [@ti10le](https://github.com/ti10le)! - feat: conditional function to allow state props in variants

* [#1230](https://github.com/marigold-ui/marigold/pull/1230) [`ebd6e26f`](https://github.com/marigold-ui/marigold/commit/ebd6e26f71f675b98b663bc45c6a2d5badddcd47) Thanks [@viktoria-schwarz](https://github.com/viktoria-schwarz)! - feat: add GlobalStyles via theme

- [#1563](https://github.com/marigold-ui/marigold/pull/1563) [`6e485f5a`](https://github.com/marigold-ui/marigold/commit/6e485f5a8800094fe54c075a2b21f8abe726b3cd) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce a `Theme` with all available scales

* [#1620](https://github.com/marigold-ui/marigold/pull/1620) [`80a2abe5`](https://github.com/marigold-ui/marigold/commit/80a2abe5804ba2c5a48cc6b05211245c37baf266) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): extend Box to handle \_\_default variants

- [#1579](https://github.com/marigold-ui/marigold/pull/1579) [`e13e3cc1`](https://github.com/marigold-ui/marigold/commit/e13e3cc1fc66b261209973b1fc90eb48117076e9) Thanks [@ti10le](https://github.com/ti10le)! - feat: remove Heading from marigold

* [#1622](https://github.com/marigold-ui/marigold/pull/1622) [`1829cf17`](https://github.com/marigold-ui/marigold/commit/1829cf17e16c574e5577b3e1709c34dc7ed4faaf) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Card default variant

- [#1501](https://github.com/marigold-ui/marigold/pull/1501) [`1c1f8648`](https://github.com/marigold-ui/marigold/commit/1c1f864820a060214406ef711f4ed873746c16c4) Thanks [@ti10le](https://github.com/ti10le)! - feat(storybook): remove use styles stories

* [#1190](https://github.com/marigold-ui/marigold/pull/1190) [`a00b7eb9`](https://github.com/marigold-ui/marigold/commit/a00b7eb971131634414d3912d059fb505bb7a370) Thanks [@sebald](https://github.com/sebald)! - fix(system): List reset should not remove the enumeration

- [#1499](https://github.com/marigold-ui/marigold/pull/1499) [`ec5baf85`](https://github.com/marigold-ui/marigold/commit/ec5baf85a9a0f82a4fca5bbd1e1680316c186593) Thanks [@sebald](https://github.com/sebald)! - feat: Update and simplify normalization

* [#1652](https://github.com/marigold-ui/marigold/pull/1652) [`0bb8f19e`](https://github.com/marigold-ui/marigold/commit/0bb8f19ebdec0e2f9dc3f6164f4373cac5c10880) Thanks [@sebald](https://github.com/sebald)! - refa(system): Groupt variant related fns in own file

- [#1436](https://github.com/marigold-ui/marigold/pull/1436) [`c4ae5c5c`](https://github.com/marigold-ui/marigold/commit/c4ae5c5ca442f93034ff8f4c70adc295547951d4) Thanks [@ti10le](https://github.com/ti10le)! - create Element component + normalize file

* [#1508](https://github.com/marigold-ui/marigold/pull/1508) [`a1ef2108`](https://github.com/marigold-ui/marigold/commit/a1ef2108dd6c8e6838b517dd58c82d38e71dae2b) Thanks [@sebald](https://github.com/sebald)! - feat: Add default styling to `<Element>`

- [#1621](https://github.com/marigold-ui/marigold/pull/1621) [`2f7b936f`](https://github.com/marigold-ui/marigold/commit/2f7b936f5b07eade00a51cb138c3c492f1e08c9d) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Badge default variant

* [#1550](https://github.com/marigold-ui/marigold/pull/1550) [`846eb640`](https://github.com/marigold-ui/marigold/commit/846eb640ad035c7f3410b4a8a451f8de56e62339) Thanks [@sebald](https://github.com/sebald)! - feat: Merge <Box> and <Element>

- [#1614](https://github.com/marigold-ui/marigold/pull/1614) [`5d63cd9c`](https://github.com/marigold-ui/marigold/commit/5d63cd9c14578787083c82c85d93bbd2ff0efac6) Thanks [@ti10le](https://github.com/ti10le)! - remove all purple color things
