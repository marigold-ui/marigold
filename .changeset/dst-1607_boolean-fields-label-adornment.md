---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': minor
'@marigold/docs': patch
---

fix(DST-1607): align boolean-field controls to the first line of their label

A `<Badge variant="master">` placed inline in a `<Checkbox>` label left the box sitting 2px above the text it belongs to. The box was not the problem: `Checkbox` and `Radio` anchor their control to the **first line** of the label with `items-start`, which is correct — it is what keeps the box on line one of a label that wraps. The problem was the line. The label line is `text-sm leading-4` (16px); a default `Badge` is 20px (18px line box plus 1px borders), so the badge inflated the first line and the 16px control, pinned to its top, stopped reaching the line's optical centre.

Flipping to `items-center` fixes the badge and breaks wrapping labels — the control floats to the middle of the block, 32px off a five-line label. So the fix keeps `items-start` and stops tall decorations from inflating the line.

**`Badge` gains `size="inline"`** — 16px tall, sized to sit *inside* a line of text rather than next to one, with the access icon scaled to match. The default size is unchanged.

**`Checkbox`, `Radio` and `Switch` gain a `labelAdornment` slot.** Pass the badge there instead of building it into the label:

```tsx
<Checkbox
  label="Enable early bird pricing"
  labelAdornment={
    <Badge variant="master" size="inline">
      Master
    </Badge>
  }
/>
```

The slot takes the height of the label's line (`1lh`, so it follows the theme) and centres the decoration in it. A decoration that fits lands dead on the line; one that does not overflows symmetrically instead of pushing the line apart, so the control stays put either way — the guardrail holds even if a consumer passes a default-sized badge. Those classes live in the component, not in a theme file, so a theme cannot reopen the bug.

**`Switch` carried the mirror of the same bug** and is now consistent with the other two. It used `items-center`, so a wrapping `variant="settings"` label dropped the track to the middle of the block instead of the first line — measured 28.5px off. It also rendered its label through the shared `Label`, whose `leading-none` gives a 14px line against a 16px track; it now uses its own label slot with a 16px line box, matching `Checkbox` and `Radio`. The accessible name is unchanged — it comes from the wrapping `<label>`'s text either way — and single-line switches keep their exact height and position.

Checkbox's and Radio's label rows moved from `items-center` to `items-start`, which is identical for a single-line label and correct for a wrapping one.

`WithBadge` and `LongMultilineLabel` stories for all three components pin both cases under Chromatic, each with a test asserting the control is within 0.5px of the first line's centre.

**Theme authors:** `Switch` has a new `label` style slot.
