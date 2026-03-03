# SidebarNav Refactoring — Implementation Plan

Based on [SIDEBAR-NAV-ANALYSIS.md](./SIDEBAR-NAV-ANALYSIS.md).

---

## Context

The SidebarNav component uses `role="menu"` / `role="menuitem"` — an ARIA pattern meant for application menus (File/Edit/View), not site navigation. This wrong semantic choice cascades into unnecessary complexity: `FocusScope`, roving tabindex, custom keyboard handlers, `<ul>/<li>` with `role="none"` overrides. The animation lifecycle (snapshot + `onAnimationEnd` cleanup) is also fragile.

The goal is to simplify SidebarNav to use the correct navigation pattern (`<nav>` + `<a>` + `<button>`), remove the complexity that only existed to support the wrong ARIA pattern, and make the panel animation lifecycle more robust.

---

## Step 1: Remove ARIA menu roles + replace `<ul>/<li>` with `<div>`

**Problems addressed:** #1 (wrong ARIA pattern), #2 (redundant list markup), #4 (`aria-hidden` redundant with `inert`)

**Why these go together:** Removing `role="menu"` makes `role="none"` on `<li>` pointless. Removing `role="none"` makes `<li>` pointless. And `aria-hidden` removal is a one-liner that fits here.

### Changes in `SidebarNav.tsx`

In `InnerPanelContent`:

- `<ul role="menu">` → `<div>` (keep all other props: ref, className, data-\*, onAnimationEnd, inert)
- Remove `onFocus={handleMenuFocus}` from the container (was maintaining roving tabindex for menu pattern)
- `panelRef` type: `RefObject<HTMLUListElement | null>` → `RefObject<HTMLDivElement | null>`
- All `<li role="none">` wrappers → `<div>` (keep className)
- `<li role="separator"><hr ... /></li>` → just `<hr ... />` (no wrapper)
- Remove `role="menuitem"` from back button, branch buttons, and leaf elements
- Remove `aria-haspopup="true"` from branch buttons (menu-specific; not meaningful for navigation)
- Remove `aria-hidden={animationState === 'exiting' || undefined}` (line 141, redundant with `inert`)
- `getMenuItems` helper: change query from `[role="menuitem"]` to `a, button` (used by focus management)

In `SidebarNav` body:

- `panelRef` type: `useRef<HTMLUListElement>(null)` → `useRef<HTMLDivElement>(null)`

### Changes in `Sidebar.styles.ts`

- `menu` slot: remove `list-none p-0 m-0` (these were `<ul>` resets, unnecessary on `<div>`)

### Changes in `Sidebar.test.tsx`

- Remove `aria-haspopup` assertion (line 276)
- Back button query `getByRole('button', { name: /Back/ })` still works (native `<button>` role)
- Settings trigger query `getByRole('button', { name: /Settings/ })` still works

### Critical review

**Is this correct?** Yes. WAI-ARIA 1.2 is explicit: `role="menu"` is for "a widget that offers a list of choices to the user, such as a set of actions or functions" — i.e., application menus. Navigation sidebars are not application menus. Screen readers announce `<nav>` as a navigation landmark and `<a>` elements as links, which is the correct behavior.

**Risk: backwards compatibility.** Zero impact on consumers. `Sidebar.Item` renders `null` — it's a data carrier. All rendering is internal to `SidebarNav`. No public API changes.

**Risk: theme slot names.** The slot names `menu`, `menuItem`, `menuButton` become semantically misleading. However, renaming them is a breaking change for custom themes (changes the `ThemeComponent<'Sidebar'>` type). Defer renaming to a separate PR with migration guide. Only `theme-rui` defines Sidebar styles today.

---

## Step 2: Remove FocusScope + custom keyboard handler

**Problems addressed:** #5 (FocusScope conflicts with navigation), #6 (complex keyboard reimplementation)

### Why remove both together

`useFocusManager()` (line 85) only works inside a `FocusScope`. The keyboard handler (`handleKeyDown`) depends on `focusManager.focusNext/focusPrevious/focusFirst/focusLast`. Remove one, you must remove the other.

### Changes in `SidebarNav.tsx`

