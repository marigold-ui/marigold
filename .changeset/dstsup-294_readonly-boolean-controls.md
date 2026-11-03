---
'@marigold/theme-rui': minor
---

fix(DSTSUP-294): give read-only Checkbox, Radio and Switch a look of their own

A read-only Checkbox, Radio or Switch used to be pixel for pixel an editable one. Its read-only state only turned off the hover edge and set `cursor-default`, so at rest the only way to find out a control could not be changed was to click it and watch nothing happen. `disabled` was no substitute: a disabled checked box draws its mark at about 2:1, and a disabled control cannot be focused, so people using a screen reader could not reach its value either.

All three now paint their read-only state by **dropping the fill** rather than lightening it, which is how Carbon and Salt draw theirs. A quieter fill was tried first and read as a variant instead of a state.

- **Checked, indeterminate, selected:** the box keeps its resting edge and loses its fill, and the mark paints `foreground` at about 17:1 instead of `selected-bold-foreground` on a dark ground. The outline against an editable control's solid `selected-bold` fill is the difference you see at a glance, and the value stays the most legible thing in the box.
- **Switch, on and off:** the track empties in both positions and keeps the 2px rim it was already reserving for the thumb inset. With no track fill left to carry the value, the thumb paints `foreground`, so the position still reads at about 17:1.
- **Unchecked, unselected:** unchanged. An empty box draws nothing but its edge, and read-only has no reason to repaint it. What tells it apart from an editable box is the missing hover and `cursor-default`, as before.
- **Interaction:** no hover change and `cursor-default`, as before. The focus ring stays, because a read-only control is still focusable and still announces `aria-readonly`.

No new token. An earlier iteration of this change added `--color-selected-readonly` and it is gone again, since the read-only state now reaches for `surface`, `control-edge` and `foreground`, which every theme already defines.
