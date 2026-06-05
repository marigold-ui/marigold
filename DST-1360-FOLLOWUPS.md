# DST-1360 Follow-up Tickets (REMINDER)

> **Action required:** Create the follow-up Jira tickets listed below **after** the DST-1360 PR
> (AppShell / Page / Page.Header with `<Button variant="primary">` page actions) lands. Use the DST conventions from
> `CLAUDE.md` (title emoji, Appetite, Rollout Communication, Requires UI Kit Update, markdown
> description template). Delete this file once the tickets exist.

This file captures everything decided during the DST-1360 design grilling so the follow-up tickets
can be written with full context without re-deriving it.

---

## Context: what DST-1360 shipped

Branch: `DST-1360-app-shell-page-pageheader`, based on **`beta-release`** (NOT `main`, since `main` lacks
`Panel`, `useSlot`, and the document-level scroll change #5343/DST-1351, which all live on the beta line).

Single PR delivering:

- **`AppShell`**: hard rename of `AppLayout` (no alias). The three vestigial pass-throughs
  (`AppLayout.Sidebar` / `.Header` / `.Main`) are **deleted**. `<Sidebar>`, `<TopNavigation>`, `<Page>`
  are direct grid children (each already owns its `[grid-area:*]`). `AppShell` absorbs `Sidebar.Provider`
  via a flat **`defaultSidebarOpen`** prop, and passes through when an outer `Sidebar.Provider` is detected
  via `use(SidebarContext)` (escape hatch for controlled state, variant, or size). `Sidebar.Provider`
  stays exported for standalone use.
- **`Page`**: renders the `<main>` landmark, `[grid-area:main]`, owns padding (`square-relaxed`
  default, `p` / `px` / `py`) and vertical rhythm (`space`, `group` default). Does **not** own scroll
  (document scrolls) and does **not** enforce max-width (content-driven via `Panel size="form"`).
  Owns `titleId` + `useSlot` and labels `<main aria-labelledby={titleId}>`. `headingLevel` default **1**.
- **`Page.Header`** (compound member, mirrors `Panel.Header`), a pure **slot-context provider**:
  publishes `HeadingContext` (title → h1), `TextContext` (description → `<p>`), and a single Marigold
  `ButtonContext` (`[grid-area:actions]`, no size/variant cascade — page actions are prominent and
  label-sized). Consumers compose the shared `<Title>` / `<Description>` and the slot-aware
  `<Button>` / `<ButtonGroup>` / `<ActionMenu>` / `<LinkButton>`. **No** subcomponents of its own
  (no `Page.Header.Actions` wrapper, no `Page.Title`/`Page.Description`).
- **`Page.Header` publishes `ButtonContext`**, so a plain `<Button variant="primary">Upgrade plan</Button>`
  inside `Page.Header` lands in the actions slot. This branch integrates **DST-1483** (slot-aware
  `<Button>`, `<ActionGroup>` → `<ButtonGroup>`, `<ActionButton>` removed), so the single Marigold
  `ButtonContext` is the real mechanism rather than an interim stopgap. Follow-up #1 below is therefore
  resolved.

### Key decisions locked during grilling

| Topic                                            | Decision                                                                                                                                                                                                                                            |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base branch                                      | `beta-release`                                                                                                                                                                                                                                      |
| Design doc `design/app-shell-page-pageheader.md` | **Not created**, referenced by the ticket but never existed. Decisions baked into code + pattern doc instead                                                                                                                                        |
| PR split                                         | Single PR                                                                                                                                                                                                                                           |
| `AppLayout` → `AppShell`                         | Hard rename, no deprecated alias (beta window)                                                                                                                                                                                                      |
| Sidebar config surface                           | Flat `defaultSidebarOpen` + external-provider pass-through (NOT a `sidebar={{}}` object yet)                                                                                                                                                        |
| `Page.Header` shape                              | Mirror `Panel.Header` exactly, compound member naming, slot provider, no wrapper                                                                                                                                                                    |
| Page-level actions                               | Slot-based via the single Marigold `ButtonContext` in `Page.Header`; the page primary action is `<Button variant="primary">`. Slot-aware `<Button>` ships via DST-1483 (integrated into this branch), so this is the real mechanism, not an interim |
| Heading level                                    | On `Page` root (`headingLevel`, default 1), like Panel's root, NOT on `Title`                                                                                                                                                                       |
| Heading outline                                  | Falls out of defaults: Page.Header `<Title>` = h1 → Panel `<Title>` = h2 → Panel.Collapsible `<Title>` = h3                                                                                                                                         |
| `<main>` accessible name                         | Yes, `aria-labelledby` wired to the Page.Header `<h1>`                                                                                                                                                                                              |
| Page padding / rhythm                            | `square-relaxed` / `group`                                                                                                                                                                                                                          |
| Sticky header                                    | **Removed entirely**. Page has no `sticky` prop, Page.Header is never sticky                                                                                                                                                                        |
| Page required in AppShell                        | Yes                                                                                                                                                                                                                                                 |
| form example width                               | Wrap sections in `Panel size="form"` (drop ad-hoc `max-w-xl`)                                                                                                                                                                                       |

### Notes / obsolete ticket assumptions

- The ticket lists "extract a shared `<Header>`/`<Title>`/`<Description>` primitive" as a **deferred
  follow-up**, but this **already shipped** on `beta-release`. `Title` and `Description` are shared
  slot-aware primitives (react-aria `HeadingContext`/`TextContext`) used by Panel, Dialog, Drawer,
  Tray, Toast. `Panel` no longer has `Panel.Title`/`Panel.Description`/`Panel.HeaderActions`. So this
  deferred item is **done**. Do not create a ticket for it.

---

## Follow-up tickets to create

### 1. 🧩 Design-system: make `<Button>` generally slot-aware across all slot containers — ✅ RESOLVED

**Resolved by DST-1483** (PR #5494), integrated into this branch. `<Button>` is now the single
slot-aware action primitive: it consumes one Marigold-owned `ButtonContext` and adapts across every
slot container (`Page.Header`, `Panel.Header`, `ButtonGroup`, `SelectList.Option`). `<ActionButton>` is
removed and `<ActionGroup>` is renamed to `<ButtonGroup>`; `ActionButtonContext` / `ActionGroupContext`
are gone, replaced by the single `ButtonContext`. Overlays (`Popover`, `Modal`, `Tray`, `Drawer`) re-root
the cascade via `ResetButtonContext` so it does not leak through portals. No separate ticket needed.

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

### 7. ✨ Page.Header: first-class slots (`BackAction`, `Eyebrow`, page-level `Tabs`)

Add when demand appears. For v1, page-level `Tabs` render as a sibling **below** `Page.Header`. Promote
back-action / eyebrow / tabs to first-class `Page.Header` slots if usage justifies it.

### 8. ✨ App pages: master-detail / two-column page layouts

Pattern for list+detail and other two-column page compositions inside the shell.

### 9. ✨ App pages: bottom `ActionBar` (Save / Cancel) pattern

Canonical pattern for a sticky Save/Cancel `ActionBar` at the bottom of a form page.

### 10. 📝 App pages: settings hub / landing-index page pattern

Content-design problem: how a section landing/index page is composed.

### 11. ✨ AppShell: additional shell responsibilities

Separate tickets as needed: theme-mode toggle, command menu, focus-restore after sidebar close.

### 12. 📝 / 💄 Print styles + deep-link anchors / heading-link story

Print stylesheet for app pages, and a deep-link anchor / heading-link convention for long pages.

---

## Research-derived follow-ups (cross-design-system survey)

Added after surveying page-layout APIs across Atlassian, Shopify Polaris, GitHub Primer, IBM Carbon,
SAP Fiori, Salesforce SLDS, Ant Design (Pro), MUI, Mantine, and Chakra. The docs PR documents the
current behavior and recipes. These are the **API-level** gaps the survey surfaced. Each is additive
(non-breaking).

### 13. ✨ Page: explicit width affordance (`width` / `narrow`)

**Finding:** _Every_ surveyed system exposes a page-level width concept. Polaris has `fullWidth` /
`narrowWidth`, Primer `containerWidth` + `Content width`, Ant `contentWidth='Fluid'|'Fixed'`,
MUI/Chakra `Container maxWidth`, and Primer names Full / Split / Interstitial page types. Marigold
deliberately has none (width is per-surface via `Panel size="form"`), now documented in the Page "Width" section.

**Decision needed:** keep per-surface-only, or add an opt-in `width`/`narrow` affordance on `Page` for
the common single-column form/settings page (so consumers don't repeat `size="form"` on every panel).
If added, mirror the `Panel size` token (`max-w-4xl`) so page-level and surface-level widths agree.

### 14. ✨ Page.Header: status / metadata placement (supersedes part of #7)

**Finding:** A status indicator next to the page title is one of the most common header features in the
field, seen in Polaris `titleMetadata`, Primer leading/trailing visuals, Carbon/Ant `tags`, and SLDS detail-row.
Marigold's `Page.Header` has exactly three grid areas (title, description, actions), so a `<Badge>` child
has no placement. The docs PR routes object status into a secondary "Overview" `<Panel>` (the detail
layout), which is a legitimate pattern, but the header slot is a real gap.

**Decision needed:** add a `titleMetadata`-style placement to `Page.Header` (a cell beside the title for
a status `<Badge>` / small metadata), or formalize the secondary-panel pattern as the only answer. Fold
into #7 (Page.Header first-class slots) when scoped.

### Note on #8 (master-detail / two-column)

The docs PR adds a **detail / record page demo** (`docs/app/(examples)/examples/venue`) and a "Common
page layouts" table in the App Shell pattern, covering the single-object detail half of #8. The master-detail
(list + detail in one view, with two scroll regions) half is still open.
