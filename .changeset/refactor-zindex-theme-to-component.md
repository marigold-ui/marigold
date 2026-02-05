---
"@marigold/components": patch
"@marigold/theme-rui": patch
---

Refactor z-index implementation to move all z-index values from theme style files to component implementations. This ensures consistent stacking order across all themes and makes z-index behavior theme-independent.

**Changes:**
- Moved z-index classes from theme style files (`*.styles.ts`) to component implementations
- Z-index values are now applied directly in component `className` props using Tailwind utilities
- Updated 8 component files: ToastProvider, Popover, Tooltip, Underlay, DrawerModal, Drawer, ActionBar
- Updated 7 theme style files to remove z-index classes
- Added comprehensive z-index documentation to CLAUDE.md
- ActionBar moved to floating layer (z-30) for better integration with content overlays

**Benefits:**
- Z-index stacking order is now consistent across all themes
- Components control their own z-index, making it part of component behavior
- Easier maintenance - developers only check component files to understand stacking
- Future themes automatically inherit correct z-index stacking

**No Breaking Changes:**
- Z-index numeric values remain identical
- Stacking order unchanged
- Component behavior and API unchanged
- Fully backwards compatible