- Remove `import { FocusScope, useFocusManager } from '@react-aria/focus'`
- Remove `import type { FocusEvent, KeyboardEvent } from 'react'` (no longer needed)
- Remove `const focusManager = useFocusManager()` from `InnerPanelContent`
- Remove `handleMenuFocus` handler entirely
- Remove `handleKeyDown` function entirely
- Remove `onKeyDown` prop from back button, branch buttons, and leaf elements
- Remove `let itemCount = 0` and all `tabIndex={itemCount++ === 0 ? 0 : -1}` — all interactive elements become naturally tabbable
- Remove `<FocusScope>` wrapper (line 395-407), render `<InnerPanelContent>` directly

Simplify `useLayoutEffect` focus management (lines 351-377):

- Remove roving tabindex loop (lines 369-374)
- Keep `target?.focus()` for panel-transition focus restoration
- Update element query: `getMenuItems(panelRef.current)` → `panelRef.current.querySelectorAll<HTMLElement>('a, button')` (or keep the updated `getMenuItems` from Step 1)

### Changes in `Sidebar.test.tsx`

- Remove "keyboard navigation works within groups" test (lines 209-253) — it tests ArrowDown/ArrowUp/Home/End which we're removing
- Optionally add a simpler test verifying Tab moves between items (though this is standard browser behavior)

### Critical review

**Is removing arrow keys correct?** For `role="menu"`, arrow keys are required behavior. Since we're removing `role="menu"`, arrow keys are no longer expected. The standard keyboard model for navigation is Tab/Shift+Tab (browser default). Vercel's sidebar has no custom keyboard handling.

**Risk: power users who relied on arrow keys.** Arrow key navigation in the sidebar was an internal implementation detail, never documented or promised. Users of the design system compose `<Sidebar.Item>` elements — they don't interact with the keyboard handler. No breaking change.

**Could we keep arrow keys as a lightweight enhancement?** Yes, but not in this PR. The current implementation is tightly coupled to `FocusScope`/`useFocusManager`. A future PR could add a simple `onKeyDown` on the container `<div>` that manually moves focus between `a, button` children — no FocusScope needed.

**Risk: focus behavior regression.** The `useLayoutEffect` that restores focus on panel transitions is preserved. When navigating forward, focus moves to the back button. When navigating backward, focus returns to the trigger button. This is the same behavior as before, minus roving tabindex.

---

## Step 3: Replace snapshot animation with persistent panels

**Problem addressed:** #3 (fragile exiting panel approach)

This is the most complex step. It replaces the snapshot + `onAnimationEnd` cleanup with a simpler model: derive both panels from collection state, no snapshot needed.

### Current fragility

1. `snapshotCurrentPanel()` captures nodes before navigation
2. `exitingPanel` state renders a duplicate `InnerPanelContent` with `animationState="exiting"`
3. `onAnimationEnd` clears `exitingPanel` — but if animation doesn't fire (interrupted, `prefers-reduced-motion`, element removed), the panel persists forever
4. Full interactive markup (buttons, links, handlers) is rendered in the exiting panel even though it's `inert`

### New approach: derive previous panel from reducer state

Instead of snapshotting, track `previousStack` in the reducer. Both panels derive their nodes from the collection (which is stable across renders).

**Updated reducer:**

```typescript
interface NavState {
  stack: string[];
  direction: 'forward' | 'backward';
  lastTriggerKey: string | null;
  previousStack: string[] | null; // null = no animation in progress
}

type NavAction =
  | { type: 'push'; id: string }
  | { type: 'pop' }
  | { type: 'settle' }; // animation complete, clear previous panel

// push:   previousStack = current stack, then push
// pop:    previousStack = current stack, then pop
// settle: previousStack = null
```

**Panel rendering:**

```tsx
<nav>
  {/* Previous panel (animating out) — derived from previousStack */}
  {state.previousStack !== null && (
    <div inert data-exiting data-direction={state.direction} className={...}
         onAnimationEnd={() => dispatch({ type: 'settle' })}>
      {renderPanelNodes(previousNodes, { noop: true })}
    </div>
  )}
  {/* Active panel */}
  <div ref={panelRef}
       data-entering={state.previousStack !== null || undefined}
       data-direction={state.previousStack !== null ? state.direction : undefined}
       className={...}>
    {renderPanelNodes(activeNodes, { onNavigate: push, onBack: pop })}
  </div>
</nav>
```

### Changes in `SidebarNav.tsx`

