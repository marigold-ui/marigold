---
'@marigold/components': patch
---

`Input` no longer clones its `icon` and `action` children to inject positioning
classes. It renders the positioned box itself and lets the child fill it, so a
Fragment or a non-element child is placed like anything else, and a `className`
you set on the icon or action is left alone instead of being merged. Rendered
geometry is unchanged. The icon and action each gain a wrapping `<span>`.
