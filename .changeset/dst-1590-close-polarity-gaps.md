---
'@marigold/theme-rui': minor
---

Close the remaining ground-polarity gaps on contrast surfaces.

Three neutral tokens were still carrying their light-ground values inside a
`ui-contrast` region, where they measured well under the 3:1 WCAG 1.4.11 asks of
a state indicator. All three are now restated:

- `selected-bold` was 1.00:1 — charcoal-900 on a charcoal-900 ground — so a
  checked Checkbox, Radio, ToggleButton or an ON Switch inside a contrast region
  was invisible. Now mirrors its light-ground extreme (charcoal-50, 10.83:1), and
  `selected-bold-foreground` travels with it so the checkmark does not vanish
  into its own box.
- `scrollbar-hover` was 1.14:1. Live: ActionBar's toolbar is `overflow-x-auto`,
  so hovering its thumb made the thumb disappear into the bar.
- The inset focus ring was 2.05:1 over a `selected` wash.

**New token:** `--color-ring-inset`, the focus ring where it is drawn inset
(`ui-state-focus-item`). It resolves to `--color-ring` on light grounds and
flips to charcoal-200 on a contrast ground. `--color-ring` itself is unchanged
and does not flip — `ui-contrast` is used both as a region and as a cap on a
single control (the primary Button), whose focus halo is painted against the
light page, and a restatement cannot tell those apart. No single value clears
3:1 on every backdrop of both polarities, so the ring had to be split.

**Component changes:**

- `Switch`'s thumb takes `bg-selected-bold-foreground` instead of `bg-surface`,
  so the puck travels with the track it sits on. Visually identical on light
  grounds (charcoal-50 against white); on a contrast ground a white puck on the
  flipped ON track measured 1.04:1 and took the position cue with it.
- `ActionBar`'s clear button uses `ui-state-focus-item` instead of
  `ui-state-focus`. It is borderless, so `ui-state-focus` degraded to its halo
  alone: 1.71:1 against the bar, 1.12:1 under the hover wash. No ring color fixes
  that at the halo's 50% alpha, where even charcoal-200 tops out at 2.84:1.
