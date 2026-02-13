# Architecture: ActionBar ↔ TableView Integration (S2)

> **Purpose**: Detailed architecture analysis of how ActionBar integrates with TableView in `@react-spectrum/s2`. This is a reference document, not an implementation plan.

---

## Files

| File                                                      | Role                                               |
| --------------------------------------------------------- | -------------------------------------------------- |
| `packages/@react-spectrum/s2/src/ActionBar.tsx`           | ActionBar component + `useActionBarContainer` hook |
| `packages/@react-spectrum/s2/src/TableView.tsx`           | TableView component (consumer of the hook)         |
| `packages/@react-spectrum/s2/src/CardView.tsx`            | CardView component (also uses the same hook)       |
| `packages/@react-stately/utils/src/useControlledState.ts` | Controlled/uncontrolled state utility              |
| `packages/@react-spectrum/s2/intl/en-US.json`             | Intl messages for ActionBar                        |

---

## 1. Integration Overview

The integration uses a **mediator hook** pattern. `useActionBarContainer` sits between TableView and ActionBar, intercepting selection state so the ActionBar can display counts and clear selections while the table remains unaware of the ActionBar's existence.

```
                      ┌──────────────────────────────────┐
                      │         TableView (consumer)      │
                      │                                    │
                      │  props: renderActionBar,           │
                      │         selectedKeys,              │
                      │         defaultSelectedKeys,       │
                      │         onSelectionChange,         │
                      │         scrollRef (internal)       │
                      └──────────┬───────────────────────┘
                                 │
                                 ▼
                      ┌──────────────────────────────────┐
                      │    useActionBarContainer (hook)    │
                      │                                    │
                      │  - Manages selection via           │
                      │    useControlledState              │
                      │  - Calls renderActionBar(keys)     │
                      │  - Wraps in ActionBarContext        │
                      │  - Measures height via callback ref │
                      │                                    │
                      │  Returns:                          │
                      │    selectedKeys, onSelectionChange  │
                      │    actionBar, actionBarHeight       │
                      └──────────┬───────────────────────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼                         ▼
        ┌──────────────────┐      ┌──────────────────────┐
        │     RACTable      │      │      ActionBar        │
        │                   │      │                        │
        │ selectedKeys ←────┤      │ Receives via context:  │
        │ onSelectionChange │      │   scrollRef            │
        │ paddingBottom     │      │   selectedItemCount    │
        │ scrollPaddingBot. │      │   onClearSelection     │
        └───────────────────┘      │   ref (callback)       │
                                   └────────────────────────┘
```

---

## 2. The Hook: `useActionBarContainer`

**Location**: `ActionBar.tsx:205-240`

### Signature

```ts
interface ActionBarContainerHookProps {
  selectedKeys?: 'all' | Iterable<Key>;
  defaultSelectedKeys?: 'all' | Iterable<Key>;
  onSelectionChange?: (keys: Set<Key>) => void;
  renderActionBar?: (selectedKeys: 'all' | Set<Key>) => ReactElement;
  scrollRef?: RefObject<HTMLElement | null>;
}

interface ActionBarContainerHookResult {
  selectedKeys: 'all' | Iterable<Key>;
  onSelectionChange: (keys: 'all' | Iterable<Key>) => void;
  actionBar: ReactElement;
  actionBarHeight: number;
}
```

### Step-by-step

| Step                   | Line(s) | What it does                                                                                                                           |
| ---------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Selection state     | 207     | `useControlledState` wraps `selectedKeys` / `defaultSelectedKeys` / `onSelectionChange` into a single controlled-or-uncontrolled state |
| 2. Convert to Set      | 208     | `useMemo` converts `Iterable<Key>` to `Set<Key>`, preserves `'all'` literal                                                            |
| 3. Render ActionBar    | 209     | Calls `renderActionBar?.(selectedKeysSet)` inside `useMemo`                                                                            |
| 4. Derive count        | 210     | `selectedItemCount = selectedKeysSet === 'all' ? 'all' : selectedKeysSet.size`                                                         |
| 5. Height measurement  | 211-219 | **Callback ref** that calls `UNSAFE_getDOMNode()` to get the real DOM node, stores `offsetHeight + 8` (8px for bottom gap)             |
| 6. Build context value | 221-226 | Creates `{ ref, scrollRef, selectedItemCount, onClearSelection }` where `onClearSelection = () => setSelectedKeys(new Set())`          |
| 7. Wrap in Provider    | 228-232 | `<ActionBarContext.Provider value={actionBarContext}>{actionBar}</ActionBarContext.Provider>`                                          |
| 8. Return              | 234-239 | Returns `{ selectedKeys, onSelectionChange: setSelectedKeys, actionBar, actionBarHeight }`                                             |

