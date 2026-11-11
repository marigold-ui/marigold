---
'@marigold/cli': patch
---

fix(ai-readiness): fail `marigold validate` for a directory or an unsupported file

`marigold validate src/` and `marigold validate styles.css` used to exit `0` with a list of "check failed" warnings, which reads as a clean result in an automatic fix loop. Both now exit `1` and say what to pass instead: one `.ts`, `.tsx`, `.js` or `.jsx` file per run.
