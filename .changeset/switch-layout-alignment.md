---
'@marigold/components': major
'@marigold/theme-rui': major
---

feat(DST-1246): update Switch component layout and sizing to align with Checkbox and Radio

The Switch component previously rendered its label on the left and toggle on the right, which was inconsistent with Checkbox and Radio where the control sits on the left. When used together in forms, this created a visually misaligned layout.

**Layout**: Toggle now renders before the label (control on the left, label on the right), matching Checkbox and Radio. This ensures consistent visual alignment when Switch is used alongside other boolean controls in form layouts.

**Sizing**: Reduced the default track size from 24x40px to 16x28px and thumb from 20px to 12px. This brings the Switch closer in visual weight to Checkbox/Radio (16px), making it fit better in the flow of forms.

**Settings variant**: A new `variant="settings"` mirrors the default layout — label and description on the left, toggle on the far right. This is the common pattern used on settings/preferences pages. The variant is propagated to `BooleanField` so that grid columns and description placement adjust accordingly.

**Description support**: Switch now accepts a `description` prop (help text rendered below the control), matching Checkbox's existing support. The description text aligns with the label text using CSS grid + subgrid, automatically adapting to any control size without hardcoded padding. Properly wired with `aria-describedby` for accessibility.

**Form support**: The `name` prop passes through to the underlying input for HTML form submission.

**Shared BooleanField**: Extracted a reusable `BooleanField` wrapper used by both Checkbox and Switch for consistent description rendering and `aria-describedby` wiring. Uses CSS grid with subgrid to align description text with label text across both components.

## Breaking changes: custom theme migration

This release introduces a new required theme component `BooleanField` and changes the layout model of the `Checkbox` and `Switch` container slots from flexbox to CSS grid. **Custom themes must be updated or Checkbox/Switch will throw a runtime error.**

### 1. Add `BooleanField` to your theme (required)

`BooleanField` is a new multi-slot theme component used internally by both `Checkbox` and `Switch` to render descriptions. If your theme does not include it, any `Checkbox` or `Switch` with a `description` prop will throw:

```
Error: Component "BooleanField" is missing styles in the current theme.
```

Add the following to your theme's component styles:

```ts
import { cva } from '@marigold/system';

export const BooleanField = {
  container: cva({
    base: 'grid gap-x-2',
    variants: {
      variant: {
        default: 'grid-cols-[auto_1fr]',
        settings: 'grid-cols-[1fr_auto]',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  description: cva({
    base: 'mt-0.5',
    variants: {
      variant: {
        default: 'col-start-2',
        settings: 'col-start-1',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
};
```

- `container`: Defines the 2-column grid layout wrapping the control and its description. The `default` variant uses `grid-cols-[auto_1fr]` (control left, label right). The `settings` variant uses `grid-cols-[1fr_auto]` (label left, control right).
- `description`: Styles the description text wrapper. Placed under the label column via `col-start-2` (default) or `col-start-1` (settings). `mt-0.5` adds vertical spacing between the label row and description.

Then export it from your theme's component index file:

```ts
export { BooleanField } from './BooleanField.styles';
```

### 2. Update `Checkbox` container slot (required if customized)

The `Checkbox` container slot changed from flexbox to CSS grid with conditional subgrid support:

**Before:**
```ts
container: cva({ base: 'cursor-pointer read-only:cursor-default gap-2' }),
```

**After:**
```ts
container: cva({
  base: [
    'grid grid-cols-[auto_1fr] gap-x-2 items-center',
    'cursor-pointer read-only:cursor-default',
    'group-data-[booleanfield]/booleanfield:grid-cols-subgrid group-data-[booleanfield]/booleanfield:col-span-full',
  ],
}),
```

Key changes:
- `gap-2` changed to `gap-x-2` (column gap only, since row gap is now handled by `BooleanField.description`)
- `grid grid-cols-[auto_1fr] items-center` replaces the `flex items-center` that was previously hardcoded in the component
- `group-data-[booleanfield]/booleanfield:grid-cols-subgrid` and `group-data-[booleanfield]/booleanfield:col-span-full` enable subgrid when inside a `BooleanField` wrapper, so the description aligns with the label

### 3. Update `Switch` container slot (required if customized)

The `Switch` container slot also changed from minimal styles to CSS grid with subgrid:

**Before:**
```ts
container: cva({
  base: 'disabled:cursor-not-allowed disabled:text-disabled-foreground',
}),
```

**After:**
```ts
container: cva({
  base: [
    'grid gap-x-2 items-center',
    'disabled:cursor-not-allowed disabled:text-disabled-foreground',
    'group-data-booleanfield/booleanfield:grid-cols-subgrid group-data-booleanfield/booleanfield:col-span-full',
  ],
  variants: {
    variant: {
      default: 'grid-cols-[auto_1fr]',
      settings: 'grid-cols-[1fr_auto]',
    },
  },
  defaultVariants: { variant: 'default' },
}),
```

Key changes:
- Added `grid gap-x-2 items-center` (replaces `flex items-center gap-2` that was previously hardcoded in the component)
- Grid columns moved to `variant` to support both default and settings layouts
- Added subgrid support for BooleanField integration
