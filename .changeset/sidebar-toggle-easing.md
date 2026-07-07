---
'@marigold/components': patch
---

style(Sidebar): remove the overshoot from the toggle icon animation

The sidebar toggle icon's panel/chevron animation eased with a spring-like
overshoot bezier. It now settles on `ease-out-quint`, matching the theme's
motion register — fast start, smooth stop, no bounce.
