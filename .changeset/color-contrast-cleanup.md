---
'@marigold/theme-rui': patch
---

Improve color contrast ratios to meet WCAG AA standards.

**Token changes (theme.css):**
- Bump `muted-foreground` from stone-500 to stone-600 (4.71:1 → 7.55:1)
- Bump `disabled-foreground` from stone-400 to stone-500 (2.37:1 → 4.71:1)
- Bump `placeholder` from stone-500 to stone-600 (4.71:1 → 7.55:1)
- Bump `access-master-foreground` from orange-500 to orange-700 (2.35:1 → 4.84:1)
- Bump `success` from green-500 to green-600 for white foreground contrast
- Change `warning` from yellow-400 to yellow-500 with dark foreground (stone-950) instead of white

**Component fixes:**
- Remove opacity modifiers (`/80`, `/70`) on muted-foreground in Calendar, ComboBox, Select, DatePicker, and Input
- Replace `text-foreground/60` in Table editable cells with `text-muted-foreground`
- Replace `marker:text-foreground/50` in List with `marker:text-muted-foreground`
- Replace `opacity-60` in Accordion icon and Menu item SVGs with `text-muted-foreground`
- Replace `disabled:opacity-50` in Tabs with `disabled:text-disabled-foreground`
- Replace hardcoded `bg-stone-300`/`bg-stone-800` in Table drop indicator with `bg-border`/`bg-brand` tokens
- Fix bug where `disabled:text-gray-50` made Input icons nearly invisible
