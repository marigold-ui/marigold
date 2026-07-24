---
'@marigold/components': patch
---

`Title` `level` now accepts the string form (`level="2"`) in addition to a
number, matching `Headline`. The two heading primitives now share one `level`
type. Non-breaking: existing numeric `level={2}` usage is unaffected.
