---
'@marigold/components': patch
---

fix(ProgressCircle): resolve named `size` tokens to a numeric SVG dimension

A named `size` token (`default` | `large` | `fit`) was forwarded unchanged to the
underlying `<SVG>` element, which renders `width`/`height` as `` `${size}px` `` —
producing invalid attribute values like `width="defaultpx"` and emitting console
errors. The SVG now resolves named tokens to the pixel dimension of their theme
`size-*` class (`default` → 80, `large` → 144) for its `width`/`height` attributes
and stroke-width math, so the stroke stays proportionate and the rendered output is
unchanged. `fit` is content-sized and has no intrinsic dimension, so it falls back to
the `<SVG>` default of `24`.

The stroke-width comparison also switched from a string compare (`size <= '24'`) to a
numeric one, which additionally fixes multi-digit sizes that were previously
mis-classified (e.g. `size="100"` computed a `strokeWidth` of `2` instead of `4`).
