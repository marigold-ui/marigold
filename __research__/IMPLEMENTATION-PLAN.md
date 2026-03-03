# SidebarNav Refactoring

Background: [SIDEBAR-NAV-ANALYSIS.md](./SIDEBAR-NAV-ANALYSIS.md), [VERCEL_SIDEBAR_ANALYSIS.md](./VERCEL_SIDEBAR_ANALYSIS.md)

## Goal

Replace the incorrect `role="menu"` ARIA pattern (and all the complexity it pulled in) with plain navigation semantics. Switch from `@keyframes` mount/unmount animations to CSS transitions on always-rendered panels. Make every navigation item a real `<Link>` — no programmatic browser navigation.

**What gets removed:** `FocusScope`, `useFocusManager`, roving tabindex, custom keyboard handlers, `ExitingPanel` snapshot state, `snapshotCurrentPanel`, `onAnimationEnd` lifecycle, `reducedMotion` state, `@keyframes` definitions, `role="menu"` / `role="menuitem"` / `role="none"` / `aria-haspopup`, `<ul>/<li>` elements, `navReducer` / `dispatch` / imperative `push`/`pop`.

**What replaces it:** All items are RAC `<Link>` elements with real `href`. Panel state is **declarative** — derived from which `SidebarItem` has `active=true`. All panels always in DOM with `data-position="active|before|after"`. CSS transitions handle animation. `inert` on inactive panels. Back button is a `<button>` (UI control, not navigation).

---

## Design Decisions

### Every item is a `<Link>`

All `SidebarItem` elements render as RAC `<Link href={...}>` — both leaf items and branch items. No `<button>` for navigation. This means:

