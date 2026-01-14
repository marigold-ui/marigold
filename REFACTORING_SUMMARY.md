# Surface Styling Refactoring Summary

## Overview

Successfully refactored the `.surface` CSS class to use a single-element approach with gradient borders and layered shadows, eliminating the need for wrapper elements and `::before` pseudo-elements.

## Changes Implemented

### 1. Core CSS Utilities ([themes/theme-rui/src/utils.css](themes/theme-rui/src/utils.css))

#### `.surface` Class

- **Before**: Used `::before` pseudo-element with `box-shadow`, requiring wrapper elements for `<input>` elements
- **After**: Single-element implementation using:
  - Gradient borders via `background-clip: padding-box` and `background-origin: border-box`
  - Border gradient from `--color-surface-border` (top) to `oklch(from var(--color-surface-border) calc(l - 0.15) c h)` (bottom)
  - Layered shadows (Josh Comeau approach):
    ```css
    box-shadow:
      0 1px 1px hsl(0deg 0% 0% / 0.075),
      0 2px 2px hsl(0deg 0% 0% / 0.075),
      0 4px 4px hsl(0deg 0% 0% / 0.075),
      0 8px 8px hsl(0deg 0% 0% / 0.075);
    ```

#### `.surface-input` Class

- **Status**: Deprecated (marked with `@deprecated` comment)
- Padding and text styles now applied directly in component styles

#### State Classes

- **`.surface-error`**: Updated to use gradient border with destructive colors
- **`.surface-has-error`**: Updated to use gradient border with destructive colors
- **`.state-focus`**: Enhanced with gradient border using ring colors
- **`.state-focus-borderless`**: Unchanged

#### Elevation Classes

- **`.elevation-raised`**: Lighter layered shadows (opacity 0.06)
  ```css
  box-shadow:
    0 1px 2px hsl(0deg 0% 0% / 0.06),
    0 2px 4px hsl(0deg 0% 0% / 0.06),
    0 4px 8px hsl(0deg 0% 0% / 0.06),
    0 8px 16px hsl(0deg 0% 0% / 0.06);
  ```
- **`.elevation-overlay`**: Heavier layered shadows (opacity 0.1)
  ```css
  box-shadow:
    0 2px 4px hsl(0deg 0% 0% / 0.1),
    0 4px 8px hsl(0deg 0% 0% / 0.1),
    0 8px 16px hsl(0deg 0% 0% / 0.1),
    0 16px 32px hsl(0deg 0% 0% / 0.1);
  ```

### 2. Component Style Updates

#### Form Input Components

All form input components updated to apply `.surface` directly to the input element with padding and text styles:

- **[Input.styles.ts](themes/theme-rui/src/components/Input.styles.ts)**
  - Moved `.surface` from container to input element
  - Added padding: `px-[calc(--spacing(3)-1px)] py-[calc(--spacing(2)-1px)]`
  - Added text styles: `text-foreground placeholder:text-placeholder text-sm`

- **[DateField.styles.ts](themes/theme-rui/src/components/DateField.styles.ts)**
  - Moved `.surface` from field container to input element
  - Added padding and text styles to input

- **[TextArea.styles.ts](themes/theme-rui/src/components/TextArea.styles.ts)**
  - Moved `.surface` from container to textarea element
  - Added padding and text styles to textarea

- **[Select.styles.ts](themes/theme-rui/src/components/Select.styles.ts)**
  - Removed duplicate `.surface-input` reference
  - Added padding and text styles directly to select element

- **[NumberField.styles.ts](themes/theme-rui/src/components/NumberField.styles.ts)**
  - Moved `.surface` from group container to input element
  - Added padding and text styles to input

#### Container Components

These components continue to use `.surface` for container styling (no changes needed):

- Toast
- Dialog
- Calendar
- FileField

## Technical Benefits

1. **Simplified Component Structure**: No longer need wrapper elements for form controls
2. **Single-Element Styling**: `.surface` works on both containers and input elements
3. **Better Maintainability**: Consistent gradient border and shadow implementation
4. **CSS Performance**: Fewer DOM elements and pseudo-elements to render
5. **Accessible Design**: Maintains visual hierarchy through layered shadows

## Visual Impact

- Gradient borders provide subtle depth with lighter top and darker bottom edges
- Layered shadows create natural, realistic depth perception
- Elevation levels clearly distinguish surface hierarchy
- State changes (focus, error, disabled) remain visually consistent

## Build Verification

✅ All packages build successfully  
✅ No compilation errors  
✅ Theme-rui builds correctly with all changes

## Migration Notes

For any custom components using `.surface` and `.surface-input`:

1. Apply `.surface` directly to the input/textarea element
2. Add padding styles: `px-[calc(--spacing(3)-1px)] py-[calc(--spacing(2)-1px)]`
3. Add text styles: `text-foreground placeholder:text-placeholder text-sm outline-none`
4. Remove wrapper elements that were only used for surface styling

## References

- [Josh Comeau's Designing Shadows](https://www.joshwcomeau.com/css/designing-shadows/)
- CSS `oklch()` relative color syntax for gradient calculation
- CSS `background-clip` and `background-origin` for gradient borders
