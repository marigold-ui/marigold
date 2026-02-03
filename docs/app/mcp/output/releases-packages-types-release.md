# '@marigold/types'

_'Have a look on the latest changes regarding @marigold/types'_

## 1.4.0

### Minor Changes

- e985fe2: feat(\[DST-1091]): Add multiselection mode to `<Select>`

## 1.3.2

### Patch Changes

- 81f1c9d: fix broken release

## 1.3.1

### Patch Changes

- 0bca5d8: Update React aria components

## 1.3.0

### Minor Changes

- c387b43: feat: allow React >=17.0.0

### Patch Changes

- c387b43: feat: allow React >=17.0.0

## 1.2.1

### Patch Changes

- 8b7be8e: fix(types): Update deps and fix peer dependency for `@types/react`.

## 1.2.0

### Minor Changes

- 2babc0b: feat(components): Mark layout components as regions for accessibility.

  Added the ability to mark layout components as regions (ARIA role). This improves accessibility by allowing assistive technologies to identify significant sections of the page, making navigation easier for users with disabilities.

- 956982a: feat(components): Make `<Text>` and `<Headline>` accessible by allowing ARIA labelling props

  `<Text>` and `<Headline>` will no longer cause type errors when ARIA labelling is used (`aria-label`, `id`, ...).

## 1.1.1

### Patch Changes

