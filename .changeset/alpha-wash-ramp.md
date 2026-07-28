---
'@marigold/theme-rui': minor
---

Add the two-polarity alpha wash ramp (`--color-charcoal-a-*` / `--color-charcoal-b-*`).

An alpha fill only adapts within one polarity — a dark-base wash rides light grounds and vanishes on dark ones, and a light-base wash does the reverse — so there are two ramps rather than one, with alphas solved per polarity to a shared contrast target instead of shared as numbers.

Four rungs, not five: there are exactly four wash jobs in the system (`muted`, `focus-highlight`, `hover`, `selected`). Every rung sits under 3:1 on purpose — a wash reinforces a state, it is never the thing that identifies one.
