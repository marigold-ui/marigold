# Vercel Dashboard Sidebar Navigation — Detailed Analysis

## Overview

The Vercel dashboard uses a fixed left sidebar navigation with a two-level drill-down pattern. Clicking items that have sub-sections (marked with a chevron `>`) triggers a smooth slide animation that replaces the entire nav content with the sub-section's links. A "back" button at the top of the sub-section reverses the animation.

---

## 1. Outer Structure

### Sidebar Root (Fixed Container)

```
div.lg:fixed.md:left-0.md:top-0.md:h-screen.md:w-[var(--sidebar-width)]
```

| Property         | Value                                                        |
| ---------------- | ------------------------------------------------------------ |
| Position         | `fixed`                                                      |
| Width            | `var(--sidebar-width)` = `256px`                             |
| Height           | `100vh` (full screen)                                        |
| z-index          | `calc(var(--header-zindex) + 1)` = `76`                      |
| Background       | `rgb(250, 250, 250)` (`bg-background-200`)                   |
| Border           | `1px solid rgb(242, 242, 242)` on the right                  |
| Will-change      | `width` (for collapsed sidebar animation on `lg` breakpoint) |
| Display          | `flex` column, `hidden` below `lg`                           |
| Collapse support | `[html.sidebar-collapsed_&]:md:border-transparent`           |

### Inner Sidebar (`dash-sidebar`)

```
div.dash-sidebar.flex.flex-col.md:absolute.md:right-0.md:top-0.w-full.h-full
```

This is positioned absolutely within the fixed outer wrapper and contains 4 children:

| Index | Element     | Description                          | Visibility       |
| ----- | ----------- | ------------------------------------ | ---------------- |
| 0     | `<header>`  | Team switcher + Search (`Find...`)   | `hidden md:flex` |
| 1     | `<header>`  | Mobile horizontal nav                | `flex md:hidden` |
| 2     | `<div>`     | Nav scroll container (wraps `<nav>`) | Always visible   |
| 3     | `<section>` | Footer (avatar + notifications)      | `hidden md:flex` |

### Header (Index 0)

```
header.relative.hidden.md:flex.flex-col.gap-1.pt-1
```

- **Team Switcher**: Link with avatar, team name ("Sebastian Sebald"), and plan badge ("Hobby"), plus a team-switching dropdown button
- **Search**: `Find... F` button (global search with `F` keyboard shortcut)

Height: ~92px

### Footer (Index 3)

```
section.hidden.md:flex.flex-col.gap-0.5
```

Contains the user avatar button ("Sebastian Sebald") and a notification bell with badge count.

Height: ~52px

---

## 2. Nav Scroll Container

```
div.md:flex-1.relative.md:min-h-0
```

- `flex: 1 1 0%` — takes all remaining vertical space between header and footer
- `position: relative` — establishes positioning context for animation
- `min-height: 0` — allows flex shrinking for overflow

### `<nav>` Element

```
nav.overflow-x-clip.overflow-y-auto.pt-2.pb-10.md:py-2.md:h-full.overscroll-none
    .sidebar-module__J4DTiG__hideScrollbar
```

| Property   | Value                                      |
| ---------- | ------------------------------------------ |
| overflow-x | `clip` (hides horizontal overflow)         |
| overflow-y | `auto` (scrollable when content overflows) |
| padding    | `8px 0` (on desktop)                       |
| height     | `100%` (fills scroll container)            |
| overscroll | `none` (no bounce/chaining)                |
| scrollbar  | Hidden via custom CSS module class         |

Mobile-specific: `max-h-[calc(100svh_-_108px)]`, `shadow-modal`, `rounded-[16px]`, `bg-background-100`

---

## 3. Animation Container

Inside `<nav>`, there is a **positioning wrapper**:

```
div.relative
```

This `div.relative` is the animation root. It contains **one or two panel divs** depending on navigation state:

### Resting State (Main Nav Only)

```
div.relative
  └── div (panel 0 — main nav)
        style="transition: transform 0.2s ease, opacity 0.2s ease, filter 0.2s ease"
        └── div.relative.flex.flex-col.px-2.gap-px  (link list)
        └── div (mobile footer — display:none on desktop)
```

### Drilled-Down State (Sub-Nav Visible)

When a chevron link is clicked, a **second panel is added** and the first panel is animated out:

