---
'@marigold/cli': patch
---

fix(DST-1992): `marigold validate` no longer rejects valid `Intl` options on `DateFormat` and `NumericFormat`

`validate` could report valid formatting options, such as `dateStyle` or `fractionalSecondDigits` on `<DateFormat>` and `notation`, `roundingMode` or `trailingZeroDisplay` on `<NumericFormat>`, as props that do not exist, depending on the packages installed in your app. They are accepted now, in every app, and a prop that really does not exist is still reported. `validate`'s TypeScript check now also accepts the newest JavaScript built-ins, such as `Array.prototype.toSorted`. Whether they run in your supported browsers is up to your own TypeScript setup and build. There is nothing to change in your app.
