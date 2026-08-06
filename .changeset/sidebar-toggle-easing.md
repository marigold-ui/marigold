---
'@marigold/components': patch
---

style(DST-1586): remove the overshoot from the sidebar toggle icon animation

The sidebar toggle icon's panel/chevron animation eased with a spring-like
overshoot bezier. It now settles on `ease-out-quint`, matching the theme's
motion register — fast start, smooth stop, no bounce.
