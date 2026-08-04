---
'@marigold/components': minor
---

feat(DST-1460): animated open/close caret in `Accordion.Header`

`Accordion.Header` now uses the new `MorphCaret` icon, which smoothly animates between the closed (down) and open (up) states by morphing its SVG `d` path. Respects `prefers-reduced-motion`. The unused `ChevronDown` icon has been removed.
