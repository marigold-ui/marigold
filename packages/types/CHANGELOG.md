# @marigold/types

## 0.3.0
### Patch Changes



- [#1131](https://github.com/marigold-ui/marigold/pull/1131) [`0ccc10de`](https://github.com/marigold-ui/marigold/commit/0ccc10dec290ed3e5ce042277a6c6e51c40ae4c3) Thanks [@sebald](https://github.com/sebald)! - feat(types): Clarify and improve polymorphic types by calling it by its actual name ... polymorphic! We also added types when no `ref` should be passed.



- [#1132](https://github.com/marigold-ui/marigold/pull/1132) [`b6614f1f`](https://github.com/marigold-ui/marigold/commit/b6614f1f54165bc295709fa2e7f1c50892163fc3) Thanks [@sebald](https://github.com/sebald)! - feat(compoents): Make `<Text>` and `<Link>` polymorphic
  
  **`<Text>`**
  - the `as` prop supports arbitrary inputs
  - supporst ref
  - supports style props (text-align, color, cursor, user-select)
  
  **`<Link>`**
  - the `as` prop supports arbitrary inputs
  - does not support `ref`!
  - improved accessibility (react-aria)
