# Design Doc: App Shell, Page, PageHeader

**Status:** Draft for team review
**Author:** Sebastian (with Claude)
**Jira:** (to be created — supersedes the scope of a narrow "page title" ticket)
**Related PRs:**

- [#5343 — switch AppLayout to page-level scroll](https://github.com/marigold-ui/marigold/pull/5343) (in-flight, landing first)
- [#5332 — introduce Panel component](https://github.com/marigold-ui/marigold/pull/5332) (landed)

---

## TL;DR

Today Marigold has `AppLayout` (a CSS grid), `Sidebar`, `TopNavigation`, and as of very recently `Panel`. What's missing is the **page itself**: no h1, no consistent skeleton, no rhythm, no actions hierarchy. Every example page reinvents the wheel with `Inset` + `Stack` + `Headline` at inconsistent levels.

This doc proposes:

1. **Decompose `AppLayout` into `AppShell`** — a pure grid container. Delete the `AppLayout.Sidebar` / `.Header` / `.Main` wrappers (they contribute nothing). Consumers put `<Sidebar>`, `<TopNavigation>`, `<Page>` as direct children.
2. **Absorb `Sidebar.Provider` into `AppShell`** (keep it exported for standalone Sidebar use). Escape hatch: wrap `<AppShell>` in your own provider to override.
3. **Introduce `<Page>`** — the page skeleton: padding, vertical rhythm, route-level landmark. Width is controlled by content (Panel's `form` size), not the Page.
4. **Introduce `<PageHeader>`** — title + description + actions. `Title` defaults to `<h1>`.
5. **Rewrite the App Shell pattern doc** to cover how a page is structured, not just the three outer slots. Rewrite the example pages to the new skeleton.

Net effect: one coherent "how we build app pages in Marigold" story. h1 / h2 / h3 outline falls out of the defaults (PageHeader h1 → Panel h2 → Panel.CollapsibleTitle h3). Breadcrumb / action / landmark hierarchies become unambiguous.

---

## Context

### What's broken today

Looking at the example app shell (`docs/app/(examples)/examples/`) and the pattern doc (`docs/content/patterns/layout/app-shell/index.mdx`):

| Page                       | Top heading today                                          |
| -------------------------- | ---------------------------------------------------------- |
| `dashboard-content.tsx:81` | `Headline level={3}` (in-page section, no h1 at all)       |
| `placeholder-page.tsx:14`  | `Headline level={2}`                                       |
| `form/page.tsx`            | No top heading at all — jumps straight to Panels (each h2) |

**No page has an `<h1>`.** The Panel default of `headingLevel={2}` only works when a page-level h1 sits above it. Today nothing provides that h1, so every Panel-heavy page has a broken outline.

### Repeated boilerplate

Every page copy-pastes the same skeleton with subtle inconsistencies:

```tsx
<Inset space={4}>
  <Stack space={4 /* or "group" */}>…</Stack>
</Inset>
```

There is no "page rhythm" primitive. The `form/page.tsx` even breaks pattern with a `max-w-xl` div. The gap between page title and content is picked ad-hoc.

### AppLayout's subcomponents are vestigial

```tsx
// packages/components/src/AppLayout/AppLayoutSidebar.tsx (entire file)
export const AppLayoutSidebar = ({ children }) => <Sidebar>{children}</Sidebar>;
```

`AppLayout.Header` is a near-identical pass-through to `TopNavigation`. `Sidebar` already owns `[grid-area:sidebar]` (`Sidebar.tsx:71`) and `TopNavigation` already owns `[grid-area:header]` (`TopNavigation.tsx:48`). The wrappers contribute nothing — not styling, not grid placement, not context. They exist to preserve a subcomponent naming convention that buys us no power.

### Pattern doc stops at the door

The App Shell pattern doc explains the three outer slots, then says: _"`<AppLayout.Main>` takes up the remaining space. This is the scrollable content area where page-specific content lives, typically wrapped in spacing via `<Inset>`."_ That's the entire story on what goes inside. No h1 guidance, no rhythm guidance, no action hierarchy, no Panel integration.

### Scroll container just moved (PR #5343)

PR #5343 moves scroll from `AppLayout.Main` to the **document**. Grid becomes `min-h-dvh`, Sidebar sticks via `sticky top-0 h-dvh`, TopNavigation stays sticky. `AppLayout.Main` loses its reason for existing as a scroll container, further confirming that the subcomponent is vestigial.

This also means:

- "Page-level sticky" is trivial — `sticky top-[topnav-height]` against the document. Nothing to thread through container refs.
- Scroll restoration uses `window.scrollY`, not a container `scrollTop`.

---

## Proposal

### 1. `AppShell` replaces `AppLayout`

`AppShell` is a CSS grid container, nothing more.

```tsx
<AppShell defaultSidebarOpen>
  <Sidebar>…</Sidebar>
  <TopNavigation>…</TopNavigation>
  <Page>…</Page>
</AppShell>
```

- No `.Sidebar`, no `.Header`, no `.Main`. The children know their own grid area.
- `AppShell` internally provides `Sidebar.Provider` context so `<Sidebar.Toggle>` (inside TopNavigation) can talk to `<Sidebar>` (in the `sidebar` grid area).
- `AppShell` accepts sidebar-related config at the common case: `defaultSidebarOpen?: boolean`. Advanced users wrap their own `<Sidebar.Provider>` around `<AppShell>` — AppShell's internal provider detects an existing context via `use()` and becomes a pass-through.
- Grid rows switch to `[auto_1fr]` (TopNavigation's own height drives the row) instead of `[3.5rem_1fr]` — less fragile to size variants.
- `AppLayout` is currently `beta`. The rename to `AppShell` is acceptable as a breaking change within beta. Add a changeset entry.

**`Sidebar.Provider` stays exported.** Someone using `<Sidebar>` outside an `<AppShell>` (rare but valid — e.g., a settings-page mini-nav) wraps the provider manually. The absorption is specific to `<AppShell>`.

### 2. `<Page>` primitive

A `<Page>` wrapper owns the page skeleton.

```tsx
<Page>
  <PageHeader>…</PageHeader>
  <Panel>…</Panel>
  <Panel>…</Panel>
</Page>
```

**What `Page` does:**

- Renders `<main>` (takes over the `role="main"` landmark that `AppLayout.Main` currently provides). Also carries `[grid-area:main]`.
- Applies horizontal + vertical padding (replaces the `<Inset space={4}>` today).
- Stacks children with a standard vertical rhythm (replaces the `<Stack space={…}>` today).
- Optional `sticky` prop to pin the first `<PageHeader>` child on scroll.

**What `Page` does NOT do:**

- Own scroll. Scroll lives on the document per PR #5343.
- Enforce a max-width. Width is content-driven: if a page wants narrow form width, it uses `<Panel size="form">` inside. If it wants full-bleed tables, Panels at default size do that. Page itself is always full-width of its grid area. This keeps Page policy-free on width and lets Panel's existing `size="form"` be the single knob for reading width.
- Manage focus or scroll restoration (deferred — see Scope).

**Props:**

```ts
interface PageProps {
  /** Vertical rhythm between Page children. Tokens from SpacingTokens. @default 'group' */
  space?: SpaceProp<SpacingTokens>['space'];
  /** Horizontal + vertical padding. Tokens from InsetSpacingTokens. @default 'square-relaxed' */
  p?: SpaceProp<InsetSpacingTokens>['space'];
  /** Split axes (mirrors Panel/Inset). */
  px?: SpaceProp<PaddingSpacingTokens>['space'];
  py?: SpaceProp<PaddingSpacingTokens>['space'];
  /** Pin the first PageHeader child to the top on scroll. @default false */
  sticky?: boolean;
  children: ReactNode;
}
```

**When used outside `AppShell`:** Page still renders `<main>`. The `[grid-area:main]` is harmless when there's no grid ancestor. Use at your discretion; we'll document App Shell as the intended host.

### 3. `<PageHeader>` primitive

Mirrors `Panel`'s header shape (Title / Description / Actions). Lives inside `Page`.

```tsx
<PageHeader>
  <PageHeader.Title>Billing</PageHeader.Title>
  <PageHeader.Description>
    Manage your plan and invoices.
  </PageHeader.Description>
  <PageHeader.Actions>
    <Button variant="primary">Upgrade plan</Button>
  </PageHeader.Actions>
</PageHeader>
```

**Semantics:**

- Renders as a `<header>` (inside `<main>`, this is a plain block, not a `banner` landmark — `banner` is only triggered when `<header>` is top-level).
- `PageHeader.Title` renders `<h1>` by default via a `level` prop on the Title itself (matches the existing `<Headline>` API, as you chose: `level` on the title, not `headingLevel` on the root).
- Provides an `aria-labelledby` wiring via internal context + `useSlot` + `useId`, mirroring `Panel`'s pattern exactly so a future shared-header-primitive refactor can merge them trivially.
- No `aria-label` required when a Title is present.
- Grid layout: `title / description / actions` same as `Panel.Header`.

**Scope for v1:** Title + Description + Actions. No BackAction, no breadcrumbs, no tabs, no eyebrow. Those are future slots if demand appears.

**Why not absorb into `Page`:** The Title-Description-Actions cluster is compositionally distinct from the page skeleton. Having them as siblings means a page can also render PageHeader-less content (a full-screen empty state, a login-first page, etc.) without dead API.

### 4. Internals: mirror `Panel` for now, extract later

Both `Panel` and `PageHeader` need identical plumbing: `titleId` via `useId`, `aria-labelledby`, `useSlot` to detect a title, `headingLevel`/`level` resolution, internal context for subcomponents.

**This PR:** `PageHeader` copies `Panel`'s internal shape with a dedicated `PageHeaderContext` and its own `useClassNames({ component: 'PageHeader' })`. The two implementations are parallel.

**Follow-up ticket:** Extract a shared `useHeaderSlots()` hook (or a lightweight internal `<HeaderSlot>` primitive) that both Panel and PageHeader — and eventually Dialog/Drawer — consume. Doing this now bloats the PR with a refactor across already-shipped components. Doing it later is a clean, bounded change because the two call sites are structurally identical.

React Spectrum's `Heading` + `Header` approach is the target north star. Marigold already imports RAC's `<Heading>` — the missing piece is the Marigold-internal id/slot/level hook. That extraction belongs on its own ticket.

### 5. Rewrite the App Shell pattern doc

New structure of `docs/content/patterns/layout/app-shell/index.mdx`:

1. **Structure** — grid + three named areas (unchanged in concept, updated for `AppShell` naming and the "no subcomponent wrappers" reality).
2. **Providers** — `RouterProvider` at app root, sidebar context absorbed by AppShell by default, escape hatch documented.
3. **Page structure** (NEW) — `<Page>` owns padding/rhythm, `<PageHeader>` owns the title block, Panels own topical regions inside.
4. **Actions hierarchy** (NEW) — Page-level actions (`PageHeader.Actions`), Section-level actions (`Panel.HeaderActions` / `Panel.Footer`), Row-level actions (inline), Account-level actions (`TopNavigation.End`). One canonical table.
5. **Responsive behavior** (unchanged).
6. **Tabs on pages** (NEW — brief) — render `<Tabs>` below `<PageHeader>` for page-level sub-sections. Sub-routes remain the right tool for independent pages.
7. **Empty state** (NEW — brief) — `<EmptyState>` goes inside `<Page>` as a sibling to `<PageHeader>` (or the only child if the page is empty).
8. **Accessibility** — h1/h2/h3 outline, landmarks (`main`, `complementary`, `banner`, `navigation`), scroll restoration (from PR #5343), `Sidebar.Toggle` focus behavior, mobile sheet.

### 6. Cross-link updates

- `Panel` docs: add a short paragraph "Panels live inside a `<Page>` under a `<PageHeader>`. The default Panel `headingLevel={2}` assumes a page `<h1>` above."
- `AppLayout` (soon `AppShell`) doc: restructure to show direct-child composition, link to the pattern doc for "what goes in Page".
- New `Page` doc.
- New `PageHeader` doc.

### 7. Migrate examples

All ~7 pages in `docs/app/(examples)/examples/*`:

- `dashboard-content.tsx` → `<Page><PageHeader><PageHeader.Title>Dashboard</PageHeader.Title>…</PageHeader>{stats}{table}</Page>`
- `placeholder-page.tsx` → `<Page><PageHeader><PageHeader.Title>{title}</PageHeader.Title><PageHeader.Description>{description}</PageHeader.Description></PageHeader>{content}</Page>`
- `form/page.tsx` → `<Page><PageHeader><PageHeader.Title>Event details</PageHeader.Title></PageHeader><Form>…<Panel size="form">…</Panel>…</Form></Page>`
- `shell-layout.tsx` → switch to `<AppShell>` + direct children (`Sidebar`, `TopNavigation`, children).

---

## Alternatives considered

### Alt A: Keep `AppLayout` and add `AppLayout.Page`

Instead of decomposing, replace `AppLayout.Main` with `AppLayout.Page`. Keeps subcomponent discoverability.

**Rejected:** the subcomponent wrappers still add nothing beyond naming. `AppLayout.Sidebar` is still a passthrough to `Sidebar`. We'd solve the "no page primitive" problem but preserve the dead abstraction. Decomposing is net simpler.

### Alt B: Monolithic `Page` absorbing PageHeader (like Shopify Polaris `Page`)

`<Page title="…" subtitle="…" primaryAction={…}>…</Page>`.

**Rejected:** monolithic prop-heavy APIs don't compose. Marigold's direction (Panel's compound API) is the opposite. Having `PageHeader` as a sibling child of Page means a page without a header (e.g., login, full-screen empty state, print view) is still expressible without dead props.

### Alt C: Leave AppLayout alone, add Page and PageHeader only

Minimally invasive: don't rename, don't decompose, just add the two new pieces and migrate examples.

**Rejected:** the audit shows that AppLayout itself is part of the problem. The subcomponent wrappers are dead weight; the name mismatches the pattern. Dragging this in simultaneously costs maybe 20% more work and gets it out of the way permanently. If we don't fix it now (while AppLayout is beta), we pay a larger breaking-change tax later.

### Alt D: Make `Page` own scroll

Earlier draft of this doc had Page as the scroll container.

**Rejected by PR #5343:** scroll at the document level is strictly better (mobile URL bar, pull-to-refresh, scroll restoration, Cmd+F, anchor links, IntersectionObserver simplicity). Page stops being a scroll container and becomes a pure skeleton.

### Alt E: Extract shared Header primitives (React Spectrum style) now

Before building PageHeader, extract a `<Header>` + `<Heading>` + `<Description>` shared primitive used by Panel, Dialog, Drawer, and the new PageHeader.

**Deferred:** right extraction, wrong moment. Panel just shipped; Dialog and Drawer have their own stylings. Doing this now triples PR scope and risks regressions in shipped components. Building PageHeader's internals as a 1:1 structural clone of Panel leaves the two call sites perfectly lined up for a later extraction. Separate ticket.

### Alt F: Absorb `RouterProvider` into `AppShell`

**Rejected:** RouterProvider is app-wide plumbing, not a layout concern. Toasts, marketing pages, non-shell routes all need it without needing AppShell. Belongs at app root.

---

## Accessibility story

- **Heading outline:** `PageHeader.Title` h1 → `Panel.Title` h2 → `Panel.CollapsibleTitle` h3. Default one-h1-per-page is satisfied by the new defaults. Override with `level` when a page lives inside a Dialog's h1 (`<PageHeader><PageHeader.Title level={2}>`).
- **Landmarks:** `<main>` (via `Page`), `<aside>` = `complementary` (via `Sidebar`), `<header>` = `banner` (via `TopNavigation`, top-level in `<AppShell>`), `<nav>` = `navigation` (from Sidebar internals). No duplicates.
- **Skip links:** defer. Worth a follow-up ticket: render a visually-hidden "Skip to main content" link in `AppShell` that targets the `<main>` element provided by `Page`. Small, self-contained follow-up.
- **Scroll restoration:** handled by the browser now that scroll is on the document (PR #5343). Nothing for Page to do.
- **Focus on route change:** move focus to `PageHeader.Title` for screen reader announcement. Deferred — needs routing integration. Flagged as known gap; follow-up ticket.
- **Reduced motion:** sidebar collapse, sticky transitions already respect it in current components. Re-verify during implementation.
- **Sticky PageHeader z-index:** sits below overlays (modals z-50) but above regular content. `z-1` is fine (matches TopNavigation).

---

## Scope

### In scope for this workstream (may be multiple PRs)

- **Rename** `AppLayout` → `AppShell`, delete `.Sidebar`/`.Header`/`.Main`.
- **Absorb** `Sidebar.Provider` into `AppShell` with `defaultSidebarOpen` prop and existing-context pass-through.
- **New component** `<Page>` (padding, rhythm, `<main>` landmark, `[grid-area:main]`).
- **New component** `<PageHeader>` with `Title`, `Description`, `Actions`.
- **Pattern doc rewrite** (`docs/content/patterns/layout/app-shell/index.mdx`).
- **Component docs** for `AppShell`, `Page`, `PageHeader`.
- **Cross-link update** in `Panel` docs.
- **Example migration** — `shell-layout.tsx`, `dashboard-content.tsx`, `placeholder-page.tsx`, `form/page.tsx`, others.
- **Actions hierarchy** table in pattern doc (Page / Panel / Row / Account).
- **Page-level tabs** short section in pattern doc.
- **Empty state placement** short section in pattern doc.
- **Changesets** for: AppShell rename, new Page, new PageHeader.

### Explicit non-goals / deferred (flagged in docs)

- **Skip-link** in AppShell (follow-up ticket).
- **Focus move on route change** (needs routing integration; follow-up).
- **Shared `<Header>` / `<Title>` / `<Description>` primitive** across Panel/PageHeader/Dialog/Drawer (follow-up refactor ticket once PageHeader lands).
- **Page-level loading state** convention (skeleton vs spinner vs top progress bar — needs product decision).
- **Page-level error boundary** convention (bigger scope).
- **Master-detail / two-column** page layouts.
- **Print styles.**
- **Deep-link anchors / heading-link story.**
- **Save/Cancel action bar** pattern for form pages (ActionBar exists; canonical story is a follow-up).
- **Settings hub / landing-index** page pattern (content-design problem, not a component problem).
- **BackAction slot** on PageHeader (add when demand appears).
- **Eyebrow / status badge** slot on PageHeader.
- **Tabs as a first-class PageHeader slot** (render as sibling below for now).

---

## Migration & breaking changes

All against `AppLayout` which is `beta`:

1. `AppLayout` → `AppShell`. Breaking rename.
2. `AppLayout.Sidebar` → use `<Sidebar>` directly inside `<AppShell>`. Breaking.
3. `AppLayout.Header` → use `<TopNavigation>` directly. Breaking. (Note: the `variant`/`size`/`sticky` props on `AppLayoutHeader` today are pure forwards to `TopNavigation` — no feature loss.)
4. `AppLayout.Main` → use `<Page>` directly. Breaking. Net gain: `<Page>` does the `<main>` landmark AND the padding/rhythm the old `AppLayoutMain` never did.
5. `Sidebar.Provider` no longer required when using `<AppShell>`. Non-breaking (existing `<Sidebar.Provider>` wrappers continue to work; AppShell's internal provider defers to it).

Changesets: one per new component, one for the AppShell rename, one for the Sidebar.Provider absorption.

---

## Open questions (for team discussion)

1. **`AppShell` sidebar config surface.** Start with a single `defaultSidebarOpen?: boolean` prop? Or go straight to an object `sidebar={{ defaultOpen, open, onOpenChange }}`? Simpler is `defaultSidebarOpen` now; promote to object later (non-breaking).
2. **`Page` default padding.** `square-relaxed` vs `square-regular` vs `4`? I'd start with `square-relaxed` to give page content breathing room larger than Panel's internal padding — but this is worth a visual review. Happy to align with whatever the team picks.
3. **`Page` default rhythm (`space`).** `group` feels right (matches the gap Panel uses between its sections). But pages that are Panel-heavy want larger gaps than pages that are prose-heavy. Worth trying both on the migrated examples.
4. **Should `Page` be optional in AppShell, or required?** I.e., can you put bare content directly into `AppShell` without wrapping in `<Page>`? I'd say no by design — `<Page>` is the landmark + skeleton. But there could be edge cases (full-screen chart, login-less screens). Open.
5. **Sticky PageHeader default.** Off? On? Opinionated default off, Shopify-style on is opt-in? Sticky can feel heavy on short pages and great on long ones — let's make it opt-in.
6. **`PageHeader.Title` level API shape.** You picked `level` on the Title (matches `Headline`). Confirmed, noting the tradeoff that Panel uses root-level `headingLevel`. Worth aligning at the refactor when we extract shared primitives — but for now, the divergence is defensible.
7. **Where does `<PageHeader.Actions>` wrap on narrow widths?** Stack below the title on mobile? Truncate to an overflow menu? Needs a visual spec.
8. **Does `AppShell` need to own anything else that `Sidebar.Provider` doesn't cover?** Future candidates: theme-mode toggle state, command-menu keyboard shortcuts, focus-restore after sidebar close. Probably separate tickets; flagging here to avoid surprise.

---

## Timeline & rollout

Rough sequencing (work items, not calendar):

1. PR #5343 lands first (scroll to document).
2. Design review of this doc with the team.
3. PR 1: `AppShell` rename + decomposition + Sidebar.Provider absorption. Migrate AppLayout tests/stories. Update pattern doc to reflect the new shape without the new Page/PageHeader sections yet.
4. PR 2: `Page` + `PageHeader` components + component docs + cross-link in Panel.
5. PR 3: Pattern doc rewrite (full) + example migration.
6. Follow-ups (separate tickets): skip-link, focus-on-route-change, shared header-slot refactor, ActionBar-at-page-bottom pattern, loading/error state patterns.

PRs 1 and 2 are independent; 3 depends on both.

---

## Appendix: code shapes (sketches)

### `AppShell`

```tsx
interface AppShellProps {
  defaultSidebarOpen?: boolean;
  children: ReactNode;
}

export const AppShell = ({ defaultSidebarOpen, children }: AppShellProps) => {
  const existingSidebarContext = use(SidebarContext);
  const content = (
    <div
      className={cn(
        'grid min-h-dvh grid-cols-[auto_1fr] grid-rows-[auto_1fr]',
        "[grid-template-areas:'sidebar_header'_'sidebar_main']"
      )}
    >
      {children}
    </div>
  );
  return existingSidebarContext ? (
    content
  ) : (
    <Sidebar.Provider defaultOpen={defaultSidebarOpen}>
      {content}
    </Sidebar.Provider>
  );
};
```

### `Page`

```tsx
interface PageProps extends PagePaddingProps {
  space?: SpaceProp<SpacingTokens>['space'];
  sticky?: boolean;
  children: ReactNode;
}

export const Page = ({
  space = 'group',
  p,
  px,
  py,
  sticky,
  children,
}: PageProps) => {
  const inset = p ?? 'square-relaxed';
  const resolvedPx = px ?? `${inset}-x`;
  const resolvedPy = py ?? `${inset}-y`;
  return (
    <main
      data-sticky={sticky || undefined}
      className={cn(
        'flex flex-col [grid-area:main]',
        'gap-y-(--page-gap) px-(--page-px) py-(--page-py)'
      )}
      style={{
        ...createSpacingVar('page-px', resolvedPx),
        ...createSpacingVar('page-py', resolvedPy),
        ...createSpacingVar('page-gap', space),
      }}
    >
      {children}
    </main>
  );
};
```

### `PageHeader`

```tsx
interface PageHeaderProps {
  'aria-label'?: string;
  children: ReactNode;
}

export const PageHeader = ({
  'aria-label': ariaLabel,
  children,
}: PageHeaderProps) => {
  const titleId = useId();
  const [titleSlotRef, hasTitle] = useSlot(!ariaLabel);
  const classNames = useClassNames({ component: 'PageHeader' });
  const ctx = useMemo(
    () => ({ classNames, titleId, titleSlotRef, hasTitle }),
    [classNames, titleId, titleSlotRef, hasTitle]
  );
  return (
    <PageHeaderProvider value={ctx}>
      <header
        aria-labelledby={!ariaLabel ? titleId : undefined}
        aria-label={ariaLabel}
        className={cn(
          "grid grid-cols-[1fr_auto] [grid-template-areas:'title_actions'_'description_actions']",
          classNames.root
        )}
      >
        {children}
      </header>
    </PageHeaderProvider>
  );
};

PageHeader.Title = PageHeaderTitle; // <h1> by default via Heading, accepts `level`
PageHeader.Description = PageHeaderDescription;
PageHeader.Actions = PageHeaderActions;
```

---

_End of doc. Comments welcome._
