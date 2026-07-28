---
'@marigold/theme-rui': patch
---

Stop the ghost SegmentedControl stacking two washes on a hovered selected segment.

`SelectionIndicator` (`z-0`) and `RadioButton` (`z-10`) are overlapping siblings
inside one segment, and both carried `ui-state-hover-ghost` — the indicator
unconditionally, the option on hover. Hovering the selected segment therefore
composited `bg-current/10` twice into an effective **0.19**, measured
**1.23 → 1.50:1** on white. That is a hover arriving at the weight of a
selection, and it is what R4 ("one alpha per element; watch overlapping
siblings, not just nesting") exists to prevent.

The option is now gated on `not-selected:`, and the indicator owns the
selected-and-hovered case through a new `ui-state-selected-hover-ghost` — the
explicit combined value R4 asks for rather than two layers left to multiply.

Measured selected-and-hovered, one layer on every ground: **1.36 / 1.36 / 1.55**.

The combined value is `bg-current/15` rather than the 0.19 the stack happened to
produce. 0.19 fits the R5 light-ground budget (0.20) but not the dark-ground one
(0.15), and on a correctly-inked contrast ground the old stack measures 1.79:1.
One value has to serve both polarities, because `bg-current` derives its own.

Also folds SegmentedControl's hand-rolled `calc(alpha - 0.08)` on the indicator
border into `--color-control-border-on-control`. It describes how
`--color-control-border` behaves on a control-coloured track — a property of the
token pair, not of this component. Resolves identically (`0.26 → 0.18`), so
there is no visual change to the default variant.

Note for reviewers: `group-has-[[data-hovered]]` rather than `group-hover`.
`tailwindcss-react-aria-components` rewrites `group-hover` to require
`[data-hovered]` on the group element, and the segment wrapper is a RAC element
that never receives it — only the option inside it does.
