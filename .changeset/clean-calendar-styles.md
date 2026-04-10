---
"@marigold/components": patch
"@marigold/theme-rui": patch
"@marigold/system": patch
---

refactor([DSTSUP-245]): Clean up Calendar styles

Move hardcoded Tailwind classes from Calendar component files into theme slots, reduce cell padding from `p-2` to `p-1`, and add new `calendarHeading` theme slot.
