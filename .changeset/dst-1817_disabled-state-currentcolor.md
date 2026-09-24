---
'@marigold/theme-rui': patch
---

fix(DST-1817): derive the disabled state from the ink so it holds on every background

A disabled or loading Button on the ActionBar rendered as a near-white pill on the dark bar. `ui-state-disabled` painted a fixed `charcoal-100` fill and a `charcoal-400` label, both calibrated for white. On the `charcoal-900` bar that became the brightest thing on screen, and on the `charcoal-100` page the fill matched the background exactly and disappeared.

`ui-state-disabled` now derives label, fill and ring from `currentColor`. The label fades relative to the inherited text color, and fill and ring are faint washes of that faded label. The result is dark on light backgrounds and light on dark ones, with no new tokens:

- **White surfaces** (Panel, Card): the fill matches the previous `charcoal-100` step (1.1:1 against the background).
- **The page**: disabled controls gain the same faint fill instead of an invisible one.
- **Dark backgrounds** (ActionBar): no light pill and no light outline. Actions recede into the bar.

Because the state replaces the element's own color and background, every Button variant looks the same when disabled or loading. The loading spinner follows the label color, so it stays visible on a dark background. `NumberField` steppers and input, and `DateField` segments, inherit the field's disabled look instead of painting their own opaque fill on top of it.
