---
"@marigold/components": major
"@marigold/system": major
"@marigold/types": major
---

refa: fix polymorph types + remove style props from `<Box>`

**BREAKING CHANGE:**

We deprecated the available short hands for styling on the `<Box>` component (also known as style props), for example `<Box p="small">`. This way it is more clear what to use when -> always the `css` prop.

*How to update your code:* Basically move all style props to the `css` prop. E.g. `<Box p="small" bg="primary">` becomes `<Box css={{ p: "small, bg; "primary" }}>`.