### Why `useControlledState`?

(`@react-stately/utils/src/useControlledState.ts`)

- Supports both controlled (`selectedKeys` prop provided) and uncontrolled (`defaultSelectedKeys` only)
- Uses a `valueRef` for synchronous reads inside callbacks
- Warns in dev mode if switching between controlled/uncontrolled
- Fires `onChange` on every `setValue` call

---

## 3. TableView Consumption

**Location**: `TableView.tsx:284-383`

### Hook call (line 331)

```ts
let scrollRef = useRef<HTMLElement | null>(null); // line 328
let { selectedKeys, onSelectionChange, actionBar, actionBarHeight } =
  useActionBarContainer({ ...props, scrollRef }); // line 331
```

### How `scrollRef` flows

1. TableView creates `scrollRef` (line 328)
2. Passed to `useActionBarContainer` (line 331)
3. Hook injects it into `ActionBarContext` (line 223)
4. ActionBar reads it for: animation gating, scrollbar measurement, position mode, live announcement

### Selection override (lines 375-377)

```ts
<RACTable
  selectedKeys={selectedKeys}
  defaultSelectedKeys={undefined}       // forced undefined to prevent double-init
  onSelectionChange={onSelectionChange}  // from the hook, not from user props
/>
```

The hook **intercepts** selection: the user's `onSelectionChange` fires through `useControlledState`, while the hook's setter is what the table actually calls.

### Scroll padding (lines 363-364)

```ts
style={{
  paddingBottom: actionBarHeight > 0 ? actionBarHeight + 8 : 0,
  scrollPaddingBottom: actionBarHeight > 0 ? actionBarHeight + 8 : 0
}}
```

- `paddingBottom`: Creates physical space so bottom rows aren't obscured
- `scrollPaddingBottom`: Tells the browser's scroll-into-view algorithm to account for the bar during keyboard navigation

### DOM structure

```
ResizableTableContainer          (position: relative, overflow: clip)
  ├── Virtualizer
  │     └── InternalTableContext.Provider
  │           └── RACTable        (ref={scrollRef}, the scrollable element)
  └── {actionBar}                 (position: absolute, bottom: 0)
```

The `overflow: clip` on `tableWrapper` (line 140) is critical: it contains the ActionBar's slide-in/out animation within the table container bounds.

---

## 4. ActionBar Component

### Outer shell: Visibility gating (`ActionBar.tsx:96-107`)

```ts
let isOpen = props.selectedItemCount !== 0;
let isExiting = useExitAnimation(domRef, isOpen && props.scrollRef != null);
if (!isOpen && !isExiting) return null;
return <ActionBarInner {...props} ref={domRef} isExiting={isExiting} />;
```

- `useExitAnimation` keeps the DOM alive during the 200ms exit CSS transition
- Only gated when `scrollRef` is provided (i.e., when inside a container)

### Inner component: `ActionBarInner` (`ActionBar.tsx:109-188`)

#### Last-count retention (lines 115-118)

```ts
let [lastCount, setLastCount] = useState(selectedItemCount);
if (
  (selectedItemCount === 'all' || selectedItemCount > 0) &&
  selectedItemCount !== lastCount
) {
  setLastCount(selectedItemCount);
}
```

Retains the last non-zero count so the text doesn't jump to "0 selected" during the exit animation.

#### Scrollbar width compensation (lines 121-133)

```ts
let [scrollbarWidth, setScrollbarWidth] = useState(0);
let updateScrollbarWidth = useCallback(() => {
  let w = el.offsetWidth - el.clientWidth;
  setScrollbarWidth(w);
}, [scrollRef]);

useResizeObserver({ ref: scrollRef, onResize: updateScrollbarWidth });
```

Applied via inline style: `insetInlineEnd: calc(var(--insetEnd) + ${scrollbarWidth}px)` (line 165). Prevents ActionBar from overlapping the scrollbar.

