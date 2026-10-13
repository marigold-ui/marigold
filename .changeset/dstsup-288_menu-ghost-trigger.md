---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix(Menu): make the trigger match ghost buttons inside button containers

A labelled `Menu` in an `ActionBar` did not look or hover like the `Button`s next to it. Two things were off.

The trigger's `ghost` variant hovered with the opaque `ui-state-hover`, a light fill with dark text, while a ghost `Button` uses the translucent `ui-state-hover-ghost`. On the dark ActionBar the trigger lit up as a light block. It now uses `ui-state-hover-ghost` as well.

The trigger also ignored the context that button containers pass to their buttons, so it kept the default look unless `variant="ghost"` was set by hand. It now takes that context like `Button` and `ActionMenu` do: the `ghost` variant, the size, the disabled state and the container's placement class reach it inside `ActionBar`, `ButtonGroup`, `Panel.Header`, `Accordion` header actions, `SelectList` and `ListView`. A `variant` or `size` set on the `Menu` still wins. The trigger only has a `default` and a `ghost` look, so any other variant a container passes down, such as the `secondary` a `ButtonGroup` uses, keeps the default look.
