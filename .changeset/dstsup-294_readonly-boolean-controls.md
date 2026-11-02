---
'@marigold/theme-rui': minor
---

fix(DSTSUP-294): give read-only Checkbox, Radio and Switch a look of their own

A read-only Checkbox, Radio or Switch used to be pixel for pixel an editable one. Its read-only state only turned off the hover edge and set `cursor-default`, so at rest the only way to find out a control could not be changed was to click it and watch nothing happen. `disabled` was no substitute: a disabled checked box draws its mark at about 2:1, and a disabled control cannot be focused, so people using a screen reader could not reach its value either.

All three now paint their read-only state:

- **Unchecked, unselected, off:** the box fills with `control`, the same resting fill an unselected Switch groove already uses, so it no longer reads as an empty box waiting for a click. The Switch, whose groove already rests on `control`, instead paints the 2px rim it was already reserving for the thumb inset.
- **Checked, indeterminate, selected, on:** the fill drops to the new `selected-readonly` token, four rungs quieter than `selected-bold`. The two fills read 4.75:1 apart, which is the point: a read-only box has to be told from an editable one at a glance, not only from a disabled one. The value stays legible at 3.49:1 for the mark and 3.65:1 for the Switch thumb, past WCAG 1.4.11's 3:1, and the fill sits 3.29:1 off `disabled-surface` so the two states never collapse into each other.
- **Interaction:** no hover change and `cursor-default`, as before. The focus ring stays, because a read-only control is still focusable and still announces `aria-readonly`.

New token: `--color-selected-readonly`. A theme that overrides `selected-bold` will probably want to override this alongside it.
