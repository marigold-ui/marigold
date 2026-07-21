---
'@marigold/components': major
---

refa([DST-1281]): **Breaking change**: `<Tooltip>` no longer accepts `open`. Controlled visibility is only supported on `<Tooltip.Trigger>` (`open` / `onOpenChange`). Removes the internal React context that previously forwarded `open` from `<Tooltip>` to the trigger.
