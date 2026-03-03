# Fix: Hide Sidebar Siblings During Nav Drilldown

## Problem

When a `SidebarNav` drills into a sub-panel (e.g. clicking "Tickets"), other `SidebarNav` instances, group labels, and separators remain visible below it. This creates a confusing mix of sub-navigation and root-level navigation.

**Before (bug):** Tickets sub-panel + WORKSPACE label + Projects + Customers + Reports all visible at once.

**Expected:** Only the Tickets sub-panel is visible during drilldown.

### Root Cause

Each `<Sidebar.Nav>` is an independent sliding-panel machine. The panel animation (`data-position`, absolute positioning) only works within a single `<nav>` element — the `subNav` container with `relative overflow-hidden`. Sibling content in `SidebarContent` is completely unaffected.

DOM structure (SidebarGroup renders as fragment, so children are flat):

```
div.content
  nav              ← Nav #1 (drilled into Tickets sub-panel)
  div.groupLabel   ← "WORKSPACE" (still visible — BUG)
  nav              ← Nav #2 (still visible — BUG)
  hr               ← separator (still visible — BUG)
  nav              ← Nav #3 (still visible — BUG)
```

---

## Solution: CSS `:has()` + data attribute

Two small changes. No state changes, no context changes, no new components.

### Change 1: `SidebarNav.tsx`

Add `data-has-drilldown` to the `<nav>` when `openBranch !== null`:

```tsx
// SidebarNav.tsx, line ~222
<nav
  ref={navRef}
  aria-label={ariaLabel}
  className={cn(classNames.subNav)}
  data-has-drilldown={openBranch ? '' : undefined}
>
```

### Change 2: `Sidebar.styles.ts`

Add a CSS rule to `content` that hides all direct children when any sibling Nav has a drilldown active:

```ts
content: cva({
  base: [
    'flex flex-col px-4 py-2 overflow-y-auto outline-none',
    // Hide sibling content when any nav is drilled into a sub-panel
    '[&:has(>[data-has-drilldown])>*:not([data-has-drilldown])]:hidden',
  ],
}),
```

This generates:

```css
.content:has(> [data-has-drilldown]) > *:not([data-has-drilldown]) {
  display: none;
}
```

Reads: "When the content container has a direct child with `data-has-drilldown`, hide all other direct children."

---

## Also: Remove `SidebarGroup`

`SidebarGroup` renders `<>{children}</>` with an empty style (`group: cva({ base: '' })`). It's a no-op.

Removing it:

- Eliminates dead code (component + style slot + export + type)
- Makes the flat DOM structure intentional, not accidentally dependent on a fragment
- Removes the risk of someone adding a wrapper div to SidebarGroup later, which would break the CSS `:has()` selector
- Simplifies the API surface

**Keep `SidebarGroupLabel`** — it renders a styled `<div>` and is useful.

### Files to change for SidebarGroup removal

1. **`SidebarGroup.tsx`** — delete `SidebarGroup` component, keep `SidebarGroupLabel`
2. **`Sidebar.tsx`** — remove `SidebarGroup` from compound component interface and assignment
3. **`Sidebar.styles.ts`** — remove `group` slot
4. **`packages/types/`** — remove `group` from `SidebarTheme` type (if present)
5. **Stories** — replace `<Sidebar.Group>` wrapper with fragment or remove entirely
6. **Tests** — update any references to `Sidebar.Group`
7. **Docs** — update examples

---

## Alternatives Considered

### Context-based coordination

Add `drilldownNavId` to sidebar context. Each Nav reports its drilldown state; siblings check and hide.

**Rejected:** More complex (changes to Context, SidebarNav, and SidebarGroup/Content), needs ref-counting for edge cases, and still requires hiding non-Nav content (labels, separators) — which ends up needing CSS anyway.

### CSS overlay (sub-panel covers Content area)

Make the active sub-panel `position: absolute` relative to Content instead of its Nav.

**Rejected:** Requires removing `overflow-hidden` from `subNav` (breaks slide animation clipping), fragile height/scroll behavior, doesn't work cleanly with the existing animation system.

### Story-only fix (single Nav)

Restructure the Complex story to use one `<Sidebar.Nav>` instead of three.

**Rejected:** Doesn't fix the underlying issue for consumers using multiple Navs.

---

## Why CSS `:has()` is the right call

- **Minimal:** 2 meaningful lines of change
- **No logic changes:** Pure CSS, no JS coupling between Nav instances
- **Robust:** Works naturally with the flat DOM from SidebarGroup being a fragment (or being removed)
- **Well-supported:** CSS `:has()` has 96%+ browser support
- **Zero regression risk:** Only affects multi-Nav case; single Nav sidebars have no siblings to hide
- **Correct UX:** When the user drills down, only the sub-panel is visible. Pressing back reveals all groups again (data attribute is removed, CSS rule no longer matches)

---

## Verification

1. `pnpm sb` — open Complex story, click Tickets/Projects/Reports, verify siblings hide
2. Click back button — verify all groups reappear
3. Navigate to a sub-item directly (e.g. set `currentPath` to `/all-tickets`) — verify correct sub-panel shows and siblings are hidden
4. Single-Nav stories (Basic, Controlled) — verify no visual change
5. `pnpm typecheck:only`
6. `pnpm test:unit -- --run packages/components/src/Sidebar`
