---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix: make `control` a ground-adaptive track fill, and give the `Slider` rail the same token as `Switch` and `SegmentedControl`

**The Slider rail was the wrong token, painted twice.** It used `bg-border` — the token for structural lines (dividers, grid lines, table rules) — where the `Switch` groove and the `SegmentedControl` track both use `bg-control`. On top of that, `Slider` applied its `track` style to two exactly-overlapping elements (the `SliderTrack` and an inner rail `div`), so the translucent `bg-border` composited with itself and the rail rendered at ~0.26 effective alpha instead of 0.14 — measuring `#c0bfbe` on white where the token specifies `#dddddc`. The redundant inner element is gone; the `SliderTrack` itself is the rail. Geometry is unchanged (both were `h-2` at the same position) and `touch-none`, `select-none` and the disabled cursor stay on the interactive track element.

**`control` is now translucent** (`charcoal-950 / 16%`, was the opaque `charcoal-300`). A track is not painted on one known background — it appears on a white Card, the gray page ground, a `muted` fill, and inside a hovered Table or ListBox row — and a fixed palette step drifts across those. charcoal-300 measured 1.53:1 on white but only 1.21:1 inside a hovered row, where the groove half-dissolved into the row it sits in. At 16% the four grounds land within 0.02 of each other (1.41–1.43:1), so a track weighs the same wherever it goes. Same rationale as `border` in DST-1672.

The three tracks (`Switch`, `SegmentedControl`, `Slider`) read a touch lighter on white surfaces as a result: `#d8d8d7` rather than `#d4d0ce`. The trade-off is that the white Switch thumb and SegmentedControl indicator now vary against the track by ground (1.43:1 on white, 1.79:1 on a hovered row) where the opaque step held a flat 1.53:1 — track-vs-ground and thumb-vs-track cannot both be constant while the thumb is opaque, and ground legibility wins because it decides whether the control reads as a control at all.

**The `SegmentedControl` indicator is larger.** The frame around the selected thumb went from 4px to 3px (`inset-y-[3px]` on the indicator, `p-[3px]` on the list), so the thumb is 30px tall instead of 28px. Since the thumb's own 1px rim occupies the innermost pixel of that frame, 2px of bare track is what you see.

**The `SegmentedControl` thumb's focus ring is now the shared `ui-state-focus`.** It previously hand-rolled only the outline, so it missed the other half of that utility — firming `--ui-border-color` to the opaque ring colour — and read noticeably lighter than every other focused control. A focused thumb and a focused `Input` now resolve identically: 3px `outline-ring/50` at `outline-offset-0`, plus a 1px opaque `oklch(0.52 0.008 54)` rim. The ring stays outside the thumb, and 3px is the minimum frame that clears it: the list is a scroll container clipping at its padding box, so that padding is the only room an outset ring can grow into. Below 3px the first and last thumbs get a visibly shaved ring.

If you use `bg-control` in your own code, note that it is now translucent: two stacked elements that both carry it composite into a darker track than the token specifies.
