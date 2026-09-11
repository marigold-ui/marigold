---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix(DSTSUP-277): give the DatePicker calendar button a symmetric hit area

The calendar trigger was `h-control pr-3` — 28×36px with all of its padding on the right. The icon sat **flush against the button's left edge**, so every pixel to the left of the 16px glyph belonged to the date input, not to the button. Approaching from above, below or the right worked; approaching from the left meant landing on the glyph itself. A customer reported the picker "hanging" for exactly this reason: they came at it horizontally from the left, missed by a pixel or two, and nothing happened.

The trigger is now the same control-sized square that `Input` already hands to `ComboBox` and `SearchField` — 36×36 with the icon centred, so there is 10px of slack on **every** side and the icon lands at the same inset as a ComboBox chevron.

Three things follow from making the box bigger:

- **The extra room has to be visible.** An invisible hit area is still "aim at the icon", so the whole box now takes a hover wash (`ui-state-hover-ghost`) alongside the existing icon darkening, the same affordance a ghost `Button` uses. It is suppressed while the trigger is disabled.
- **The trigger stays marked while the overlay is open.** The popover takes focus as soon as it opens, so the trigger keeps the hover surface on `aria-expanded`.
- **Focus is now visible on the button itself.** The field's `has-focus` ring fires for the date segments too, so it could never show *which* part held focus — tabbing to the calendar button looked identical to tabbing into the date. The button now draws its own inset ring (`ui-state-focus-item`, inset because the field is `overflow-hidden` and would clip an outline).

`ui-touch-hitbox` is gone from the trigger: it only guaranteed a 24×24 minimum, which a 36×36 button clears on its own.

`DateRangePicker` re-exports these styles, so it gets the identical fix.

The date input drops its right padding when an action is present (`DateField` and the `DateRangePicker` end input). The action box already centres its own icon, so the two insets would otherwise stack and push the icon 22px away from the text it belongs to — 12px further than every other field. With this, the text-to-icon gap is 10px, matching `ComboBox` exactly, and the fit-width `DateRangePicker` field is 4px narrower than before rather than 8px wider.

Visually the icon shifts 2px left in both components; nothing else moves.
