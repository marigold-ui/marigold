# SidebarNav Structure Analysis

## How Vercel's Sidebar Works

Inspected the live sidebar at `vercel.com/marigold/` and clicked into the "Observability" sub-navigation. Here's what they do:

### HTML Structure

```
<nav>                              <!-- single nav, no aria-label -->
  <div>                            <!-- container for all panels -->
    <div inert>                    <!-- root panel (hidden when in sub-nav) -->
      <div>                        <!-- links container -->
        <a href="/marigold">Projects</a>
        <a href="...">Deployments</a>
        <a href="...">Observability</a>    <!-- branch link with chevron -->
        <hr>                               <!-- separator: plain <hr> -->
        <a href="...">Settings</a>         <!-- another branch link -->
      </div>
      <div>...</div>               <!-- user account section -->
    </div>
    <div>                          <!-- active sub-nav panel -->
      <div>
        <button>Observability</button>     <!-- back button: plain <button>, no roles -->
      </div>
      <div>                                <!-- sub-nav links -->
        <a href="...">Overview</a>
        <a href="...">Query</a>
        <div>Compute</div>                 <!-- section label: plain <div>, no roles -->
        <a href="...">Functions</a>
        <a href="...">External APIs</a>
        <div>CDN</div>                     <!-- another section label -->
        <a href="...">Edge Requests</a>
        <div>Services</div>
        <a href="...">AI</a>
      </div>
    </div>
  </div>
</nav>
```

### Key Design Decisions

1. **Single `<nav>` element** -- only one, wrapping everything.

2. **No menu ARIA roles anywhere in the navigation.** The only `role="menuitem"` elements on the page are outside the nav (in context menus/dropdowns). The sidebar uses plain `<a>` links and `<button>` elements.

3. **No `<ul>`/`<li>` lists.** Everything is flat `<div>` and `<a>` elements. No list semantics.

4. **Both panels stay in the DOM permanently.** When navigating into a sub-section:
   - The root panel gets `inert` + `position: absolute` + `opacity: 0` + `pointer-events: none` + `transform: translateX(-8px)`
   - The sub-nav panel gets `position: static` + `opacity: 1` + `pointer-events: auto`

5. **CSS transitions, not CSS animations.** Both panels have `transition: transform 0.2s, opacity 0.2s, filter 0.2s`. The animation is driven by toggling CSS classes/properties, not by keyframe animations.

6. **`inert` only, no `aria-hidden`.** Vercel relies solely on the `inert` attribute to hide the inactive panel from assistive technology. `inert` implies `aria-hidden` already.

7. **Back button is a plain `<button>`** with text content showing the section name (e.g., "Observability"). No `role="menuitem"`, no `aria-label`.

8. **Section group labels** (e.g., "Compute", "CDN", "Services") are plain `<div>` elements with no ARIA roles.

9. **Separators** are plain `<hr>` elements with no role attributes.

---

## Problems With Our Current SidebarNav

### 1. Wrong ARIA Pattern: `role="menu"` is for Application Menus, Not Navigation

Our code uses `role="menu"` on the `<ul>` and `role="menuitem"` on all items. This is semantically incorrect.

The [WAI-ARIA menu role](https://www.w3.org/TR/wai-aria-1.2/#menu) is designed for **application menus** -- like the File/Edit/View menus in a desktop app. It implies specific keyboard behavior (arrow keys to navigate, Enter to activate, Escape to close) and is announced by screen readers as "menu" which is confusing for site navigation.

**What navigation should use:** A `<nav>` element with `<a>` links. That's it. Screen readers already announce `<nav>` as a navigation landmark. Links inside it are announced as links. This is the standard pattern for site navigation.

Vercel does exactly this -- plain `<nav>` with `<a>` elements.

**What we do:**

```html
<nav>
  <ul role="menu">
    <li role="none">
      <a role="menuitem" href="...">Home</a>
      <!-- screen reader: "Home, menu item" -->
    </li>
  </ul>
</nav>
```

**What it should be:**

```html
<nav aria-label="Sidebar">
  <div>
    <a href="...">Home</a>
    <!-- screen reader: "Home, link" -->
  </div>
</nav>
```

### 2. Redundant `<ul>`/`<li>` Wrapping With `role="none"`

We wrap items in `<ul>` and `<li role="none">`. The `role="none"` explicitly removes the list semantics, making the `<ul>`/`<li>` structure purely decorative. If we're removing list semantics anyway, we might as well use `<div>` elements like Vercel does -- simpler DOM, same accessibility outcome.

### 3. Exiting Panel Approach Is Fragile

**Our approach:** When navigating, we snapshot the current panel into `exitingPanel` state, render a duplicate `InnerPanelContent` with `animationState="exiting"`, and clean it up on `onAnimationEnd`.

**Problems:**

- If `onAnimationEnd` doesn't fire (e.g., animation is interrupted, element is removed, or `prefers-reduced-motion` isn't handled perfectly), the exiting panel could persist forever.
- We render full interactive markup (buttons, links, event handlers) in the exiting panel, even though it's `inert`. This is wasteful.
- The snapshot approach requires `snapshotCurrentPanel()` to re-derive nodes from the collection, adding complexity.

