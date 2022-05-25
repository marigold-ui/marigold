# @marigold/types

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
