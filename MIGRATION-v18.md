# Migrating to Marigold v18

This guide takes a consuming app from Marigold **17** to **18**. It is exhaustive
and meant to be read top to bottom, by a person or by an AI agent. Every breaking
change lists what changed, a before→after, why, and the gotchas. It ends with a
verification checklist.

v18 is by far the largest release Marigold has shipped, well over a hundred
changes across the system. Take it in the order below and the app you end up with
is simpler for it.

---

## 1. Prerequisites

- **React 19 is required.** This is a hard prerequisite, not a recommendation. If
  you are on React 18, upgrade React first, confirm your app still builds, then
  bump Marigold. Bump both `react` and `react-dom` to `^19`. `@marigold/icons`
  narrows its peer dependency to `react >=19.0.0` (the custom icon wrappers rely
  on React 19's ref-as-prop), so a React 18 app will not resolve the new icons.
- **Node:** use a current LTS. Marigold does not impose a Node version on
  consumers beyond what your own build tooling needs.

## 2. How to use this guide (with or without an AI agent)

Point Claude at this file plus `marigold docs <Component>` for live prop data.
The recommended flow:

- **Step 0: run the codemod first.** From your app, run
  `marigold migrate v18 <path> --dry-run`, read the report, then run it again
  without `--dry-run` to apply. It performs the mechanical edits for you and flags
  everything it will not guess. The version argument is optional. Run
  `marigold migrate` and it detects your installed `@marigold/components` and
  proposes the matching migration.
- **Step 1: work the rest by hand** using the sections below. Each entry is
  tagged so you know whether the codemod already handled it.

The three AI touchpoints for v18 are `marigold search` (find a component by what
its docs say), the docs MCP server, and `marigold migrate` (this upgrade).

### What the codemod does vs. what you do

| Tag             | Meaning                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| **`[auto]`**    | The codemod edits this for you. Documented here so you understand it and can catch the fallback cases. |
| **`[flagged]`** | The codemod finds it and warns, but does not change it. You apply the fix.                             |
| **`[manual]`**  | The codemod cannot see or safely change this. Fully hand-done.                                         |
| **`[adopt]`**   | Not a required change. Guidance for the "adopt the new patterns" path (section 4).                     |

## 3. Recommended order of operations

Tokens → buttons/actions → layout → forms → icons. Do tokens first, because a
wrong token layer makes everything else look broken while you work.

## 4. Two upgrade paths

- **Smallest viable upgrade:** the minimum to compile and render correctly on v18.
  Apply every `[auto]` and `[flagged]` change, the token find-and-replace (A1), and
  the hard renames (AppShell, Card compound, SelectList, Tabs). Skip the `[adopt]`
  guidance.
- **Adopt the new patterns:** also take on the v18 app structure (section 5),
  slot-aware `<Button>`, the compound `<Card>` with `Card.Media`, and the refreshed
  surfaces. More work now, less drift later.

## 5. The v18 app structure

Before the individual changes, here is the shape v18 expects a full application to
take. Adopting it is the heart of the "adopt the new patterns" path, and it makes
the layout changes below (AppShell, Card to Panel) fit together.

**The frame: `<AppShell>`.** `<AppShell>` is the outer frame of an application, a
persistent navigation rail plus the page area. It is the new default shape for a
full app. It replaces `<AppLayout>` for teams already on it, and it is equally the
target for apps that hand-rolled their own page and navigation shell. `<Sidebar>`,
`<TopNavigation>`, and `<Page>` sit directly inside it, each owning its grid area,
so child order does not matter. See A3.1.

**The navigation: `<Sidebar.Rail>`.** For a full application the new default sidebar
shape is two-level: a persistent icon-first **rail** of top-level destinations next
to a **panel** showing the active section's sub-navigation. The building block is
`<Sidebar.RailItem>`. One wrapping a `<Sidebar.Nav>` is a section that fills the
panel, one with only an `href` is a direct link that shows no panel, and one
declared inside `<Sidebar.Footer>` pins to the bottom of the rail. Pass the current
pathname to `<Sidebar.Rail current>` and both levels resolve at once. A plain
single-column `<Sidebar>` still works and is not a breaking change, so the rail is
opt-in.

```tsx
<AppShell>
  <Sidebar>
    <Sidebar.Rail current={pathname}>
      <Sidebar.RailItem icon={<Ticket />} id="tickets">
        Tickets
        <Sidebar.Nav aria-label="Tickets">
          <Sidebar.Item href="/tickets/open">Open</Sidebar.Item>
          <Sidebar.Item href="/tickets/archive">Archive</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar.RailItem>
      <Sidebar.RailItem icon={<BarChart3 />} href="/reports">
        Reports
      </Sidebar.RailItem>
      <Sidebar.Footer>
        <Sidebar.RailItem icon={<LifeBuoy />} href="/help">
          Help
        </Sidebar.RailItem>
      </Sidebar.Footer>
    </Sidebar.Rail>
  </Sidebar>
  <TopNavigation>…</TopNavigation>
  <Page>…</Page>
</AppShell>
```

With a rail present, `<AppShell>` switches to a full-width top bar on its own. Place
the brand and a `<Sidebar.Toggle variant="rail" />` in the top navigation's start
slot. The toggle (or Cmd/Ctrl+B) hides the panel and narrows the rail to an
icon-only strip, so top-level navigation stays one click away. On small screens the
rail renders as the same single-column drawer as a plain sidebar. A standalone theme
adopting the rail needs the shell spacing tokens (`--spacing-topbar`,
`--spacing-rail`, `--spacing-rail-collapsed`, `--spacing-rail-panel`,
`--spacing-touch-target`). Themes extending `@marigold/theme-rui` inherit them.

**The screen: `<Page>`.** Inside the shell, `<Page>` is the `<main>` landmark with
page padding and vertical rhythm between sections. `<Page.Header>` is a slot-based
title/description/actions header. In v18 the page itself is what scrolls. There is
no fixed-height main, so `window.scrollY` behaves normally.

**In-screen layout: `<Panel>`, not `<Card>`.** For grouping and laying out content
within a screen, use `<Panel>`. `Card` is no longer a layout component in v18. It
is the unit for repeating collection items (a stat tile, a session row, a payment
method). See A3.2.

**The background token.** v18 surfaces are calibrated against the new `charcoal`
palette. The app root should carry `bg-background` (which resolves to
`--color-background`, that is `charcoal-100`) together with `text-foreground`, so
pages, panels, and controls read correctly against each other.
`@marigold/theme-rui` already applies this on `body`. A standalone theme must set
it itself.

```tsx
<AppShell defaultSidebarOpen>
  <Sidebar>…</Sidebar>
  <TopNavigation>…</TopNavigation>
  <Page>
    <Page.Header>
      <Title>Billing</Title>
    </Page.Header>
    <Panel>…</Panel>
  </Page>
</AppShell>
```

---

# Section A: App developers

You import from `@marigold/components` and `@marigold/icons` and write JSX. If you
do not maintain a custom theme, you can stop after this section.

## A1. Design tokens and styling

### A1.1 Design token overhaul (charcoal palette + semantic renames) `[flagged]` `[manual]`

**What changed.** The neutral scale moved from Tailwind `stone` to a purpose-built
`charcoal` palette (11 OKLCH steps at hue 54). Semantic tokens were renamed, the
status tokens dropped their `-muted-` infix, and several tokens kept their name but
changed role.

**Semantic renames.** Mostly a find-and-replace across Tailwind utility classes and
raw `var(--color-*)` reads. The old variable names are gone, not aliased.

| Old                    | New                                               |
| ---------------------- | ------------------------------------------------- |
| `brand`                | `primary`                                         |
| `brand-foreground`     | `primary-foreground`                              |
| `muted-foreground`     | `secondary`                                       |
| `focus`                | `focus-highlight`                                 |
| `disabled-foreground`  | `disabled`                                        |
| `hover-foreground`     | `foreground`                                      |
| `input`                | removed (split into `control` / `control-border`) |
| `secondary-foreground` | removed (no 1:1 replacement)                      |

```diff
- <div className="bg-brand text-brand-foreground" />
+ <div className="bg-primary text-primary-foreground" />

- <Text className="text-muted-foreground">Help text</Text>
+ <Text className="text-secondary">Help text</Text>
```

**Status tokens restructured.** The muted set is now the default, and `-muted-` is
dropped. Only `destructive` keeps a strong solid variant, moved to `-bold`.

```diff
- <div className="bg-warning-muted text-warning-muted-foreground">
-   <TriangleAlert className="text-warning-muted-accent" />
+ <div className="bg-warning text-warning-foreground">
+   <TriangleAlert className="text-warning-accent" />
```

The same pattern applies across `success`, `warning`, `info`, `destructive`.

**Repurposed tokens (same name, new meaning).** No rename scan can see these, so
review them by hand:

| Token                                                            | v17 role            | v18 role                                                            |
| ---------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------- |
| `disabled`                                                       | disabled background | disabled text color (background moved to `disabled-surface`)        |
| `secondary`                                                      | near-white surface  | secondary text color (surface role moved to `soft`)                 |
| `destructive` / `success` / `warning` / `info` (+ `-foreground`) | solid accent fill   | muted surface (solid moved to `-bold` / rebuild with a scale color) |

**Why.** Tokens now describe the role a color plays, not the styling it happened to
have. Token utilities compile fine and only break visually, which is why the
codemod scans and warns but never edits token values. Those values are yours.

**Gotchas.** If you read tokens as raw custom properties (`var(--color-brand)`),
update those too. New hover utilities `ui-state-hover` and `ui-state-hover-ghost`
replace hand-copied `hover:bg-*` patterns. Prefer them in custom components.

### A1.2 Elevation utilities and shadow tiers removed (`util-surface-*`) `[flagged]` `[manual]`

**What changed.** The elevation model was rebuilt. Nothing in normal document flow
casts a shadow. Surfaces and controls are told apart by a 1px boundary ring
(`ui-surface` for containers, `ui-control` for operable elements). The only
remaining shadow tier is `shadow-elevation-overlay`, for surfaces that float above
the page. The `util-surface-*` utilities (deprecated in v17.0.0) and the
`shadow-elevation-border` / `shadow-elevation-raised` tiers are removed.

| Old utility                           | New replacement                                     |
| ------------------------------------- | --------------------------------------------------- |
| `util-surface-sunken`                 | `bg-background` (page base layer)                   |
| `util-surface-body`                   | `bg-background`                                     |
| `util-surface-raised`                 | `ui-surface`                                        |
| `util-surface-overlay`                | `ui-surface shadow-elevation-overlay`               |
| `shadow-elevation-border` / `-raised` | drop it, or `shadow-elevation-overlay` for overlays |

```diff
- <div className="util-surface-raised">
+ <div className="ui-surface">
```

**Gotchas.** If you reference `--shadow-elevation-border` or `-raised` in custom
CSS, move to a flat `ui-surface` (in-flow) or `shadow-elevation-overlay`
(floating).

## A2. Buttons and actions

v18 consolidates on a single slot-aware `<Button>`. For a v17 app the only change
that affects you is the `ActionBar.Button` removal below. `<ActionButton>` and
`<ActionGroup>` never shipped in v17 stable, so they are a footnote for beta
adopters only (A2.3).

### A2.1 `ActionBar.Button` removed, use `<Button>` `[manual]`

**What changed.** `ActionBar.Button` is removed. Place a plain `<Button>` inside
`<ActionBar>`. The bar cascades the toolbar look through `ButtonContext`, and the
full Button API is available (`disabled`, `loading`, `slot`, `size="icon"`).

```diff
  <ActionBar selectedItemCount={3} onClearSelection={clear}>
-   <ActionBar.Button onPress={edit}>
+   <Button onPress={edit}>
      <Pencil /> Edit
-   </ActionBar.Button>
+   </Button>
  </ActionBar>
```

**Why / gotchas.** For icon-only actions use `<Button size="icon" aria-label="…">`.
This also fixes an accessibility defect where the old wrapper silently dropped
`aria-label`, shipping unlabeled icon buttons.

### A2.2 `width="fit"` removed on `<Select>`, `<ComboBox>`, `<Autocomplete>` `[flagged]`

**What changed.** The `fit` value is gone on these three. Their listbox renders
through a virtualized popover, so `width="fit"` never reached the popover and
clipped the dropdown.

```diff
- <Select label="Role" width="fit">
+ <Select label="Role" width="1/2">
```

**Gotchas.** Every other `width` value (fractions, fixed sizes, `full`) still
works. This is a design decision, so the codemod flags it rather than picking a
width for you.

### A2.3 Beta adopters only: `<ActionButton>` and `<ActionGroup>` `[manual]` (beta only)

**What changed.** Neither existed in v17 stable, so skip this unless you built
against the v18 beta. `<ActionButton>` is removed. Use the slot-aware `<Button>`,
whose `default` variant maps to `variant="ghost"`, and opt a button out of the
cascade with `slot={null}`. `<ActionGroup>` is renamed to `<ButtonGroup>`, and
`ActionGroupContext` is now `ButtonContext`.

## A3. Layout

### A3.1 `<AppShell>` replaces `<AppLayout>` (+ `<Page>`, page-scroll) `[manual]`

**What changed.** `<AppLayout>` is renamed to `<AppShell>`, and its pass-through
sub-components (`AppLayout.Sidebar`, `.Header`, `.Main`) are removed. `<Sidebar>`,
`<TopNavigation>`, and the new `<Page>` sit directly inside `<AppShell>`, each
owning its grid area. `<AppShell>` absorbs `Sidebar.Provider` via a
`defaultSidebarOpen` prop. This is also the recommended target for apps that
hand-rolled their own page and navigation shell (see section 5).

```diff
-<Sidebar.Provider defaultOpen>
-  <AppLayout>
-    <AppLayout.Sidebar>…</AppLayout.Sidebar>
-    <AppLayout.Header>…</AppLayout.Header>
-    <AppLayout.Main>{content}</AppLayout.Main>
-  </AppLayout>
-</Sidebar.Provider>
+<AppShell defaultSidebarOpen>
+  <Sidebar>…</Sidebar>
+  <TopNavigation>…</TopNavigation>
+  <Page>
+    <Page.Header>
+      <Title>Billing</Title>
+    </Page.Header>
+    {content}
+  </Page>
+</AppShell>
```

**The shell scrolls at the page level.** `<AppShell>` does not own an interior
scroll container. The document scrolls, the sidebar holds position via
`position: sticky`, and the top header stays pinned. Two patterns break:

```diff
- const top = mainRef.current?.scrollTop;
+ const top = window.scrollY; // or document.documentElement.scrollTop
```

Inside `<Page>` (the renamed `<AppLayout.Main>`), a child can no longer fill a
fixed viewport height with `h-full`:

```diff
- <div className="h-full">…</div>
+ <div className="min-h-dvh">…</div>
```

**Why.** One scroll container fixes mobile URL-bar collapse, browser scroll
restoration, `Cmd+F`, anchor links, and `IntersectionObserver`. Render your own
`<Sidebar.Provider>` around `<AppShell>` if you need controlled sidebar state. It
is detected and used instead of the internal one.

See section 5 for the full `AppShell` + `Page` + `Panel` composition and the
two-level `Sidebar.Rail`, which is the recommended navigation shape for a full app.

### A3.2 `<Card>` is content-only now, use `<Panel>` for layout `[manual]` (`[flagged]` one-sided paddings)

**What changed.** Two things.

First, `Card` is no longer a layout component. With `<Panel>` now covering
page-level sections, `Card` is the unit for repeating collection items. If you used
`Card` as a box to group or lay out a screen, move that usage to `<Panel>`.

Second, `Card`'s prop-based API (`padding`, `space`) is gone in favor of a compound
component. A `CardContext` is set up by `<Card>`, so sub-components throw a clear
error outside one.

```diff
- <Card>
-   <SomeContent />
- </Card>
+ <Card>
+   <Card.Header>
+     <Title>Payment method</Title>
+     <Description>Visa ending in 4242</Description>
+   </Card.Header>
+   <Card.Content>
+     <SomeContent />
+   </Card.Content>
+   <Card.Footer>
+     <Button>Edit</Button>
+   </Card.Footer>
+ </Card>
```

**Renames inside Card.** `Card.Body` became `Card.Content` (theme slot key
`body` → `content`). `Card.Preview` became `Card.Media` (selector
`data-card-preview` → `data-card-media`, theme slot key `preview` → `media`). Since
Card lays out as a flex column, place `<Card.Media>` first for media at the top.

**Padding.** Only `p` / `px` / `py` remain (one-sided `pt`/`pb`/`pl`/`pr` were
removed, the codemod flags them). Bare children inside `<Card>` no longer receive
padding, so wrap body content in `<Card.Content>`.

**Gotchas.** `<Card>` now renders an `<article>` landmark labelled by its `<Title>`.
A `headingLevel` prop (default 3) sets the heading tag.

### A3.3 `<Inset>` padding props renamed `[auto]`

**What changed.** `space` → `p`, `spaceX` → `px`, `spaceY` → `py`, aligning with
`<Panel>`. Across the system `space` now always means gap between children and
`p`/`px`/`py` always mean inner padding. The codemod renames the props.

```diff
- <Inset space="related"><Content /></Inset>
+ <Inset p="related"><Content /></Inset>

- <Inset spaceX="loose" spaceY="related"><Content /></Inset>
+ <Inset px="loose" py="related"><Content /></Inset>
```

**Gotchas.** The discriminated union is unchanged (`p` is mutually exclusive with
`px`/`py`). Token vocabularies are unchanged. v18 also adds a universal `collapsed`
spacing token (resolves to zero), usable in `p`/`px`/`py` and `space` anywhere, for
edge-to-edge wrappers. That part is optional, not a migration step.

## A4. Forms

### A4.1 `<Switch>` layout and sizing rework `[flagged]` `[manual]`

**What changed.** `<Switch>` now sits on the left of its label, matching `<Checkbox>`
and `<Radio>`. The default track is smaller. `size="large"` is gone. For the
settings-page layout (label and description on the left, toggle on the far right),
use the new `variant="settings"`. `<Switch>` also accepts a `description` prop and
passes `name` through to the input.

```diff
- <Switch size="large">Email notifications</Switch>
+ <Switch
+   label="Email notifications"
+   description="Receive a summary every Monday"
+   variant="settings"
+ />
```

**Gotchas.** The codemod flags `size="large"` rather than removing it, because a
standalone theme may still define its own size variants. The DOM changed (grid
layout, `BooleanField` wrapper), so review any CSS selectors targeting the old
Switch structure. Custom themes must add `BooleanField` (see B1).

### A4.2 Retired `<Multiselect>`, migrate to `<TagField>` `[flagged]`

**What changed.** `<Multiselect>` (deprecated since v17.0.0) is removed, along with
its `react-select` dependency. Use `<TagField>`, which has a different API.

```diff
- <Multiselect label="Genres" options={options} onChange={setValues} />
+ <TagField label="Genres">
+   <TagField.Option id="rock">Rock</TagField.Option>
+   <TagField.Option id="jazz">Jazz</TagField.Option>
+ </TagField>
```

**Gotchas.** The API differs enough that the codemod will not attempt it. See the
[TagField docs](/components/form/tag-field) for controlled selection, disabled
keys, sections, and empty states.

### A4.3 `<SelectList>` API standardized `[auto]` (`Item`→`Option`) `[flagged]` (`onChange`) `[manual]` (content)

**What changed.** `SelectList.Item` → `SelectList.Option` (the codemod renames the
member). `SelectList.Action` is removed (drop your `<ActionMenu>`/`<IconButton>`
straight inside the option). The leading-image slot is removed (compose inside
children). `selectionMode="none"` is removed (default is now `"single"`). `onChange`
is strictly typed per `selectionMode`: single passes `(key: Key | null)`, multiple
passes `(keys: Key[])`, so update the handler.

```diff
- <SelectList selectionMode="none">
-   <SelectList.Item id="free">
-     <SelectList.Action>
-       <IconButton aria-label="Info"><Info /></IconButton>
-     </SelectList.Action>
-     Free
-   </SelectList.Item>
- </SelectList>
+ <SelectList selectionMode="single">
+   <SelectList.Option id="free">
+     <Text slot="label">Free</Text>
+     <Text slot="description">For personal use</Text>
+     <IconButton aria-label="Info"><Info /></IconButton>
+   </SelectList.Option>
+ </SelectList>
```

**Gotchas.** Option content moved to `<Text slot="label">` / `<Text slot="description">`
(or `<TextValue>` / `<Description>`). Custom themes must add a `SelectList` entry
(see B4/B5). The selection indicator hardcodes new tokens, so a standalone theme
needs `selected-bold` / `disabled-surface` (B5).

### A4.4 `<Tag.Group>` joins form validation `[manual]`

**What changed.** `<TagGroup>` now renders `errorMessage` and bridges to `<Form>`
validation. Its API is normalized: `isInvalid` / `isRequired` / `isDisabled` are
removed (use `error` / `required` / `disabled`), and `onSelectionChange` is renamed
to `onChange`. `selectionMode` defaults to `'multiple'`.

```diff
- <TagGroup isDisabled isInvalid onSelectionChange={setKeys}>
+ <TagGroup disabled error onChange={setKeys}>
```

**Gotchas.** `disabled` now propagates to each `<Tag>`. New props: `error`,
`required`, `disabled`, `validate`, `validationBehavior`, `form`.

### A4.5 `<SectionMessage>` API rework `[manual]`

**What changed.** Several coordinated fixes.

- **`close` → `open`.** The controlled prop was named `close` but its truthiness
  meant visible. It is now `open`, matching Dialog/Drawer/Tray. `onCloseChange`
  becomes `onOpenChange` (receives `false` on dismiss). New `defaultOpen` (default
  `true`) for uncontrolled mode.
- **`role="alert"` replaced by `announce`.** The message now routes through
  react-aria's persistent live announcer. `announce` defaults to `true` for
  `variant="error"` and `false` otherwise, so the common case is unchanged.

```diff
- <SectionMessage variant="error" close={isVisible} onCloseChange={setX}>
+ <SectionMessage variant="error" open={isVisible} onOpenChange={setX}>
```

**Gotchas.** Tests or styles that located the message via `getByRole('alert')` or
`[role="alert"]` need a different selector. The text still renders, only the
wrapper role is gone. `SectionMessage.Title` now renders a real heading (`<h3>` by
default), and a new `<SectionMessage.Description>` slots a summary. Custom themes
must remove the `SectionMessage.close` slot (see B6).

### A4.6 Dead and mis-named props removed `[auto]` (`TextField` min/max, `FileTrigger` type) `[manual]` (others)

**What changed.** A cleanup of props that silently did nothing.

- **`TextField` `min` / `max`** removed (never forwarded to the input). Use
  `<NumberField>` for numeric constraints. The codemod removes them.
- **`FileTrigger` / `FileField` `acceptedFileType`** removed. The singular key never
  matched react-aria's `acceptedFileTypes`, so filtering silently never applied. The
  codemod renames it to `acceptedFileTypes` and wraps the value in an array.
- **`Button` `variant="icon"`** was never a real variant. Use `size="icon"`
  (composes with any variant, e.g. `variant="ghost" size="icon"`).
- **`Label`** no longer exposes `style`.

```diff
- <FileTrigger acceptedFileType="image/png" />
+ <FileTrigger acceptedFileTypes={["image/png"]} />

- <Button variant="icon" aria-label="Edit"><Pencil /></Button>
+ <Button variant="ghost" size="icon" aria-label="Edit"><Pencil /></Button>
```

## A5. Navigation

### A5.1 `Tabs.TabPanel` renamed to `Tabs.Panel`, tab rows scroll `[auto]`

**What changed.** `Tabs.TabPanel` is now `Tabs.Panel`, so every compound member
(`.List`, `.Item`, `.Panel`) follows one rule. Hard rename, no alias. The codemod
renames the member. Overflowing tab rows now scroll horizontally instead of
wrapping.

```diff
- <Tabs.TabPanel id="details">…</Tabs.TabPanel>
+ <Tabs.Panel id="details">…</Tabs.Panel>
```

**Gotchas.** Custom themes must add a `tabsListScroll` slot (see B, the checklist).
The `size` prop now accepts a plain `string`.

## A6. Overlays

### A6.1 `<Tooltip>` no longer accepts `open` `[flagged]`

**What changed.** `open` is removed from `<Tooltip>`. Controlled visibility now
lives on `<Tooltip.Trigger>` only. Uncontrolled usage is unchanged.

```diff
- <Tooltip open={isOpen} onOpenChange={setIsOpen}>
-   <Tooltip.Trigger>
+ <Tooltip>
+   <Tooltip.Trigger open={isOpen} onOpenChange={setIsOpen}>
      <Button>Info</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Hello</Tooltip.Content>
  </Tooltip>
```

**Gotchas.** This needs a structural move (the prop hops to a child element), so the
codemod flags it rather than editing.

### A6.2 `<Drawer>` enforces one open at a time `[manual]`

**What changed.** Opening a sibling `<Drawer>` while one is open dismisses the
first, on desktop and mobile. The dismissed Drawer's `onOpenChange(false)` fires.
A `<Drawer.Trigger>` nested inside an open Drawer opens a sub-flow over its parent.

**Gotchas.** No API change. If a flow relied on multiple simultaneous sibling
drawers, refactor to a single drawer with switchable content, or use `<Modal>` for
layered interactions.

## A7. Icons

### A7.1 `@marigold/icons` is now a `lucide-react` proxy `[auto]` (renames) `[manual]` (numeric `size`)

**What changed.** `@marigold/icons` is now a thin proxy over `lucide-react` plus 13
retained brand icons. The import path does not change. Icon names that had a Lucide
equivalent were renamed to the Lucide name. `size` is now numeric.

```diff
- import { Add, Delete, Exclamation, Search } from '@marigold/icons';
+ import { Plus, Search, Trash2, TriangleAlert } from '@marigold/icons';
```

The codemod renames the import and every usage (`<Pickup />` becomes `<Store />`)
when it is provably safe. Otherwise it falls back to a `New as Old` alias, which
keeps every call site valid:

```diff
- import { Pickup } from '@marigold/icons';
+ import { Store as Pickup } from '@marigold/icons';
```

**Rules.**

- Always import from `@marigold/icons`, not `lucide-react` directly. The package
  re-exports the entire Lucide catalogue plus the brand icons, so every Lucide icon
  is available through the one import path.
- `size` serializes as a numeric attribute. Pass `size={20}` as before. If you
  passed a unit suffix, drop it: `size="24px"` becomes `size={24}`.
- Color via Tailwind text utilities (`<TriangleAlert className="text-warning-accent" />`).
  Lucide reads `color` as a literal CSS value, so `color="warning"` will not
  resolve a token.
- Brand icons (`DesignTicket`, `GiftCard`, `Facebook`, `Stadium`, …) keep their
  names. No change.

**Full rename table.**

| Old               | New                    | Old                      | New                     |
| ----------------- | ---------------------- | ------------------------ | ----------------------- |
| `Add`             | `Plus`                 | `Membership`             | `IdCardLanyard`         |
| `BurgerMenu`      | `Menu`                 | `Pickup`                 | `Store`                 |
| `CircleChecked`   | `CircleDot`            | `Price`                  | `Euro`                  |
| `CircleUnchecked` | `Circle`               | `Seat`                   | `Armchair`              |
| `Delete`          | `Trash2`               | `Selling`                | `Tag`                   |
| `Filter`          | `ListFilter`           | `Cart`                   | `ShoppingCart`          |
| `IconMore`        | `Ellipsis`             | `Group`                  | `UsersRound`            |
| `Remove`          | `Minus`                | `Id`                     | `IdCard`                |
| `SettingDots`     | `EllipsisVertical`     | `SmilieDissatisfied`     | `Frown`                 |
| `SquareChecked`   | `SquareCheck`          | `SmilieNeutral`          | `Meh`                   |
| `SquareUnchecked` | `Square`               | `SmilieSatisfied`        | `Smile`                 |
| `Accessible`      | `Accessibility`        | `SmilieVeryDissatisfied` | `Angry`                 |
| `AutoRenew`       | `RefreshCcw`           | `SmilieVerySatisfied`    | `Laugh`                 |
| `Banned`          | `Ban`                  | `User`                   | `UserRound`             |
| `BatteryEmpty`    | `BatteryLow`           | `Share`                  | `Share2`                |
| `BatteryHalf`     | `BatteryMedium`        | `Cancel`                 | `CircleX`               |
| `Bus`             | `BusFront`             | `Edit`                   | `Pencil`                |
| `Direction`       | `SquareArrowUpRight`   | `ExportFile`             | `SquareArrowOutUpRight` |
| `Email`           | `Mail`                 | `FormatBold`             | `Bold`                  |
| `EventDate`       | `Calendar1`            | `FormatItalic`           | `Italic`                |
| `Exclamation`     | `TriangleAlert`        | `FormatSize`             | `ALargeSmall`           |
| `Feedback`        | `MessageSquareMore`    | `HighlightOff`           | `Power`                 |
| `Food`            | `Utensils`             | `Location`               | `LocateFixed`           |
| `Home`            | `House`                | `Logout`                 | `LogOut`                |
| `Marker`          | `MapPin`               | `Picture`                | `Image`                 |
| `MobilePhone`     | `Smartphone`           | `ResaleEdit`             | `Cog`                   |
| `MobileSignal`    | `SignalHigh`           | `Restart`                | `RotateCcw`             |
| `Notification`    | `MessageSquareWarning` | `RotateLeft`             | `RotateCcw`             |
| `Parking`         | `CircleParking`        | `RotateRight`            | `RotateCw`              |
| `Reports`         | `FileText`             | `Sort`                   | `ChevronsUpDown`        |
| `Required`        | `Asterisk`             | `SortDown`               | `ChevronDown`           |
| `ResaleLogbook`   | `BookOpenText`         | `SortUp`                 | `ChevronUp`             |
| `Spinner`         | `Loader`               | `Stop`                   | `CircleStop`            |
| `Thumb`           | `ThumbsUp`             | `Underlined`             | `Underline`             |
| `Deal`            | `BadgePercent`         | `Zoom`                   | `ZoomIn`                |
| `Print`           | `Printer`              |                          |                         |

## A8. Removed

### A8.1 `<Breakout>` removed `[manual]`

**What changed.** `<Breakout>` had 0% production usage and is removed, along with
`<Container>`'s `align` prop (which only took effect via a `[data-breakout]` child).

**Gotchas.** Remove any `align` prop from `<Container>` usages. `<Container>`'s
`contentLength`, `alignItems`, and `space` props are unchanged.

---

# Section B: Custom theme authors

You maintain a theme: the `ThemeComponent<'X'>` cva style files and the `--color-*`
token definitions. These break independently of your app code. Run the codemod
against your theme directory. It restructures slots, swaps unchanged baselines,
stubs missing slots, and scaffolds `BooleanField`. Then run your typechecker: the
slot Records in `@marigold/system`'s `Theme` type are exhaustive, so the typecheck
is the completeness check for anything the codemod could not fix.

### B1. New `BooleanField` theme component (+ Checkbox/Switch grid) `[auto]`

**What changed.** `Checkbox` and `Switch` render a `BooleanField` wrapper
internally (the label/description grid). A theme without its styles throws at
runtime:

```
Error: Component "BooleanField" is missing styles in the current theme.
```

The codemod scaffolds it next to the theme file that needs it and registers it in
the barrel. If you add it by hand:

```ts
import { cva } from '@marigold/system';

export const BooleanField = {
  container: cva({
    base: 'grid gap-x-2',
    variants: {
      variant: {
        default: 'grid-cols-[auto_1fr]',
        settings: 'grid-cols-[1fr_auto]',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  description: cva({
    base: 'mt-0.5',
    variants: {
      variant: {
        default: 'col-start-2',
        settings: 'col-start-1',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
};
```

The `Checkbox` and `Switch` container slots also moved from flexbox to CSS grid
with conditional subgrid. If your baselines are unchanged, the codemod swaps them.

### B2. Token renames, elevation, charcoal, hover utilities `[flagged]` `[manual]`

**What changed.** The A1.1 renames apply at the definition site, plus the repurposed
tokens need remapping. The codemod reports dangling references but never edits token
values.

**Repurposed-token recipes** (apply at your `--color-*` definitions):

- **`disabled`** flipped from background to text. Move your value to
  `--color-disabled-surface`, give `--color-disabled` your old
  `--color-disabled-foreground` value, then review your `bg-disabled` usages.
  Silenced once `--color-disabled-surface` appears in your CSS.
- **`secondary`** flipped from a near-white surface to the secondary text color.
  Give it your old `--color-muted-foreground` value. The surface role moved to the
  `soft` token.
- **`destructive` / `success` / `warning` / `info`** (and their `-foreground`s)
  flipped from solid accent to muted surface. Take your old `*-muted` value. The
  solid accent moved to `-bold` (destructive) or rebuild fills with a scale color.

### B3. Theme-owned breakpoints (`screens`) `[manual]`

**What changed.** `useSmallScreen` and `useResponsiveValue` read `theme.screens`
instead of hardcoded values. For `@marigold/theme-rui` this is a no-op. A custom
theme that does not extend theme-rui should add a `screens` map, or rely on the
Tailwind v4 `--breakpoint-*` CSS fallback.

```ts
export const myTheme: Theme = {
  name: 'my-theme',
  screens: { sm: '40rem', md: '48rem', lg: '64rem', xl: '80rem' },
  // ...
};
```

### B4. `SelectList` / `ListBox` / `Menu` label + description slot keys `[auto]`

**What changed.** New `label` and `description` slot keys on `SelectList`, `ListBox`,
and `Menu`, plus a `keyboard` slot on `Menu` for shortcut hints. `SelectList` gets a
full theme entry (`label`, `description`, `action` slots). The codemod stubs missing
slots as `cva({})`.

### B5. Component token dependencies (`SelectList` needs `selected-bold` / `disabled-surface`) `[flagged]`

**What changed.** The `SelectList` selection indicator hardcodes `selected-bold`,
`selected-bold-foreground`, and `disabled-surface`. These classes bypass the theme
layer, so a standalone theme missing the tokens renders the indicator unstyled. The
codemod warns when a component that depends on such tokens is imported. Themes that
extend `@marigold/theme-rui` get them for free.

### B6. `<SectionMessage>` `close` slot removed `[manual]`

**What changed.** The bespoke close button is gone. `SectionMessage` now renders the
shared `CloseButton`. Remove the `SectionMessage.close` slot from your theme (it no
longer exists in the theme type, so the typecheck will flag it). Add a `description`
slot to `SectionMessage` and `ContextualHelp` for the new `Description`
sub-components.

### B7. Removed `@marigold/system` exports (dimension props under the hood) `[manual]`

**What changed.** The internal runtime class-name maps (`width`, `maxWidth`,
`height`, `gapSpace`, `paddingSpace*`, …) are no longer exported from
`@marigold/system`. If you imported them directly, use the prop types (`WidthProp`,
`HeightProp`, …) and the CSS-var helpers (`createWidthVar`, `createHeightVar`,
`createSpacingVar`) instead.

**Gotchas.** A namespace import (`import * as X from '@marigold/system'`) cannot be
followed by the codemod, so it raises a warning instead.

### B8. Card / Switch slot restructure + baseline swaps `[auto]`

**What changed.** Single-cva components became slot Records. The codemod moves your
existing cva verbatim into the primary slot, and swaps a baseline to the v18 baseline
only on a byte-exact match (proof the slot was never customized). It also reports the
`Card` slot key rename `body` → `content`.

### B9. Page-scroll peer rules (`preflight.css`) `[manual]`

**What changed.** The page-level scroll model (A3.1) relies on two peer rules on the
real `<html>` / `<body>`. `@marigold/theme-rui` ships them in both `theme.css` and
`styles.css`, so a consumer on theme-rui gets them for free. A standalone theme that
does not extend theme-rui must add them, or overlay locking causes a 1px reflow and
off-screen react-aria portals expand the document:

```css
html {
  scrollbar-gutter: stable;
}
body {
  overflow-x: clip;
}
```

**Gotchas.** Do not put `position`, `transform`, `contain`, `filter`,
`backdrop-filter`, or `will-change: transform` on `<body>`. Any of them makes
react-aria double-count the page scroll offset and flip overlay placements. Note
also that the never-released `global.css` is gone, and every `.css` subpath now
declares a `style` export condition. Import `theme.css` for a full app or
`styles.css` for an island.

### Custom-theme checklist (from the release notes)

| Change                                                            | Reason                                 |
| ----------------------------------------------------------------- | -------------------------------------- |
| Add a `BooleanField` component                                    | `Switch` / `Checkbox` descriptions     |
| Add a `SelectList` entry (`label`, `description`, `action` slots) | SelectList standardization             |
| Add `label` and `description` slots to `Menu` and `ListBox`       | Item label/description styling         |
| Add a `keyboard` slot to `Menu`                                   | Keyboard-shortcut hints                |
| Add a `description` slot to `SectionMessage` and `ContextualHelp` | New `Description` sub-components       |
| Remove the `SectionMessage` `close` slot                          | Close button uses shared `CloseButton` |
| Rename the `Card` slot key `body` → `content`                     | `Card.Body` → `Card.Content`           |
| Add a `tabsListScroll` slot to `Tabs`                             | Scrollable tab rows                    |
| Add `screens` (or rely on the CSS fallback)                       | Theme-owned breakpoints                |

---

## Verification checklist

- [ ] React 19 in place, app builds before the Marigold bump
- [ ] `marigold migrate v18 <path> --dry-run` run and report read, then applied
- [ ] Token find-and-replace across `.ts` / `.tsx` / `.css`:
  - [ ] `bg-brand` → `bg-primary`, `text-brand-foreground` → `text-primary-foreground`
  - [ ] `text-muted-foreground` → `text-secondary`
  - [ ] `bg-focus` → `bg-focus-highlight`
  - [ ] `bg-warning-muted` → `bg-warning` (and `success` / `info` / `destructive`)
  - [ ] `util-surface-raised` → `ui-surface`, `util-surface-body` / `-sunken` → `bg-background`
  - [ ] raw `var(--color-brand)` and friends updated
- [ ] Repurposed tokens remapped at their definitions (`disabled`, `secondary`, status)
- [ ] Hard renames done: `AppLayout` → `AppShell`, `Card.Body` → `Card.Content`,
      `Card.Preview` → `Card.Media`, `SelectList.Item` → `SelectList.Option`,
      `Tabs.TabPanel` → `Tabs.Panel`, `ActionBar.Button` → `Button`
- [ ] Scroll reads moved to `window.scrollY`, `h-full` in `<Page>` children → `min-h-dvh`
- [ ] `SectionMessage`: `close` → `open`, `onCloseChange` → `onOpenChange`, and tests
      using `getByRole('alert')` updated
- [ ] `width="fit"` replaced with an explicit width
- [ ] `Tooltip open` moved onto `Tooltip.Trigger`
- [ ] `pnpm typecheck:only` clean (the slot Records are exhaustive, so typecheck is
      the completeness check for anything the codemod could not fix)
- [ ] App builds and renders on v18

---

_Source of truth for this guide: the [v18.0.0 release notes](/releases/blog/release-2026-08-17),
the `marigold migrate v18` codemod, and `marigold docs <Component>`._
