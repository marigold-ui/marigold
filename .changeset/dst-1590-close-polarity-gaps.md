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

**New utility:** `ui-polarity-reset`, the inverse of `ui-contrast`. A descendant
that paints its own opaque light fill — a Panel or a SelectList nested in a
contrast region is a white surface — needs the light-ground values back, and the
washes make that acute: ramp B is a *light*-base alpha, so a hover or selection
inside a nested white surface would tint white with white and vanish. Applied by
`ui-frame` and `ui-soft`, each of which paints such a fill. `ui-soft` was already
doing a one-property version by hand (`text-foreground`, to undo
`text-primary-foreground`). A test asserts the reset covers every token
`ui-contrast` restates, so the two lists cannot drift.

**New token and utility for the two readings of `ui-state-disabled`:** a control
with no resting fill (ghost and link Button, ActionBar's clear button) already
redirected the fill away from the opaque, white-calibrated
`--color-disabled-surface`. Its *ink* still came from the light-ground value,
asserting a ground a transparent control does not have — a disabled clear button
on the dark bar sat only 2.2x below its enabled ink, where the same control on
white drops 7.5x, so it read as very nearly enabled. It now defers to the ground
and lands 5.3x down.

- `--color-disabled-surface-foreground` (charcoal-400) is the ink for
  `disabled-surface`, following the usual `X` + `X-foreground` pairing. Same rung
  as `--color-disabled` and identical on every ground, because it lands on the
  opaque fill rather than on the ground. `--color-disabled` remains the
  ground-dependent one. Existing consumers of `text-disabled` are unaffected.
- `ui-state-disabled-ghost` points `ui-state-disabled`'s fill *and* ink at the
  fill-less reading. Apply it unprefixed: `ui-interactive` gives every
  button-like control `disabled:ui-state-disabled`, and ActionBar's clear button
  is an IconButton wearing ActionBar's classes on top, so a call site cannot
  subtract that utility — only redirect what it reads.

`ui-state-disabled` therefore no longer applies `ui-polarity-reset`; it names the
paired ink directly. Declaring `--color-disabled` there is what destroyed the
value the fill-less branch has to inherit, since an element cannot both set a
custom property and defer to the one it inherited.

**Text tokens on a contrast ground:** `secondary` moves from charcoal-500 to
charcoal-400 and `disabled` from charcoal-400 to charcoal-600. charcoal-500 was
Lc 36 on APCA against the Lc 78 plain `secondary` reaches on white, and it left an
inversion — `disabled` measured 7.51:1 there, so a disabled label read louder than
a merely secondary one, backwards from the light ground. `disabled` was the
mis-mirrored one: charcoal-400 is a deliberately quiet 2.31:1 on white and 7.51:1
here, and charcoal-600 restores that quiet at 3.14:1. Moving it also frees
charcoal-400 for `secondary`, which had been ruled out only because the two rungs
collided exactly.

**Component changes:**

- `Switch`'s thumb takes `bg-selected-bold-foreground` instead of `bg-surface`,
  so the puck travels with the track it sits on. Visually identical on light
  grounds (charcoal-50 against white); on a contrast ground a white puck on the
  flipped ON track measured 1.04:1 and took the position cue with it.
- `ActionBar`'s clear button uses `ui-state-focus-item` instead of
  `ui-state-focus`. It is borderless, so `ui-state-focus` degraded to its halo
  alone: 1.71:1 against the bar, 1.12:1 under the hover wash. No ring color fixes
  that at the halo's 50% alpha, where even charcoal-200 tops out at 2.84:1.
