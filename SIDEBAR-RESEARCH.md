# Sidebar Component: Documentation & Guidelines Research

Research into how major design systems document their sidebar/navigation components, and what guidelines and best practices are commonly recommended.

---

## Table of Contents

1. [Marigold Sidebar: Current Architecture](#marigold-sidebar-current-architecture)
2. [How Other Design Systems Document Sidebars](#how-other-design-systems-document-sidebars)
3. [Common Documentation Sections](#common-documentation-sections)
4. [Usage Guidelines & Best Practices](#usage-guidelines--best-practices)
5. [Accessibility Guidelines](#accessibility-guidelines)
6. [Responsive Behavior](#responsive-behavior)
7. [Do's and Don'ts](#dos-and-donts)
8. [Sources](#sources)

---

## Marigold Sidebar: Current Architecture

### Compound Component Structure

```
<Sidebar.Provider>          -- context provider (state, toggle, mobile detection)
  <Sidebar>                 -- the sidebar panel (CSS Grid: header / content / footer)
    <Sidebar.Header />      -- sticky top slot
    <Sidebar.Nav>           -- navigation with drill-down panels
      <Sidebar.Item />      -- leaf item (link) or branch (has nested children)
      <Sidebar.Separator /> -- visual divider
      <Sidebar.GroupLabel>  -- section heading
    </Sidebar.Nav>
    <Sidebar.Footer />      -- sticky bottom slot
  </Sidebar>
  <main>
    <Sidebar.Toggle />      -- placed outside sidebar, in page content
  </main>
</Sidebar.Provider>
```

### Key Features

- **Drill-down navigation**: Branch items open a sub-panel that slides in from the right. Back button returns to root. One level of nesting.
- **Cookie-persisted state**: Desktop sidebar state survives page refreshes via `marigold:sidebar:state` cookie (7-day expiry).
- **Responsive**: Desktop uses width-based collapse/expand with CSS transitions. Mobile renders as a dismissable modal overlay (sheet pattern).
- **Keyboard shortcut**: `Cmd+B` / `Ctrl+B` globally toggles the sidebar.
- **Controlled + uncontrolled**: Supports both `defaultOpen` and `open`/`onOpenChange` controlled mode.
- **Focus management**: Focus moves to back button on drill-in, returns to branch trigger on back.
- **Collection system**: `Sidebar.Item`, `Sidebar.Separator`, and `Sidebar.GroupLabel` are marker components (render null). Their props are harvested by `buildCollection()` into a normalized tree structure.
- **Active state**: Items accept `active` prop, which sets `aria-current="page"`. Active branches auto-open on mount.
- **Internationalization**: Strings go through `useLocalizedStringFormatter` (DE/EN).
- **Auto-derived hrefs**: Branch items auto-derive their href from their first leaf descendant.

### Theme Slots (14 total)

`root`, `overlay`, `modal`, `closeButton`, `content`, `header`, `nav`, `footer`, `toggle`, `separator`, `groupLabel`, `navPanel`, `navLink`, `backButton`

---

## How Other Design Systems Document Sidebars

### Shadcn/ui Sidebar

**Structure**: Installation > Structure/Anatomy > Provider Props > Sidebar Props > useSidebar Hook > Component Patterns > Theming > Styling Tips > RTL Support

**Key documentation patterns**:

- Very code-heavy docs with composable sub-component examples
- 22 sub-components documented in a table (SidebarProvider, Sidebar, SidebarHeader, SidebarFooter, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarMenuBadge, SidebarMenuSkeleton, SidebarTrigger, SidebarRail, SidebarInset)
- Documents three collapsible modes: `offcanvas`, `icon`, `none`
- Documents three visual variants: `sidebar`, `floating`, `inset`
- Shows specific composition patterns: workspace switcher in header, collapsible groups, menu with active state, menu items with actions, submenus, badges, skeleton loading, custom triggers
- CSS custom properties for theming (sidebar-specific color tokens)
- Controlled sidebar example with `useSidebar` hook
- RTL support section
- Describes sidebars as "one of the most complex components to build"
- Width config: 16rem expanded, 18rem on mobile
- Keyboard shortcut: `cmd+b` / `ctrl+b`
- Persists state to `localStorage`

### Carbon Design System (IBM) -- UI Shell Left Panel

**Structure**: When to Use > Structure & Behavior > Fixed vs. Flexible > Navigation Organization > Responsive Behavior > Zones

**Key documentation patterns**:

- Strong focus on _when_ to use a left panel (>5 secondary nav items, or frequent switching)
- Distinguishes **fixed** vs. **flexible** side navigation:
  - Fixed: links + category lists only, no icons, cannot collapse, best at min 672px width
  - Flexible: each link has an icon, can collapse to icon-only, fully responsive
- Sub-menus denoted with chevron, expand inline (push other items down)
- Hamburger icon opens the panel on mobile
- Calls out that usability drops rapidly with too many items -- warns against placing user-generated/unbounded content in the shell nav
- Recommends logical groups aligned to user goals
- Three "zones": global (platform-level, not alterable), platform (product-level), local (product-owned)

### Adobe Spectrum -- Side Navigation

**Structure**: Overview > Options/Variants > Anatomy > Behaviors > Usage Guidelines (Do's/Don'ts) > Internationalization > Keyboard Interactions > Theming > Changelog

**Key documentation patterns**:

- Three variants: single level, single level with headers, multi-level
- Icons only on first-level items, only when they "add essential value and have a strong association with the text"
- Text overflow: labels wrap rather than truncate
- Width should be "generous" -- default `size-3000`; too narrow risks confusion with buttons
- Max **three nesting levels** -- "indentation becomes indiscernible" beyond that
- Consistent behavior rule: either all top-level items navigate + expand, or they only expand -- never mix
- Labels in sentence case, succinct, descriptive
- RTL: entire layout mirrors
- Keyboard: Tab/Shift+Tab for focus, Enter/Space for selection and expand/collapse
- Strong ARIA patterns: `aria-expanded`, `aria-controls`, `aria-current="page"`, `aria-labelledby`
- Single tab-stop with arrow key navigation (managed tab index)

### Material UI (MUI) -- Drawer / Navigation Drawer

**Structure**: Overview > Variants (with live demos) > Anchor Positions > Props/API > Responsive Drawer > Transition & Animation > Accessibility

**Key documentation patterns**:

- Four drawer variants with clear use-case mapping:

| Variant          | Behavior                                                             | Use Case                            |
| ---------------- | -------------------------------------------------------------------- | ----------------------------------- |
| **Temporary**    | Slides over content with backdrop, closes on outside click or Escape | Mobile, low-frequency access        |
| **Persistent**   | Sits alongside content, content shifts to accommodate                | Medium screens, frequent navigation |
| **Permanent**    | Always visible, cannot be closed                                     | Desktop with ample space            |
| **Mini Variant** | Collapses to icon-only strip, expands on hover or toggle             | Space-saving with quick access      |

- Responsive drawer pattern: permanent on desktop (>1200px), temporary with hamburger on mobile
- z-index layering: Drawer 1200, Modal 1300, AppBar 1100
- Accessibility: focus trapping, Escape to close, backdrop click, `prefers-reduced-motion` support
- Width via CSS custom property: `--MuiDocs-navDrawer-width: 300px`

### Primer (GitHub) -- NavList

**Structure**: Overview > Status & Availability > Variants/Examples (with code) > Props/API > Accessibility

**Key documentation patterns**:

- Renders as `<nav>` element by default (landmark recognition)
- Sub-components: `NavList.Item`, `NavList.SubNav`, `NavList.Group`, `NavList.Divider`, `NavList.LeadingVisual`, `NavList.TrailingVisual`, `NavList.TrailingAction`, `NavList.Description`
- Nested SubNav: up to **4 levels** of nesting; parent acts as toggle button, NOT a link
- Groups: `NavList.Group` with `title` for semantic grouping; `NavList.Divider` for visual-only separation
- Leading/trailing visuals for icons, avatars, badges, and secondary actions
- Explicit warning: "Do NOT use TreeView as a replacement for navigation -- it is never an accessible replacement"
- `aria-current="page"` for current page, `"location"` for position within a page
- `NavList.GroupHeading` supports `visuallyHidden` for screen-reader-only labels
- `NavList.TrailingAction` requires `label` for accessible icon button naming

### Nielsen Norman Group (NN/g) -- Research-Based Guidelines

**Key findings**:

- Eye-tracking: users look at the left half of screens ~80% of the time
- Vertical lists require fewer eye fixations than horizontal ones (psycholinguistics research)
- Vertical nav accommodates broad information architectures without redesign
- Key drawback: lower content-to-chrome ratio (takes more screen space)
- "Out of sight, out of mind" -- never hide nav behind hamburger on desktop
- Icons without labels increase ambiguity; "a word is worth a thousand pictures"
- Icon-only nav acceptable only for daily-use apps where users learn patterns
- Indicating current location is the **single most important** thing -- failing to do so is the most common mistake
- Left-aligned, keyword-front-loaded labels scan best
- Scrollable sidebar is fine for established patterns

---

## Common Documentation Sections

Based on the research, most design systems include these sections in their sidebar docs:

| Section                     | Description                                            | Who includes it                                                                       |
| --------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Overview / When to Use**  | What the component is, when to use it vs. alternatives | Carbon, Spectrum, Shadcn, MUI                                                         |
| **Anatomy**                 | Visual diagram of sub-components and their roles       | Spectrum, Carbon, Shadcn                                                              |
| **Variants**                | Different visual/behavioral modes                      | All (Shadcn: 3+3; Spectrum: 3; Carbon: 2; MUI: 4; Primer: 6 patterns)                 |
| **Sub-components API**      | Props table for each sub-component                     | Shadcn, Primer, MUI (all very thorough)                                               |
| **Composition Patterns**    | Code examples of common layouts                        | Shadcn (workspace switcher, collapsible groups, actions, badges, submenus, skeletons) |
| **Behavior**                | How the component responds to interaction              | All (expand/collapse, drill-down, active state)                                       |
| **Responsive / Mobile**     | How sidebar adapts to small screens                    | All (sheet/overlay on mobile, hamburger trigger)                                      |
| **Accessibility**           | ARIA, keyboard, screen reader support                  | Spectrum, Carbon, Primer (most thorough)                                              |
| **Keyboard Interactions**   | Table of keys and actions                              | Spectrum, Shadcn, MUI                                                                 |
| **Do's and Don'ts**         | Clear guidance with examples                           | Spectrum (most thorough), Carbon                                                      |
| **Theming / Customization** | CSS tokens, style slots                                | Shadcn (CSS variables), MUI (sx prop), Spectrum                                       |
| **Internationalization**    | RTL support, translations                              | Spectrum, Shadcn                                                                      |
| **State Management**        | Controlled/uncontrolled, persistence                   | Shadcn (localStorage), MUI (controlled), Marigold (cookie)                            |
| **Focus Management**        | How focus moves during interactions                    | MUI (focus trapping), Primer, all describe but few document explicitly                |

---

## Usage Guidelines & Best Practices

### When to Use a Sidebar

- Use when there are **more than 5 navigation items** (Carbon)
- Use when users **frequently switch between sections** (Carbon)
- Use for **complex apps with deep hierarchies** (general consensus)
- Use when sub-menus need to **remain open without overlaying content** (Carbon)
- Prefer sidebar over tabs when you have **many options or subcategories** (general)
- Sidebar is ideal for **SaaS platforms, enterprise apps, B2B tools** (NN/g, general)

### When NOT to Use

- Simple sites with few top-level pages -- use horizontal nav instead
- Content-heavy sites where screen space is critical (lower content-to-chrome ratio)
- Mobile-only apps -- prefer bottom tabs or hamburger patterns

### Navigation Organization

- **Create logical groups** aligned to user goals (Carbon)
- **Don't place unbounded content** (user-generated) in the navigation shell (Carbon)
- **Limit nesting to 3 levels maximum** -- indentation becomes indiscernible (Spectrum)
- **Prioritize items top-to-bottom** by importance (NN/g)
- Use **keyword-front-loaded labels** for scanability (NN/g)
- Use **sentence case** for labels (Spectrum)
- Keep labels **succinct and descriptive** (Spectrum, NN/g)

### Visual Design

- **Always place on the left** (right-rail blindness on the right) (NN/g)
- **Keep it visible on desktop** -- never hide behind hamburger (NN/g)
- Optimal width: **240-300px expanded**, **48-64px collapsed** (general)
- Use **contrasting background** to distinguish from content area (NN/g)
- **Icons + text labels** -- never icons alone (except daily-use apps) (NN/g)
- Icons only on **first-level items**, only when adding essential value (Spectrum)
- **Don't mix icon and text-only items** in the same group (Spectrum)
- Width should be **generous enough** to not be confused with buttons (Spectrum)

### Indicating Current Location

- This is the **single most important** navigation job (NN/g)
- Use `aria-current="page"` for the active item
- Provide clear visual differentiation (background, font weight, left border)
- When sub-panels are involved, auto-open the branch containing the active item

### State Persistence

- Persist expand/collapse state across page loads (Shadcn uses localStorage, Marigold uses cookies)
- Remember which branch/section the user was in

### Collapsible Behavior

- Three common patterns: **offcanvas** (slides away entirely), **icon-only** (collapses to icons), **non-collapsible** (always visible) (Shadcn)
- Provide a **keyboard shortcut** for toggling (`Cmd+B` is the de facto standard -- used by Shadcn, Marigold, VS Code)
- Provide a **visual toggle trigger** (button or clickable rail strip)

---

## Accessibility Guidelines

### ARIA Attributes

| Attribute             | Usage                                                                   |
| --------------------- | ----------------------------------------------------------------------- |
| `role="navigation"`   | On the `<nav>` container (semantic HTML preferred)                      |
| `aria-label`          | Distinguish this navigation from other nav landmarks ("App navigation") |
| `aria-current="page"` | On the active/current link                                              |
| `aria-expanded`       | On branch/parent items to indicate expand/collapse state                |
| `aria-controls`       | On parent items, referencing child list container ID                    |
| `aria-labelledby`     | On nested lists, referencing parent item's ID                           |

### Keyboard Navigation

| Key                 | Action                                                     |
| ------------------- | ---------------------------------------------------------- |
| `Tab` / `Shift+Tab` | Move focus between items (or use single tab-stop + arrows) |
| `Enter` / `Space`   | Activate link or toggle branch expand/collapse             |
| `Arrow Up/Down`     | Navigate between items (when managed tab index)            |
| `Cmd+B` / `Ctrl+B`  | Toggle sidebar open/close (global shortcut)                |
| `Escape`            | Close mobile overlay / dismiss sheet                       |

### Focus Management

- Focus should move to the **back button** when drilling into a sub-panel
- Focus should return to the **branch trigger** when navigating back
- Non-active panels should be **inert** (prevent interaction and focus trapping)
- Mobile overlay must trap focus within the sidebar when open

### Screen Readers

- Provide an **accessible label** for the navigation landmark
- Use semantic HTML (`<nav>`, `<a>`, `<button>`) wherever possible
- **Back button** needs descriptive label ("Back to {section name}")
- Close button on mobile overlay needs accessible label

---

## Responsive Behavior

### Desktop (>640px)

- Sidebar is visible as a fixed panel alongside main content
- Can be collapsed/expanded via toggle or keyboard shortcut
- State persisted across sessions (cookie/localStorage)
- Expanded width: ~16rem (256px)
- Collapsed: width transitions to 0 (offcanvas) or icon-only width

### Mobile (<640px)

- Sidebar renders as a **modal sheet overlay** (dismissable)
- Triggered by a hamburger/toggle button in the main content area
- Close button visible within the sidebar
- Overlay uses appropriate z-index (z-50 for modal layer)
- Always starts closed on mobile (no persisted state)
- Touch-friendly: adequate tap target sizes

### Transition Between Breakpoints

- Carbon: "as a header scales down, header links should collapse into a left-panel hamburger menu"
- Detect breakpoint via media query (Marigold uses `useSmallScreen()` at 640px)
- Mobile state is independent from desktop state

---

## Do's and Don'ts

### Do

- **Do** always indicate the current location/active page clearly
- **Do** keep the sidebar visible on desktop -- navigation aids understanding of scope
- **Do** use text labels alongside icons (clarity > minimalism)
- **Do** keep labels succinct, descriptive, and keyword-front-loaded
- **Do** use sentence case for labels
- **Do** limit nesting to max 3 levels
- **Do** provide a keyboard shortcut for toggling (Cmd+B)
- **Do** persist sidebar state across page loads
- **Do** auto-open the branch containing the active item
- **Do** provide focus management when drilling into sub-panels
- **Do** use a modal/sheet pattern on mobile with proper focus trapping
- **Do** make width generous enough to distinguish from other UI controls
- **Do** create logical navigation groups aligned to user goals
- **Do** use consistent expand/navigate behavior (don't mix approaches)
- **Do** provide visual feedback for hover, focus, and active states

### Don't

- **Don't** hide navigation behind a hamburger menu on desktop
- **Don't** use icons without text labels (except in daily-use, icon-learned apps)
- **Don't** place unbounded/user-generated content in the navigation
- **Don't** exceed 3 levels of nesting
- **Don't** use vague or arbitrary navigation labels
- **Don't** truncate labels -- wrap text instead
- **Don't** mix icon items and text-only items in the same group
- **Don't** use title case (use sentence case)
- **Don't** make the sidebar too narrow (confusion with buttons)
- **Don't** use redundant dual navigation (horizontal + hamburger with same items)
- **Don't** center-align text in vertical navigation (jagged edge harms scanning)
- **Don't** forget to set `aria-current="page"` on the active item
- **Don't** skip focus management on panel transitions

---

## Sources

### Design Systems Analyzed

- [Shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/sidebar) -- Most comprehensive code-level docs, 22 sub-components, composable patterns
- [Material UI Drawer](https://mui.com/material-ui/react-drawer/) -- 4 drawer variants with clear use-case mapping, responsive patterns
- [Carbon Design System - UI Shell Left Panel](https://carbondesignsystem.com/components/UI-shell-left-panel/usage/) -- Strong "when to use" guidance, fixed vs. flexible patterns
- [Adobe Spectrum - Side Navigation](https://spectrum.adobe.com/page/side-navigation/) -- Best do's/don'ts, strict nesting limits, thorough ARIA documentation
- [Spectrum Web Components - Sidenav](https://opensource.adobe.com/spectrum-web-components/components/sidenav/) -- Managed tab index, multi-level implementation
- [Primer NavList](https://primer.style/components/nav-list/react) -- Semantic grouping, trailing actions, 4-level nesting, strong a11y docs

### UX Research & Articles

- [NN/g - Left-Side Vertical Navigation on Desktop](https://www.nngroup.com/articles/vertical-nav/) -- Eye-tracking research, scanning efficiency, design guidelines
- [NN/g - Navigation: You Are Here](https://www.nngroup.com/articles/navigation-you-are-here/) -- Current location indication best practices
- [NN/g - Menu Design Checklist: 17 UX Guidelines](https://www.nngroup.com/articles/menu-design/) -- Comprehensive menu design guidelines
- [UX Planet - Best UX Practices for Designing a Sidebar](https://uxplanet.org/best-ux-practices-for-designing-a-sidebar-9174ee0ecaa2)
- [Sidebar Design for Web Apps: UX Best Practices (2026)](https://www.alfdesigngroup.com/post/improve-your-sidebar-design-for-web-apps)
- [GitLab Pajamas - Navigation Sidebar](https://design.gitlab.com/patterns/navigation-sidebar/) -- Contextual sidebar patterns
