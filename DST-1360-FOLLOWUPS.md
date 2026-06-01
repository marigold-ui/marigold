# DST-1360 — Follow-up Tickets (REMINDER)

> **Action required:** Create the follow-up Jira tickets listed below **after** the DST-1360 PR
> (AppShell / Page / Page.Header + ActionButton `primary`) lands. Use the DST conventions from
> `CLAUDE.md` (title emoji, Appetite, Rollout Communication, Requires UI Kit Update, markdown
> description template). Delete this file once the tickets exist.

This file captures everything decided during the DST-1360 design grilling so the follow-up tickets
can be written with full context without re-deriving it.

---

## Context: what DST-1360 shipped

Branch: `DST-1360-app-shell-page-pageheader`, based on **`beta-release`** (NOT `main` — `main` lacks
`Panel`, `useSlot`, and the document-level scroll change #5343/DST-1351, which all live on the beta line).

Single PR delivering:

- **`AppShell`** — hard rename of `AppLayout` (no alias). The three vestigial pass-throughs
  (`AppLayout.Sidebar` / `.Header` / `.Main`) are **deleted**; `<Sidebar>`, `<TopNavigation>`, `<Page>`
  are direct grid children (each already owns its `[grid-area:*]`). `AppShell` absorbs `Sidebar.Provider`
  via a flat **`defaultSidebarOpen`** prop, and passes through when an outer `Sidebar.Provider` is detected
  via `use(SidebarContext)` (escape hatch for controlled state / variant / size). `Sidebar.Provider`
  stays exported for standalone use.
- **`Page`** — renders the `<main>` landmark, `[grid-area:main]`, owns padding (`square-relaxed`
  default; `p` / `px` / `py`) and vertical rhythm (`space`, `group` default). Does **not** own scroll
  (document scrolls) and does **not** enforce max-width (content-driven via `Panel size="form"`).
  Owns `titleId` + `useSlot` and labels `<main aria-labelledby={titleId}>`. `headingLevel` default **1**.
- **`Page.Header`** (compound member, mirrors `Panel.Header`) — pure **slot-context provider**:
  publishes `HeadingContext` (title → h1), `TextContext` (description → `<p>`), and
  `ActionButtonContext` + `ActionGroupContext` (`[grid-area:actions]`, `size: 'default'`). Consumers
  compose the shared `<Title>` / `<Description>` and slot-aware action primitives. **No** subcomponents
  of its own (no `Page.Header.Actions` wrapper, no `Page.Title`/`Page.Description`).
- **`ActionButton` gains a `primary` variant** — so the page's primary action can be the slot-aware
  `<ActionButton variant="primary">Upgrade plan</ActionButton>` inside `Page.Header`. See the
  design-system implication ticket below.

### Key decisions locked during grilling

| Topic                                            | Decision                                                                                                        |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Base branch                                      | `beta-release`                                                                                                  |
| Design doc `design/app-shell-page-pageheader.md` | **Not created** — referenced by the ticket but never existed; decisions baked into code + pattern doc instead   |
| PR split                                         | Single PR                                                                                                       |
| `AppLayout` → `AppShell`                         | Hard rename, no deprecated alias (beta window)                                                                  |
| Sidebar config surface                           | Flat `defaultSidebarOpen` + external-provider pass-through (NOT a `sidebar={{}}` object yet)                    |
| `Page.Header` shape                              | Mirror `Panel.Header` exactly; compound member naming; slot provider; no wrapper                                |
| Page-level actions                               | Slot-based like Panel; `ActionButton` extended with `primary` (NOT a wrapper, NOT making `<Button>` slot-aware) |
| Heading level                                    | On `Page` root (`headingLevel`, default 1), like Panel's root — NOT on `Title`                                  |
| Heading outline                                  | Falls out of defaults: Page.Header `<Title>` = h1 → Panel `<Title>` = h2 → Panel.Collapsible `<Title>` = h3     |
| `<main>` accessible name                         | Yes — `aria-labelledby` wired to the Page.Header `<h1>`                                                         |
| Page padding / rhythm                            | `square-relaxed` / `group`                                                                                      |
| Sticky header                                    | **Removed entirely** — Page has no `sticky` prop; Page.Header is never sticky                                   |
| Page required in AppShell                        | Yes                                                                                                             |
| form example width                               | Wrap sections in `Panel size="form"` (drop ad-hoc `max-w-xl`)                                                   |

### Notes / obsolete ticket assumptions

- The ticket lists "extract a shared `<Header>`/`<Title>`/`<Description>` primitive" as a **deferred
  follow-up** — but this **already shipped** on `beta-release`. `Title` and `Description` are shared
  slot-aware primitives (react-aria `HeadingContext`/`TextContext`) used by Panel, Dialog, Drawer,
  Tray, Toast. `Panel` no longer has `Panel.Title`/`Panel.Description`/`Panel.HeaderActions`. So this
  deferred item is **done** — do not create a ticket for it.

---

## Follow-up tickets to create

### 1. 🧩 Design-system: clarify `<Button>` vs `<ActionButton>` now that ActionButton has `primary`

**Why now:** DST-1360 added a `primary` variant to `ActionButton` so a slot-aware action can be a page's
primary CTA inside `Page.Header`. This introduces **two routes to a primary button**: standalone
`<Button variant="primary">` and slot-configured `<ActionButton variant="primary">`. The ActionButton
docs previously stated a hard rule ("for primary, reach for `<Button>`"; "ActionButton belongs to a
surface, not the page"). That stance was softened in DST-1360 but deserves a holistic pass.
**Scope:** Decide and document the canonical distinction (standalone vs slot-configured container chrome);
audit other slot containers (`Panel.Header`, `EmptyState`, `Dialog`/`Drawer` chrome) for whether a primary
ActionButton is appropriate there; update `button-vs-action-button` demo + guidance; consider whether
`Button` should eventually become slot-aware as the long-term unifier (would let `<Button>` work directly
in slot containers and possibly retire the divergence).

### 2. ✨ AppShell: skip-link

Self-contained, low risk. Add a "skip to main content" link as the first focusable element in `AppShell`,
targeting the `Page` `<main>`. Deferred from DST-1360.

### 3. ✨ Page: focus move to the page `<h1>` on route change

Needs routing integration. On client navigation, move focus to `Page.Header`'s `<Title>` (h1) so screen
reader / keyboard users land at the new page's heading. The `titleId`/`titleSlotRef` plumbing from
DST-1360 is the hook point.

### 4. ✨ AppShell: sidebar config object (`sidebar={{ … }}`)

DST-1360 ships only flat `defaultSidebarOpen` + external-provider pass-through. If demand for inline
**controlled** sidebar state (`open` / `onOpenChange`) or inline `variant` / `size` appears, add a
`sidebar={{ … }}` object prop that forwards to the absorbed provider. Designed to be added non-breakingly.

### 5. ✨ Page: loading-state convention

Needs a product decision (skeleton vs spinner vs top progress bar). Define how a `Page` represents its
loading state consistently.

### 6. ✨ Page: error-boundary convention

Bigger scope. Define the page-level error boundary / error-state pattern.

### 7. ✨ Page.Header: first-class slots — `BackAction`, `Eyebrow`, page-level `Tabs`

Add when demand appears. For v1, page-level `Tabs` render as a sibling **below** `Page.Header`. Promote
back-action / eyebrow / tabs to first-class `Page.Header` slots if usage justifies it.

### 8. ✨ App pages: master-detail / two-column page layouts

Pattern for list+detail and other two-column page compositions inside the shell.

### 9. ✨ App pages: bottom `ActionBar` (Save / Cancel) pattern

Canonical pattern for a sticky Save/Cancel `ActionBar` at the bottom of a form page.

### 10. 📝 App pages: settings hub / landing-index page pattern

Content-design problem — how a section landing/index page is composed.

### 11. ✨ AppShell: additional shell responsibilities

Separate tickets as needed: theme-mode toggle, command menu, focus-restore after sidebar close.

### 12. 📝 / 💄 Print styles + deep-link anchors / heading-link story

Print stylesheet for app pages, and a deep-link anchor / heading-link convention for long pages.
