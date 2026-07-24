---
'@marigold/components': patch
---

fix(DST-1642): keep the Slider thumb from being clipped at the track ends

The Slider thumb is centered on the track position, so at its min/max values it overhangs the track ends by half its width. Inside a scroll container such as `Drawer.Content` — whose `overflow-y: auto` promotes `overflow-x` to a clipping value — the overhang was sliced off, leaving a half-circle thumb (and it will be clipped unconditionally once `Drawer.Content` gains a `bleed` prop with no horizontal padding). The track is now inset by half the thumb width so the thumb always stays within the Slider's own box, independent of any ancestor padding.
