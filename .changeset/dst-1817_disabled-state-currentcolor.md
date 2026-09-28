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

`ProgressCircle` now draws its arc in the current text color instead of a fixed `foreground` stroke, so a spinner inside a loading Button or a pending Menu item fades with its label. The `inverted` variant is unchanged. The ActionBar now leaves a small gap between its actions, so two adjacent disabled or loading Buttons no longer merge into one pill. Tags inside a disabled `TagField` drop their own opaque fill and sit on the field's wash, so they no longer show as lighter blocks on the page background. The `NumberField` stepper centers its glyph as intended, because a misspelled `place-items-center` class never applied.