#### Escape key handling (lines 135-144)

```ts
let { keyboardProps } = useKeyboard({
  onKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClearSelection?.();
    } else {
      e.continuePropagation();
    }
  },
});
```

#### Screen reader announcement (lines 147-153)

On mount (first render with `scrollRef`), announces `"Actions available."` via `@react-aria/live-announcer`.

#### Enter animation (lines 155-156)

```ts
let isEntering = useEnterAnimation(objectRef, !!scrollRef);
```

#### FocusScope (line 159)

```ts
<FocusScope restoreFocus>
```

When ActionBar unmounts, focus returns to the previously focused element (e.g., the table row).

---

## 5. Animation System

### CSS (lines 30-76)

```ts
transition: 'transform',
transitionDuration: 200,
translateY: {
  default: -8,           // resting state: 8px above bottom edge
  isEntering: 'full',    // 100% off-screen (slides up into view)
  isExiting: 'full'      // 100% off-screen (slides down out of view)
}
```

### Lifecycle

1. **Mount**: `isEntering = true` -> `translateY(100%)` (off-screen)
2. **Next frame**: `isEntering = false` -> `translateY(-8px)` (200ms CSS transition)
3. **Close**: `isExiting = true` -> `translateY(100%)` (200ms CSS transition)
4. **After transition**: `useExitAnimation` detects `transitionend`, component returns `null`

---

## 6. Complete Selection Data Flow

### Forward flow (user selects rows):

```
User clicks row checkbox
  → RACTable fires onSelectionChange(newKeys)
  → useActionBarContainer's setSelectedKeys(newKeys)
  → useControlledState updates state + fires user's onSelectionChange
  → selectedKeysSet recalculated (useMemo)
  → renderActionBar(selectedKeysSet) called
  → ActionBar receives new selectedItemCount via context
  → lastCount updated, display text re-rendered
  → If first selection: mount + enter animation + screen reader announcement
```

### Reverse flow (user clears selection):

```
User clicks ActionBar close button OR presses Escape
  → onClearSelection() fires → setSelectedKeys(new Set())
  → selectedItemCount becomes 0
  → isOpen = false in outer ActionBar
  → useExitAnimation keeps DOM alive
  → translateY transitions to 100% (200ms)
  → transitionend → component unmounts (returns null)
  → actionBarRef(null) → actionBarHeight resets to 0
  → TableView paddingBottom/scrollPaddingBottom removed
  → FocusScope restores focus to previous element
```

---

## 7. Shared Pattern: CardView

`CardView.tsx` uses the exact same `useActionBarContainer` hook (line ~252), proving the hook is a reusable integration point, not TableView-specific.

---

## 8. Intl Messages

| Key                          | Value                                                      | Used at                                  |
| ---------------------------- | ---------------------------------------------------------- | ---------------------------------------- |
| `actionbar.actions`          | `"Actions"`                                                | ActionButtonGroup aria-label (line 170)  |
| `actionbar.actionsAvailable` | `"Actions available."`                                     | Live region announcement (line 151)      |
| `actionbar.clearSelection`   | `"Clear selection"`                                        | CloseButton aria-label (line 177)        |
| `actionbar.selected`         | `"{count, plural, =0 {None selected} other {# selected}}"` | Count display (line 182)                 |
| `actionbar.selectedAll`      | `"All selected"`                                           | When `selectedKeys === 'all'` (line 181) |

---

## 9. Key Design Decisions

1. **Mediator hook pattern**: Decouples ActionBar from Table — neither knows about the other directly
2. **Callback ref for height**: Dynamic measurement without ResizeObserver on the ActionBar itself
3. **Last-count retention**: Smooth exit animation with non-zero text
4. **Dual padding strategy**: `paddingBottom` for content space, `scrollPaddingBottom` for keyboard nav
5. **overflow: clip**: Containment for animation without interfering with scrolling (unlike `overflow: hidden`)
6. **Context-based prop injection**: ActionBar reads its config from `ActionBarContext`, enabling the hook to configure it without prop drilling
7. **Scrollbar compensation**: Prevents ActionBar from overlapping native scrollbars
8. **`defaultSelectedKeys={undefined}`**: Forced on RACTable to prevent double initialization when the hook already manages initial state
