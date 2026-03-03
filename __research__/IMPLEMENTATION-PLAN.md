# SidebarNav Refactoring

Background: [SIDEBAR-NAV-ANALYSIS.md](./SIDEBAR-NAV-ANALYSIS.md), [VERCEL_SIDEBAR_ANALYSIS.md](./VERCEL_SIDEBAR_ANALYSIS.md)

## Goal

Replace the incorrect `role="menu"` ARIA pattern (and all the complexity it pulled in) with plain navigation semantics. Switch from `@keyframes` mount/unmount animations to CSS transitions on always-rendered panels.

**What gets removed:** `FocusScope`, `useFocusManager`, roving tabindex, custom keyboard handlers, `ExitingPanel` snapshot state, `snapshotCurrentPanel`, `onAnimationEnd` lifecycle, `reducedMotion` state, `@keyframes` definitions, `role="menu"` / `role="menuitem"` / `role="none"` / `aria-haspopup`, `<ul>/<li>` elements.

**What replaces it:** All panels always in DOM with `data-position="active|before|after"`. CSS transitions handle animation. `inert` on inactive panels. Buttons and links are naturally focusable — no roving tabindex needed.

---

## File Changes

### 1. `SidebarNav.tsx` — the main change

**Reducer** — unchanged. `direction` and `lastTriggerKey` are still needed for focus management (focusing the back button on push, focusing the trigger on pop).

**New utilities** (outside component):

```ts
// Recursively collect all branch nodes (items with children) at every depth
const collectBranches = (nodes: SidebarNode[]): SidebarItemNode[] => {
  const result: SidebarItemNode[] = [];
  for (const node of nodes) {
    if (node.type === 'item' && node.children.length > 0) {
      result.push(node);
      result.push(...collectBranches(node.children));
    }
  }
  return result;
};

// Derive position from stack — determines CSS transition state
const panelPosition = (
  panelKey: string,
  stack: string[]
): 'active' | 'before' | 'after' => {
  const activeKey = stack.at(-1) ?? null;
  if (panelKey === 'root') return activeKey ? 'before' : 'active';
  if (panelKey === activeKey) return 'active';
  const idx = stack.indexOf(panelKey);
  return idx >= 0 && idx < stack.length - 1 ? 'before' : 'after';
};
```

Position encodes animation direction automatically: ancestors slide left (`before`, `-translateX`), descendants slide right (`after`, `+translateX`). No explicit `direction` needed for animation.

**`InnerPanelContent`** — simplified:

- `<ul role="menu">` → `<div data-position={position} inert={position !== 'active' || undefined}>`
- Remove: `panelRef`, `animationState`, `direction`, `onAnimationEnd` props
- Remove: `useFocusManager`, `handleMenuFocus`, `handleKeyDown`, `itemCount`
- Remove: `role="menuitem"`, `role="none"`, `aria-haspopup`, `tabIndex`, `onKeyDown` from all items
- `<li>` → `<div>` for all items and separators

**`SidebarNav`** — simplified:

- Remove: `reducedMotion`, `exitingPanel`, `snapshotCurrentPanel`
- `push`/`pop`: just `dispatch(...)`, no snapshot
- Add `navRef` on `<nav>`, add `branchNodes = useMemo(() => collectBranches(...), [collection])`
- Render root panel + all branch panels (always mounted):

```tsx
<nav ref={navRef} aria-label={ariaLabel} className={cn(classNames.subNav)}>
  <InnerPanelContent
    nodes={collection.rootNodes}
    position={panelPosition('root', state.stack)}
    onNavigate={push}
    ...
  />
  {branchNodes.map(branch => (
    <InnerPanelContent
      key={branch.key}
      nodes={branch.children}
      position={panelPosition(branch.key, state.stack)}
      onNavigate={push}
      onBack={pop}
      backLabel={branch.textValue}
      ...
    />
  ))}
</nav>
```

- Remove `<FocusScope>` wrapper
- Focus `useLayoutEffect`: query `navRef.current` for `[data-position="active"]`, then find trigger/back button within it (same logic, different selector)

### 2. `Sidebar.tsx` — `<nav>` → `<div>`

`DesktopSidebar` and `MobileSidebar` both wrap everything in `<nav>`. This is wrong — the sidebar shell contains header, footer, toggle, etc. And it creates nested `<nav>` landmarks since `SidebarNav` has its own `<nav>`.

Change: replace `<nav>` with `<div>` in both. Remove `aria-label` from the shell. `SidebarNav` is now the sole `<nav>` landmark.

### 3. `Sidebar.styles.ts` — `menu` slot

Remove `@keyframes` animation classes:

```
'data-[exiting]:absolute data-[exiting]:inset-0',
'data-[entering]:data-[direction=forward]:animate-panel-enter-forward',
'data-[entering]:data-[direction=backward]:animate-panel-enter-backward',
'data-[exiting]:data-[direction=forward]:animate-panel-exit-forward',
'data-[exiting]:data-[direction=backward]:animate-panel-exit-backward',
```

Add position-based transition classes:

```
'transition-[visibility,opacity,transform,filter] duration-200 ease-out',

'data-[position=before]:absolute data-[position=before]:inset-x-0 data-[position=before]:top-0',
'data-[position=before]:invisible data-[position=before]:opacity-0',
'data-[position=before]:-translate-x-2 data-[position=before]:blur-[2px]',
'data-[position=before]:pointer-events-none',

'data-[position=after]:absolute data-[position=after]:inset-x-0 data-[position=after]:top-0',
'data-[position=after]:invisible data-[position=after]:opacity-0',
'data-[position=after]:translate-x-2 data-[position=after]:blur-[2px]',
'data-[position=after]:pointer-events-none',

'motion-reduce:transition-none',
```

Also remove `list-none p-0 m-0` (no longer `<ul>`).

### 4. `theme.css` — remove `@keyframes`

Delete the four `--animate-panel-*` custom properties and their `@keyframes` blocks (`panel-enter-forward`, `panel-exit-forward`, `panel-enter-backward`, `panel-exit-backward`).

### 5. `Sidebar.test.tsx` — update queries

- `getByRole('navigation')` now finds `SidebarNav`'s `<nav>`, not the sidebar shell
- Remove any `getByRole('menu')` / `getByRole('menuitem')` queries
- Branch navigation test should still pass (tests click behavior, not animation)

---

## Key Design Notes

**Why always-render all panels?** CSS transitions require the element to already be in the DOM. `@keyframes` can define a starting state on mount; transitions cannot. Keeping all panels mounted means toggling `data-position` always triggers a smooth transition.

**Why `visibility` in the transition?** Without it, exiting panels would snap to `hidden` before opacity fades out. CSS `visibility` transitions hold `visible` during fade-out, then flip to `hidden` at the end. On entry, `visible` flips immediately and opacity fades in.

**DOM cost?** Minimal. Sidebar trees are small (<20 items, <5 levels). Inactive panels have `inert`, so the browser skips them for a11y tree, focus, and hit testing.

---

## Verification

1. `pnpm typecheck:only`
2. `pnpm test:unit -- --run packages/components/src/Sidebar`
3. `pnpm sb` — check drill-down stories (forward/back transitions, reduced motion, keyboard nav, VoiceOver)
4. `pnpm format && pnpm lint`
