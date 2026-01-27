---
"@marigold/storybook-config": minor
"@marigold/components": minor
"@marigold/system": minor
"@marigold/theme-docs": minor
"@marigold/theme-rui": major
---

## 🎨 Changes

### 1. Refactored Surface Styling

**What changed:**
- Completely refactored the surface styling system to use `background-clip` and `background-origin` for gradient borders
- Improved contrast and depth across all surface-based components (inputs, cards, dialogs, etc.)
- **DateInput**: Added new `input` part for styling

**Technical Details:**
- New `ui-surface` utility class that works on single elements including `<input>`
- Gradient borders transition from lighter (top) to darker (bottom) for improved depth perception
- Removed deprecated utilities: `util-focus-*`, `util-disabled`
- Introduced new state utilities: `ui-state-focus`, `ui-state-disabled`, `ui-state-error`, `ui-state-readonly`
- New elevation system: `ui-elevation-raised`, `ui-elevation-overlay`

### 2. Semantic Spacing System (DST-1001)

**New Relational Spacing Scale:**
Introduced semantic tokens that describe the strength of relationships between elements:
- `joined` (0.25rem) - Elements attached as a single unit
- `tight` (1rem) - Packed containers for high-density scanning
- `related` (2rem) - Minimal separation for related pairs (label + input)
- `peer` (4rem) - Self-contained equals in the same flow
- `group` (8rem) - Logical separation between content zones
- `section` (16rem) - Distinct layout sections
- `context` (32rem) - Complete contextual shift

**New Inset (Padding) Scale:**
- `tight`, `snug`, `regular`, `relaxed`, `loose` - with square, squish, and stretch variants
- Example: `--spacing-squish-regular`, `--spacing-stretch-relaxed`

**Benefits:**
- Decouples intent from pixel values
- Consistent rhythm across the interface
- Improved scannability and hierarchy
- Reduced reliance on explicit containers (cards/borders)

### 3. Component Improvements

**FileField:**
- Removed hardcoded unchangeable styles
- Better grid-based layout for file items
- Added `itemRemove` part for styling
- Proper internationalization for remove button

**DatePicker:**
- Fixed dropdown sizing - now fits content instead of input width
- Improved calendar popover positioning

**Select & Input Components:**
- Simplified container structure
- Better icon and action placement
- Improved accessibility with proper ARIA attributes

**Dialog & Overlay Components:**
- Consistent elevation styling
- Better scrollbar styling
- Improved focus management

## 📝 Documentation

- **New Spacing Guide**: Comprehensive documentation explaining the semantic spacing system
- Added visual examples for relational and inset spacing
- Guidance on implicit vs. explicit grouping
- Updated all example forms and patterns to use new spacing tokens

## 🔧 Technical Improvements

- Replaced deprecated data attributes with proper CSS selectors
- Better TypeScript typing for spacing tokens
- Improved theme component definitions
- Cleaner CSS with reduced specificity
- Better support for different component states (disabled, readonly, error, focus)

## 📊 Statistics

- **118 files changed**
- **1,677 insertions**, **690 deletions**
- Components affected: TextArea, Input, DateField, FileField, Select, Calendar, Card, Dialog, Menu, Toast, and many more

## ⚠️ Migration Notes

### Spacing Values
```tsx
// Before
<Stack space="fieldY">
<Inline space="fieldX">

// After
<Stack space="peer">
<Inline space="related">
```

### Surface Styling
```css
/* Before */
.util-surface-raised

/* After */
.ui-surface /* uses raised elevation by default */
.ui-surface.ui-elevation-overlay /* for overlays */
```
