---
'@marigold/components': patch
---

fix(ProgressCircle): resolve named `size` tokens to a numeric SVG dimension

A named `size` token (`default` | `large` | `fit`) was forwarded unchanged to the
underlying `<SVG>` element, which renders `width`/`height` as `` `${size}px` `` —
producing invalid attribute values like `width="defaultpx"` and emitting console
errors. The rendered size already comes from the theme size classes, so the SVG now
resolves `size` to a numeric intrinsic dimension (falling back to `24` for non-numeric
tokens) for its `width`/`height` attributes and stroke-width math. Visual output is
unchanged.
