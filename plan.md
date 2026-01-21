# Plan: Refactor Surface Styling to Single-Element Approach

Refactor the CSS `.surface` class to use `background-clip` and `background-origin` with layered shadows and gradient borders, enabling single-element styling for all components while maintaining visual depth and consistency.

## Steps

1. **Refactor `.surface` CSS class** in `themes/theme-rui/src/utils.css`
   - Replace `::before` pseudo-element with gradient borders using `background-clip: padding-box` and `background-origin: border-box`
   - Define gradient from `--color-surface-border` (top) to darker surface border calculated via `oklch(from var(--color-surface-border) calc(l - 0.15) c h)` (bottom)
   - Implement layered `box-shadow` following Josh Comeau's approach: multiple shadows with increasing blur radius and decreasing opacity for subtle depth
   - Remove dependency on `.surface-input` class structure

2. **Deprecate `.surface-input` utility class**
   - Remove from codebase as `.surface` now works on `<input>` elements directly
   - Deprecated `.surface-input`, the `.surface` class should be enough
   - Ensure padding and text styling are properly defined in `.surface` for form controls, use padding what was previously on `.surface-input`

3. **Update state classes** (`.surface-error`, `.surface-has-error`, `.state-disabled`, `.state-readonly`, `.state-focus`, `.state-focus-borderless`)
   - Verify color/border values work with gradient border approach
   - Test elevation overrides with new layered shadow implementation
   - Adjust shadow layers if needed for state clarity

4. **Update elevation classes** (`.elevation-raised`, `.elevation-overlay`)
   - Redefine shadow layers to override `.surface` shadows correctly
   - `.elevation-raised` uses lighter layered shadow; `.elevation-overlay` uses heavier layered shadow
   - Ensure consistent light source ratios across elevation levels

5. **Refactor Input component** and related form controls
   - Apply `.surface` directly to `<input>` elements instead of wrapper
   - Simplify container structure to remove unnecessary wrapper divs where possible
   - Maintain prefix/suffix icon and action placement functionality
   - Test all input variants (text, number, search, etc.)

6. **Update all other components** using `.surface` class
   - Test each affected component (DateField, Select, TextArea, Card, Menu, Dialog, Toast, Accordion, etc.)
   - Verify visual consistency with new gradient border and layered shadow approach
   - Confirm elevation classes override shadows correctly in context

7. **Perform visual regression testing**
   - Screenshot key form components (Input, Select, DateField, TextArea, NumberField, FileField) in all states (default, focus, error, disabled, readonly)
   - Screenshot elevation-based components (Menu, Dialog, Toast, Drawer) to verify shadow layering
   - Compare against previous implementation to verify matching appearance

## Further Considerations

1. **oklch() calculation precision** – Test the `oklch(from var(--color-stone-300) calc(l - 0.15) c h)` formula to ensure the bottom gradient color is appropriately darker without being too harsh. Adjust the `0.15` value if visual testing shows it needs refinement.

2. **Layered shadow formula** – Define the shadow layers (e.g., `0 1px 1px`, `0 2px 2px`, `0 4px 4px` with varying opacity) based on Josh Comeau's approach. Should we match shadow hue to stone colors for authenticity?

3. **Component testing order** – Start with form inputs (Input, Select, TextArea), then overlay components (Menu, Dialog, Toast), then cards/containers to catch issues early.