**Vercel's approach:** Both panels are always in the DOM. The inactive one is simply `inert` + `position: absolute` + `opacity: 0`. No snapshot, no animation-end cleanup, no duplicate rendering. CSS transitions handle the visual animation by changing properties on a stable DOM.

### 4. `aria-hidden` Is Redundant With `inert`

We set both `inert` and `aria-hidden="true"` on the exiting panel (line 140-141 of SidebarNav.tsx). The `inert` attribute already makes the element and all its descendants inert to assistive technology, focus, and pointer events. Adding `aria-hidden` is redundant. Vercel only uses `inert`.

### 5. FocusScope May Conflict With Navigation Semantics

We wrap the active panel in `<FocusScope>` from `@react-aria/focus`. `FocusScope` is designed for modal-like contexts where focus should be trapped. In a navigation sidebar, trapping focus is unexpected -- users should be able to Tab out of the sidebar into the main content area.

### 6. Complex Keyboard Handler Reimplementation

We manually implement ArrowDown/ArrowUp/Home/End/Escape keyboard handling using `useFocusManager`. This is behavior that belongs to the `role="menu"` pattern -- but since we shouldn't be using `role="menu"` for navigation, we also shouldn't need this keyboard handling.

For navigation, the expected keyboard behavior is:

- **Tab/Shift+Tab** to move between links (browser default)
- **Enter** to follow the link (browser default)
- No arrow key navigation expected

If we do want arrow key navigation as an enhancement, it should be opt-in and not part of the base navigation pattern.

---

## Proposed Structure

Based on Vercel's approach and ARIA best practices:

```tsx
// SidebarNav renders a single <nav> with two persistent panel <div>s
<nav aria-label={ariaLabel}>
  {/* Root panel -- always in DOM, inert when not active */}
  <div
    inert={stack.length > 0 || undefined}
    style={stack.length > 0 ? { position: 'absolute', ... } : undefined}
  >
    {rootNodes.map(node => (
      node.type === 'separator' ? <hr /> :
      node.children.length > 0 ? (
        <button onClick={() => push(node.key)}>
          {node.triggerContent}
          <ChevronRight />
        </button>
      ) : (
        <a href={node.href} aria-current={node.active ? 'page' : undefined}>
          {node.triggerContent}
        </a>
      )
    ))}
  </div>

  {/* Sub-nav panel -- always in DOM, inert when not active */}
  {activeKey && (
    <div>
      <button onClick={pop}>
        <ChevronLeft /> {parentLabel}
      </button>
      {activeNodes.map(node => (
        // same pattern as root panel
      ))}
    </div>
  )}
</nav>
```

### Key Changes

| Aspect           | Current                                             | Proposed                                          |
| ---------------- | --------------------------------------------------- | ------------------------------------------------- |
| ARIA roles       | `role="menu"`, `role="menuitem"`, `role="none"`     | No roles -- just `<nav>`, `<a>`, `<button>`       |
| List markup      | `<ul>/<li>` with `role="none"`                      | Flat `<div>/<a>/<button>`                         |
| Panel lifecycle  | Snapshot + duplicate render + animationEnd cleanup  | Persistent panels, toggle `inert` + CSS           |
| Animation        | CSS `@keyframes` via `data-entering`/`data-exiting` | CSS transitions on `opacity`/`transform`          |
| Hidden panel     | `inert` + `aria-hidden="true"`                      | `inert` only                                      |
| Focus management | `FocusScope` + `useFocusManager` + roving tabindex  | Browser-default Tab behavior, optional arrow keys |
| Keyboard         | Manual ArrowUp/Down/Home/End/Escape                 | Tab/Shift+Tab (default), Enter (default)          |
| Separators       | `<li role="separator"><hr /></li>`                  | `<hr />`                                          |

### Animation Approach

Switch from CSS `@keyframes` animations to CSS transitions:

```css
/* Both panels share these transition properties */
.panel {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

/* Active panel */
.panel[data-active] {
  position: static;
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

/* Inactive panel (pushed back) */
.panel[data-inactive='backward'] {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translateX(-8px);
  pointer-events: none;
}

/* Inactive panel (pushed forward) */
.panel[data-inactive='forward'] {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translateX(8px);
  pointer-events: none;
}
```

This removes the need for `onAnimationEnd`, `exitingPanel` state, `snapshotCurrentPanel()`, and the `animationState` prop entirely.

---

## Summary

The core issue is that our SidebarNav uses the **application menu pattern** (`role="menu"`) when it should use the **navigation pattern** (`<nav>` + links). This drives a cascade of unnecessary complexity: roving tabindex, custom keyboard handlers, FocusScope, `<ul>/<li>` with `role="none"` overrides.

Vercel's implementation is dramatically simpler: a single `<nav>`, flat `<a>` links, two persistent `<div>` panels toggled with `inert` and CSS transitions. No ARIA roles beyond what HTML provides natively.

The refactor should:

1. Drop `role="menu"`, `role="menuitem"`, `role="none"`
2. Replace `<ul>/<li>` with flat `<div>/<a>/<button>`
3. Keep both panels permanently in the DOM, toggle `inert`
4. Switch from CSS animations + snapshot to CSS transitions on persistent elements
5. Remove `FocusScope` and roving tabindex (use browser-default Tab navigation)
6. Keep arrow key navigation as optional enhancement only
