---
'@marigold/components': patch
'@marigold/docs': patch
---

fix(DST-1647): honor the router's `useHref` in sidebar links

`Sidebar.Item` and `Sidebar.RailItem` rendered the raw `href` prop straight onto
their anchor, which shadowed the value produced by `RouterProvider`'s optional
`useHref`. Applications served from a prefix, such as a Next.js `basePath`, ended
up with sidebar markup pointing at an unprefixed URL, so middle click and "copy
link address" resolved to the wrong page. Both components now render the
transformed href and keep handing the unprefixed path to `navigate`, matching how
React Aria's own `useLink` behaves. Consumers that do not pass `useHref` see no
change, because the default leaves the href untouched.

The `RouterProvider` docs now cover `useHref` next to `navigate`, and the
component gained a matching Storybook story and prop description.
