# Semantic Spacing Design System - Design Log

**Date**: December 8, 2025  
**Branch**: dst-1001-semantic-spacing-ui  
**Context**: Refactoring spacing tokens for the Marigold UI theme-rui

---

## Inset Padding Scale Structure

Based on analysis of 40+ components in `themes/theme-rui/src/components`, we've designed a semantic inset (padding) scale organized into three types:

### **Inset Square (Equal X and Y)**

Used for: Cards, containers, uniform spacing

```css
--inset-square-compact: --spacing(1) /* p-1   = 4px   */
  --inset-square-tight: --spacing(2) /* p-2   = 8px   */
  --inset-square-regular: --spacing(3) /* p-3   = 12px  */
  --inset-square-relaxed: --spacing(4) /* p-4   = 16px  */
  --inset-square-spacious: --spacing(6) /* p-6   = 24px  */;
```

**Current usage mapping:**

- `compact`: Menu container (p-1), Calendar (p-2)
- `tight`: FileField item (p-2), Menu items (p-2)
- `regular`: Table cells (p-3)
- `relaxed`: Card (p-4), Toast (p-4), FileField dropZone (p-4)
- `spacious`: Dialog (p-6)

---

### **Inset Squish (Y smaller than X)**

Used for: Buttons, inputs, horizontal-oriented interactive elements

```css
--inset-squish-compact: --spacing(1) --spacing(2)
  /* py-1   px-2   = 4px 8px    */ --inset-squish-tight: --spacing(1.5)
  --spacing(2) /* py-1.5 px-2   = 6px 8px    */
  --inset-squish-regular: --spacing(2) --spacing(3)
  /* py-2   px-3   = 8px 12px   */ --inset-squish-relaxed: --spacing(2)
  --spacing(4) /* py-2   px-4   = 8px 16px   */
  --inset-squish-spacious: --spacing(4) --spacing(6)
  /* py-4   px-6   = 16px 24px  */;
```

**Current usage mapping:**

- `compact`: Badge (px-2), Tag (px-2)
- `tight`: ListBox items (py-1.5 px-2), Tabs (py-1.5 px-3)
- `regular`: Input fields (py-2 px-3), Calendar select (py-2 px-3), NumberField (py-2 px-3)
- `relaxed`: Buttons (py-2 px-4), Calendar listbox button (py-2 px-4)
- `spacious`: Drawer sections (py-4 px-6), SectionMessage (py-4 px-3)

---

### **Inset Stretch (X smaller than Y)**

Used for: Vertical navigation, sidebars, vertical-oriented elements

```css
--inset-stretch-compact: --spacing(2) --spacing(1)
  /* px-2   py-1   = 8px 4px    */ --inset-stretch-tight: --spacing(2)
  --spacing(1.5) /* px-2   py-1.5 = 8px 6px    */
  --inset-stretch-regular: --spacing(3) --spacing(2)
  /* px-3   py-2   = 12px 8px   */ --inset-stretch-relaxed: --spacing(4)
  --spacing(2) /* px-4   py-2   = 16px 8px   */
  --inset-stretch-spacious: --spacing(6) --spacing(4)
  /* px-6   py-4   = 24px 16px  */;
```

**Current usage mapping:**

- `compact`: DatePicker (pr-3 only - special case)
- `tight`: Less common in current codebase
- `regular`: Accordion header card variant (px-4), Accordion content card (px-4)
- `relaxed`: Less common, but could be used for tall vertical buttons
- `spacious`: Inverse of Drawer sections for vertical contexts

---

## Scale Rationale

1. **Progressive scale**: Each step increases by ~1.5-2x, providing clear visual hierarchy
2. **Common values**: Aligns with the most frequently used padding patterns in the codebase
3. **Flexibility**: The 5-step scale covers the range from compact UI (4px) to spacious layouts (24px)
4. **Consistency**: Same naming across all three types makes it easy to remember and use
5. **Based on data**: Values are derived from actual current usage patterns in 40+ components

