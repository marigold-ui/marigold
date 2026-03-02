# Sidebar Collection Architecture: Analysis & Proposal

## Table of Contents

1. [How RAC's Collection System Works](#1-how-racs-collection-system-works)
2. [How Tree Uses Collections](#2-how-tree-uses-collections)
3. [Current Sidebar Implementation](#3-current-sidebar-implementation)
4. [Problems With the Current Approach](#4-problems-with-the-current-approach)
5. [Can We Use RAC's Collection Primitives?](#5-can-we-use-racs-collection-primitives)
6. [Proposed Architecture](#6-proposed-architecture)
7. [API Comparison](#7-api-comparison)

---

## 1. How RAC's Collection System Works

RAC uses a **two-phase rendering architecture** to build collections from JSX. The key insight is: items render _twice_ — once into a hidden "fake DOM" to register their structure, and once for real when the collection is consumed.

### The Three Phases

#### Phase 1: Shadow Tree (Collection Building)

```
CollectionBuilder
  └── <Hidden> (a <template> element, invisible to the browser)
       └── CollectionDocumentContext.Provider (provides the Document)
            └── <Collection items={...}>{renderFn}</Collection>
                 └── createPortal(children, document)  ← renders into fake DOM
                      └── ShallowRenderContext = true
                           └── Each item component (e.g. TreeItem) calls
                               useSSRCollectionNode() which:
                               1. Creates a CollectionNode in the Document
                               2. Stores props + a render function on the node
                               3. Builds parent-child relationships via DOM nesting
```

**Key classes:**

- **`Document<T>`** — A mutable external store (used with `useSyncExternalStore`). Owns a tree of `ElementNode`s. When nodes change, it builds an immutable `BaseCollection` snapshot.
- **`ElementNode<T>`** — Fake DOM node (nodeType=8, COMMENT*NODE). Stores `props`, `ref`, `CollectionNodeClass`, and a `render` function. React renders item components \_into* these via portal.
- **`CollectionNode<T>`** — Immutable snapshot of an `ElementNode`. Has `key`, `index`, `level`, `parentKey`, `prevKey`, `nextKey`, `firstChildKey`, `lastChildKey`, `textValue`, `rendered`, and a `render` function.
- **`BaseCollection<T>`** — An immutable frozen collection. Implements `ICollection<Node<T>>` with `getItem(key)`, `getKeyAfter(key)`, `getKeyBefore(key)`, `getChildren(key)`, `getFirstKey()`, `getLastKey()`, `size`, `[Symbol.iterator]()`.

#### Phase 2: State Construction

```
CollectionBuilder calls: children(collection)
  └── e.g. TreeInner receives the BaseCollection
       └── Optionally wraps it (TreeCollection flattens for expand/collapse)
       └── Passes to useTreeState / useListState / etc.
       └── State hooks use the collection for selection, focus, keyboard nav
```

#### Phase 3: Real DOM Rendering

```
<CollectionRoot collection={state.collection} />
  └── DefaultCollectionRenderer.CollectionRoot
       └── useCollectionRender(collection, null, ...)
            └── useCachedChildren over collection nodes
                 └── For each node: node.render!(node)
                      └── Calls the render function stored in Phase 1
                           └── The actual component (e.g. TreeItem) renders real DOM
```

### Factory Functions

- **`createLeafComponent(NodeClass, render)`** — For items without collection children (e.g. `ListBoxItem`, `MenuItem`). In shallow mode: registers into Document. In normal mode: renders directly (standalone use).

- **`createBranchComponent(NodeClass, render)`** — For items with collection children (e.g. `TreeItem`, `ListBoxSection`). Always processes children through `useCachedChildren` so nested items become child nodes in the Document tree.

### Dynamic Collections

`useCachedChildren` enables both patterns:

```tsx
// Static (JSX children)
<ListBox>
  <ListBoxItem>One</ListBoxItem>
  <ListBoxItem>Two</ListBoxItem>
</ListBox>

// Dynamic (items + render function)
<ListBox items={data}>
  {item => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
</ListBox>
```

For dynamic collections, it uses a `WeakMap` keyed by item object identity, so unchanged items skip re-rendering entirely.

---

## 2. How Tree Uses Collections

Tree is the most relevant RAC component for the Sidebar because it handles **hierarchical data rendered flat in the DOM**. Here's what makes it special:

### Custom `TreeCollection` Wrapper

The raw `BaseCollection` from `CollectionBuilder` contains all nodes in a hierarchical tree. But `treegrid` ARIA requires items to be **flat siblings** in the DOM (not nested). `TreeCollection` wraps the base collection and modifies traversal:

```typescript
class TreeCollection<T> implements ICollection<Node<T>> {
  private expandedKeys: Set<Key>;

  // getKeyAfter respects expandedKeys — collapsed children are skipped
  getKeyAfter(key: Key) {
    let node = this.getItem(key);
    // Only descend into children if the node is expanded
    if (this.expandedKeys.has(node.key) && node.firstChildKey != null) {
      return node.firstChildKey;
    }
    // Otherwise, go to next sibling, or parent's next sibling, etc.
    while (node) {
      if (node.nextKey != null) return node.nextKey;
      node = this.getItem(node.parentKey);
    }
    return null;
  }
}
```

This means the same collection powers both the flat iteration (for rendering) and the hierarchical structure (for expand/collapse logic).

### Content vs. Item Separation

Tree items have both "row content" (the label, icons, etc.) and "child items" (nested TreeItems). RAC solves this with a dedicated `TreeItemContent` component:

```tsx
<TreeItem textValue="Settings">
  <TreeItemContent>
    {({ isExpanded }) => (
      <>
        <Button slot="chevron">
          <ChevronIcon />
        </Button>
        <span>Settings</span>
      </>
    )}
  </TreeItemContent>
  {/* Child items — become separate rows in the flat collection */}
  <TreeItem textValue="General">...</TreeItem>
  <TreeItem textValue="Security">...</TreeItem>
</TreeItem>
```

`TreeItemContent` is a leaf component with type `'content'`. In `TreeItem`'s render function:

```typescript
let children = useCachedChildren({
  items: state.collection.getChildren!(item.key),
  children: item => {
    switch (item.type) {
      case 'content': return item.render!(item);  // Renders the row UI
      case 'item': return <></>;                   // Child rows are NOT nested here
    }
  }
});
```

Child `TreeItem` nodes return empty fragments — they're rendered as siblings by the flat `TreeCollection` iteration, not as DOM children of the parent row.

### What Tree Gets From the Collection System

1. **Keyboard navigation** — `ListKeyboardDelegate` uses `getKeyAfter`/`getKeyBefore` from the collection, respecting expand state
2. **Selection** — `useTreeState` builds `SelectionManager` from the collection
3. **Focus management** — The collection provides the ordered key sequence
4. **Typeahead** — `textValue` on each node enables type-to-select
5. **Drag and drop** — Drop targets reference collection keys
6. **Virtualization** — `CollectionRendererContext` can be swapped for a virtualizer
7. **SSR support** — The hidden tree + `useSyncExternalStore` pattern works server-side

---

## 3. Current Sidebar Implementation

### Architecture

The Sidebar's navigation uses a **manual JSX-to-tree parser** (`collection.ts`) that walks React children using `Children.forEach` and `isValidElement`:

```
User writes:
  <Sidebar.Nav>
    <Sidebar.Item href="/home">Home</Sidebar.Item>
    <Sidebar.Item id="settings" textValue="Settings">
      Settings
      <Sidebar.Item href="/general">General</Sidebar.Item>
    </Sidebar.Item>
  </Sidebar.Nav>

SidebarNav receives `children` prop
  └── buildCollection(children)
       └── Children.forEach walks the JSX tree
            └── For each SidebarItem: extracts props via type-assertion
                 └── separateChildren() splits children into:
                      - itemChildren (nested SidebarItem/SidebarSeparator)
                      - triggerContent (everything else — label/icons)
                 └── Recursively builds SidebarNode tree
       └── indexNodes() creates a Map<key, node> for O(1) lookup
       └── Returns { rootNodes, getItem }
```

### Data Flow

```
SidebarItem (renders null — pure data carrier)
  ↓ (JSX children)
buildCollection() — manual Children.forEach walk
  ↓ (SidebarCollection)
SidebarNav — consumes collection via useReducer stack
  ↓ (SidebarNode[])
PanelContent — renders <ul>/<li> with buttons/links
```

### Key Components

| Component                           | Role                | Renders                          |
| ----------------------------------- | ------------------- | -------------------------------- |
| `SidebarItem`                       | Data carrier        | `null`                           |
| `SidebarSeparator`                  | Separator marker    | `null`                           |
| `collection.ts` → `buildCollection` | JSX-to-tree parser  | N/A                              |
| `SidebarNav`                        | Animated drill-down | `<div>` with `motion` animations |
| `PanelContent`                      | Panel renderer      | `<ul>` with `<li>` items         |

---

## 4. Problems With the Current Approach

### 4.1 Fragile JSX Parsing

```typescript
// collection.ts
Children.forEach(children, child => {
  if (isValidElement(child) && child.type === SidebarItem) {
    const props = child.props as { id?: string; textValue?: string; ... };
    // ...
  }
});
```

**Issues:**

- **`Children.forEach` + `isValidElement`** is a legacy React pattern. React's documentation explicitly discourages it: _"Calling Children methods is uncommon and can lead to fragile code"_ (React docs). It breaks with fragments, arrays, conditional wrappers, and other composition patterns.
- **`child.type === SidebarItem`** identity check breaks across module boundaries, lazy loading, HOCs, and potentially React 19's compiler optimizations.
- **`child.props` type assertion** (`as { ... }`) bypasses TypeScript's type system. Props are read from JSX elements at parse time rather than being consumed by the components themselves.
- **Module-level `autoId` counter** (`let autoId = 0`) is reset on each `buildCollection()` call. This is fragile — in concurrent React, render functions may be called multiple times.

### 4.2 Components That Render Nothing

```typescript
export const SidebarItem = (_props: SidebarItemProps): ReactElement | null =>
  null;
export const SidebarSeparator = (): ReactElement | null => null;
```

These components exist solely as data markers. They:

- Never participate in React's lifecycle (no effects, no refs, no context)
- Can't respond to state changes (e.g., an item becoming active based on route)
- Can't render anything themselves (the rendering is entirely delegated to `PanelContent`)
- Violate the principle of React components being self-contained rendering units

### 4.3 No Dynamic Collections

The current API only supports static JSX children:

```tsx
// ✅ This works
<Sidebar.Nav>
  <Sidebar.Item href="/home">Home</Sidebar.Item>
</Sidebar.Nav>

// ❌ This is impossible
<Sidebar.Nav items={menuItems}>
  {item => <Sidebar.Item id={item.id} href={item.href}>{item.label}</Sidebar.Item>}
</Sidebar.Nav>
```

There's no way to pass `items` + a render function. Every item must be statically declared in JSX.

### 4.4 No Accessibility Infrastructure

The current implementation hand-rolls all ARIA attributes:

- `aria-haspopup="true"` on branch items (manual)
- `aria-current="page"` on active items (manual)
- Back button has `aria-label` (manual)
- No keyboard navigation (Tab is the only way to move between items)
- No `role="tree"` / `role="treeitem"` semantics
- No `aria-expanded` on branch items
- No typeahead/type-to-select

RAC's collection system provides all of this for free through hooks like `useTree`, `useTreeItem`, `useListBox`, etc.

### 4.5 Two Separate Rendering Codepaths

`PanelContent` is a monolithic renderer that handles all node types in a single function with conditionals. This means:

- Adding a new node type requires modifying `PanelContent`
- There's no way for consumers to customize how an individual item renders
- The rendering logic is separated from the data declaration (SidebarItem defines _data_, PanelContent defines _rendering_)

### 4.6 No Render Props / State-Driven Styling

RAC items support render props for state-driven styling:

```tsx
<TreeItem className={({isExpanded, isSelected}) => cn(isExpanded && 'bg-gray-100')}>
```

The current Sidebar has no equivalent. Item styling is entirely theme-driven with no way to respond to interaction state (hovered, focused, pressed, active) in user code.

---

## 5. Can We Use RAC's Collection Primitives?

### Short Answer: Not directly, but we can learn from them.

### Why Not Directly?

1. **`@react-aria/collections` is an internal package** — It's not part of React Aria's public API. The exports (`CollectionBuilder`, `createLeafComponent`, `createBranchComponent`, `BaseCollection`, `Document`) are implementation details that could change between versions.

2. **The two-phase rendering adds complexity** — The hidden tree + portal + fake DOM approach is powerful but complex. It's justified for components that need `useSyncExternalStore`-based state (selection, focus, keyboard delegate) before rendering. The Sidebar's drill-down navigation doesn't need this — it doesn't have selection or keyboard-delegate state that must be computed pre-render.

3. **Bundle size** — Using the full collection machinery adds significant code (Document, BaseCollection, CollectionBuilder, etc.) for features the Sidebar doesn't need.

4. **The Sidebar is not a standard ARIA widget** — There's no `role="sidebar"` or standard ARIA pattern for drill-down navigation panels. The Sidebar is a custom navigation pattern that doesn't map to `tree`, `listbox`, `menu`, or any other standard collection widget. Using `useTree` or `useListBox` would impose semantics that don't match.

### What We CAN Take From RAC

1. **The API pattern** — `items` + render function for dynamic collections, `createBranchComponent`/`createLeafComponent` separation
2. **Render props** — State-driven `className`/`children` functions
3. **Node types** — The concept of typed collection nodes with `key`, `textValue`, `level`, `parentKey`, etc.
4. **`useCachedChildren`** — WeakMap-based caching for dynamic collections (simple to implement ourselves)
5. **Context-based composition** — Items reading state from context rather than having it passed as props

---

## 6. Proposed Architecture

### Option A: Enhanced Manual Collection (Recommended)

Keep the manual collection approach but fix the fragility issues, add dynamic collection support, and make items self-rendering.

#### Key Changes

1. **Replace `Children.forEach` with Context-based registration**
2. **Make items self-rendering** (not null-renderers)
3. **Add `items` + render function support**
4. **Add render props for state-driven styling**

#### How Context-Based Registration Works

Instead of parsing JSX, items _register themselves_ into a parent context:

```typescript
// Collection context
interface SidebarNavContext {
  register: (key: string, node: SidebarNode) => void;
  unregister: (key: string) => void;
}

// SidebarItem registers itself on mount
const SidebarItem = ({ id, textValue, href, children, ...props }) => {
  const ctx = useContext(SidebarNavRegistryContext);
  const key = id ?? useId();

  useEffect(() => {
    ctx.register(key, { type: 'item', key, textValue, href, ...props });
    return () => ctx.unregister(key);
  }, [key, textValue, href, props.active]);

  return null; // Still renders null in the registration phase
};
```

**Problem:** This still requires items to render, and the registration happens in effects (async), which means the collection isn't available on first render. This is exactly the problem RAC's two-phase approach solves.

**Better approach:** Keep the manual parse but make it robust:

```typescript
// Use React.Children.toArray (handles fragments, arrays) + type guard
const isSidebarItem = (
  child: ReactNode
): child is ReactElement<SidebarItemProps> =>
  isValidElement(child) &&
  typeof child.type === 'function' &&
  (child.type as any).__SIDEBAR_ITEM__ === true;

// Mark the component
SidebarItem.__SIDEBAR_ITEM__ = true;
```

#### Self-Rendering Items

Instead of items rendering null and having `PanelContent` render everything, items render themselves when they're in a "render context":

```typescript
const SidebarItemRenderContext = createContext<SidebarItemRenderValues | null>(null);

const SidebarItem = (props: SidebarItemProps) => {
  const renderCtx = useContext(SidebarItemRenderContext);

  // Outside render context: return null (we're being parsed by buildCollection)
  if (!renderCtx) return null;

  // Inside render context: render the actual item
  const { classNames, onNavigate, isBranch } = renderCtx;
  return (
    <li className={classNames.menuItem}>
      {isBranch ? (
        <button onClick={() => onNavigate(props.id)}>
          {props.children}
          <ChevronRight />
        </button>
      ) : (
        <a href={props.href}>{props.children}</a>
      )}
    </li>
  );
};
```

### Option B: Custom Collection Builder Inspired by RAC

Build a lightweight collection system that borrows RAC's API patterns without the full two-phase rendering machinery.

```typescript
// Lightweight collection builder (no fake DOM, no portals)
function useSidebarCollection(children: ReactNode): SidebarCollection {
  return useMemo(() => buildCollection(children), [children]);
}

// But with RAC-style dynamic support
interface SidebarNavProps<T> {
  items?: Iterable<T>;
  children: ReactNode | ((item: T) => ReactNode);
  dependencies?: ReadonlyArray<any>;
}

function SidebarNav<T>({ items, children, dependencies }: SidebarNavProps<T>) {
  const resolvedChildren = useCachedChildren({ items, children, dependencies });
  const collection = useSidebarCollection(resolvedChildren);
  // ... rest of drill-down logic
}
```

This gives us the dynamic `items` API without the full collection machinery.

### Option C: Use RAC's Tree Component Directly

Wrap `react-aria-components`' `<Tree>` / `<TreeItem>` and style it as a sidebar:

```tsx
<Tree aria-label="Sidebar navigation" selectionMode="single">
  <TreeItem textValue="Home">
    <TreeItemContent>Home</TreeItemContent>
  </TreeItem>
  <TreeItem textValue="Settings">
    <TreeItemContent>
      {({ isExpanded }) => <>Settings {isExpanded ? '▼' : '▶'}</>}
    </TreeItemContent>
    <TreeItem textValue="General">
      <TreeItemContent>General</TreeItemContent>
    </TreeItem>
  </TreeItem>
</Tree>
```

**Pros:** Full accessibility, keyboard navigation, selection, typeahead for free.
**Cons:** Tree uses `treegrid` ARIA role (requires `role="row"` + `role="gridcell"` wrappers on every item). The drill-down animation pattern doesn't map to Tree's expand/collapse model — Tree shows all levels simultaneously (indented), while Sidebar shows one level at a time (sliding panels). Significant styling constraints from the treegrid markup structure.

---

## 7. API Comparison

### Current API

```tsx
<Sidebar.Nav>
  <Sidebar.Item href="/home" active>
    Home
  </Sidebar.Item>
  <Sidebar.Item id="settings" textValue="Settings">
    Settings
    <Sidebar.Item href="/general">General</Sidebar.Item>
    <Sidebar.Item href="/security">Security</Sidebar.Item>
  </Sidebar.Item>
  <Sidebar.Separator />
</Sidebar.Nav>
```

### Proposed API (Option B — Recommended)

```tsx
{
  /* Static — same DX as current */
}
<Sidebar.Nav>
  <Sidebar.Item href="/home" active>
    Home
  </Sidebar.Item>
  <Sidebar.Item id="settings" textValue="Settings">
    Settings
    <Sidebar.Item href="/general">General</Sidebar.Item>
    <Sidebar.Item href="/security">Security</Sidebar.Item>
  </Sidebar.Item>
  <Sidebar.Separator />
</Sidebar.Nav>;

{
  /* Dynamic — new capability */
}
<Sidebar.Nav items={menuItems}>
  {item => (
    <Sidebar.Item id={item.id} href={item.href} active={item.active}>
      <item.icon size={16} />
      {item.label}
      {item.children?.map(child => (
        <Sidebar.Item key={child.id} id={child.id} href={child.href}>
          {child.label}
        </Sidebar.Item>
      ))}
    </Sidebar.Item>
  )}
</Sidebar.Nav>;
```

### RAC Tree API (for reference)

```tsx
<Tree items={menuItems} selectionMode="single" aria-label="Navigation">
  {item => (
    <TreeItem textValue={item.label}>
      <TreeItemContent>
        {({ isExpanded, level }) => (
          <div style={{ paddingLeft: level * 16 }}>
            {item.children?.length > 0 && (
              <Button slot="chevron">{isExpanded ? '▼' : '▶'}</Button>
            )}
            {item.label}
          </div>
        )}
      </TreeItemContent>
      {item.children?.map(child => (
        <TreeItem key={child.id} textValue={child.label}>
          <TreeItemContent>{child.label}</TreeItemContent>
        </TreeItem>
      ))}
    </TreeItem>
  )}
</Tree>
```

---

## Summary of Recommendations

| Aspect                  | Recommendation                                                    | Reasoning                                                               |
| ----------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Collection building** | Keep manual parse, fix fragility                                  | RAC's two-phase rendering is overkill for our use case                  |
| **Dynamic collections** | Add `items` + render function to `SidebarNav`                     | Follows RAC pattern, enables data-driven sidebars                       |
| **Item rendering**      | Keep items as data carriers, but improve `PanelContent`           | Self-rendering items require the two-phase approach to work properly    |
| **Type safety**         | Add branded component marker instead of `child.type ===` check    | More robust across module boundaries                                    |
| **Key generation**      | Use `useId()` or stable hash instead of module-level counter      | Concurrent-safe                                                         |
| **Accessibility**       | Add `role="navigation"`, `aria-label`, keyboard nav incrementally | Don't adopt Tree's `treegrid` role — it doesn't match the drill-down UX |
| **Render props**        | Add state-driven `className`/`children` to `SidebarItem`          | Enables consumer-side customization                                     |
| **Caching**             | Implement lightweight `useCachedChildren` for dynamic items       | Same WeakMap pattern as RAC, minimal code                               |

The biggest concrete improvement: **Add `items` + render function support** to `SidebarNav` using a lightweight `useCachedChildren` implementation. This gives us the most impactful RAC-style API improvement with the least architectural disruption.