- Branch items (those with children, e.g. "Management") auto-derive their `href` from their **first leaf descendant**. "Management" links to `/users` if "Users" is the first child.
- The browser (or framework's `RouterProvider`) handles navigation. No `e.preventDefault()` + state updates.
- `onPress` is kept for **side effects only** (analytics, logging). It fires alongside navigation, never prevents it.

### Declarative panel state

The open panel is **derived from the `active` prop**, not from a push/pop stack:

1. Walk the collection tree to find which branch (if any) contains an item with `active=true`.
2. If found, that branch's sub-panel is the active panel. If not, root panel is active.
3. On navigation (active item changes), the panel state automatically updates.

The back button is a `<button>` (not a link). It sets a local override to show the root panel even though an active child exists in a branch. This override resets when the `active` item changes (i.e., on the next navigation).

### No imperative navigation state

The `navReducer`, `dispatch`, `push`, `pop` are all removed. The state model becomes:

```ts
// Derived: find which branch contains the active item
const activeBranch = useMemo(() => findActiveBranch(collection), [collection]);

// Local override: back button can force root panel
const [forcedRoot, setForcedRoot] = useState(false);

// Reset override when active branch changes
useEffect(() => {
  setForcedRoot(false);
}, [activeBranch]);

// The open branch key (or null for root)
const openBranch = forcedRoot ? null : activeBranch;

// Stack for panelPosition (single-level: either [] or [branchKey])
const stack = openBranch ? [openBranch] : [];
```

---

## File Changes

### 0. `collection.ts` — derive branch `href`

Add a helper to find the first leaf descendant's `href`:

```ts
const firstLeafHref = (nodes: SidebarNode[]): string | undefined => {
  for (const node of nodes) {
    if (node.type !== 'item') continue;
    if (node.children.length === 0) return node.href;
    const found = firstLeafHref(node.children);
    if (found) return found;
  }
  return undefined;
};
```

In `buildNodes`, assign `href` on branch items (items with children) when not explicitly provided:

```ts
const node: SidebarItemNode = {
  ...
  href: child.props.href ?? firstLeafHref(childNodes),
  ...
};
```

Also add a utility to find which branch contains the active item:

```ts
export const findActiveBranch = (
  collection: SidebarCollection
): string | null => {
  const search = (nodes: SidebarNode[]): boolean => {
    for (const node of nodes) {
      if (node.type !== 'item') continue;
      if (node.active) return true;
      if (node.children.length > 0 && search(node.children)) return true;
    }
    return false;
  };

  for (const node of collection.rootNodes) {
    if (
      node.type === 'item' &&
      node.children.length > 0 &&
      search(node.children)
    ) {
      return node.key;
    }
  }
  return null;
};
```

### 1. `SidebarNav.tsx` — the main change

**Remove entirely:** `navReducer`, `NavState`, `NavAction`, `dispatch`, `push`, `pop`, `getMenuItems`, `ExitingPanel`, `snapshotCurrentPanel`, `reducedMotion`, `exitingPanel` state, `FocusScope` import, `useFocusManager` import.

**New state model** (replaces the reducer):

```ts
const activeBranch = useMemo(() => findActiveBranch(collection), [collection]);

const [forcedRoot, setForcedRoot] = useState(false);

useEffect(() => {
  setForcedRoot(false);
}, [activeBranch]);

const openBranch = forcedRoot ? null : activeBranch;
const stack = openBranch ? [openBranch] : [];
```

**New utilities** (outside component):

```ts
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

**`InnerPanelContent`** — simplified:

- `<ul role="menu">` → `<div data-position={position} inert={position !== 'active' || undefined}>`
- Remove: `panelRef`, `animationState`, `direction`, `onAnimationEnd` props
- Remove: `useFocusManager`, `handleMenuFocus`, `handleKeyDown`, `itemCount`
- Remove: `role="menuitem"`, `role="none"`, `aria-haspopup`, `tabIndex`, `onKeyDown` from all items
- `<li>` → `<div>` for all items and separators
- All items (leaf AND branch) render as RAC `<Link href={node.href}>`:

```tsx
import { Link } from 'react-aria-components';

// Branch item — has children, now a <Link> instead of <button>
if (node.children.length > 0) {
  return (
    <div key={node.key} className={cn(classNames.menuItem)}>
      <Link
        href={node.href}
        data-key={node.key}
        className={cn(classNames.menuButton, 'justify-between')}
        onPress={node.onPress}
      >
        <span>{node.triggerContent}</span>
        <ChevronRight size={16} />
      </Link>
    </div>
  );
}

// Leaf item — always a <Link>
return (
  <div key={node.key} className={cn(classNames.menuItem)}>
    <Link
      href={node.href}
      data-key={node.key}
      aria-current={node.active ? 'page' : undefined}
      data-active={node.active || undefined}
      className={cn(classNames.menuButton)}
      onPress={node.onPress}
    >
      {node.triggerContent}
    </Link>
  </div>
);
```

- Back button remains a `<button>` (UI control, not navigation):

```tsx
{onBack && (
  <div>
    <button
      type="button"
      data-back-button
      aria-label={stringFormatter.format('backTo', { label: backLabel ?? ... })}
      className={cn(classNames.subNavBackButton)}
      onClick={onBack}
    >
      <span className="flex items-center justify-center">
        <ChevronLeft size={16} />
      </span>
      <span className="truncate text-center font-medium">
        {backLabel ?? stringFormatter.format('back')}
      </span>
      <span aria-hidden="true" />
    </button>
  </div>
)}
```

**`SidebarNav`** — render structure:

```tsx
<nav ref={navRef} aria-label={ariaLabel} className={cn(classNames.subNav)}>
  <InnerPanelContent
    nodes={collection.rootNodes}
    position={panelPosition('root', stack)}
    ...
  />
  {branchNodes.map(branch => (
    <InnerPanelContent
      key={branch.key}
      nodes={branch.children}
      position={panelPosition(branch.key, stack)}
      onBack={() => setForcedRoot(true)}
      backLabel={branch.textValue}
      ...
    />
  ))}
</nav>
```

- Remove `<FocusScope>` wrapper
- Focus management: simplified `useLayoutEffect` that queries `navRef.current` for `[data-position="active"]`, then finds back button or previously-active trigger within it

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
- Branch items now found via `getByRole('link')` instead of `getByRole('button')`
- Branch navigation test: click branch link → assert sub-panel becomes active
- Back button test: click back → assert root panel becomes active

### 6. `Sidebar.stories.tsx` — simplify stories

Remove the `onPress={() => setActivePage(...)}` + `e.preventDefault()` pattern from all items. Items are just `<Link>` elements now — `active` drives everything:

```tsx
// Before (fake navigation):
<Sidebar.Item href="/users" active={activePage === 'users'} onPress={() => setActivePage('users')}>

// After (real navigation — active comes from route matching):
<Sidebar.Item href="/users" active={activePage === 'users'}>
```

In Storybook (no real router), stories can still use `onPress` for the `activePage` state update since there's no `RouterProvider`. The key difference: `onPress` no longer prevents navigation — it's a side effect.

---

## Key Design Notes

**Why always-render all panels?** CSS transitions require the element to already be in the DOM. `@keyframes` can define a starting state on mount; transitions cannot. Keeping all panels mounted means toggling `data-position` always triggers a smooth transition.

**Why `visibility` in the transition?** Without it, exiting panels would snap to `hidden` before opacity fades out. CSS `visibility` transitions hold `visible` during fade-out, then flip to `hidden` at the end. On entry, `visible` flips immediately and opacity fades in.

**DOM cost?** Minimal. Sidebar trees are small (<20 items, <5 levels). Inactive panels have `inert`, so the browser skips them for a11y tree, focus, and hit testing.

**Why declarative panel state?** Eliminates the push/pop reducer entirely. The panel that's visible is a function of which item is `active` — no separate navigation state to keep in sync. Deep links and page refreshes automatically show the correct sub-panel because `active` is set from the URL.

**Why `forcedRoot` override?** The back button is a UI-only control (not navigation). When clicked, the user stays on the same page but sees the root panel. `forcedRoot` provides this escape hatch. It resets automatically on the next navigation (when `activeBranch` changes).

**Why RAC `<Link>` instead of `<a>`?** RAC's `<Link>` integrates with `RouterProvider` for client-side routing. Consumers using Next.js, React Router, etc. get SPA navigation by wrapping their app in `<RouterProvider navigate={...}>`. Without a provider, links work as normal `<a>` tags. The project already exports `RouterProvider` from `@marigold/components`.

---

## Verification

1. `pnpm typecheck:only`
2. `pnpm test:unit -- --run packages/components/src/Sidebar`
3. `pnpm sb` — check drill-down stories (forward/back transitions, reduced motion, keyboard nav, VoiceOver)
4. `pnpm format && pnpm lint`
