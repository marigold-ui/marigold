---
'@marigold/components': patch
---

fix: stop exposing `style` on `Label`

`Label` only removed `className` from its react-aria props, leaving `style` in
the public interface. It now omits both, matching the `className`/`style`
removal convention used across the design system (e.g. `Description`,
`TextValue`). Theme the label via `variant`/`size` instead.