- [#3967](https://github.com/marigold-ui/marigold/pull/3967) [`0773aa8`](https://github.com/marigold-ui/marigold/commit/0773aa8cd6ee71faf4f0d04f80f33cbe7fc56202) Thanks [@sebald](https://github.com/sebald)! - refa: Update TypeScript and adjust `<NumericFormat>` props

## 1.1.0

### Minor Changes

- [#3422](https://github.com/marigold-ui/marigold/pull/3422) [`e5869b2f3`](https://github.com/marigold-ui/marigold/commit/e5869b2f3bf0f3b69a2e37f377d51786d23ccc56) Thanks [@sebald](https://github.com/sebald)! - refa: Make `<FieldBase>` work with RAC components

## 1.0.1

### Patch Changes

- [#2894](https://github.com/marigold-ui/marigold/pull/2894) [`b3d577339`](https://github.com/marigold-ui/marigold/commit/b3d577339e16e73185d2fb80707479ce689e7f7f) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @types/react to v18.0.29

- [#2891](https://github.com/marigold-ui/marigold/pull/2891) [`8972cbaca`](https://github.com/marigold-ui/marigold/commit/8972cbaca29ccce9c17a15b772ab0c7a3e921d20) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency type-fest to v3.7.0

## 1.0.0

### Major Changes

- [#2764](https://github.com/marigold-ui/marigold/pull/2764) [`1ff29cc0c`](https://github.com/marigold-ui/marigold/commit/1ff29cc0ca5416eed14b54d0dda8ec1aad762cda) Thanks [@sebald](https://github.com/sebald)! - refa: fix polymorph types + remove style props from `<Box>`

  **BREAKING CHANGE:**

  We deprecated the available short hands for styling on the `<Box>` component (also known as style props), for example `<Box p="small">`. This way it is more clear what to use when -> always the `css` prop.

  _How to update your code:_ Basically move all style props to the `css` prop. E.g. `<Box p="small" bg="primary">` becomes `<Box css={{ p: "small, bg; "primary" }}>`.

### Patch Changes

- [#2726](https://github.com/marigold-ui/marigold/pull/2726) [`0f539b788`](https://github.com/marigold-ui/marigold/commit/0f539b788a72654e834c374810ef677c307fdadb) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @types/react to v18.0.27

## 0.5.7

### Patch Changes

- [#2674](https://github.com/marigold-ui/marigold/pull/2674) [`832da2a6`](https://github.com/marigold-ui/marigold/commit/832da2a69f9bad5adcbcc57cba3cb215dfaa51e2) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: refactoring Popover with usePopover

## 0.5.6

### Patch Changes

- [#2621](https://github.com/marigold-ui/marigold/pull/2621) [`080b1fed`](https://github.com/marigold-ui/marigold/commit/080b1fedc582511e0155a9199aa3b2b995cfb609) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @types/react to v18.0.25

## 0.5.5

### Patch Changes

- [#2598](https://github.com/marigold-ui/marigold/pull/2598) [`f38ae20a`](https://github.com/marigold-ui/marigold/commit/f38ae20a23badf8cf141f582f0c20d85fdd6534b) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @types/react to v18.0.24

## 0.5.4

### Patch Changes

- [#2530](https://github.com/marigold-ui/marigold/pull/2530) [`4af6c016`](https://github.com/marigold-ui/marigold/commit/4af6c01618922473fa126786550fba74475bf7da) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency type-fest to v3

- [#2543](https://github.com/marigold-ui/marigold/pull/2543) [`eb7e453c`](https://github.com/marigold-ui/marigold/commit/eb7e453c23f310d70d58514c24e8fe0d0cd375d4) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @types/react to v18.0.21

## 0.5.3

### Patch Changes

- [#2313](https://github.com/marigold-ui/marigold/pull/2313) [`75128374`](https://github.com/marigold-ui/marigold/commit/75128374e5209a24bd2b0914c1d9455c02fcfc92) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @types/react to v18.0.19

## 0.5.2

### Patch Changes

- [#2164](https://github.com/marigold-ui/marigold/pull/2164) [`b43464fc`](https://github.com/marigold-ui/marigold/commit/b43464fce6f7e2662b27313c6f74190e8c0f540f) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: update to React 18

## 0.5.1

### Patch Changes

- [#2102](https://github.com/marigold-ui/marigold/pull/2102) [`23c1a5ce`](https://github.com/marigold-ui/marigold/commit/23c1a5cece356465f07b7206a0fe0f65512f3350) Thanks [@sebald](https://github.com/sebald)! - feat: Remove all occurances of `React.FC`

* [#2098](https://github.com/marigold-ui/marigold/pull/2098) [`bfa0caea`](https://github.com/marigold-ui/marigold/commit/bfa0caeac9fdb817ceed7ee30dbcce0819460f30) Thanks [@sebald](https://github.com/sebald)! - fix: package all files in types package

## 0.5.0

### Minor Changes

- [#2041](https://github.com/marigold-ui/marigold/pull/2041) [`02d13e84`](https://github.com/marigold-ui/marigold/commit/02d13e84a27ac075587f7278c8c858aeee884f64) Thanks [@sebald](https://github.com/sebald)! - feat: Support for `:focus-visible` and `:selected` pseudos

## 0.5.0-beta.0

### Minor Changes

- [#2041](https://github.com/marigold-ui/marigold/pull/2041) [`02d13e84`](https://github.com/marigold-ui/marigold/commit/02d13e84a27ac075587f7278c8c858aeee884f64) Thanks [@sebald](https://github.com/sebald)! - feat: Support for `:focus-visible` and `:selected` pseudos

## 0.4.1

### Patch Changes

- [#1988](https://github.com/marigold-ui/marigold/pull/1988) [`7c1129dc`](https://github.com/marigold-ui/marigold/commit/7c1129dc140d435e5312f80a57fd48f8498c33ee) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Field Component restructure

## 0.4.0

### Minor Changes

- [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942) Thanks [@sebald](https://github.com/sebald)! - Improved size in node_modules

## 0.3.0

### Patch Changes

- [#1131](https://github.com/marigold-ui/marigold/pull/1131) [`0ccc10de`](https://github.com/marigold-ui/marigold/commit/0ccc10dec290ed3e5ce042277a6c6e51c40ae4c3) Thanks [@sebald](https://github.com/sebald)! - feat(types): Clarify and improve polymorphic types by calling it by its actual name ... polymorphic! We also added types when no `ref` should be passed.

* [#1132](https://github.com/marigold-ui/marigold/pull/1132) [`b6614f1f`](https://github.com/marigold-ui/marigold/commit/b6614f1f54165bc295709fa2e7f1c50892163fc3) Thanks [@sebald](https://github.com/sebald)! - feat(compoents): Make `<Text>` and `<Link>` polymorphic

  **`<Text>`**
  - the `as` prop supports arbitrary inputs
  - supporst ref
  - supports style props (text-align, color, cursor, user-select)

  **`<Link>`**
  - the `as` prop supports arbitrary inputs
  - does not support `ref`!
  - improved accessibility (react-aria)
