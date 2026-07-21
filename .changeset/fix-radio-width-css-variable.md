---
'@marigold/components': patch
---

fix(Radio): apply width via CSS variable instead of raw class name

`Radio` built its `width` class name from the raw token directly (e.g. `cn(width || groupWidth || 'w-full')`, where `width` could be a literal `"1/2"`), which Tailwind can't statically detect at build time, so no CSS was ever generated — setting `width` had no visible effect.

`Radio` now follows the same pattern already used by `FieldBase`/`TextField`/`NumberField`: a static `w-(--field-width)` class with the actual value injected via `createWidthVar`. Individual `Radio` items inside a sized `Radio.Group` now inherit the group's already-computed width instead of recomputing it, which previously caused a double-shrink (e.g. `width="1/2"` rendering at 1/4 instead of 1/2).