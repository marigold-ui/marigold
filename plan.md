# Plan: Migrate Surface Class to Background-Clip Gradient Borders

The surface class currently uses a `::before` pseudo-element with an inset shadow to create subtle depth. This plan migrates it to use `background-clip` (border and padding) to achieve a gradient border effect instead, which is a more modern CSS approach that eliminates the need for the pseudo-element while maintaining visual impact.

## Steps

1. Update the `surface` utility class in `themes/theme-rui/src/utils.css` to use `background-clip` with a gradient border instead of the `::before` shadow approach
2. Implement the gradient border using layered backgrounds: one for the border gradient and one for the content background, utilizing `background-clip: border-box` and `background-clip: padding-box`

3. Remove or adjust the `::before` pseudo-element rules since the gradient border effect will now be achieved through backgrounds directly

4. Verify that all `surface` utility variants (`surface-error`, `surface-has-error`) still work correctly with the new implementation

5. Update component wrappers (Input, DateField, etc.) that currently require the `::before` pseudo-element—they may no longer need the extra wrapper element if the gradient is part of the background stack

6. Test visual consistency across all components using the `surface` utility to ensure the gradient border effect matches or improves upon the current shadow-based appearance

## Further Considerations

1. **Visual Appearance**: Should the gradient border be a subtle gradient (e.g., border color with transparency changes) or a more prominent colored gradient? This affects the token definitions needed.

2. **Shadow Elevation**: The current approach combines surface shadows with elevation utilities. Should the new implementation preserve the `::before` shadow for elevation effects (`elevation-raised`, `elevation-overlay`), or integrate elevation into the background-clip approach?

3. **Component Structure**: Will removing the `::before` requirement allow simplification of wrapper components like `<Textarea>` and `<DateInput>`, or should the wrappers remain for other styling purposes?

## Current Implementation Context

### Current Surface Class Implementation

```css
@utility surface {
  @apply relative;
  @apply bg-surface bg-clip-padding;
  @apply border-surface-border rounded-surface border;
  @apply transition-[box-shadow,border];

  /* ::before */
  @apply before:shadow-surface before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-surface)-1px)];
}
```

### Key CSS Tokens

```css
--color-surface: var(--color-white);
--color-surface-border: var(--color-stone-300);
--radius-surface: var(--radius-lg);
--shadow-surface: 0 1px color-mix(in srgb, #000 10%, transparent);
```

### Related Variants

- `surface-error` - Applies destructive border color for invalid elements
- `surface-has-error` - Applies destructive border when child element is invalid
- `elevation-raised` - Lowest elevation level (uses shadow-xs)
- `elevation-overlay` - Highest elevation level (uses shadow-lg)

### Components Using Surface Utility

- Input
- DateField
- Button
- Card
- Calendar
- Menu
- Accordion
- Dialog
- Tag
- ContextualHelp

Most interactive surfaces use: `surface has-default-state:elevation-raised`
Overlay surfaces use: `surface elevation-overlay util-scrollbar`
