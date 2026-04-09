---
'@marigold/system': patch
'@marigold/icons': patch
'@marigold/theme-rui': patch
---

Fix CJS export paths pointing to non-existent `.js` files. Since tsdown 0.16.0, output uses `.cjs` extensions but `main`, `types`, and `exports` fields were never updated to match.
