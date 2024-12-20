---
"@marigold/docs": major
"@marigold/components": major
---

refa: improve `<Container>` and `<Breakout>`  component

**BREAKING CHANGE:** This PR includes breaking changes, because we removed and changed a lot ot the props API of `<Container>` and `<Breakout>`. The `<Container>` now only works with `<Text>` and `<Headline>` component. This allows for a smoother developer experience and prevents suprises.

Make the `<Container>` and `<Breakout>` component more usable for real world scenarios.

- `<Container>` supporst `space` style prop
- simplify `<Container>` usage by removing unnecessary props
- simplify ´<Breakout>` and make it composable with other layout components
- make `<Text>` and `<Headline>` adhere to a `<Container>` content length

