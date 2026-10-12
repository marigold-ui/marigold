---
'@marigold/system': patch
'@marigold/components': patch
---

chore(DST-1309): move the style-prop class maps into `@marigold/components`

The class names behind props such as `weight`, `align`, `verticalAlign`, `ratio` and `cursor` used to be defined only in `@marigold/system`. Tailwind generated CSS for them only when it scanned that package, so styling quietly depended on `@marigold/system` being installed directly. The 12 maps (`alignment`, `textAlign`, `verticalAlign`, `placeItems`, `aspect`, `fontWeight`, `textSize`, `textStyle`, `textWrap`, `whiteSpace`, `lineHeight`, `cursorStyle`) now live in `@marigold/components`, next to the components that use them.

Component props and the classes they render are unchanged. The `*Prop` types stay exported from `@marigold/system`. The runtime maps are no longer exported from it. They were marked internal, so no consumer code should depend on them.
