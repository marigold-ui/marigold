---
'@marigold/theme-rui': minor
---

Repoint the four wash jobs onto the alpha ramp, and flip polarity on dark surfaces.

`muted`, `focus-highlight`, `focus-highlight-bold`, `hover` and `selected` now name the alpha ramp instead of opaque charcoal rungs, and `ui-contrast` restates them against the light-base ramp so every wash beneath a dark surface flips with it.

On white this is a no-op — the alphas were solved to the rungs these tokens used to name and measure within 0.007 of them. It fixes the other two grounds:

| job | white | page | contrast |
| --- | --- | --- | --- |
| `muted` | 1.042 → 1.044 | 1.061 → 1.046 | 16.58 → 1.054 |
| `focus-highlight` | 1.106 → 1.110 | **1.000 → 1.115** | 15.62 → 1.123 |
| `hover` | 1.266 → 1.269 | 1.144 → 1.269 | 13.65 → 1.268 |
| `selected` | 1.531 → 1.524 | 1.384 → 1.519 | **11.28 → 1.535** |

Two defects fall out of that. `focus-highlight` was `charcoal-100` and so is `background`, so a focus tint on the page ground was 1.000:1 — absent, not weak. And on a dark surface the opaque light rungs did not vanish, they blew out: 11–16:1 painted a near-white bar, on which the surface's own light text measured 1.00–1.47:1. Text on every wash now clears 4.5:1 on all three grounds (10.3–16.6:1).

`control` stays opaque — it is a bold marker, not a wash. `disabled-surface` is unchanged pending the veil-vs-reset decision, so a disabled fill still measures 1.000:1 on the page ground.

Note for theme authors adding a dark surface of their own: restate the wash tokens on it, rather than reaching for a shared indirection layer. `var()` inside a custom-property declaration is substituted where the declaration applies, so a `--color-hover: var(--color-wash-200)` written in `:root` resolves against `:root`, and descendants inherit the already-resolved colour — repointing `--color-wash-200` further down the tree has no effect on it.