- Update `NavState` to include `previousStack: string[] | null`
- Add `'settle'` action to `NavAction` and `navReducer`
- Remove `ExitingPanel` interface
- Remove `exitingPanel` state (`useState<ExitingPanel | null>`)
- Remove `snapshotCurrentPanel` function
- Remove `reducedMotion` state — handle via CSS `@media (prefers-reduced-motion: reduce)` in theme
- Simplify `push`/`pop` callbacks (just dispatch, no snapshot)
- Add `previousNodes` derivation (same logic as `activeNodes` but using `previousStack`)
- Add timeout fallback: after `push`/`pop`, set `setTimeout(200)` that dispatches `settle` if animation hasn't cleared it yet
- Render two `<div>` panels instead of two `<InnerPanelContent>` components

### Changes in `theme.css`

Add reduced-motion media query to disable panel animations:

```css
@media (prefers-reduced-motion: reduce) {
  --animate-panel-enter-forward: none;
  --animate-panel-exit-forward: none;
  --animate-panel-enter-backward: none;
  --animate-panel-exit-backward: none;
}
```

This replaces the JS-side `reducedMotion` check. The animation simply doesn't play, and `onAnimationEnd` fires immediately (or the timeout fallback clears the previous panel).

### What stays the same

- `collection.ts` — no changes
- `SidebarItem.tsx` / `SidebarSeparator` — no changes
- CSS `@keyframes` in `theme.css` — kept as-is (the animations work fine)
- `data-entering`/`data-exiting`/`data-direction` attributes — kept (theme styles target these)
- `Sidebar.styles.ts` animation classes — kept

### Critical review

**Why not switch to CSS transitions as the analysis suggests?** The analysis proposes CSS transitions over `@keyframes`. But the real problem is the snapshot lifecycle, not the animation mechanism. The `@keyframes` approach works and is already defined in the theme. Switching to transitions is a separate concern. Keep `@keyframes`.

**Deep nesting (3+ levels)?** The two-panel approach works for any depth. We only ever render the active panel + the previous panel (one level back or forward). The stack tracks navigation depth but we only need the last two states for the animation. Same as the current approach — it already only renders two panels.

**Risk: `onAnimationEnd` still used.** Yes, but with a timeout fallback. If `onAnimationEnd` doesn't fire (animation interrupted, `prefers-reduced-motion`), the timeout (200ms, slightly longer than 150ms animation) dispatches `settle`. The previous panel gets cleared either way. The `inert` attribute ensures the stale panel is non-interactive during the gap.

**Risk: `InnerPanelContent` refactor.** After Steps 1-2, `InnerPanelContent` is already simplified (no FocusScope, no keyboard handler, no roving tabindex). In this step we can either keep it as a component or inline the rendering. Keeping it as a component is fine — it accepts `nodes`, `onNavigate`, `onBack`, `backLabel`, `classNames`, `panelRef`, `stringFormatter` plus the animation props.

---

## Files Summary

| File                                                | Steps   | Changes                                                 |
| --------------------------------------------------- | ------- | ------------------------------------------------------- |
| `packages/components/src/Sidebar/SidebarNav.tsx`    | 1, 2, 3 | Core refactoring                                        |
| `themes/theme-rui/src/components/Sidebar.styles.ts` | 1       | Remove `list-none p-0 m-0` from `menu` slot             |
| `themes/theme-rui/src/theme.css`                    | 3       | Add `prefers-reduced-motion` media query                |
| `packages/components/src/Sidebar/Sidebar.test.tsx`  | 1, 2    | Remove `aria-haspopup` assertion, remove arrow key test |
| `packages/components/src/Sidebar/collection.ts`     | —       | No changes                                              |
| `packages/components/src/Sidebar/SidebarItem.tsx`   | —       | No changes                                              |
| `packages/components/src/Sidebar/Context.tsx`       | —       | No changes                                              |
| `packages/components/src/Sidebar/Sidebar.tsx`       | —       | No changes                                              |

---

## Verification

After each step, verify:

1. **Type check:** `pnpm typecheck:only`
2. **Unit tests:** `pnpm test:unit -- --run packages/components/src/Sidebar`
3. **Storybook:** `pnpm sb` → check Basic, Controlled, Complex stories
4. **Manual testing:**
   - Click through drill-down panels (forward/back)
   - Verify animations play correctly
   - Tab through items (focus should move naturally)
   - Check `prefers-reduced-motion` (toggle in DevTools → Rendering → Emulate CSS media feature)
   - Screen reader test (VoiceOver): verify `<nav>` is announced as navigation landmark, items are announced as links/buttons (not "menu items")

After all steps: 5. **Format:** `pnpm format` 6. **Lint:** `pnpm lint`