```
div.relative
  ├── div (panel 0 — main nav, animated OUT to the left)
  │     class="absolute inset-x-0 top-0 -translate-x-2 opacity-0 blur-[2px] pointer-events-none motion-reduce:invisible"
  │     style="transition: transform 0.2s ease, opacity 0.2s ease, filter 0.2s ease"
  │
  └── div (panel 1 — sub-nav, animated IN from the right)
        style="transition: transform 0.2s, opacity 0.2s, filter 0.2s;"
        ├── div.w-full.px-2.pb-1  (back button container)
        └── div.relative.flex.flex-col.px-2.gap-px  (sub-nav links)
```

### Reverse Animation (Back to Main)

When the back button is clicked, the states are swapped:

```
div.relative
  ├── div (panel 0 — main nav, animated back IN)
  │     class=""  (no special classes — normal flow)
  │     style="transition: transform 0.2s ease, opacity 0.2s ease, filter 0.2s ease"
  │
  └── div (panel 1 — sub-nav, animated OUT to the right)
        class="absolute inset-x-0 top-0 opacity-0 translate-x-2 blur-[2px] pointer-events-none motion-reduce:invisible"
        style="transition: transform 0.2s, opacity 0.2s, filter 0.2s;"
```

---

## 4. Animation Details

### Transition Properties

All animations use the same CSS transition on both panels:

```css
transition:
  transform 0.2s ease,
  opacity 0.2s ease,
  filter 0.2s ease;
```

- **Duration**: `200ms`
- **Easing**: `ease` (CSS default: `cubic-bezier(0.25, 0.1, 0.25, 1.0)`)
- **Properties**: `transform`, `opacity`, `filter`

### Forward Animation (Main → Sub-Nav)

| Property       | Panel 0 (outgoing, main)                | Panel 1 (incoming, sub-nav) |
| -------------- | --------------------------------------- | --------------------------- |
| Position       | `static` → `absolute` (inset-x-0 top-0) | `static` (normal flow)      |
| Transform      | `none` → `translateX(-8px)`             | appears at `translateX(0)`  |
| Opacity        | `1` → `0`                               | `0` → `1`                   |
| Filter         | `none` → `blur(2px)`                    | `blur(2px)` → `none`        |
| Pointer events | `auto` → `none`                         | `none` → `auto`             |

The outgoing panel slides **8px to the left** while fading out and blurring. The incoming panel fades in and unblurs simultaneously.

### Reverse Animation (Sub-Nav → Main)

| Property       | Panel 0 (incoming, main)    | Panel 1 (outgoing, sub-nav) |
| -------------- | --------------------------- | --------------------------- |
| Position       | `absolute` → `static`       | `static` → `absolute`       |
| Transform      | `translateX(-8px)` → `none` | `none` → `translateX(8px)`  |
| Opacity        | `0` → `1`                   | `1` → `0`                   |
| Filter         | `blur(2px)` → `none`        | `none` → `blur(2px)`        |
| Pointer events | `none` → `auto`             | `auto` → `none`             |

The sub-nav slides **8px to the right** while fading/blurring out. The main nav slides back in from the left.

### Accessibility

- `motion-reduce:invisible` is applied to the outgoing panel — for users with `prefers-reduced-motion`, the old panel is instantly hidden instead of animated.

### Key Technique

The trick is using **two co-existing panels** within a `position: relative` container:

