---
'@marigold/theme-rui': major
---

DST-878: Polish design tokens and add token documentation.

**New color palette:**
- Replace default gray scale with warm neutral "charcoal" palette (oklch, hue 54, 11 steps from 50-950)

**Token renames and restructuring:**
- Rename `brand` to `primary`, `muted-foreground` to `secondary`, `focus` to `focus-highlight`
- Rename status token structure from `*-muted`/`*-muted-foreground`/`*-muted-accent` to `*`/`*-foreground`/`*-accent`
- Add `disabled-surface` token for disabled control backgrounds
- Add `overlay-backdrop` token for modal/tray backdrops
- Update page background colors

**New hover utilities:**
- Add `ui-state-hover` utility (solid hover for list items, table rows, menu items)
- Add `ui-state-hover-ghost` utility (translucent hover for ghost buttons, tabs, action bar)
- Migrate all components from raw `hover:bg-hover`/`hover:bg-current/10` to the new utilities

**Documentation:**
- Add new Token Overview page with complete token reference
- Add annotated UI diagram, color palette demo, Do/Don't guidance, hover and selection pattern docs
- Remove outdated `design-tokens.mdx` and `design-token-guidelines.mdx` pages