---

## Block Size Strategy

### Separating Height from Padding

**Problem**: How to ensure elements like buttons and inputs align perfectly when using flexible inset padding?

**Solution**: Define component height tokens separately from inset padding.

### Block Size Tokens

```css
/* Block (height) tokens - for interactive elements */
--block-compact: 2rem; /* 32px - Small buttons/inputs */
--block-regular: 2.25rem; /* 36px - Default buttons/inputs */
--block-relaxed: 2.5rem; /* 40px - Large buttons/inputs */
--block-spacious: 2.75rem; /* 44px - Extra large */
```

### Usage Pattern

```css
/* Button */
.button-default {
  min-height: var(--block-regular); /* or h-button */
  padding: var(--inset-squish-relaxed); /* py-2 px-4 */
}

/* Input */
.input {
  height: var(--block-regular); /* or h-input */
  padding: var(--inset-squish-regular); /* py-2 px-3 */
}
```

### Why This Works Better

1. **Consistent alignment**: Elements align perfectly regardless of padding
   - Buttons and inputs sit on the same baseline even with different padding values
   - No need to calculate padding to achieve specific heights
2. **Flexible content**: Content can grow/shrink within the fixed height
   - Icons, text, and other content adjust naturally within the container
   - `min-height` allows elements to expand if needed while maintaining minimum size
3. **Easy to maintain**: Change height independently of padding
   - Adjust visual density (padding) without breaking alignment
   - Swap inset tokens (compact/relaxed) while maintaining consistent height
4. **Visual rhythm**: Ensures uniform baseline grid
   - All interactive elements follow predictable height increments
   - Creates visual harmony across different component types

### Current State

The codebase already uses this pattern in `theme.css`:

```css
--spacing-input: 2.25rem; /* Used as h-input */
--spacing-button: 2.25rem; /* Used as h-button */
--spacing-button-small: 2rem;
--spacing-button-large: 2.5rem;
```

### Recommended Refactor

Rename for clarity to distinguish from spacing tokens:

```css
/* OLD (confusing - spacing implies gap/margin) */
--spacing-input: 2.25rem;
--spacing-button: 2.25rem;

/* NEW (clear intent) */
--block-input: 2.25rem;
--block-button: 2.25rem;
--block-button-small: 2rem;
--block-button-large: 2.5rem;
```

---

## Terminology Clarification

- **Inset**: Internal spacing (padding) - space inside an element
- **Inline**: Spacing between elements on the same line (gap, margin-inline)
- **Block**: Element dimensions (height, width) or spacing between stacked elements (margin-block)

This makes it clear:

- Use `--block-*` for height/width
- Use `--inset-*` for padding
- Elements stay aligned, and the inset scale remains flexible and semantic

---

## Most Common Padding Patterns (from analysis)

1. **p-2** (8px) - Used across 7+ components for compact spacing
2. **px-3, py-2** (12px, 8px) - Standard for input elements
3. **px-4, py-2** (16px, 8px) - Standard button padding
4. **p-4** (16px) - Larger containers like Card, Toast
5. **px-6, py-4** (24px, 16px) - Drawer sections

### Padding Categories

- **Tight** (1-2): Menu containers, compact lists
- **Standard** (2-4): Inputs, buttons, list items
- **Generous** (4-6): Cards, dialogs, drawers

---

## Next Steps

1. Implement inset tokens in `theme.css`
2. Rename `--spacing-input/button` to `--block-*` tokens
3. Create utilities for inset scales (e.g., `p-inset-square-regular`)
4. Document usage guidelines for when to use square vs squish vs stretch
5. Gradually migrate components to use semantic tokens
6. Update Tailwind config if needed to support new token names

---

## References

- Analysis document: `/padding-analysis.md`
- Theme file: `/themes/theme-rui/src/theme.css`
- Component styles: `/themes/theme-rui/src/components/*.styles.ts`