- The **active panel** is `position: static` and determines the natural height/flow
- The **exiting panel** is `position: absolute` with `inset-x-0 top-0` (overlays the same area but doesn't affect layout flow)
- CSS transitions handle the smooth swap via `transform`, `opacity`, and `filter`

---

## 5. Nav Link Anatomy

Every nav link follows the same structure:

```html
<a
  data-active="true|false"
  data-sidebar-link-key="Projects"
  data-zone="same"
  class="link-module__Q1NRQq__link @md-page:rounded group @md-page:pl-0.5 [active-or-hover-classes] flex h-9 origin-left flex-row items-center rounded-md"
  href="/team-slug/~/path"
>
  <!-- Icon container (36x36 grid) -->
  <div class="grid size-9 flex-none place-content-center">
    <svg width="16" height="16" viewBox="0 0 16 16">...</svg>
  </div>

  <!-- Label -->
  <span
    class="text-heading-14 flex min-w-0 flex-1 items-center gap-1.5 font-medium"
  >
    <span class="min-w-0 flex-shrink truncate">Projects</span>
  </span>

  <!-- Chevron (only on drill-down items) -->
  <span
    class="group-hover:bg-gray-alpha-100 group-active:bg-gray-alpha-300 mr-1.5 grid size-6 flex-none place-content-center rounded-sm"
  >
    <svg width="16" height="16" style="width: 12px; height: 12px">
      <!-- Right-pointing chevron path -->
    </svg>
  </span>
</a>
```

### Link Dimensions

| Property      | Value                             |
| ------------- | --------------------------------- |
| Height        | `36px` (`h-9`)                    |
| Border radius | `6px` (`rounded-md`)              |
| Icon area     | `36x36px` (`size-9`)              |
| Chevron area  | `24x24px` (`size-6`)              |
| Chevron icon  | `12x12px` (inline style override) |
| Font          | `text-heading-14`, `font-medium`  |

### Active vs Inactive States

| State    | Background                | Text Color                      |
| -------- | ------------------------- | ------------------------------- |
| Active   | `bg-gray-200` (`#ebebeb`) | `rgb(23, 23, 23)` (gray-1000)   |
| Inactive | `transparent`             | `rgb(102, 102, 102)` (gray-900) |
| Hover    | `bg-gray-100`             | `text-gray-1000`                |
| Focus    | `bg-gray-100`             | `text-gray-1000`                |
| Pressed  | `active:bg-gray-300`      | —                               |

### Chevron Hover Effect

The chevron wrapper has its own hover treatment via the `group` pattern:

- `group-hover:bg-gray-alpha-100` — subtle background on parent hover
- `group-active:bg-gray-alpha-300` — stronger background on click

### Items with Chevrons (Drill-Down)

Four items have a right chevron indicating sub-navigation:

1. **Observability** → Extensive sub-nav with section headers
2. **Agent** → Sub-nav
3. **AI Gateway** → Sub-nav
4. **Settings** → Sub-nav

---

## 6. Separator

```html
<hr class="mx-0 my-1 h-px w-full border-0 bg-gray-200" />
```

| Property | Value                           |
| -------- | ------------------------------- |
| Height   | `1px`                           |
| Margin   | `4px 0`                         |
| Color    | `rgb(235, 235, 235)` (gray-200) |
| Border   | `0` (uses bg color instead)     |

---

## 7. Sub-Navigation Panel Structure

### Back Button

```html
<div class="w-full px-2 pb-1">
  <button
    class="hover:text-gray-1000 flex w-full cursor-pointer flex-row items-center justify-between gap-1 rounded bg-transparent p-0 text-gray-900 transition-colors hover:bg-gray-100 focus-visible:bg-gray-100 active:bg-gray-200"
  >
    <!-- Left arrow icon (36x36) -->
    <div class="grid size-9 flex-none place-content-center">
      <svg><!-- Left chevron --></svg>
    </div>
    <!-- Centered title -->
    <div class="text-label-14 flex-1 text-center font-medium">
      Observability
    </div>
    <!-- Empty spacer for symmetry (36x36) -->
    <div class="size-9 flex-none"></div>
  </button>
</div>
```

The back button uses a **3-column layout** (icon | title | spacer) to keep the title perfectly centered.

Height: `36px` (same as nav links)

### Section Headers (in Sub-Nav)

```html
<div
  class="text-label-12 relative h-[30px] px-2 pt-3 pb-0.5 font-medium text-gray-800 uppercase"
>
  Compute
</div>
```

| Property       | Value                           |
| -------------- | ------------------------------- |
| Height         | `30px`                          |
| Padding        | `12px 8px 2px`                  |
| Font size      | `12px` (`text-label-12`)        |
| Font weight    | `500` (`font-medium`)           |
| Text transform | `uppercase`                     |
| Color          | `rgb(125, 125, 125)` (gray-800) |

### Sub-Nav Link Container

```html
<div class="relative flex flex-col gap-px px-2">
  <!-- Same link structure as main nav -->
</div>
```

Same `gap-px` and `px-2` as the main nav link container. The links use the exact same component/classes as main nav links.

### Badge Labels (e.g., "Beta")

Some sub-nav items have badges:

```
Alerts [Beta]
Workflows [Beta]
Queues [Beta]
```

These are rendered as inline `<span>` elements next to the link text.

---

## 8. Complete Main Nav Item List

### Group 1: Core

| Item           | Chevron | URL Path            |
| -------------- | ------- | ------------------- |
| Projects       | No      | `/`                 |
| Deployments    | No      | `/~/deployments`    |
| Logs           | No      | `/~/logs`           |
| Analytics      | No      | `/~/analytics`      |
| Speed Insights | No      | `/~/speed-insights` |
| Observability  | Yes     | `/~/observability`  |
| Firewall       | No      | `/~/firewall`       |

### `<hr>` separator

### Group 2: Infrastructure

| Item         | Chevron | URL Path                         |
| ------------ | ------- | -------------------------------- |
| Domains      | No      | `/~/domains`                     |
| Integrations | No      | `/~/integrations`                |
| Storage      | No      | `/~/stores`                      |
| Flags        | No      | `/~/experimentation/collections` |
| Agent        | Yes     | `/~/agent`                       |
| AI Gateway   | Yes     | `/~/ai-gateway`                  |
| Sandboxes    | No      | `/~/sandboxes`                   |

### `<hr>` separator

### Group 3: Account

| Item     | Chevron | URL Path           |
| -------- | ------- | ------------------ |
| Usage    | No      | `/~/usage`         |
| Support  | No      | `/~/support/cases` |
| Settings | Yes     | `/~/settings`      |

---

## 9. Observability Sub-Nav Items

The Observability sub-nav is organized with **section headers**:

| Section  | Items                                                                                         |
| -------- | --------------------------------------------------------------------------------------------- |
| _(none)_ | Overview, Query, Notebooks, Alerts (Beta)                                                     |
| COMPUTE  | Functions, External APIs, Middleware, Workflows (Beta)                                        |
| CDN      | Edge Requests, Fast Data Transfer, Image Optimization, ISR, External Rewrites, Microfrontends |
| SERVICES | AI, Blob, Queues (Beta)                                                                       |

---

## 10. Key Data Attributes

| Attribute               | Purpose                            | Example Values         |
| ----------------------- | ---------------------------------- | ---------------------- |
| `data-active`           | Indicates currently active link    | `"true"`, `"false"`    |
| `data-sidebar-link-key` | Unique key for each sidebar link   | `"Projects"`, `"Logs"` |
| `data-zone`             | Navigation zone (routing behavior) | `"same"`               |

---

## 11. CSS Custom Properties

| Variable          | Value   | Usage                   |
| ----------------- | ------- | ----------------------- |
| `--sidebar-width` | `256px` | Sidebar width           |
| `--header-zindex` | `75`    | Base z-index for header |

Sidebar z-index is `calc(75 + 1) = 76`.

---

## 12. Responsive Behavior

- **Desktop (`lg+`)**: Fixed sidebar, always visible, `256px` wide
- **Tablet (`md`)**: Sidebar exists but may be hidden/collapsed (class: `html.sidebar-collapsed`)
- **Mobile (`< md`)**: Sidebar becomes a modal-like overlay with `shadow-modal`, `rounded-[16px]`, max-height constraint, and a horizontal mobile header

The mobile header (index 1) uses horizontal scrolling: `overflow-x-auto overflow-y-clip overscroll-contain pointer-coarse:scrollbar-none`

---

## 13. Summary of Animation Pattern

```
┌─────────────────────────────────────────────────────┐
│  FORWARD (click chevron item)                       │
│                                                     │
│  Panel 0 (main):                                    │
│    position: static → absolute                      │
│    transform: none → translateX(-8px)               │
│    opacity: 1 → 0                                   │
│    filter: none → blur(2px)                         │
│    pointer-events: auto → none                      │
│                                                     │
│  Panel 1 (sub-nav):                                 │
│    Added to DOM (or position: absolute → static)    │
│    transform: translateX(8px) → none  (implied)     │
│    opacity: 0 → 1                                   │
│    filter: blur(2px) → none                         │
│    pointer-events: none → auto                      │
│                                                     │
│  Duration: 200ms | Easing: ease                     │
│  Accessibility: motion-reduce:invisible             │
├─────────────────────────────────────────────────────┤
│  REVERSE (click back button)                        │
│                                                     │
│  Panel 0 (main):                                    │
│    position: absolute → static                      │
│    transform: translateX(-8px) → none               │
│    opacity: 0 → 1                                   │
│    filter: blur(2px) → none                         │
│    pointer-events: none → auto                      │
│                                                     │
│  Panel 1 (sub-nav):                                 │
│    position: static → absolute                      │
│    transform: none → translateX(8px)                │
│    opacity: 1 → 0                                   │
│    filter: none → blur(2px)                         │
│    pointer-events: auto → none                      │
│                                                     │
│  Duration: 200ms | Easing: ease                     │
└─────────────────────────────────────────────────────┘
```

The animation feels like flipping through pages of a book — the current view slides away in the direction opposite to navigation while the new view slides in. The `blur(2px)` adds a subtle depth-of-field effect that makes the transition feel more spatial and physical.
