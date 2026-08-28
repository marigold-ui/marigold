---
'@marigold/components': patch
---

fix(DSTSUP-275): pick the file size unit from the file's magnitude

`<FileField>` rendered every selected file's size with a fixed megabyte divisor and two decimals — `(file.size / 1024 / 1024).toFixed(2)` — so anything under ~5 kB read `0.00 MB`. For consumers importing CSVs, where files are routinely 1–50 kB, the item description carried no information at all, and there was no way to override it from the outside: `<FileField>` owns the file list in internal state and renders the items itself.

Sizes now step through `B`, `kB`, `MB`, `GB` and `TB`, picking the unit that fits: a 2,400-byte CSV reads `2.34 kB`, a 2 MiB PDF reads `2 MB`, and a `0`-byte file reads `0 B`. Sizes past the top unit stay in `TB` rather than running off the end of the scale.

The step stays at 1024, which is what the field has always divided by, so a given file keeps the number it had before — only its unit and trailing zeros change (`0.50 MB` is now `512 kB`, `2.00 MB` is now `2 MB`).

The number is run through `Intl.NumberFormat` for the active locale, so a German consumer gets `2,34 kB` next to the field's already-localized labels.
