---
"@marigold/components": patch
---

refa: Remove icons dependency from components package

Make `@marigold/components` not depend on `@marigold/icons` since this might bloat the bundling.
