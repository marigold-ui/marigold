---
'@marigold/theme-rui': patch
---

style(DST-1386): give `Checkbox`, `Radio` and `Switch` a hover affordance, and fix the indeterminate `Checkbox`.

Hovering an unselected `Checkbox` or `Radio` now darkens its border, and hovering an off-state `Switch` darkens its track. These were the only interactive controls in the theme without a hover state, so the hit area DST-1295 widened moved silently under the cursor. Selected, indeterminate, disabled and read-only controls are unchanged on hover — the bold accent already carries those states, and a read-only control should not advertise that it can be changed.

No new token. `Checkbox` and `Radio` step the alpha on `--color-control-border`, the idiom `ToggleButton` already uses, and the `Switch` steps `--color-control` — which has been alpha-based since DST-1672, so the opaque `--color-control-hover` the ticket originally proposed is not needed. All three land on the same perceived step: a ~1.4× contrast multiplier, matching `ToggleButton`'s.

On `Checkbox` the hover rule also excludes `focus-visible`. Both declarations set `border-color`, and the hover one compiles to a higher specificity, so without the exclusion hovering a keyboard-focused checkbox would keep the hover border instead of flipping to `--color-ring` — leaving the soft halo as the only marker of focus, which is 2.08:1 on its own and below the 3:1 a focus indicator needs. `Radio` and `Switch` need no such clause: neither flips its border on focus, so there is nothing for hover to outrank.

The `Switch` tint is a `background-image` rather than a `background-color`. The track keeps the `transition-colors` DST-1436 left it for the toggled state, and `background-image` is not a transitioned property, so hover lands instantly while switching on and off still eases.

Separately, an indeterminate `Checkbox` now renders the filled box it was always meant to have. Its three state declarations used `group-[indeterminate]`, whose arbitrary-variant syntax takes a selector — the bare word compiled to a type selector for a nonexistent `<indeterminate>` element, so the rules never matched and the box rendered white with a resting border. They now use the `group-indeterminate` variant, which reads the `data-indeterminate` React Aria actually renders.
