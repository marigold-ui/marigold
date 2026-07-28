---
'@marigold/theme-rui': patch
---

Stop the disabled state from painting a fill onto controls that have none.

`ui-state-disabled` sets its background as a *reset* — it replaces the control's
own surface with a flat neutral so a tinted control desaturates and reads as out
of play. On a destructive Panel that strips 92% of the chroma (0.032 → 0.0025),
which is exactly what it should do.

A ghost or link control has no surface to replace, so the reset *added* one — and
an opaque, white-calibrated neutral cannot sit on an arbitrary ground. On
`ui-contrast` a disabled or loading ghost Button painted a near-white pill at
**15.62:1** against the bar, carrying **2.08:1** text. This is the defect
DST-1590 was filed for; it was live in the docs via the ActionBar, which
cascades `variant="ghost"` onto its children.

Those controls now set `--ui-disabled-fill: transparent` and keep the rest of the
treatment. The state rides on `text-disabled`, which is a clear step down on
every ground:

| ground | resting text | disabled text |
| --- | --- | --- |
| surface | 17.28 | 2.31 |
| page | 15.62 | 2.08 |
| contrast | 16.57 | 7.49 |

Affects `Button` variants `ghost`, `destructive-ghost` and `link`, and the
ActionBar's clear button.

An alpha veil was measured and rejected. A veil preserves the fill beneath it, so
on `ui-contrast` — where polarity flips to the light-base ramp — a veil over a
light tinted fill changes it by **1.01:1**, i.e. not at all. Polarity derived
from the ground is the wrong input for a control carrying its own opaque fill,
so the veil-vs-reset split the ticket sketched is not needed: a control either
has a resting fill or it does not, and that is a property of the control rather
than a choice at the call site.

`--color-disabled-surface` itself is unchanged, so a disabled fill still measures
1.000:1 against the page ground for controls that legitimately paint one.
