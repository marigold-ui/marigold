---
'@marigold/system': patch
---

fix(DST-1434): suppress React hydration warnings for `DateFormat` and `NumericFormat` output. Intl formatting can legitimately differ between server and client (locale detection, ICU version differences in range separators), so the mismatch is expected and no longer fails hydration.
