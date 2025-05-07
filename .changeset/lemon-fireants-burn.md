---
"@marigold/docs": major
"@marigold/components": major
"@marigold/theme-rui": minor
---

feat([DST-804]): Allow `Tag` to be used in forms and overhaul its docs

BREACKING CHANGE: Remove the `allowsRemoving` prop. This didn't had an effect for a while and to make it more clear removing is enabled, if there is a function set on the `onRemove` prop.
