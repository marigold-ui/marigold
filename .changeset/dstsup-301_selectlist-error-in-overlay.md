---
'@marigold/components': patch
---

fix(DSTSUP-301): stop SelectList, TagGroup and RangeCalendar crashing on an error inside a Dialog, and announce their help text

Inside a `Dialog`, `Drawer` or `Tray`, these fields threw `Invalid slot "errorMessage"` as soon as they showed an error, whether set through `error` or a `Form`'s `validationErrors`. Their help text read the overlay's text slots instead of the field's own. Each field now publishes its own slots, the way React Aria's fields do, so the error renders as it does outside an overlay.

Their description and error message are now also linked to the list or calendar through `aria-describedby`, so screen readers read them with the field.
