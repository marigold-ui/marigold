---
'@marigold/theme-rui': minor
---

Add the two-polarity alpha wash ramp (`--color-charcoal-a-*` / `--color-charcoal-b-*`) and the `--color-fill-*` indirection layer they feed.

An alpha fill only adapts within one polarity — a dark-base wash rides light grounds and vanishes on dark ones, and a light-base wash does the reverse — so there are two ramps rather than one, with alphas solved per polarity to a shared contrast target instead of shared as numbers.

Purely additive: `muted`, `focus-highlight`, `hover` and `selected` still point at the opaque charcoal rungs, so nothing changes visually. Repointing them is the next step of DST-1590.
