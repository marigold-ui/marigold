# Sidebar Accessibility Fixes

## Context

Accessibility audit of the Sidebar component revealed several issues with missing ARIA semantics, landmark roles, and decorative icon handling. Issue #1 (branch items as `<Link>`) is **by design** — in a non-React app the link navigates AND the panel updates on navigation.

## Changes

### 1. Group labels: add heading semantics (`SidebarNav.tsx`)

**Problem**: `SidebarGroupLabel` renders a plain `<div>` — screen readers can't navigate by it.

**Fix**: Add `role="heading"` and `aria-level="2"` to the group label `<div>` (line 94). Simple, follows the Radix/shadcn pattern.

### 2. Panel containers: add region semantics (`SidebarNav.tsx`)

**Problem**: `InnerPanelContent` panel `<div>` has no role/label — screen readers don't know what section they're in.

**Fix**: Add `role="region"` and `aria-label` to the panel container. For root panel: `aria-label={ariaLabel || "Main navigation"}`. For branch panels: `aria-label={backLabel}` (e.g., "Tickets").

### 3. Sidebar root: use `<aside>` (`Sidebar.tsx`)

**Problem**: The sidebar root is a plain `<div>`, missing the complementary landmark.

**Fix**: Change the outer `<div>` (line 48) to `<aside>` and add `aria-label` via i18n. Add new i18n key `sidebar` ("Sidebar" / "Seitenleiste") to `packages/components/src/intl/messages.ts`.

### 4. Chevron icons: add `aria-hidden` (`SidebarNav.tsx`)

**Problem**: `ChevronRight` and `ChevronLeft` in nav items/back button are decorative but lack `aria-hidden`.

**Fix**: Add `aria-hidden="true"` to the icon usages in `SidebarNav.tsx` (lines 76, 114). Don't modify the icon components themselves — keep it at the usage site since icons aren't always decorative.

### 5. Remove empty `<span aria-hidden>` (`SidebarNav.tsx`)

**Problem**: Line 81 has `<span aria-hidden="true" />` that renders nothing.

**Fix**: Delete it.

## Files to modify

- `packages/components/src/Sidebar/SidebarNav.tsx` — fixes #1, #2, #4, #5
- `packages/components/src/Sidebar/Sidebar.tsx` — fix #3
- `packages/components/src/intl/messages.ts` — add `sidebar` i18n key

## Verification

1. `pnpm typecheck:only` — no type errors
2. `pnpm test:unit -- Sidebar` — existing tests pass
3. Check rendered HTML in Storybook (`localhost:6006`, Complex story) — verify:
   - `<aside aria-label="Sidebar">` wraps the sidebar
   - Group labels have `role="heading"` and `aria-level="2"`
   - Panel divs have `role="region"` with `aria-label`
   - Chevrons have `aria-hidden="true"`
   - Empty span is gone
4. Run Storybook a11y addon panel — no new violations
