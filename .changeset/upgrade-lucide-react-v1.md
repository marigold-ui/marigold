---
'@marigold/components': patch
---

chore([DST-1290]): Upgrade `lucide-react` from v0.575.0 to v1.x

Upgraded `lucide-react` to the stable v1 API, which brings ~32% bundle size reduction and default `aria-hidden` on icons.
No icon renames or removals affect the codebase since no brand icons from lucide are used.
