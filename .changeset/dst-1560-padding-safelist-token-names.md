---
'@marigold/theme-rui': patch
---

fix(DST-1560): correct the `@source inline` padding safelist to the real spacing tokens

The padding safelist in `styles.css` still used the pre-rename vocabulary `{compact, tight, regular, relaxed, spacious}`, but the spacing tokens were long ago renamed to `{tight, snug, regular, relaxed, loose}`. As a result `compact`/`spacious` force-generated dead utility classes (resolving to undefined `--spacing-*` vars), while the real `snug`/`loose` tokens were never safelisted and so were unavailable in scanner-excluded stories and in the (unscanned) docs app. The leading family-less line was also stale — it predates the `square`/`squish`/`stretch` split.

Replaced the three lines with the three inset-padding families (`square`/`squish`/`stretch`) using the real size names, so utility classes like `p-squish-relaxed` resolve to a concrete value and the full inset vocabulary is available where the scanner can't see it.
