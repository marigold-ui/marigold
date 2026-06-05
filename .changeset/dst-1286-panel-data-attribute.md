---
'@marigold/components': patch
---

feat(DST-1286): Panel renders a `data-panel` attribute on its root

The root `<section>` rendered by `<Panel>` now carries a valueless `data-panel` attribute. External stylesheets and host pages can use it as a stable selector (e.g. `:not(:has([data-panel]))`) to detect whether a Panel is present without depending on Tailwind utility classes.
