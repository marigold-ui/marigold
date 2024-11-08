---
"@marigold/components": patch
---

fix: Remove `isOpen` from `<Select>`

The `isOpen` prop was set by default. Remove it. Only required when controlled.
