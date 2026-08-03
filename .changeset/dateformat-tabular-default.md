---
'@marigold/system': patch
---

fix(DST-1666): `DateFormat` applies its documented `tabular` default.

**What changed:**

- `tabular` now defaults to `true`, so `<DateFormat value={date} />` renders with `tabular-nums`. Previously the prop was destructured without a default, so it was `undefined` unless passed explicitly and the class was never applied.
- Opting out with `tabular={false}` no longer leaves an empty `class=""` attribute behind, matching `NumericFormat`.

**Why:**

Three places already documented the default as `true` — the `@default true` JSDoc that feeds the docs site props table, the prose in the `DateFormat` docs ("To disable it, set `tabular={false}`"), and `NumericFormat`, which has always defaulted it correctly. Only the implementation disagreed, so consumers reading the docs and relying on the default got misaligned digits in table columns with no indication why.

**Impact:**

This is a visible rendering change anywhere `DateFormat` is used without an explicit `tabular` prop, which in practice is everywhere — no call site in this repo passed it. Digits shift to uniform width, which is what the documentation always promised. Pass `tabular={false}` to keep proportional digits.
