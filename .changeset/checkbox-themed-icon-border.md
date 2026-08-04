---
'@marigold/components': patch
---

fix(DST-1659): draw the `Checkbox` box from theme tokens instead of raw Tailwind literals

The checkbox icon painted itself with `bg-white` and `border-black`. Both now come from the token layer: `bg-surface` for the fill and `border-control-border` for the affordance edge, matching how every other control draws its boundary.

`@marigold/theme-rui` already overrides both slots in `Checkbox.styles.ts`, so the rendered markup and the visual result are unchanged there. The literals only leaked in custom themes, where a consumer could not recolor the box edge or fill without fighting a hardcoded value. This was the last raw color in the component layer.
