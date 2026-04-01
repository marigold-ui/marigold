---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(DST-1246): update Switch component layout and sizing to align with Checkbox and Radio

The Switch component previously rendered its label on the left and toggle on the right, which was inconsistent with Checkbox and Radio where the control sits on the left. When used together in forms, this created a visually misaligned layout.

**Layout**: Toggle now renders before the label (control on the left, label on the right), matching Checkbox and Radio. This ensures consistent visual alignment when Switch is used alongside other boolean controls in form layouts.

**Sizing**: Reduced the default track size from 24x40px to 16x28px and thumb from 20px to 12px. This brings the Switch closer in visual weight to Checkbox/Radio (16px), making it fit better in the flow of forms. A `large` size variant preserves the original dimensions for use cases that need a more prominent toggle.

**Description support**: Switch now accepts a `description` prop (help text rendered below the control), matching Checkbox's existing support. The description text aligns with the label text using CSS grid + subgrid, automatically adapting to any control size without hardcoded padding. Properly wired with `aria-describedby` for accessibility.

**Form support**: The `name` prop passes through to the underlying input for HTML form submission.

**Shared BooleanField**: Extracted a reusable `BooleanField` wrapper used by both Checkbox and Switch for consistent description rendering and `aria-describedby` wiring. Uses CSS grid with subgrid to align description text with label text across both components.

**Theme changes**: Checkbox and Switch container slots now use CSS grid layout (`grid grid-cols-[auto_1fr]`) instead of flexbox, with conditional subgrid via `group-data-[booleanfield]/booleanfield` when inside a BooleanField wrapper. This is theme-driven and automatically adapts to control sizes.
