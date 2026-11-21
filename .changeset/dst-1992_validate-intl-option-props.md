---
'@marigold/cli': patch
---

fix(DST-1992): `marigold validate` no longer rejects valid ES2022 `Intl` options on `DateFormat` and `NumericFormat`

`validate` could report props like `dateStyle` or `fractionalSecondDigits` on `<DateFormat>`, and `notation` or `signDisplay` on `<NumericFormat>`, as props that do not exist. They are valid: both components take the browser's `Intl` formatting options, and TypeScript accepts them.

Which props were affected depended on the app. The validator reads each component's props from the type declarations, and the TypeScript library it used for that came from TypeScript's ES5 default plus whatever the app's installed `@types` packages pulled in. Options from ES2021, such as `fractionalSecondDigits`, were rejected everywhere. Older ones, such as `dateStyle`, were rejected in apps without `@types/node`.

It now always loads the ES2022 library, the level its own TypeScript check targets, so the result no longer depends on the app's installed packages, and a prop that really does not exist is still reported. Options added after ES2022, such as `roundingMode` or `trailingZeroDisplay` on `<NumericFormat>`, are still reported. There is nothing to change in your app.
