---
'@marigold/theme-rui': patch
'@marigold/components': patch
'@marigold/system': patch
---

fix(DST-1482): make the `width` prop size field components again

Setting `width` on a field component (`<Select>`, `<TextField>`, `<NumberField>`, …) had no visible effect — the field sized to its content and consumers had to wrap it in an extra element. `FieldBase` sets the `--field-width` CSS variable for its child field element to consume via `w-(--field-width)`, but the variable was registered with `@property … { inherits: false }`, so it never reached the child and `width` fell back to `auto`.

`--field-width` is now registered with `inherits: true`, restoring the intended parent→child handoff. The same-element layout variables (`--width`, `--max-width`, `--height`, `--container-width`) keep their non-inheriting leak protection.

Also clarifies in the prop docs that numeric `width` values are spacing-scale tokens, not pixels: `width={64}` resolves to `calc(var(--spacing) * 64)` ≈ 16rem (256px).
