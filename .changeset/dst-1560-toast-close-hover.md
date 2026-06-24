---
'@marigold/theme-rui': patch
---

fix(DST-1560): restore the `Toast` close-button hover state

The Toast close button kept its `transition-[color,box-shadow]` but lost its hover declaration, so it animated nothing on hover. Added `hover:text-foreground` so the icon darkens on hover, consistent with the system-wide convention that color (not background) animates on interactive controls.
