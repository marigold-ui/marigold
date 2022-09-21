# @marigold/components

## 3.0.0

### Major Changes

- [#2463](https://github.com/marigold-ui/marigold/pull/2463) [`fcb15230`](https://github.com/marigold-ui/marigold/commit/fcb15230d4565eba65c7164ffaa042d59ad02e7a) Thanks [@sebald](https://github.com/sebald)! - refa: Improve behavior of `<Stack>` and remove option to render it as a list (use `<List>` instead)

  - `<Stack>` will no longer align items by default, since this will cause children to not take all the available space
  - `<Stack as="ul|ol">` will no longer work, we have a `<List>` comopnent for that

### Minor Changes

- [#2490](https://github.com/marigold-ui/marigold/pull/2490) [`baf5bb57`](https://github.com/marigold-ui/marigold/commit/baf5bb573b5e2f4ff273f9436657a5e38ee866ea) Thanks [@sebald](https://github.com/sebald)! - feat: `Columns` can stretch to available height via `stretch` prop + don't collapse by default

- [#2470](https://github.com/marigold-ui/marigold/pull/2470) [`7b9c90ec`](https://github.com/marigold-ui/marigold/commit/7b9c90ecff94431a807d300015940e64fe240353) Thanks [@sebald](https://github.com/sebald)! - feat: introduce `extendTheme` helper, for more information see https://marigold-ui.io/introduction/theming/#extend-an-existing-theme

### Patch Changes

- [#2458](https://github.com/marigold-ui/marigold/pull/2458) [`20aeba63`](https://github.com/marigold-ui/marigold/commit/20aeba63b2bd7dceff3cb7324764dca2c4d8842b) Thanks [@sebald](https://github.com/sebald)! - fix: style props override theme in `<Text>`

- [#2460](https://github.com/marigold-ui/marigold/pull/2460) [`4495fcb1`](https://github.com/marigold-ui/marigold/commit/4495fcb12723261c61846d30ff09597e2da56f1f) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add height prop to Breakout and refactor docs page

- [#2462](https://github.com/marigold-ui/marigold/pull/2462) [`885e3ca4`](https://github.com/marigold-ui/marigold/commit/885e3ca477a6524855f7a62cb3568fec2b561cd4) Thanks [@sebald](https://github.com/sebald)! - fix: use 'initial' for default `Container` item alignment

- [#2496](https://github.com/marigold-ui/marigold/pull/2496) [`d10bb310`](https://github.com/marigold-ui/marigold/commit/d10bb310914deaa4a5b01ade1e783ad956483021) Thanks [@benediktgrether](https://github.com/benediktgrether)! - chore: change property names in breakout to alignX and AlignY

- Updated dependencies [[`87600058`](https://github.com/marigold-ui/marigold/commit/87600058a47831759fb5a55048ce07a33c173f1b), [`a795f29a`](https://github.com/marigold-ui/marigold/commit/a795f29ae0977ab5d386cba0e12be29457f748ff)]:
  - @marigold/icons@1.1.0
  - @marigold/system@3.0.0

## 2.2.0

### Minor Changes

- [#2411](https://github.com/marigold-ui/marigold/pull/2411) [`a4ccb92f`](https://github.com/marigold-ui/marigold/commit/a4ccb92f294129dce1dd050513044dbd7bd96e28) Thanks [@sebald](https://github.com/sebald)! - feat: `css` props supports array (again) + padding props for `<Card>`

- [#2415](https://github.com/marigold-ui/marigold/pull/2415) [`d5116b5d`](https://github.com/marigold-ui/marigold/commit/d5116b5d452f337fd2873e1a514da1cd571dc72e) Thanks [@sebald](https://github.com/sebald)! - refa: Improve `<Container>` API and make it reponsive

### Patch Changes

- [#2313](https://github.com/marigold-ui/marigold/pull/2313) [`75128374`](https://github.com/marigold-ui/marigold/commit/75128374e5209a24bd2b0914c1d9455c02fcfc92) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @types/react to v18.0.19

- [#2443](https://github.com/marigold-ui/marigold/pull/2443) [`fb76bbbe`](https://github.com/marigold-ui/marigold/commit/fb76bbbe5a7bdb2d124aac6c01be0db5434d589b) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: downgrade aria-focus version

- [#2440](https://github.com/marigold-ui/marigold/pull/2440) [`515ea633`](https://github.com/marigold-ui/marigold/commit/515ea633312bf82a2f8446dd569d2765fcadaadd) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: use useLocalizedStringFormatter instead of depricated useMessage…

- [#2437](https://github.com/marigold-ui/marigold/pull/2437) [`23a78264`](https://github.com/marigold-ui/marigold/commit/23a78264cf713ebf439c264a45ff946fd58472de) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update testing (major)

- [#2412](https://github.com/marigold-ui/marigold/pull/2412) [`44723f1c`](https://github.com/marigold-ui/marigold/commit/44723f1c6123fcac429a485804b610108ce7b846) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: table scrollable

- [#2438](https://github.com/marigold-ui/marigold/pull/2438) [`535f80da`](https://github.com/marigold-ui/marigold/commit/535f80daf738c60e92855310bb96ba6ca054c19b) Thanks [@sebald](https://github.com/sebald)! - fix: `Columns` work with complex and different children types

- Updated dependencies [[`75128374`](https://github.com/marigold-ui/marigold/commit/75128374e5209a24bd2b0914c1d9455c02fcfc92), [`f76f4870`](https://github.com/marigold-ui/marigold/commit/f76f48703fc03f6ceae09ff5c0b8bd60ea811564), [`23a78264`](https://github.com/marigold-ui/marigold/commit/23a78264cf713ebf439c264a45ff946fd58472de), [`a4ccb92f`](https://github.com/marigold-ui/marigold/commit/a4ccb92f294129dce1dd050513044dbd7bd96e28)]:
  - @marigold/types@0.5.3
  - @marigold/system@2.2.0
  - @marigold/icons@1.0.5

## 2.1.3

### Patch Changes

- [#2371](https://github.com/marigold-ui/marigold/pull/2371) [`7bb83042`](https://github.com/marigold-ui/marigold/commit/7bb83042e608fbff1f58498e76172174d54f8960) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: fix the links

- [#2399](https://github.com/marigold-ui/marigold/pull/2399) [`beea5b0b`](https://github.com/marigold-ui/marigold/commit/beea5b0bc67fe4a4c43e5d900d1cf59095b9c2fd) Thanks [@sebald](https://github.com/sebald)! - feat: Make text in non-interactive tables selectable

- [#2378](https://github.com/marigold-ui/marigold/pull/2378) [`d5fd75cb`](https://github.com/marigold-ui/marigold/commit/d5fd75cb0b83d76fece43f959fa4aa5bcdf3f4c1) Thanks [@sarahgm](https://github.com/sarahgm)! - docs: fix responsive layout and responsive table

- Updated dependencies [[`d3143f65`](https://github.com/marigold-ui/marigold/commit/d3143f65fd4dc207d21006f21078b03c6123ff62), [`f6b49c37`](https://github.com/marigold-ui/marigold/commit/f6b49c37a0293e4d060db292d22a085fcf0bbc65)]:
  - @marigold/icons@1.0.4
  - @marigold/system@2.1.3

## 2.1.2

### Patch Changes

- [#2361](https://github.com/marigold-ui/marigold/pull/2361) [`b84e6ff5`](https://github.com/marigold-ui/marigold/commit/b84e6ff56e124e2215278b11971269dba9a49bbe) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: update table with compact and expanded

- Updated dependencies [[`630d8026`](https://github.com/marigold-ui/marigold/commit/630d80269e8bdff5c2900d6366c9fe5cbdaebe5d), [`294e31e3`](https://github.com/marigold-ui/marigold/commit/294e31e3c023cebd64f17a6e8cca97d78151f674)]:
  - @marigold/icons@1.0.3
  - @marigold/system@2.1.2

## 2.1.1

### Patch Changes

- Updated dependencies []:
  - @marigold/system@2.1.1
  - @marigold/icons@1.0.2

## 2.1.0

### Minor Changes

- [#2328](https://github.com/marigold-ui/marigold/pull/2328) [`22350f02`](https://github.com/marigold-ui/marigold/commit/22350f025932c871028ea1292cb13fbb5492865e) Thanks [@sebald](https://github.com/sebald)! - feat: add `fit` and `potision` props to `<Image>`

### Patch Changes

- [#2333](https://github.com/marigold-ui/marigold/pull/2333) [`92feeafe`](https://github.com/marigold-ui/marigold/commit/92feeafe7e9de8c4b685c9ed474f193cff747bf6) Thanks [@sebald](https://github.com/sebald)! - fix: justify content in `<Button>`

* [#2326](https://github.com/marigold-ui/marigold/pull/2326) [`6e236e78`](https://github.com/marigold-ui/marigold/commit/6e236e782b33a22c1fd1a8124ea8b6eb9be9ee6e) Thanks [@sebald](https://github.com/sebald)! - fix: correctly apply read only state to `<Checkbox>`

* Updated dependencies []:
  - @marigold/system@2.1.0
  - @marigold/icons@1.0.1

## 2.0.0

### Minor Changes

- [#2289](https://github.com/marigold-ui/marigold/pull/2289) [`13695db8`](https://github.com/marigold-ui/marigold/commit/13695db8db0d057afa68e1f93ad499c1096d969a) Thanks [@sebald](https://github.com/sebald)! - feat: `<SVG>` and Icons support refs and css prop

* [#2255](https://github.com/marigold-ui/marigold/pull/2255) [`e6d18a82`](https://github.com/marigold-ui/marigold/commit/e6d18a82bc55a051b53108e5856d00a18002953d) Thanks [@sebald](https://github.com/sebald)! - feat: export `useAsyncList` and `useListData`

- [#2247](https://github.com/marigold-ui/marigold/pull/2247) [`8e9ea3da`](https://github.com/marigold-ui/marigold/commit/8e9ea3daaa0b3ea666394badabcfc3e76eba5512) Thanks [@sebald](https://github.com/sebald)! - feat: improve theme type

* [#2285](https://github.com/marigold-ui/marigold/pull/2285) [`6f3b6949`](https://github.com/marigold-ui/marigold/commit/6f3b69498f6c09506867b1f20ee3a2a77112efdc) Thanks [@sebald](https://github.com/sebald)! - feat: `<Button>` correctly pass through all native props and option to take full width

### Patch Changes

- [#2320](https://github.com/marigold-ui/marigold/pull/2320) [`6656342b`](https://github.com/marigold-ui/marigold/commit/6656342b3622e4ad7fda47d11d38035228c779bf) Thanks [@sebald](https://github.com/sebald)! - fix: remove deprecated type from `<Aside>`

* [#2319](https://github.com/marigold-ui/marigold/pull/2319) [`7a43970e`](https://github.com/marigold-ui/marigold/commit/7a43970e4c32d74754722b8a8c24117ef4888a0e) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react-aria

- [#2272](https://github.com/marigold-ui/marigold/pull/2272) [`fb9df312`](https://github.com/marigold-ui/marigold/commit/fb9df312e50a5d4be27a528e339f0d2c5768324d) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update testing

- Updated dependencies [[`13695db8`](https://github.com/marigold-ui/marigold/commit/13695db8db0d057afa68e1f93ad499c1096d969a), [`32353f56`](https://github.com/marigold-ui/marigold/commit/32353f56728ddc02e8b4ec848184b7dc5e5f9d19), [`4c63400f`](https://github.com/marigold-ui/marigold/commit/4c63400fef291181f29f994c7f8a8b020772cbee), [`f4f308e4`](https://github.com/marigold-ui/marigold/commit/f4f308e4ce390cf1a4f055042498fe6787dd6879), [`8e9ea3da`](https://github.com/marigold-ui/marigold/commit/8e9ea3daaa0b3ea666394badabcfc3e76eba5512), [`406f186c`](https://github.com/marigold-ui/marigold/commit/406f186c7f91cebbf3d17795361807e902a4dfab), [`88a3d4b0`](https://github.com/marigold-ui/marigold/commit/88a3d4b030e67e46a4af429b01a884195601b7a2), [`997ccfc1`](https://github.com/marigold-ui/marigold/commit/997ccfc1814a87b9f6b8b4f3716c88ec47554da2)]:
  - @marigold/icons@1.0.0
  - @marigold/tokens@3.1.0
  - @marigold/system@2.0.0

## 1.3.0

### Minor Changes

- [#2236](https://github.com/marigold-ui/marigold/pull/2236) [`a5b7e876`](https://github.com/marigold-ui/marigold/commit/a5b7e876c3a70351fc7fac889af9f89a1ab25f8c) Thanks [@sebald](https://github.com/sebald)! - feat: improve styling options of <List>

* [#2209](https://github.com/marigold-ui/marigold/pull/2209) [`c346ef60`](https://github.com/marigold-ui/marigold/commit/c346ef60aa4d64e66645ef5966fdf327a1d8337e) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: support forwarding refs in `<Link>`

- [#2233](https://github.com/marigold-ui/marigold/pull/2233) [`3adfdeea`](https://github.com/marigold-ui/marigold/commit/3adfdeea7bb962b1d4241b4d05b8ff51fa65b584) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce `<List>` component

### Patch Changes

- [#2211](https://github.com/marigold-ui/marigold/pull/2211) [`527b222f`](https://github.com/marigold-ui/marigold/commit/527b222f1776c30ffb887c72cef2c58b2392309c) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: next link component

- Updated dependencies [[`c60f8527`](https://github.com/marigold-ui/marigold/commit/c60f8527cc4d61c3b7d8eeb2ec29a0cd7679e8dc)]:
  - @marigold/system@1.3.0
  - @marigold/icons@0.7.7

## 1.2.2

### Patch Changes

- [#2177](https://github.com/marigold-ui/marigold/pull/2177) [`51132dd8`](https://github.com/marigold-ui/marigold/commit/51132dd83ead1b5b5a89b1281ba1a2c2d4e17f04) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react-aria

- Updated dependencies []:
  - @marigold/system@1.2.2
  - @marigold/icons@0.7.6

## 1.2.1

### Patch Changes

- [#2164](https://github.com/marigold-ui/marigold/pull/2164) [`b43464fc`](https://github.com/marigold-ui/marigold/commit/b43464fce6f7e2662b27313c6f74190e8c0f540f) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: update to React 18

- Updated dependencies [[`b43464fc`](https://github.com/marigold-ui/marigold/commit/b43464fce6f7e2662b27313c6f74190e8c0f540f)]:
  - @marigold/icons@0.7.5
  - @marigold/system@1.2.1
  - @marigold/types@0.5.2

## 1.2.0

### Minor Changes

- [#2147](https://github.com/marigold-ui/marigold/pull/2147) [`2e688960`](https://github.com/marigold-ui/marigold/commit/2e6889600f9c2e50e58e928e09dadd61c5488fd8) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref for `<FieldText>`

* [#2151](https://github.com/marigold-ui/marigold/pull/2151) [`1e512a48`](https://github.com/marigold-ui/marigold/commit/1e512a480bd9784525241fef7874c9e37c67d3e8) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref for `<Slider>`

- [#2144](https://github.com/marigold-ui/marigold/pull/2144) [`82c376a9`](https://github.com/marigold-ui/marigold/commit/82c376a9c34c69104456e6e356231132f53c3efe) Thanks [@sebald](https://github.com/sebald)! - feat: Improve usage of Marigold when not used as a full page app

* [#2149](https://github.com/marigold-ui/marigold/pull/2149) [`1a0070a4`](https://github.com/marigold-ui/marigold/commit/1a0070a437304cb0ebc9a2a0e30082ba8deee821) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref for `<Radio>`

- [#2148](https://github.com/marigold-ui/marigold/pull/2148) [`33c54b37`](https://github.com/marigold-ui/marigold/commit/33c54b37cd96b232c2f81a38af64143be4b02283) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref for `<TextArea>`

* [#2150](https://github.com/marigold-ui/marigold/pull/2150) [`8f3c3e1b`](https://github.com/marigold-ui/marigold/commit/8f3c3e1b92eed5e432667ae8dae0a5f26a6dea3f) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref for `<Select>``

- [#2146](https://github.com/marigold-ui/marigold/pull/2146) [`9e6e0671`](https://github.com/marigold-ui/marigold/commit/9e6e0671908491566ac9d5a2f1f316145e7c2d6a) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref of `<Checkbox>`

### Patch Changes

- [#2152](https://github.com/marigold-ui/marigold/pull/2152) [`8980b645`](https://github.com/marigold-ui/marigold/commit/8980b64518f792c837776aea817e422ea0e3d658) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref for `<Switch>`

- Updated dependencies [[`82c376a9`](https://github.com/marigold-ui/marigold/commit/82c376a9c34c69104456e6e356231132f53c3efe)]:
  - @marigold/system@1.2.0
  - @marigold/icons@0.7.4

## 1.1.1

### Patch Changes

- Updated dependencies []:
  - @marigold/system@1.1.1
  - @marigold/icons@0.7.3

## 1.1.0

### Minor Changes

- [#2106](https://github.com/marigold-ui/marigold/pull/2106) [`d0b3abfe`](https://github.com/marigold-ui/marigold/commit/d0b3abfe218e7b6d8b0d943836b4b17c0551a785) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce `<Split>` component for `<Inline>` and `<Stack>`

* [#2116](https://github.com/marigold-ui/marigold/pull/2116) [`16f1459c`](https://github.com/marigold-ui/marigold/commit/16f1459c9bc19402b960fe8edb8662b632b1e583) Thanks [@sebald](https://github.com/sebald)! - feat: Add option to stretch `<Table>`

### Patch Changes

- [#2113](https://github.com/marigold-ui/marigold/pull/2113) [`5a32c4b4`](https://github.com/marigold-ui/marigold/commit/5a32c4b49482c961f93f0db74cfbdf083329ba1e) Thanks [@sebald](https://github.com/sebald)! - feat: Show sorting in `<Table>`

- Updated dependencies []:
  - @marigold/system@1.1.0
  - @marigold/icons@0.7.2

## 1.0.1

### Patch Changes

- [#2103](https://github.com/marigold-ui/marigold/pull/2103) [`68921616`](https://github.com/marigold-ui/marigold/commit/6892161681c8673dd94af8bbd4312f73a125cc68) Thanks [@sebald](https://github.com/sebald)! - fix: `Textarea` allows to set rows via prop

* [#2101](https://github.com/marigold-ui/marigold/pull/2101) [`52fdb7d2`](https://github.com/marigold-ui/marigold/commit/52fdb7d2d5ebf220b1800e639693276af62eb70e) Thanks [@sebald](https://github.com/sebald)! - fix: add `size` prop to `<Image>`

- [#2102](https://github.com/marigold-ui/marigold/pull/2102) [`23c1a5ce`](https://github.com/marigold-ui/marigold/commit/23c1a5cece356465f07b7206a0fe0f65512f3350) Thanks [@sebald](https://github.com/sebald)! - feat: Remove all occurances of `React.FC`

- Updated dependencies [[`23c1a5ce`](https://github.com/marigold-ui/marigold/commit/23c1a5cece356465f07b7206a0fe0f65512f3350), [`bfa0caea`](https://github.com/marigold-ui/marigold/commit/bfa0caeac9fdb817ceed7ee30dbcce0819460f30)]:
  - @marigold/system@1.0.1
  - @marigold/types@0.5.1
  - @marigold/icons@0.7.1

## 1.0.0

### Major Changes

- [#2096](https://github.com/marigold-ui/marigold/pull/2096) [`a41bb8a3`](https://github.com/marigold-ui/marigold/commit/a41bb8a39ace6006bfc2351f6d4649305bc1d286) Thanks [@sebald](https://github.com/sebald)! - feat: <Stack> can align on x and y axis

* [#2081](https://github.com/marigold-ui/marigold/pull/2081) [`93429e12`](https://github.com/marigold-ui/marigold/commit/93429e12e1f31c85fec0d92efd2a7b0013809b41) Thanks [@sebald](https://github.com/sebald)! - refa: separate selection/regular cell + use <Checkbox>

- [#2053](https://github.com/marigold-ui/marigold/pull/2053) [`759abe94`](https://github.com/marigold-ui/marigold/commit/759abe94648f7935723cfb47e2097ba918ce1255) Thanks [@sebald](https://github.com/sebald)! - refa: <Dialog>

* [#2054](https://github.com/marigold-ui/marigold/pull/2054) [`3c86c3b7`](https://github.com/marigold-ui/marigold/commit/3c86c3b7399a525c2743a1a42b806f862b050cd3) Thanks [@sebald](https://github.com/sebald)! - refa: Move &lt;Label&gt; and &lt;HelpText&gt; to components root

- [#2069](https://github.com/marigold-ui/marigold/pull/2069) [`c35afcf2`](https://github.com/marigold-ui/marigold/commit/c35afcf21c10bb043041e56e91f954efc2083eff) Thanks [@sebald](https://github.com/sebald)! - refa: `<Tooltip>`

  - with arrow pointer yay!
  - allows to change placement
  - uses `useComponentStyles`

* [#2092](https://github.com/marigold-ui/marigold/pull/2092) [`4d6da0bb`](https://github.com/marigold-ui/marigold/commit/4d6da0bb8171be6a2cacaa5caea4fc1e11043345) Thanks [@sebald](https://github.com/sebald)! - feat: <Inline> can align on x and y axis

- [#2074](https://github.com/marigold-ui/marigold/pull/2074) [`3aa2c100`](https://github.com/marigold-ui/marigold/commit/3aa2c100fce8884cf0e1ae8e848516923f0d8456) Thanks [@sebald](https://github.com/sebald)! - refa: Remove "variant" prop from <Box>, use `useComponentStyles` instead

### Minor Changes

- [#2029](https://github.com/marigold-ui/marigold/pull/2029) [`bbe8ad99`](https://github.com/marigold-ui/marigold/commit/bbe8ad99f64cea5cc25fa19bb7705c3f9f1b7104) Thanks [@sebald](https://github.com/sebald)! - feat: Accessible <Radio> and <RadioGroup>

* [#2036](https://github.com/marigold-ui/marigold/pull/2036) [`819dab0b`](https://github.com/marigold-ui/marigold/commit/819dab0bfe549f7fb6156cdb9938595ccbe32439) Thanks [@ti10le](https://github.com/ti10le)! - refa: remove align prop from Table

- [#2048](https://github.com/marigold-ui/marigold/pull/2048) [`2ab80ae6`](https://github.com/marigold-ui/marigold/commit/2ab80ae677be0785cfa6e2bdf9f7ff2f3d38baec) Thanks [@sebald](https://github.com/sebald)! - refa: <Select>

* [#2052](https://github.com/marigold-ui/marigold/pull/2052) [`bf12129c`](https://github.com/marigold-ui/marigold/commit/bf12129c6d5d21bf372fd6ee7e3a28f6a03326c9) Thanks [@sebald](https://github.com/sebald)! - refa: Remove <ValidationMessage>

- [#2034](https://github.com/marigold-ui/marigold/pull/2034) [`f761f1ef`](https://github.com/marigold-ui/marigold/commit/f761f1ef65a826eb8c70da2fa03e5caf3393c3b9) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Slider rewrite with react-aria and new styling

* [#2056](https://github.com/marigold-ui/marigold/pull/2056) [`3abbc813`](https://github.com/marigold-ui/marigold/commit/3abbc8130c8b5156f3ca62f237dd59278354eb7c) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce <NumberFields>

- [#2025](https://github.com/marigold-ui/marigold/pull/2025) [`2b5a0967`](https://github.com/marigold-ui/marigold/commit/2b5a0967707534a1650f1258bebdd176c934dedc) Thanks [@sebald](https://github.com/sebald)! - fix: <TextField>/<TextArea> support variant/size

* [#2070](https://github.com/marigold-ui/marigold/pull/2070) [`a4117230`](https://github.com/marigold-ui/marigold/commit/a4117230928f640938f4ce69098bb665b90fe194) Thanks [@sebald](https://github.com/sebald)! - feat: Add `width` prop to fields to control width

### Patch Changes

- [#2043](https://github.com/marigold-ui/marigold/pull/2043) [`6a369f5f`](https://github.com/marigold-ui/marigold/commit/6a369f5f8e9f637e8aa9a560e63443e3d821c075) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Message new styling

* [#2079](https://github.com/marigold-ui/marigold/pull/2079) [`04db9229`](https://github.com/marigold-ui/marigold/commit/04db922957c8731ea952ce123e6d63a15ec02a93) Thanks [@sebald](https://github.com/sebald)! - fix: Indeterminate is visual only + correctly render with checkbox only

- [#2049](https://github.com/marigold-ui/marigold/pull/2049) [`5f64c882`](https://github.com/marigold-ui/marigold/commit/5f64c88286c7248e881a7f5548aba2afbe82f728) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: switch with new styling

- Updated dependencies [[`a41bb8a3`](https://github.com/marigold-ui/marigold/commit/a41bb8a39ace6006bfc2351f6d4649305bc1d286), [`02d13e84`](https://github.com/marigold-ui/marigold/commit/02d13e84a27ac075587f7278c8c858aeee884f64), [`6a369f5f`](https://github.com/marigold-ui/marigold/commit/6a369f5f8e9f637e8aa9a560e63443e3d821c075), [`2ab80ae6`](https://github.com/marigold-ui/marigold/commit/2ab80ae677be0785cfa6e2bdf9f7ff2f3d38baec), [`f5128944`](https://github.com/marigold-ui/marigold/commit/f512894439dff2b5769fe2e5aa23f61a28b3d14e), [`3abbc813`](https://github.com/marigold-ui/marigold/commit/3abbc8130c8b5156f3ca62f237dd59278354eb7c), [`3aa2c100`](https://github.com/marigold-ui/marigold/commit/3aa2c100fce8884cf0e1ae8e848516923f0d8456)]:
  - @marigold/tokens@3.0.0
  - @marigold/system@1.0.0
  - @marigold/types@0.5.0
  - @marigold/icons@0.7.0

## 1.0.0-beta.0

### Major Changes

- [#2053](https://github.com/marigold-ui/marigold/pull/2053) [`759abe94`](https://github.com/marigold-ui/marigold/commit/759abe94648f7935723cfb47e2097ba918ce1255) Thanks [@sebald](https://github.com/sebald)! - refa: <Dialog>

* [#2054](https://github.com/marigold-ui/marigold/pull/2054) [`3c86c3b7`](https://github.com/marigold-ui/marigold/commit/3c86c3b7399a525c2743a1a42b806f862b050cd3) Thanks [@sebald](https://github.com/sebald)! - refa: Move &lt;Label&gt; and &lt;HelpText&gt; to components root

### Minor Changes

- [#2029](https://github.com/marigold-ui/marigold/pull/2029) [`bbe8ad99`](https://github.com/marigold-ui/marigold/commit/bbe8ad99f64cea5cc25fa19bb7705c3f9f1b7104) Thanks [@sebald](https://github.com/sebald)! - feat: Accessible <Radio> and <RadioGroup>

* [#2036](https://github.com/marigold-ui/marigold/pull/2036) [`819dab0b`](https://github.com/marigold-ui/marigold/commit/819dab0bfe549f7fb6156cdb9938595ccbe32439) Thanks [@ti10le](https://github.com/ti10le)! - refa: remove align prop from Table

- [#2048](https://github.com/marigold-ui/marigold/pull/2048) [`2ab80ae6`](https://github.com/marigold-ui/marigold/commit/2ab80ae677be0785cfa6e2bdf9f7ff2f3d38baec) Thanks [@sebald](https://github.com/sebald)! - refa: <Select>

* [#2052](https://github.com/marigold-ui/marigold/pull/2052) [`bf12129c`](https://github.com/marigold-ui/marigold/commit/bf12129c6d5d21bf372fd6ee7e3a28f6a03326c9) Thanks [@sebald](https://github.com/sebald)! - refa: Remove <ValidationMessage>

- [#2034](https://github.com/marigold-ui/marigold/pull/2034) [`f761f1ef`](https://github.com/marigold-ui/marigold/commit/f761f1ef65a826eb8c70da2fa03e5caf3393c3b9) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Slider rewrite with react-aria and new styling

* [#2056](https://github.com/marigold-ui/marigold/pull/2056) [`3abbc813`](https://github.com/marigold-ui/marigold/commit/3abbc8130c8b5156f3ca62f237dd59278354eb7c) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce <NumberFields>

- [#2025](https://github.com/marigold-ui/marigold/pull/2025) [`2b5a0967`](https://github.com/marigold-ui/marigold/commit/2b5a0967707534a1650f1258bebdd176c934dedc) Thanks [@sebald](https://github.com/sebald)! - fix: <TextField>/<TextArea> support variant/size

### Patch Changes

- [#2043](https://github.com/marigold-ui/marigold/pull/2043) [`6a369f5f`](https://github.com/marigold-ui/marigold/commit/6a369f5f8e9f637e8aa9a560e63443e3d821c075) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Message new styling

* [#2049](https://github.com/marigold-ui/marigold/pull/2049) [`5f64c882`](https://github.com/marigold-ui/marigold/commit/5f64c88286c7248e881a7f5548aba2afbe82f728) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: switch with new styling

* Updated dependencies [[`02d13e84`](https://github.com/marigold-ui/marigold/commit/02d13e84a27ac075587f7278c8c858aeee884f64), [`6a369f5f`](https://github.com/marigold-ui/marigold/commit/6a369f5f8e9f637e8aa9a560e63443e3d821c075), [`2ab80ae6`](https://github.com/marigold-ui/marigold/commit/2ab80ae677be0785cfa6e2bdf9f7ff2f3d38baec), [`f5128944`](https://github.com/marigold-ui/marigold/commit/f512894439dff2b5769fe2e5aa23f61a28b3d14e), [`3abbc813`](https://github.com/marigold-ui/marigold/commit/3abbc8130c8b5156f3ca62f237dd59278354eb7c)]:
  - @marigold/system@1.0.0-beta.0
  - @marigold/types@0.5.0-beta.0
  - @marigold/icons@0.7.0-beta.0

## 0.9.0

### Minor Changes

- [#2016](https://github.com/marigold-ui/marigold/pull/2016) [`d79a590a`](https://github.com/marigold-ui/marigold/commit/d79a590aeb7dcbda23ddb40e3f712385c2b11da0) Thanks [@sebald](https://github.com/sebald)! - refa: <Checkbox> and <CheckboxGroup>

* [#1987](https://github.com/marigold-ui/marigold/pull/1987) [`cc149c9a`](https://github.com/marigold-ui/marigold/commit/cc149c9aaaf11f78a58f0c6d51bc9f12720f18a4) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): introduce Table component v1

- [#1963](https://github.com/marigold-ui/marigold/pull/1963) [`872c7413`](https://github.com/marigold-ui/marigold/commit/872c7413f7dca317fc048437634c78d909cefd15) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce a new input for text `<TextField>`

* [#1964](https://github.com/marigold-ui/marigold/pull/1964) [`08ee4bf5`](https://github.com/marigold-ui/marigold/commit/08ee4bf520779e1696b18d2959bed89e0bac2d39) Thanks [@sebald](https://github.com/sebald)! - refa: Use `<Field>` in `<TextArea>`

- [#1997](https://github.com/marigold-ui/marigold/pull/1997) [`37d2fd69`](https://github.com/marigold-ui/marigold/commit/37d2fd69aafedd288490410dc56be1ede43bd41d) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: New component <Content>

### Patch Changes

- [#2000](https://github.com/marigold-ui/marigold/pull/2000) [`121e2b3a`](https://github.com/marigold-ui/marigold/commit/121e2b3aa2fd1d87c534c92a9665678abe031d20) Thanks [@sebald](https://github.com/sebald)! - refa: remove unsued elements from <Aspect>

* [#2017](https://github.com/marigold-ui/marigold/pull/2017) [`5dfe5f88`](https://github.com/marigold-ui/marigold/commit/5dfe5f8869c7cd9f5ca912575990b211ee9d3a69) Thanks [@sarahgm](https://github.com/sarahgm)! - Button restructure

- [#1991](https://github.com/marigold-ui/marigold/pull/1991) [`37b3b0e9`](https://github.com/marigold-ui/marigold/commit/37b3b0e93bc12ff93946a314d6128b2c50089157) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: textarea restructure styles

* [#2018](https://github.com/marigold-ui/marigold/pull/2018) [`6e4f52cf`](https://github.com/marigold-ui/marigold/commit/6e4f52cf1f6d74d5c6464feab642187e5c9c2720) Thanks [@sarahgm](https://github.com/sarahgm)! - Menu component restructure

- [#2013](https://github.com/marigold-ui/marigold/pull/2013) [`f6c3263f`](https://github.com/marigold-ui/marigold/commit/f6c3263fc327478372069b7a3d6352e151af930c) Thanks [@sarahgm](https://github.com/sarahgm)! - feat:Footer component

* [#1999](https://github.com/marigold-ui/marigold/pull/1999) [`413df088`](https://github.com/marigold-ui/marigold/commit/413df088ed497a3dfb4221c31a1b68245f43e984) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: divider restructure

- [#2008](https://github.com/marigold-ui/marigold/pull/2008) [`4ff1e2b6`](https://github.com/marigold-ui/marigold/commit/4ff1e2b6e668db90cfb7e2d04d9365c80dbf4cc2) Thanks [@sebald](https://github.com/sebald)! - refa: <Checkbox> (uses new styling)

* [#1992](https://github.com/marigold-ui/marigold/pull/1992) [`59f3e6f3`](https://github.com/marigold-ui/marigold/commit/59f3e6f31c00c422bc95b25fb0faf1b77bc9a273) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Link styles

- [#1990](https://github.com/marigold-ui/marigold/pull/1990) [`a98ddc11`](https://github.com/marigold-ui/marigold/commit/a98ddc11076150886d4384cc7a7e7cc12f4c2494) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Input Component restyled and restructure

* [#1994](https://github.com/marigold-ui/marigold/pull/1994) [`3dff2282`](https://github.com/marigold-ui/marigold/commit/3dff2282b75ca91547f478f3305b138d1d409670) Thanks [@sarahgm](https://github.com/sarahgm)! - Refa: card-styles-structur

- [#1982](https://github.com/marigold-ui/marigold/pull/1982) [`7fc15cb7`](https://github.com/marigold-ui/marigold/commit/7fc15cb7624b5ccb8c282f238fa6954947789731) Thanks [@sebald](https://github.com/sebald)! - refa: Badge uses new styling solution

* [#1988](https://github.com/marigold-ui/marigold/pull/1988) [`7c1129dc`](https://github.com/marigold-ui/marigold/commit/7c1129dc140d435e5312f80a57fd48f8498c33ee) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Field Component restructure

- [#2001](https://github.com/marigold-ui/marigold/pull/2001) [`b3246070`](https://github.com/marigold-ui/marigold/commit/b3246070c7bd3dcadb28e30140aead330a6b9ff1) Thanks [@sebald](https://github.com/sebald)! - refa: Use <Headline> instead of <Text>

* [#2014](https://github.com/marigold-ui/marigold/pull/2014) [`cc01f7dc`](https://github.com/marigold-ui/marigold/commit/cc01f7dc5e9aae665511374b1352efa9f2c942bf) Thanks [@sarahgm](https://github.com/sarahgm)! - Text component restructure

- [#2012](https://github.com/marigold-ui/marigold/pull/2012) [`f0ec4333`](https://github.com/marigold-ui/marigold/commit/f0ec433306319e6ed948bfa573a18aad6c41906c) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: Header component

* [#1998](https://github.com/marigold-ui/marigold/pull/1998) [`6dd92ad6`](https://github.com/marigold-ui/marigold/commit/6dd92ad6e8ecc8bbf3d578413bd2b2c5fbe5a6f8) Thanks [@sarahgm](https://github.com/sarahgm)! - feat(comp): headline component

- [#1984](https://github.com/marigold-ui/marigold/pull/1984) [`733f5488`](https://github.com/marigold-ui/marigold/commit/733f54887393503fbdeb4fb6803d3bd267ec6138) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Image new styling solution

- Updated dependencies [[`424f1705`](https://github.com/marigold-ui/marigold/commit/424f1705159d7a03dce368adadbae152acc80687), [`dbc55934`](https://github.com/marigold-ui/marigold/commit/dbc55934775a6c2362525f0078ecf1595475ddc8), [`3dff2282`](https://github.com/marigold-ui/marigold/commit/3dff2282b75ca91547f478f3305b138d1d409670), [`7c1129dc`](https://github.com/marigold-ui/marigold/commit/7c1129dc140d435e5312f80a57fd48f8498c33ee)]:
  - @marigold/system@0.9.0
  - @marigold/types@0.4.1
  - @marigold/icons@0.6.1

## 0.8.0

### Minor Changes

- [#1928](https://github.com/marigold-ui/marigold/pull/1928) [`059e9324`](https://github.com/marigold-ui/marigold/commit/059e9324375b0dc67fef6ac84b65f997a930a345) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): improve Container component

* [#1892](https://github.com/marigold-ui/marigold/pull/1892) [`a91171f9`](https://github.com/marigold-ui/marigold/commit/a91171f96d0eed696f988e4fc45c13757ea1971e) Thanks [@sebald](https://github.com/sebald)! - feat(components): Normalize link variant

- [#1937](https://github.com/marigold-ui/marigold/pull/1937) [`a1f4796f`](https://github.com/marigold-ui/marigold/commit/a1f4796fafe476154e8e03cd4a336e5266a8950d) Thanks [@sebald](https://github.com/sebald)! - refa: Redo `<Field>` now called `<TextField>`

* [#1919](https://github.com/marigold-ui/marigold/pull/1919) [`5319745c`](https://github.com/marigold-ui/marigold/commit/5319745cbc20919a423dda49f4fb8ac4608009e1) Thanks [@sebald](https://github.com/sebald)! - feat: SVG supports size token from theme

- [#1930](https://github.com/marigold-ui/marigold/pull/1930) [`249b0c81`](https://github.com/marigold-ui/marigold/commit/249b0c81a5889e558d85e8f9214afa0897368dd8) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Introduce Breakout component

* [#1898](https://github.com/marigold-ui/marigold/pull/1898) [`3cf378e9`](https://github.com/marigold-ui/marigold/commit/3cf378e9c80f700e78eaafcfc0701a20e29e37d0) Thanks [@sebald](https://github.com/sebald)! - feat: `<Stack>` supports rendering as list

- [#1925](https://github.com/marigold-ui/marigold/pull/1925) [`e3d62a22`](https://github.com/marigold-ui/marigold/commit/e3d62a22fdc42c394516d477ad8d477ae02bff1e) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Rewrite Columns and remove Column

* [#1870](https://github.com/marigold-ui/marigold/pull/1870) [`e94a08d7`](https://github.com/marigold-ui/marigold/commit/e94a08d76d036754aa9237ee5b1ef52fb93aadab) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Center component

### Patch Changes

- [#1926](https://github.com/marigold-ui/marigold/pull/1926) [`5e5e0fcc`](https://github.com/marigold-ui/marigold/commit/5e5e0fcc45aadf62f8c3b33e722e9132a7267cbc) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Container with grid

- Updated dependencies [[`382ac6cc`](https://github.com/marigold-ui/marigold/commit/382ac6cca1865d033ba601ad269247f26ee0a13e), [`2f45aa5d`](https://github.com/marigold-ui/marigold/commit/2f45aa5d236f861ab8187a4a574a7113d6c1f1b8), [`5319745c`](https://github.com/marigold-ui/marigold/commit/5319745cbc20919a423dda49f4fb8ac4608009e1), [`74c91e28`](https://github.com/marigold-ui/marigold/commit/74c91e289ffadfc082a548fc55ab9bd315ac1d8a)]:
  - @marigold/system@0.8.0
  - @marigold/icons@0.6.0
  - @marigold/tokens@2.0.0

## 0.7.0

### Minor Changes

- [#1882](https://github.com/marigold-ui/marigold/pull/1882) [`d436930f`](https://github.com/marigold-ui/marigold/commit/d436930f7d88b572c4365a442a0914bba1147657) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): introduce Tiles component

* [#1881](https://github.com/marigold-ui/marigold/pull/1881) [`d2c3eb50`](https://github.com/marigold-ui/marigold/commit/d2c3eb50ceb9941926e7e658dcba7a74cb87e6d7) Thanks [@ti10le](https://github.com/ti10le)! - Component: Aspect

- [#1868](https://github.com/marigold-ui/marigold/pull/1868) [`ec4f8f22`](https://github.com/marigold-ui/marigold/commit/ec4f8f228f05e88f2b9f17784b59f3cfc8ceabe7) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): renew Container component

### Patch Changes

- Updated dependencies [[`af566de4`](https://github.com/marigold-ui/marigold/commit/af566de483e80bfedcd09b073be8559eebf17fca)]:
  - @marigold/tokens@1.0.0
  - @marigold/system@0.7.0
  - @marigold/icons@0.5.1

## 0.6.0

### Minor Changes

- [#1819](https://github.com/marigold-ui/marigold/pull/1819) [`d162a6a8`](https://github.com/marigold-ui/marigold/commit/d162a6a8d1f9d99bfc08d59f6dae294a6fa95310) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): add new Component Switch

* [#1842](https://github.com/marigold-ui/marigold/pull/1842) [`e053b7b9`](https://github.com/marigold-ui/marigold/commit/e053b7b903f02c56cf10e6b9aecbedd29399895d) Thanks [@ti10le](https://github.com/ti10le)! - feat: extend svg fill prop to handle theme color

- [#1822](https://github.com/marigold-ui/marigold/pull/1822) [`527ba94f`](https://github.com/marigold-ui/marigold/commit/527ba94fa1a3255dc6f846fcc9def978ec906bf3) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp/docs): Alert update variant + docs

* [#1807](https://github.com/marigold-ui/marigold/pull/1807) [`b55e10bc`](https://github.com/marigold-ui/marigold/commit/b55e10bc7119554373d43f9d8872346c1e6d6c39) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): add Tooltip component v1

- [#1851](https://github.com/marigold-ui/marigold/pull/1851) [`9a95a6f5`](https://github.com/marigold-ui/marigold/commit/9a95a6f541dec34e27eac8557186f929e811c07c) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): make Inline accepting fragment + standard text

* [#1820](https://github.com/marigold-ui/marigold/pull/1820) [`f62033b6`](https://github.com/marigold-ui/marigold/commit/f62033b642a623a75f311af701febc4b54f77120) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Checkbox add indeterminated state + doc update

### Patch Changes

- [#1849](https://github.com/marigold-ui/marigold/pull/1849) [`21f72b34`](https://github.com/marigold-ui/marigold/commit/21f72b3499c7ed2f88a0b96315f0374140e98e85) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: remove Alert

* [#1852](https://github.com/marigold-ui/marigold/pull/1852) [`25c8675e`](https://github.com/marigold-ui/marigold/commit/25c8675ed470cc71f8f968a83b9781b66412c493) Thanks [@ti10le](https://github.com/ti10le)! - refa(comp): fill prop instead of css or \_\_basCSS

* Updated dependencies [[`4cc0ad3b`](https://github.com/marigold-ui/marigold/commit/4cc0ad3b85b993e01b4d85b6f30b1a81cdee2351), [`64b9089e`](https://github.com/marigold-ui/marigold/commit/64b9089ed2e1e35975472e342b02cda40f5de66f), [`539d4198`](https://github.com/marigold-ui/marigold/commit/539d41987118db125ee37a4a83231335ea15830a), [`e053b7b9`](https://github.com/marigold-ui/marigold/commit/e053b7b903f02c56cf10e6b9aecbedd29399895d)]:
  - @marigold/system@0.6.0
  - @marigold/icons@0.5.0

## 0.5.1

### Patch Changes

- [#1795](https://github.com/marigold-ui/marigold/pull/1795) [`a178eafe`](https://github.com/marigold-ui/marigold/commit/a178eafe8c8380ee23b4587d953ee52b231414ff) Thanks [@ti10le](https://github.com/ti10le)! - refa: use interface instead of type

* [#1798](https://github.com/marigold-ui/marigold/pull/1798) [`9939b743`](https://github.com/marigold-ui/marigold/commit/9939b743df4dfe40bfd5dd61a1a4b88641ef9559) Thanks [@sebald](https://github.com/sebald)! - fix(components): Use own `flattenChildren` helper to fix ESM build

* Updated dependencies [[`a178eafe`](https://github.com/marigold-ui/marigold/commit/a178eafe8c8380ee23b4587d953ee52b231414ff)]:
  - @marigold/system@0.5.1
  - @marigold/icons@0.4.2

## 0.5.0

### Minor Changes

- [#1784](https://github.com/marigold-ui/marigold/pull/1784) [`99af3b37`](https://github.com/marigold-ui/marigold/commit/99af3b37de24599138777ed90de0445571c3095e) Thanks [@ti10le](https://github.com/ti10le)! - refa(comp): use interface instead of type

* [#1727](https://github.com/marigold-ui/marigold/pull/1727) [`026300b1`](https://github.com/marigold-ui/marigold/commit/026300b1b539b57785c0eb0282a3d3fd763194bc) Thanks [@sebald](https://github.com/sebald)! - feat(components): <Text> add possibility to change font size via style props

### Patch Changes

- [#1774](https://github.com/marigold-ui/marigold/pull/1774) [`93480b63`](https://github.com/marigold-ui/marigold/commit/93480b6333a4d6231db35dbf12de5726533ebfc8) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove label prop and add children + refa

* [#1775](https://github.com/marigold-ui/marigold/pull/1775) [`6da8eba2`](https://github.com/marigold-ui/marigold/commit/6da8eba28c518c75758180697e5f0f5e5989c1f4) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Checkbox remove label prop and add children + refa

* Updated dependencies [[`5936de75`](https://github.com/marigold-ui/marigold/commit/5936de75e5a0134584438117c53c5edfe15c6c5d)]:
  - @marigold/system@0.5.0
  - @marigold/icons@0.4.1

## 0.4.0

### Minor Changes

- [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942) Thanks [@sebald](https://github.com/sebald)! - chore: Use `tsup` to build packages

* [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942) Thanks [@sebald](https://github.com/sebald)! - Improved size in node_modules

### Patch Changes

- [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942) Thanks [@sebald](https://github.com/sebald)! - feat(comp): Rewrite Textarea with react-aria

* [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942) Thanks [@sebald](https://github.com/sebald)! - feat(comp): rewrite Field component with react-aria

* Updated dependencies [[`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942), [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942)]:
  - @marigold/icons@0.4.0
  - @marigold/system@0.4.0
  - @marigold/types@0.4.0

## 0.3.2

### Patch Changes

- [#1701](https://github.com/marigold-ui/marigold/pull/1701) [`45b05af2`](https://github.com/marigold-ui/marigold/commit/45b05af2d93eb21d50ed21363d7177d9161865be) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): rewrite Divider and add react-aria

## 0.3.1

### Patch Changes

- [#1634](https://github.com/marigold-ui/marigold/pull/1634) [`26ff3618`](https://github.com/marigold-ui/marigold/commit/26ff361822fe31d466bfeae988b0193ac5999f3b) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Radio component rewrite

* [#1676](https://github.com/marigold-ui/marigold/pull/1676) [`379041bc`](https://github.com/marigold-ui/marigold/commit/379041bc7d4502bca98029a95afe43ce693222cd) Thanks [@ti10le](https://github.com/ti10le)! - remove the last mdx stories

* Updated dependencies [[`379041bc`](https://github.com/marigold-ui/marigold/commit/379041bc7d4502bca98029a95afe43ce693222cd)]:
  - @marigold/icons@0.3.1
  - @marigold/system@0.3.1

## 0.3.0

### Patch Changes

- [#1269](https://github.com/marigold-ui/marigold/pull/1269) [`ebb704dd`](https://github.com/marigold-ui/marigold/commit/ebb704dd5fe1697482220face07bd4390ab34293) Thanks [@ti10le](https://github.com/ti10le)! - feature: section to select component

* [#1189](https://github.com/marigold-ui/marigold/pull/1189) [`be8dc989`](https://github.com/marigold-ui/marigold/commit/be8dc989a418884fe12b0c772db71d10657a661d) Thanks [@sebald](https://github.com/sebald)! - feat(components): <Stack> correctly uses whitespace and supports usage as list

- [#1378](https://github.com/marigold-ui/marigold/pull/1378) [`b0c967de`](https://github.com/marigold-ui/marigold/commit/b0c967de1097de50ff4de4c3b14a5bd6e236319b) Thanks [@ti10le](https://github.com/ti10le)! - feature: Textarea - make error boolean and add errorMessage

* [#1510](https://github.com/marigold-ui/marigold/pull/1510) [`a9b8b083`](https://github.com/marigold-ui/marigold/commit/a9b8b08316c0e9bf1308e64c78eb1ecc81f8febf) Thanks [@ti10le](https://github.com/ti10le)! - refa(comp): Stack

- [#1515](https://github.com/marigold-ui/marigold/pull/1515) [`8eda245f`](https://github.com/marigold-ui/marigold/commit/8eda245f01a918fcdaa9f0ac211889ed869aa375) Thanks [@sebald](https://github.com/sebald)! - feat: add normalization for body and html & fix emotion leak

* [#1651](https://github.com/marigold-ui/marigold/pull/1651) [`4452b39c`](https://github.com/marigold-ui/marigold/commit/4452b39c822fa82671530e4c475c0cf1df967c60) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Checkbox component rewrite

- [#1316](https://github.com/marigold-ui/marigold/pull/1316) [`edfec8d9`](https://github.com/marigold-ui/marigold/commit/edfec8d9a7a4e4a0e45cc912838789804c0cace1) Thanks [@ti10le](https://github.com/ti10le)! - aria-label for all usages of select component
  use SSR Provider which is exported from package components/Provider in Gatsby wrapper

* [#1440](https://github.com/marigold-ui/marigold/pull/1440) [`c1da52c0`](https://github.com/marigold-ui/marigold/commit/c1da52c0f035b141608fd606e6ba3bc2b5482dc1) Thanks [@ti10le](https://github.com/ti10le)! - feature: use Element in Box + necessary fix changes

- [#1658](https://github.com/marigold-ui/marigold/pull/1658) [`af485505`](https://github.com/marigold-ui/marigold/commit/af4855058358e75a6ae9f8594f1b4d3d4d383f3c) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): refa + react-aria Hidden component

* [#1228](https://github.com/marigold-ui/marigold/pull/1228) [`ccebc98e`](https://github.com/marigold-ui/marigold/commit/ccebc98e4c27a597557e06ad32521249afd7c401) Thanks [@ti10le](https://github.com/ti10le)! - docs: Use Select component in ThemeSelect

- [#1514](https://github.com/marigold-ui/marigold/pull/1514) [`5107b943`](https://github.com/marigold-ui/marigold/commit/5107b943cb3085eb3137d84e79966acad6173a26) Thanks [@sebald](https://github.com/sebald)! - feat(system): Use emotion's context

* [#1631](https://github.com/marigold-ui/marigold/pull/1631) [`9d0e0b96`](https://github.com/marigold-ui/marigold/commit/9d0e0b961afc21ef7a649e8d4dbf584ece6f0e57) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): improve Label and add color prop

- [#1488](https://github.com/marigold-ui/marigold/pull/1488) [`5ea6ac42`](https://github.com/marigold-ui/marigold/commit/5ea6ac428b67e6802a640ac65ccaf79b07327d45) Thanks [@ti10le](https://github.com/ti10le)! - fix(comp): Select coverage

* [#1235](https://github.com/marigold-ui/marigold/pull/1235) [`657d508b`](https://github.com/marigold-ui/marigold/commit/657d508b00f13df6269228af396fd5ccebe2d0a4) Thanks [@ti10le](https://github.com/ti10le)! - feature: ActionGroup component

- [#1618](https://github.com/marigold-ui/marigold/pull/1618) [`bd51a81b`](https://github.com/marigold-ui/marigold/commit/bd51a81b4d961f3366c28f34732e13840e78b346) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Input default variant

* [#1660](https://github.com/marigold-ui/marigold/pull/1660) [`6f9a9d61`](https://github.com/marigold-ui/marigold/commit/6f9a9d61473b715cd492ef765815251c14575768) Thanks [@ti10le](https://github.com/ti10le)! - feat(storybook): rewrite stories from mdx to tsx

- [#1313](https://github.com/marigold-ui/marigold/pull/1313) [`2203155c`](https://github.com/marigold-ui/marigold/commit/2203155c406c91289e36f2a82c24bc6474b687bf) Thanks [@ti10le](https://github.com/ti10le)! - Slider component - design update

* [#1447](https://github.com/marigold-ui/marigold/pull/1447) [`29e4dcc5`](https://github.com/marigold-ui/marigold/commit/29e4dcc589f9bc97db56e554804b4cd78c0d2ec8) Thanks [@ti10le](https://github.com/ti10le)! - feature: Card component

- [#1556](https://github.com/marigold-ui/marigold/pull/1556) [`470f6e8d`](https://github.com/marigold-ui/marigold/commit/470f6e8d9a4c71f504a05f67b3b83d0554d7b480) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove span from button and add some styles to the button element, add space prop to button

* [#1521](https://github.com/marigold-ui/marigold/pull/1521) [`00588fef`](https://github.com/marigold-ui/marigold/commit/00588fef28270bdd0483701ffa8ec1f6bdbc3f01) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp/docs): change Inline component default align + use it in DoAndDont

- [#1616](https://github.com/marigold-ui/marigold/pull/1616) [`ac186e8c`](https://github.com/marigold-ui/marigold/commit/ac186e8c6658bcd6a2892bbe4717c0d60c67e0b4) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove hardcoded variants in <Dialog>

* [#1639](https://github.com/marigold-ui/marigold/pull/1639) [`71551547`](https://github.com/marigold-ui/marigold/commit/71551547e8da4a65ccb69cd785f1be19256aac3c) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove hard coded label from Select

- [#1451](https://github.com/marigold-ui/marigold/pull/1451) [`6f24c585`](https://github.com/marigold-ui/marigold/commit/6f24c585d0f78fac0bf4037e13c53dfdb6138037) Thanks [@ti10le](https://github.com/ti10le)! - bugfix: change Stack that pt has higher priority than base

* [#1374](https://github.com/marigold-ui/marigold/pull/1374) [`90dd906c`](https://github.com/marigold-ui/marigold/commit/90dd906c0ba660ba695efbd39ff52ecc69f9a98f) Thanks [@ti10le](https://github.com/ti10le)! - feature: Field - make error boolean and add errorMessage

- [#1230](https://github.com/marigold-ui/marigold/pull/1230) [`ebd6e26f`](https://github.com/marigold-ui/marigold/commit/ebd6e26f71f675b98b663bc45c6a2d5badddcd47) Thanks [@viktoria-schwarz](https://github.com/viktoria-schwarz)! - feat: add GlobalStyles via theme

* [#1196](https://github.com/marigold-ui/marigold/pull/1196) [`d3a0698f`](https://github.com/marigold-ui/marigold/commit/d3a0698fc6503c208298537c1385a981af93d1d4) Thanks [@ti10le](https://github.com/ti10le)! - Add error and required prop to <Select>

- [#1513](https://github.com/marigold-ui/marigold/pull/1513) [`686c4572`](https://github.com/marigold-ui/marigold/commit/686c4572bc75a3e2016a1ecc49cba9f4307719af) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): inline Component

* [#1493](https://github.com/marigold-ui/marigold/pull/1493) [`45d022dc`](https://github.com/marigold-ui/marigold/commit/45d022dc2459f6e0053e8ba760dc7a6502cd52f1) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove useStyles from Slider

- [#1498](https://github.com/marigold-ui/marigold/pull/1498) [`9e46b437`](https://github.com/marigold-ui/marigold/commit/9e46b4376497b45445aefed138a14e9a82cff705) Thanks [@ti10le](https://github.com/ti10le)! - feat: add GlobalStyles

* [#1563](https://github.com/marigold-ui/marigold/pull/1563) [`6e485f5a`](https://github.com/marigold-ui/marigold/commit/6e485f5a8800094fe54c075a2b21f8abe726b3cd) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce a `Theme` with all available scales

- [#1482](https://github.com/marigold-ui/marigold/pull/1482) [`bf19214e`](https://github.com/marigold-ui/marigold/commit/bf19214e3c1c75d7ba9fbd31bb7e02fb491f2af7) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove useStyles from Card

* [#1448](https://github.com/marigold-ui/marigold/pull/1448) [`ab879e66`](https://github.com/marigold-ui/marigold/commit/ab879e6645ccaf8f9671a8b0231ed4cdf3081753) Thanks [@ti10le](https://github.com/ti10le)! - feature: replace useStyles in Badge, Menu, Message and ValidationMessage

- [#1232](https://github.com/marigold-ui/marigold/pull/1232) [`4c32db13`](https://github.com/marigold-ui/marigold/commit/4c32db13dfc9d76e05e2c015fa99872a49bf920b) Thanks [@ti10le](https://github.com/ti10le)! - Field component redesign

* [#1579](https://github.com/marigold-ui/marigold/pull/1579) [`e13e3cc1`](https://github.com/marigold-ui/marigold/commit/e13e3cc1fc66b261209973b1fc90eb48117076e9) Thanks [@ti10le](https://github.com/ti10le)! - feat: remove Heading from marigold

- [#1234](https://github.com/marigold-ui/marigold/pull/1234) [`cf2a345d`](https://github.com/marigold-ui/marigold/commit/cf2a345d49aedfcea82f8030ba840bbcbf523ee8) Thanks [@ti10le](https://github.com/ti10le)! - fix Dialog component example + styles

* [#1622](https://github.com/marigold-ui/marigold/pull/1622) [`1829cf17`](https://github.com/marigold-ui/marigold/commit/1829cf17e16c574e5577b3e1709c34dc7ed4faaf) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Card default variant

- [#1619](https://github.com/marigold-ui/marigold/pull/1619) [`57d955ee`](https://github.com/marigold-ui/marigold/commit/57d955ee7c04350a4cdabc582f7d1a1937cb4802) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Textarea default variant

* [#1501](https://github.com/marigold-ui/marigold/pull/1501) [`1c1f8648`](https://github.com/marigold-ui/marigold/commit/1c1f864820a060214406ef711f4ed873746c16c4) Thanks [@ti10le](https://github.com/ti10le)! - feat(storybook): remove use styles stories

- [#1366](https://github.com/marigold-ui/marigold/pull/1366) [`78a8e5c8`](https://github.com/marigold-ui/marigold/commit/78a8e5c879760ba666be4566935dd773996159cf) Thanks [@ti10le](https://github.com/ti10le)! - feature: renew radio component

* [#1483](https://github.com/marigold-ui/marigold/pull/1483) [`f725277b`](https://github.com/marigold-ui/marigold/commit/f725277bf66a6e2d51b69608d1b2ebb55330a46e) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove useStyles from Checkbox + Radio

- [#1365](https://github.com/marigold-ui/marigold/pull/1365) [`6d1e47c1`](https://github.com/marigold-ui/marigold/commit/6d1e47c190c527f3a1ae014f87523c7fcc70c8c8) Thanks [@ti10le](https://github.com/ti10le)! - feature: redesign dialog component

* [#1492](https://github.com/marigold-ui/marigold/pull/1492) [`57a6d470`](https://github.com/marigold-ui/marigold/commit/57a6d47058eb1a5fc46b3ccaa831513b8806e257) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove useStyles from Columns

- [#1264](https://github.com/marigold-ui/marigold/pull/1264) [`c6c8f986`](https://github.com/marigold-ui/marigold/commit/c6c8f9860633570177a978719d5fbe4159415cf0) Thanks [@ti10le](https://github.com/ti10le)! - bugfix/feature: link + menu component

* [#1651](https://github.com/marigold-ui/marigold/pull/1651) [`4452b39c`](https://github.com/marigold-ui/marigold/commit/4452b39c822fa82671530e4c475c0cf1df967c60) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): refa + react-aria Hidden component

- [#1506](https://github.com/marigold-ui/marigold/pull/1506) [`7b2a0374`](https://github.com/marigold-ui/marigold/commit/7b2a0374b2ca4546a7e616d99313028da3ef412e) Thanks [@ti10le](https://github.com/ti10le)! - infra(packages): add icons package as dependency to component package

* [#1367](https://github.com/marigold-ui/marigold/pull/1367) [`902be38c`](https://github.com/marigold-ui/marigold/commit/902be38ca9efb3018a0f6c0cf981229c7ae2bf7f) Thanks [@ti10le](https://github.com/ti10le)! - feature: renew checkbox component

- [#1499](https://github.com/marigold-ui/marigold/pull/1499) [`ec5baf85`](https://github.com/marigold-ui/marigold/commit/ec5baf85a9a0f82a4fca5bbd1e1680316c186593) Thanks [@sebald](https://github.com/sebald)! - feat: Update and simplify normalization

* [#1375](https://github.com/marigold-ui/marigold/pull/1375) [`dd237e6d`](https://github.com/marigold-ui/marigold/commit/dd237e6d904826e8b3701f4a8470f75c88b0bd78) Thanks [@ti10le](https://github.com/ti10le)! - feature: Select - make error boolean and add errorMessage

- [#1221](https://github.com/marigold-ui/marigold/pull/1221) [`3885f64c`](https://github.com/marigold-ui/marigold/commit/3885f64c353a056ccb9a5368ac4f105b4b9efb62) Thanks [@viktoria-schwarz](https://github.com/viktoria-schwarz)! - feat(storybook): add Welcome stories and additional config

* [#1485](https://github.com/marigold-ui/marigold/pull/1485) [`1bb6f32e`](https://github.com/marigold-ui/marigold/commit/1bb6f32e69b5eac37d67357e46c868a87855bd6f) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove useStyles from Label

- [#1466](https://github.com/marigold-ui/marigold/pull/1466) [`80984f41`](https://github.com/marigold-ui/marigold/commit/80984f41391f42cc17928a8127190ea6fd9abe53) Thanks [@ti10le](https://github.com/ti10le)! - feat(docs): doAndDont + CodePreview component - e.g. button

* [#1131](https://github.com/marigold-ui/marigold/pull/1131) [`0ccc10de`](https://github.com/marigold-ui/marigold/commit/0ccc10dec290ed3e5ce042277a6c6e51c40ae4c3) Thanks [@sebald](https://github.com/sebald)! - feat(types): Clarify and improve polymorphic types by calling it by its actual name ... polymorphic! We also added types when no `ref` should be passed.

- [#1633](https://github.com/marigold-ui/marigold/pull/1633) [`ab786e92`](https://github.com/marigold-ui/marigold/commit/ab786e927ab1069a83aeed7bb3b223d0c0d1bd50) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove hard coded label variant in radio

* [#1617](https://github.com/marigold-ui/marigold/pull/1617) [`e5aed4bf`](https://github.com/marigold-ui/marigold/commit/e5aed4bffc4cb81ab531bb1ed8b5da871c9b8b00) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Slider default variant

- [#1621](https://github.com/marigold-ui/marigold/pull/1621) [`2f7b936f`](https://github.com/marigold-ui/marigold/commit/2f7b936f5b07eade00a51cb138c3c492f1e08c9d) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Badge default variant

* [#1589](https://github.com/marigold-ui/marigold/pull/1589) [`8cbcb91a`](https://github.com/marigold-ui/marigold/commit/8cbcb91a7b63ce8f10ee79ed76121e5022cbe07b) Thanks [@sebald](https://github.com/sebald)! - feat: normalize <SVG> and move to system package

  BREAKING: <SVG> moved from `@marigold/icons` to `@marigold/system`

- [#1641](https://github.com/marigold-ui/marigold/pull/1641) [`c49e5049`](https://github.com/marigold-ui/marigold/commit/c49e5049b1cb9621957ad14fa1e8b7bc8df9505d) Thanks [@sebald](https://github.com/sebald)! - chore(config): Update storyboook configuration and used CSF again

* [#1636](https://github.com/marigold-ui/marigold/pull/1636) [`4aeac33f`](https://github.com/marigold-ui/marigold/commit/4aeac33f619e6f9caee36a71223b312cfe1b9401) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Field fix default variant + remove hardcoded variants

- [#1550](https://github.com/marigold-ui/marigold/pull/1550) [`846eb640`](https://github.com/marigold-ui/marigold/commit/846eb640ad035c7f3410b4a8a451f8de56e62339) Thanks [@sebald](https://github.com/sebald)! - feat: Merge <Box> and <Element>

* [#1509](https://github.com/marigold-ui/marigold/pull/1509) [`12b74338`](https://github.com/marigold-ui/marigold/commit/12b7433843c477ab722e464fde3aa1e1f058ee46) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): improve Column + Columns component

- [#1449](https://github.com/marigold-ui/marigold/pull/1449) [`a89bd85c`](https://github.com/marigold-ui/marigold/commit/a89bd85c349ef9d8098ccaeb0261bf09cefd22e1) Thanks [@ti10le](https://github.com/ti10le)! - Replace useStyles in ListBox, Textarea and Field.test

* [#1182](https://github.com/marigold-ui/marigold/pull/1182) [`f3f61456`](https://github.com/marigold-ui/marigold/commit/f3f61456afa65ddeec8c9f1346c439bd91f3aa12) Thanks [@ti10le](https://github.com/ti10le)! - improve Button component with react-aria

- [#1132](https://github.com/marigold-ui/marigold/pull/1132) [`b6614f1f`](https://github.com/marigold-ui/marigold/commit/b6614f1f54165bc295709fa2e7f1c50892163fc3) Thanks [@sebald](https://github.com/sebald)! - feat(compoents): Make `<Text>` and `<Link>` polymorphic

  **`<Text>`**

  - the `as` prop supports arbitrary inputs
  - supporst ref
  - supports style props (text-align, color, cursor, user-select)

  **`<Link>`**

  - the `as` prop supports arbitrary inputs
  - does not support `ref`!
  - improved accessibility (react-aria)

* [#1572](https://github.com/marigold-ui/marigold/pull/1572) [`4add22cc`](https://github.com/marigold-ui/marigold/commit/4add22ccf06313b79802919205643a859665c7f3) Thanks [@sebald](https://github.com/sebald)! - feat(components): Harden types in theme

- [#1474](https://github.com/marigold-ui/marigold/pull/1474) [`abdde032`](https://github.com/marigold-ui/marigold/commit/abdde0326428a1fa5db340197e71ca0190e7780e) Thanks [@sebald](https://github.com/sebald)! - refa: remove useStyles from <Alert>

* [#1484](https://github.com/marigold-ui/marigold/pull/1484) [`24367e63`](https://github.com/marigold-ui/marigold/commit/24367e63477a2345b856302115bb59d931da1ba4) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove useStyles from Select

- [#1632](https://github.com/marigold-ui/marigold/pull/1632) [`c96d54a2`](https://github.com/marigold-ui/marigold/commit/c96d54a21901a72aeb6af71837c9642ace394c78) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove hard coded label variant in checkbox

* [#1229](https://github.com/marigold-ui/marigold/pull/1229) [`bd00c6da`](https://github.com/marigold-ui/marigold/commit/bd00c6da6515a320c37ee48946f2ac9a505e6d36) Thanks [@ti10le](https://github.com/ti10le)! - Label component redesign

- [#1522](https://github.com/marigold-ui/marigold/pull/1522) [`6a82a490`](https://github.com/marigold-ui/marigold/commit/6a82a490865c709a354141f68d65b9af38184f24) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): use Inline in ActionGroup

- Updated dependencies [[`c030aa85`](https://github.com/marigold-ui/marigold/commit/c030aa85156356c294bafe9831024f6b6f2ce4db), [`8eda245f`](https://github.com/marigold-ui/marigold/commit/8eda245f01a918fcdaa9f0ac211889ed869aa375), [`5a04de11`](https://github.com/marigold-ui/marigold/commit/5a04de110637d004f5824679697ee4d6a90eaf34), [`c1da52c0`](https://github.com/marigold-ui/marigold/commit/c1da52c0f035b141608fd606e6ba3bc2b5482dc1), [`1448ddca`](https://github.com/marigold-ui/marigold/commit/1448ddcaa0f647f48b018fa74a8686af30eccc53), [`5107b943`](https://github.com/marigold-ui/marigold/commit/5107b943cb3085eb3137d84e79966acad6173a26), [`cd3a0d3e`](https://github.com/marigold-ui/marigold/commit/cd3a0d3edb3f2ddc1f561e8007e1c20000f7855a), [`ebd6e26f`](https://github.com/marigold-ui/marigold/commit/ebd6e26f71f675b98b663bc45c6a2d5badddcd47), [`6e485f5a`](https://github.com/marigold-ui/marigold/commit/6e485f5a8800094fe54c075a2b21f8abe726b3cd), [`80a2abe5`](https://github.com/marigold-ui/marigold/commit/80a2abe5804ba2c5a48cc6b05211245c37baf266), [`e13e3cc1`](https://github.com/marigold-ui/marigold/commit/e13e3cc1fc66b261209973b1fc90eb48117076e9), [`1829cf17`](https://github.com/marigold-ui/marigold/commit/1829cf17e16c574e5577b3e1709c34dc7ed4faaf), [`1c1f8648`](https://github.com/marigold-ui/marigold/commit/1c1f864820a060214406ef711f4ed873746c16c4), [`51af6693`](https://github.com/marigold-ui/marigold/commit/51af669330fd52e4e31fe5ad71d2b202ab8d2231), [`a00b7eb9`](https://github.com/marigold-ui/marigold/commit/a00b7eb971131634414d3912d059fb505bb7a370), [`7b2a0374`](https://github.com/marigold-ui/marigold/commit/7b2a0374b2ca4546a7e616d99313028da3ef412e), [`ec5baf85`](https://github.com/marigold-ui/marigold/commit/ec5baf85a9a0f82a4fca5bbd1e1680316c186593), [`0bb8f19e`](https://github.com/marigold-ui/marigold/commit/0bb8f19ebdec0e2f9dc3f6164f4373cac5c10880), [`c4ae5c5c`](https://github.com/marigold-ui/marigold/commit/c4ae5c5ca442f93034ff8f4c70adc295547951d4), [`a1ef2108`](https://github.com/marigold-ui/marigold/commit/a1ef2108dd6c8e6838b517dd58c82d38e71dae2b), [`2f7b936f`](https://github.com/marigold-ui/marigold/commit/2f7b936f5b07eade00a51cb138c3c492f1e08c9d), [`8cbcb91a`](https://github.com/marigold-ui/marigold/commit/8cbcb91a7b63ce8f10ee79ed76121e5022cbe07b), [`846eb640`](https://github.com/marigold-ui/marigold/commit/846eb640ad035c7f3410b4a8a451f8de56e62339), [`5d63cd9c`](https://github.com/marigold-ui/marigold/commit/5d63cd9c14578787083c82c85d93bbd2ff0efac6), [`46aede50`](https://github.com/marigold-ui/marigold/commit/46aede50c43e2dce0cacdc8f4c7da55fa18962b9)]:
  - @marigold/system@0.3.0
  - @marigold/icons@0.3.0
