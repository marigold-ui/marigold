---
"@marigold/components": patch
"@marigold/types": patch
---

feat(compoents): Make `<Text>` and `<Link> polymorphic

**`<Text>`**
- the `as` prop supports arbitrary inputs
- supporst ref
- supports style props (text-align, color, cursor, user-select)

**`<Link>`**
- the `as` prop supports arbitrary inputs
- does not support `ref`!
- improved accessibility (react-aria)
