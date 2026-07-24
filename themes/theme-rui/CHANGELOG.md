# @marigold/theme-rui

## 6.0.0-beta.4

### Major Changes

- 9918172: feat(DST-1545): replace `ActionBar.Button` with a plain `<Button>` via a `ButtonContext` cascade. `ActionBar` now provides a `ghost`/`default` cascade to its toolbar, so authors place a standard `<Button>` inside the bar and it adapts to the toolbar look automatically, with the full Button API available (`disabled`, `loading`, `slot`, `size="icon"`). This mirrors the pattern already used by `Panel.Header` and `ButtonGroup`.

  **Breaking:** `ActionBar.Button` is removed. Replace `<ActionBar.Button>…</ActionBar.Button>` with `<Button>…</Button>`. For icon-only actions use `<Button size="icon" aria-label="…">`, which also fixes an accessibility defect where the old wrapper silently dropped `aria-label`, shipping unlabeled icon buttons. The duplicated `actionButton` theme style is gone (it hand-mirrored Button's `ghost` variant at the default size, minus the press and loading affordances a real `<Button>` now brings).

  ```tsx
  // Before
  <ActionBar selectedItemCount={3} onClearSelection={clear}>
    <ActionBar.Button onPress={edit}>
      <Pencil /> Edit
    </ActionBar.Button>
  </ActionBar>

  // After
  <ActionBar selectedItemCount={3} onClearSelection={clear}>
    <Button onPress={edit}>
      <Pencil /> Edit
    </Button>
  </ActionBar>
  ```

### Minor Changes

- c789dee: feat(DST-1381): add `master`/`admin` access variants to `Link` and `MenuItem` that mark actions requiring elevated access rights with an icon (lock = master, key = admin). `Badge` renders its `master`/`admin` variants with the same icons.

  The components render the icon as a decorative `<svg>` colored by the theme's access foreground tokens (which also keeps it visible in forced-colors mode). On `Link` and `MenuItem` the restriction is exposed to assistive technology through a visually hidden "Master"/"Admin" text label rendered after the visible label, so restricted links and menu items carry the access level in their accessible name. `Badge` renders no extra label because its visible text already is the access level, which rules out double announcements by design.

  Note that `variant` is a single axis: an access variant cannot be combined with another variant (e.g. `destructive` on `MenuItem`). For destructive actions that are access-restricted, the access variant takes precedence (`variant="master"`), with the destructive nature conveyed by the action's label and confirmation flow. See the Admin & Master Mark pattern docs.

- 28c4e40: feat(DST-1461): `Accordion` aligns like `Table` inside a bled `Panel`.

  **What changed:**

  - A bled `Panel.Content` / `Panel.CollapsibleContent` now publishes a `--bleed-px` custom property (set to the Panel's `--panel-px`). Non-bled content is unchanged and does not set it.
  - The `default` Accordion `header` and `content` inset themselves by `--bleed-px` (via `--accordion-x-padding`, which falls back to `0px`). So inside a **bled** Panel the item dividers span edge-to-edge while the header/content align with the Panel title.
  - In a bled Panel the full-width header (and its focus ring) is inset off the Panel border by one spacing step, matching `Panel.Collapsible`.

  **Why:**

  Dropping an `<Accordion>` into `<Panel.Content bleed>` now gives full-width item dividers _and_ header/content aligned with the Panel title — the same behavior `Table` already had, with no new Accordion prop or variant.

  **Impact:**

  - Standalone Accordions are unchanged (`--bleed-px` is only set by a bled Panel container, so the inset resolves to `0px`).
  - Accordions inside a **non-bled** `Panel.Content` are also unchanged — the inset stays `0px`, so header/content keep aligning with the dividers as before (no double indent).
  - Only Accordions inside a **bled** Panel gain the inset. The `card` variant is unaffected; it keeps its own `px-4`.

- f1990eb: feat(DST-1551): add `DateRangePicker` component

  New `<DateRangePicker>` lets users enter or select a start–end date range through a single field, mirroring `<DatePicker>`'s API and behaviour. Two date inputs (`start`/`end`) sit in one field group with a calendar button that opens a `<RangeCalendar>` in a popover on desktop and a tray on small screens. Supports per-input paste (ISO/EU/US formats), `granularity` (inline time segments), `visibleDuration` (up to three months), and the usual Marigold field props (`disabled`, `readOnly`, `required`, `error`, `errorMessage`, `description`, `minValue`, `maxValue`, `dateUnavailable`, `width`, `variant`, `size`). Adds a matching `DateRangePicker` theme entry to `theme-rui`.

- d72b30a: feat(DST-765): add `<SegmentedControl>` component

  Adds a new `<SegmentedControl>` for compact, single-select view switching and quick filters. It is built on react-aria's `RadioGroup` / `RadioField` / `RadioButton` with a `SelectionIndicator`, so it is a real form field: `value` / `defaultValue` / `onChange`, the `name` attribute (submits like a radio group), `required`, `error` + `errorMessage`, `description`, `readOnly`, and validation all work exactly like the other Marigold form components (label/description/error route through `<FieldBase>`). The selected segment is marked by an animated indicator that slides between options.

  Options are declared via the compound API `SegmentedControl.Option` (also exported as `SegmentedControlOption`), each with a `value`:

  ```jsx
  <SegmentedControl label="View" defaultValue="list">
    <SegmentedControl.Option value="list">List</SegmentedControl.Option>
    <SegmentedControl.Option value="grid">Grid</SegmentedControl.Option>
  </SegmentedControl>
  ```

  Two variants — `default` (a `bg-control` track with a raised `ui-surface` thumb, mirroring the `Switch`) and `ghost` (track-less, with a translucent ghost-Button-style indicator for dense toolbars) — at a single `default` size (matching the `h-control` Input height). Hover and focus reuse the shared `ui-*` utilities (`ui-state-focus`, `ui-state-hover-ghost`); the indicator slides between options (`ease-out-quint`) and respects `prefers-reduced-motion`.

  To make segments divide the available width equally, use the standard `width` prop — e.g. `width="full"`. There is no separate `fullWidth` prop.

  When the options exceed the available width the control scrolls horizontally instead of compressing the segments, keeping the selected option scrolled into view (reduced-motion aware). A scroll-driven edge fade signals there is more to scroll where supported, falling back to a native scrollbar otherwise.

  `ToggleButtonGroup` now logs a dev-only warning when used with `selectionMode`, steering single-select use cases towards `SegmentedControl` (it remains for independent on/off actions in toolbars).

  [DST-765](https://reservix.atlassian.net/browse/DST-765)

- be0eeb9: style(DST-1586): scale breadcrumb separators with the size variant and emphasize the current page

  The chevron separator now scales with the breadcrumb size (`small`/`default`/
  `large`) instead of rendering at a fixed 16px, so it stays a quiet mark between
  crumbs; gaps tighten on `small` accordingly. The current page reads a tier above
  the trail — medium weight in the `foreground` ink — matching how the sidebar
  marks the active item.

  The `<Breadcrumbs>` chevrons drop their hardcoded `size={16}` prop: the theme's
  `Breadcrumbs` `item` slot now owns the separator size (`[&_svg]:size-*`, which
  wins over the SVG's width/height), so the number in the component was dead and
  misleading. Themes that don't set a separator size fall back to the icon's
  default size.

- 9b613e6: feat(DST-1369): adopt the slot-configuration pattern in `Dialog`, `Drawer`, and `Tray`

  The three overlay components now follow the same slot-configuration pattern as `Panel` and `Card`. Each publishes the slot contexts at its root, so the title, description, and action primitives pick up the overlay's theme classes wherever they are dropped:

  - `Dialog.Title` / `Drawer.Title` / `Tray.Title` are thin wrappers over `<Title slot="title">`.
  - New `Dialog.Description` / `Drawer.Description` / `Tray.Description` wrap `<Description slot="description">`.
  - New `Dialog.Header` / `Drawer.Header` / `Tray.Header` are **optional** layout wrappers that group a title and description. A bare `<Title slot="title">` (or `<*.Title>`) without a header is a first-class, accessible authoring form — `aria-labelledby` resolves to it automatically.

  The compound-component API is unchanged. The `<header>` element that previously wrapped the title is gone; the title now carries the header chrome directly, with no change to the rendered visuals.

- cff8f37: feat(DST-1633): `Dialog` reveals a header seam once its body scrolls.

  **What changed:**

  - The `Dialog` header is borderless at rest and fades in a bottom hairline once the body scrolls beneath it, matching the `Sidebar`'s scroll-revealed seam. A short (non-scrolling) dialog stays seamless.
  - The scroll-seam mechanism is promoted from a private `Sidebar` utility to a reusable `ui-scroll-seam-*` primitive. It is the companion to `ui-scroll-edge` for the case where the header is a grid _sibling_ of the scrolling body rather than its ancestor. The seam color is a `--seam-color` custom property that defaults to `--color-border`.
  - The `Sidebar` is migrated onto the shared primitive with its color pinned to `--color-surface-border`, so it renders exactly as before.

  **Why:**

  A long dialog gave no cue that its body scrolled under the header. The `Sidebar` already had this affordance, and the `Dialog` is the second occurrence of the same header-over-scrolling-body structure, so the mechanism becomes a shared primitive instead of a copy.

  **Impact:**

  - `Dialog` gains the affordance automatically with no API change, covering both `<Dialog.Header>` and bare `<Title>` dialogs.
  - `Sidebar` is unchanged visually.
  - Browsers without CSS scroll-driven animations (for example Firefox) fall back to an always-on hairline, so every engine still shows a divider.

- c20abe3: feat(DST-1282): scroll the Tabs row horizontally when it overflows

  When more tabs are rendered than fit the available width, `Tabs.List` now scrolls
  horizontally instead of wrapping onto multiple lines or pushing the page wide. Tabs
  keep their natural width (`shrink-0`) and snap gently into place (`proximity`) as you
  scroll, with the adjacent tab kept peeking past the edge so the scrollability stays
  discoverable. A vertical mouse wheel scrolls the row horizontally (pointer users
  without a trackpad), without hijacking normal page scroll. Horizontal overscroll is
  contained so it does not trigger browser back/forward gestures, and scrolling is
  smooth for users who allow motion. On browsers that support scroll-driven animations
  the overflowing edges fade out (`ui-scroll-mask-x`); elsewhere it falls back to a
  plain scroll container. When all tabs fit, nothing changes visually.

  The sliding selection indicator stays correct while react-aria scrolls an off-screen
  tab into view (the scroll container is a `layoutScroll` motion element). No runtime
  API change.

  **Breaking change (`@marigold/system`):** the `Tabs` theme `Record` gains a new
  required `tabsListScroll` slot. It is deliberately required so a theme cannot ship
  `tabsList` (whose `w-max` triggers the overflow) without the scroll container that
  makes it behave. Custom themes that define a `Tabs` block must add a `tabsListScroll`
  entry to type-check.

- d72f464: feat(DST-1360): introduce `AppShell`, `Page`, `Page.Header`, and `Page.Content`; remove `AppLayout`

  Renames `AppLayout` to `AppShell` and removes its three pass-through subcomponents (`AppLayout.Sidebar`, `AppLayout.Header`, `AppLayout.Main`) — `<Sidebar>`, `<TopNavigation>`, and `<Page>` now sit directly inside `<AppShell>` (each owns its grid area, so child order does not matter). `AppShell` absorbs `Sidebar.Provider` via the `defaultSidebarOpen` prop; render your own `<Sidebar.Provider>` around `<AppShell>` for controlled state, `variant`, or `size` and it is detected and used instead of the internal one.

  Adds `<Page>` — the `<main>` landmark with page padding (`p`, or `px`/`py`; default `square-relaxed`) and vertical rhythm between sections (`space`; default `group`). The page's `<main>` is named by its `<h1>` via `aria-labelledby`; when there is no `<Title>`, pass `aria-label` (or your own `aria-labelledby`) instead. With none of these, `<Page>` warns in development so the landmark is never silently unnamed. Like `<Panel>`, `<Page>` forwards standard HTML attributes (`id`, `data-*`, event handlers) and a `ref` to its `<main>`.

  Adds `<Page.Header>` — a slot-based title/description/actions header that mirrors `Panel.Header` — and an optional `<Page.Content>` (with its own `space`) for when the rhythm between sections should differ from the header-to-content gap. The page heading outline now falls out of the defaults: `<Title>` in `Page.Header` is an `h1`, `<Title>` in `Panel.Header` an `h2`, `<Title>` in `Panel.Collapsible` an `h3` (override per `<Page>` with `headingLevel`).

  **Migration:**

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
  +      <Description>Manage your plan and invoices.</Description>
  +      <Button variant="primary">Upgrade plan</Button>
  +    </Page.Header>
  +    {content}
  +  </Page>
  +</AppShell>
  ```

- 9fd4000: feat(DST-1439): give `SectionMessage` a neutral surface with a muted variant border

  `SectionMessage` no longer fills its background with a per-variant tint (`bg-info`, `bg-success`, `bg-warning`, `bg-destructive`). It now sits on a neutral `ui-surface` with neutral title and body text. The severity is carried by a muted per-variant colored border (the accent mixed halfway into the neutral border) plus the colored icon.

  This is a visible design change for every variant. Because the surface stays neutral, standard `<Button>` and `<Link>` actions placed inside read correctly instead of floating on a colored fill. On the old tint the default `<Button>` (variant `secondary`, which has its own `ui-surface` fill) rendered as a foreign chip on the colored container for every variant except error. The muted border sits at the container edge, away from the content, so it signals the variant without touching the actions. The border color is set through `ui-surface`'s `--ui-border-color` hook, which is registered as a non-inheriting custom property, so it stays scoped to the container and does not leak into nested action borders.

  Variants stay distinguishable without relying on color alone through the colored border, the distinct icon shape and color, and the title. The bordered, in-flow treatment keeps an inline message visually distinct from the floating, shadowed `<Toast>`. No API changes.

- dd044be: Add relative date presets to `Calendar`, `RangeCalendar`, `DatePicker`, and `DateRangePicker` via a new `presets` prop. On desktop the presets render as a quick-selection list beside the calendar. On small screens the grid renders first with a "Quick selection" row: inline calendars open the preset list in a bottom sheet, while the pickers switch their existing sheet to the list in place. Ships built-in localized presets (`today`, `yesterday`, `tomorrow`, `this-week`, `next-7-days`, `next-30-days`, `last-7-days`, `last-30-days`, `this-month`, `this-quarter`), supports custom presets with value resolvers, and exports `useDatePresets`/`useDateRangePresets` for userland compositions.
- ecd739f: feat(DST-1533): add `Table.Footer` component

  New `<Table.Footer>` renders a semantic `<tfoot>` after `<Table.Body>` for summary rows like totals, counts, or averages, composed from `<Table.Row>` and `<Table.Cell>` just like the body. Supports a `sticky` prop that pins the footer to the bottom of the viewport while scrolling, mirroring sticky table headers. Adds a matching `footer` theme entry to `theme-rui`.

- 51484fd: style(DST-1602): quiet surfaces — one shadow tier, raised caps, tonal panels

  The next iteration of the surface/elevation model: nothing in normal document
  flow casts a shadow anymore.

  - **One shadow tier.** `shadow-elevation-overlay` is the only remaining tier and
    means one thing — a surface floats above the page (Dialog, Drawer, Menu,
    Popover, Toast, ActionBar). `shadow-elevation-border` and
    `shadow-elevation-raised` are **removed**.
  - **Raised caps, not shadows.** Secondary Button and Menu trigger move to the new
    `ui-soft` cap; the cap itself is the lift, no drop shadow.
  - **Flat controls, tonal panels.** Fields become flat wells; Card, Panel, and the
    Accordion card variant separate from the gray page by fill instead of elevation.
  - **Softer structural lines & lighter backdrop.** `--color-border` and the modal
    backdrop are quieted to match the flatter surfaces.

  No component API changes — components using the removed shadow tokens are migrated
  in this release. Consumers referencing `--shadow-elevation-border` or
  `--shadow-elevation-raised` directly should move to `shadow-elevation-overlay` or
  a flat surface.

- 306fe23: feat(DST-1643): add a `fullscreen` size to `Dialog`

  `<Dialog size="fullscreen">` fills the viewport (minus a small margin) at every breakpoint, giving content-heavy picks room for search, filters, and a long scrollable list while the title and actions stay fixed. The existing `xsmall`/`small`/`medium`/`large` sizes are unchanged.

- 106821a: feat(DST-990): enrich `<Menu>` with selection visuals, keyboard shortcuts, and dividers

  `<Menu>` gains richer building blocks for advanced menus:

  - **Selected-item visuals.** In `selectionMode="single"` or `"multiple"`, items show a leading checkmark and a highlighted row, aligned like `<ListBox>`. Command menus (no `selectionMode`) render exactly as before.
  - **Keyboard-shortcut hints** via a new shared `<Keyboard>` primitive (a sibling to `<TextValue>` and `<Description>`). It renders a `<kbd>` key-cap on its own and adapts to its container, so inside a `Menu.Item` it becomes a muted, right-aligned hint wired to react-aria's `aria-describedby`.
  - **Dividers.** Drop the shared `<Divider>` between `<Menu.Item>`s to separate groups with a `role="separator"` line.

  **Breaking (`@marigold/system`):** the `Menu` record in the `Theme` type now requires a `keyboard` key. Custom themes implementing `Menu` must add it to keep compiling. All `@marigold/components` additions are backward compatible.

- be0eeb9: style(DST-1586): quieter sidebar navigation hierarchy and a seamless app shell

  The sidebar navigation now carries hierarchy with semantic tokens instead of raw
  charcoal values. The current page is an inset rounded pill (`selected` fill,
  `foreground` text); idle rows sit a step lighter on `secondary` and preview the
  pill in the `hover` charcoal. Section labels stay on `secondary` so they meet
  WCAG AA contrast and read as their own tier through treatment — uppercase,
  smaller, heavier, tracked — with an even gap opening above every section. The
  drill-in back action shares the nav-row pill geometry, so it aligns to the same
  content column and reads at the same weight as a nav item.

  The navigation is also denser: rows sit at a fixed 30px height with a tighter
  horizontal inset, section labels keep one even rhythm, and the sidebar toggle
  steps down to the small control size with a lighter icon — more rows per screen
  without losing the pill affordance.

  The app shell keeps exactly one structural line: the sidebar divider, now at
  full surface-hairline strength (it bounds the nav column so the branch rows'
  trailing chevrons anchor against it, and it stays perceivable at low vision).
  Every other shell line is gone — the sidebar header/footer hairlines and the
  `TopNavigation` bottom border — so regions separate on whitespace and the
  content panels carry the structure. The sticky `TopNavigation` reveals a bottom
  hairline only once page content scrolls underneath it (`ui-scroll-edge`, a
  scroll-driven progressive enhancement; non-supporting browsers simply stay
  borderless). The mobile sidebar drawer wears the overlay elevation,
  `Sidebar.Separator` steps up to the full-strength surface hairline, and the
  sidebar footer now sits on the same content column as the nav and quiets its
  links (secondary color, normal weight, nav-row pill on hover) so escape hatches
  read as a continuation of the nav rather than competing with it.

  When the nav scrolls, the sidebar's own sticky header and footer reveal a seam
  so mid-list rows never butt against them without a divider. Because the nav is
  a grid sibling between the two (not their ancestor), the seam is driven by a
  named scroll timeline the nav declares, hoisted into scope for the header via
  `timeline-scope` — a set of `ui-sidebar-seam-*` utilities marked non-reusable
  since they are specific to this layout. The header seam fades in as content
  scrolls under it; the footer seam shows while content remains below and fades
  out as the list bottoms out. Without scroll-driven animation support it falls
  back to an always-on hairline.

### Patch Changes

- e9996ef: feat(DST-1635): add a `bleed` prop to `Drawer.Content` so edge-aware children can span the full Drawer width.

  **What changed:**

  - `<Drawer.Content bleed>` drops the Drawer's horizontal content padding and publishes a `--bleed-px` custom property, mirroring `Panel.Content`'s `bleed`.
  - The horizontal padding shared by the sectioned overlay surfaces (`ui-panel-header` / `ui-panel-content` / `ui-panel-actions`) now comes from a single `--ui-panel-px` token, and a bled `Drawer.Content` re-publishes that exact token as `--bleed-px` so the two can't drift.
  - Edge-aware children stay aligned with the Drawer title while their dividers/backgrounds reach the Drawer edges: `Accordion` reads `--bleed-px` directly, and `Table`'s edge-cell padding now falls back to `--bleed-px` (after the Panel-only `--panel-px`), so it aligns inside a bled Drawer too.

  **Why:**

  Placing an `<Accordion>` (or `Table`) inside `<Drawer.Content>` previously trapped it inside the content padding, so item dividers and hover/selection backgrounds could not reach the Drawer edges. `bleed` gives the same full-width alignment `Panel.Content bleed` already offered.

  **Impact:**

  - Default behavior is unchanged: without `bleed`, `Drawer.Content` keeps the padded `ui-panel-content` and `--bleed-px` stays unset (children resolve their inset to `0px`). The `--ui-panel-px` token resolves to the same `24px` the surfaces used before, so Dialog/Drawer/Tray are visually identical.

- 13a1982: feat([DST-1339]): **FileField** gains a `size="small"` compact layout renders as a single-row input-height control (upload button + file list) instead of the full drop-zone, suited for space-constrained forms.
- 586ffd1: refactor(DST-1546): replace the bespoke TagGroup "Remove all" wrapper with a plain `<Button>` via a `ButtonContext` cascade

  `TagGroup` now provides a `link`/`small` `ButtonContext` around its internal
  `RemoveAll` render, so the "Remove all" action is a bare Marigold `<Button>`
  instead of the raw react-aria `Button` with hand-rolled link styling. This
  mirrors the cascade pattern already used by `ActionBar` and `Panel.Header`.

  The change is internal-only. `TagGroupRemoveAll` is not part of the public API
  (`TagGroup` renders it itself), the authoring API (`removeAll` / `onRemove`) is
  unchanged, and there is no behavioral or accessibility change.

  The redundant `removeAll` theme style is removed from `Tag.styles.ts` (the
  `link` variant at `size="small"` reproduces it), and the now-unused `removeAll`
  key is dropped from the `Tag` theme type.

- af7767c: chore(DST-1547): move z-index classes out of theme style files into component implementations

  Per the z-index management rule (`CLAUDE.md`), `z-*` utilities belong in component implementations, never in theme `*.styles.ts` files. The local focus/drop/sticky stacking classes for `Calendar`/`RangeCalendar`, `LegacyTable`, `ListBox`, `Table`, `ToggleButton` and `SegmentedControl` have been moved from their `theme-rui` styles into the matching component `className` (via `cn()`), preserving the exact modifiers and important flag. No visual or stacking change.

- 8418ee7: refactor(DST-1548): rename `Card.Body` to `Card.Content`

  Aligns the Card body sub-component with `Panel.Content` and `Page.Content` so all three container primitives expose the main body region under one name.

  **Breaking change:** `Card.Body` (`CardBody`) is removed. Rename usages to `Card.Content`:

  ```diff
  - <Card.Body>...</Card.Body>
  + <Card.Content>...</Card.Content>
  ```

  The `bleed` prop and padding behavior are unchanged. The internal `data-card-body` attribute has been removed to match `Panel.Content`.

  The `Card` theme slot key is renamed from `body` to `content` in the `@marigold/system` `Theme` type and in `@marigold/theme-rui`. Theme authors overriding this slot must rename their key accordingly.

- f1990eb: fix(DST-1551): round the `RangeCalendar` hover and focus highlight on days outside the selected range

  Days outside the selected range now round their hover and focus highlight to match the selected state, instead of showing a square highlight against the rounded endpoints. In-range cells stay square so the range fill still connects seamlessly.

- ae6644d: fix(DST-1560): align IconButton and Pagination to the control sizing token

  IconButton and Pagination hardcoded `h-9`/`size-9` instead of the `h-control`/`size-control` token that every other `ui-button-base` button uses. The values are identical today (`--spacing-control` = `2.25rem` = `h-9`), so there is no rendered change, but the literals would silently drift if the token were retuned. Also dropped IconButton's redundant `disabled:text-disabled disabled:cursor-not-allowed` classes, which `ui-button-base` already applies via `disabled:ui-state-disabled`.

- e911844: fix(DST-1560): correct the `@source inline` padding safelist to the real spacing tokens

  The padding safelist in `styles.css` still used the pre-rename vocabulary `{compact, tight, regular, relaxed, spacious}`, but the spacing tokens were long ago renamed to `{tight, snug, regular, relaxed, loose}`. As a result `compact`/`spacious` force-generated dead utility classes (resolving to undefined `--spacing-*` vars), while the real `snug`/`loose` tokens were never safelisted and so were unavailable in scanner-excluded stories and in the (unscanned) docs app. The leading family-less line was also stale — it predates the `square`/`squish`/`stretch` split.

  Replaced the three lines with the three inset-padding families (`square`/`squish`/`stretch`) using the real size names, so utility classes like `p-squish-relaxed` resolve to a concrete value and the full inset vocabulary is available where the scanner can't see it.

- f69ba1c: fix(DST-1560): restore the `Toast` close-button hover state

  The Toast close button kept its `transition-[color,box-shadow]` but lost its hover declaration, so it animated nothing on hover. Added `hover:text-foreground` so the icon darkens on hover, consistent with the system-wide convention that color (not background) animates on interactive controls.

- 90d8af7: fix(DST-1560): align Tray content padding and Card radius to the shared surface tokens

  `Tray` content used `p-2` while its own header and actions (and Dialog/Drawer content) follow the `ui-panel-content` rhythm (`px-6 py-4`), leaving the content visually out of step within the same component. Switched it to `ui-panel-content`.

  `Card` hardcoded `rounded-md` while the rest of the raised surface tier (`Panel`, `Accordion`) uses `rounded-surface`. Moved Card to `rounded-surface` in its `base` so every variant (`default`, `master`, `admin`) shares the same 8px corner, making the raised tier consistent.

- 136a4be: fix(DST-1560): use the defined `ui-scrollbar` utility on Drawer and Sidebar

  `Drawer` and `Sidebar` referenced `util-scrollbar`, which is not defined in the theme (only `ui-scrollbar` exists in `ui.css`), so they rendered without the themed scrollbar while Dialog, Tray, and ContextualHelp got it. Corrected both to `ui-scrollbar`.

- 018c055: fix(DST-1565): restore the ToggleButtonGroup divider, fix segment focus, and match Pagination hover

  Three polish fixes on the control surfaces:

  - **ToggleButtonGroup divider.** Segments in a group had a transparent right border, so no line separated them. The divider is restored with the opaque `border` token (the structural-line token, opaque on purpose so it never doubles up), removed on the last segment.
  - **ToggleButtonGroup focus (DST-1597).** The group was `overflow-hidden`, which clipped the focus outline of a full-height segment so it was hard to tell which segment was focused. The group no longer clips. The end segments round their own outer corners to match the frame, so the standard focus outline now renders unclipped around any segment.
  - **Pagination hover.** Unselected page numbers now pick up the same translucent ghost hover as the prev/next arrows. The selected page keeps its control fill and is left untouched.

- 018c055: refa(DST-1565): unify surfaces and controls on one boundary and elevation model

  `theme-rui` drew edges two different ways with no rule for which to use: a `background-clip` gradient border on surfaces, and an opaque `border` on controls. Both are replaced with a single model built on two independent axes.

  - The **boundary encodes role**. Both roles compose one role-neutral primitive, `ui-frame` (a fill, a 1px ring, and a radius). `ui-surface` and `ui-control` are siblings of it that differ only in the boundary token, so a control is never modeled as "a kind of surface". Surfaces (Card, Panel, Dialog, Menu) wear `ui-surface`, a quiet translucent hairline. Controls (Input, Select, fields, the neutral Button family, SegmentedControl) wear `ui-control`, the same charcoal stroke about 2.5× denser, reading as something to operate. Both are translucent, so the edge composites over its ground and stays consistent on white, the page background, or a tinted panel.
  - **Elevation encodes depth**, independently. Now that the ring owns the crisp edge, the three `shadow-elevation-*` tiers carry only lift, and controls sit on the lowest tier.

  Mechanics:

  - The surface boundary is a 1px Tailwind `ring` in the `box-shadow` chain, replacing the `1px solid transparent` plus `border-box` gradient that hijacked `background` and got covered by edge-to-edge children. `ui-state-error` swaps `--ui-border-color`, and the theming contract is unchanged.
  - New `--color-surface-border` (decorative surface rim) and `--color-control-border` (functional control edge). `--color-border` narrows to structural lines (dividers, grid lines, table rules) and stays opaque, because crossing translucent strokes double-darken at their intersections.
  - `ui-contrast` (primary Button, ActionBar) uses the same model inverted: a crisp dark ring plus light on the face (top glow, top-down gradient, top-edge highlight), all derived from `--ui-background-color`. `ui-contrast-destructive` is that recipe retinted red.
  - Elevation shadows retuned: the contact layer is cut and spread across lighter, warm-tinted, contained layers so dense fields stay calm.
  - The `Popover` owns the overlay surface. ListBox, Calendar, Menu, and Dialog render flat inside it and keep their own surface only when standalone.

  No breaking changes: visual refinement plus additive tokens.

- 0e4b915: refactor(DST-1585): drive SegmentedControl's reduced-motion scroll from CSS

  SegmentedControl now gates its selection-reveal scroll animation with the same
  CSS approach as Tabs: the scroll container carries `motion-safe:scroll-smooth`
  and the component's `scrollTo` uses `behavior: 'auto'`, which follows that CSS —
  animating when motion is allowed and jumping instantly under reduced motion.
  This replaces the previous JS `window.matchMedia('(prefers-reduced-motion)')`
  check. Behavior is unchanged; the initial mount reveal stays instant. No API
  change.

- 66a22e8: fix(DST-1628): apply the disabled state to the `Slider` track, fill, thumb, and value, dim the description text of disabled `SelectList`, `ListBox`, and `Menu` items, and show the not-allowed cursor on disabled items. The Slider slots drove their disabled styles off the bare `disabled:` variant on plain `<div>`s, where it never matches, so they now key off `group-disabled/field:`. The item description slots hardcoded `text-secondary`, which overrode the inherited disabled color, so they now add `group-disabled/option:text-disabled`. Disabled `SelectList` and `ListBox` items still showed the pointer cursor because the interactive `data-selection-mode:cursor-pointer` utility outranked `disabled:cursor-not-allowed` on source order, so the selectable cursor is now gated behind `not-disabled:`. `Menu` gained the `disabled:cursor-not-allowed` it was missing.
- 40b006e: fix(DST-1630): match the Panel collapsible header caret to the Accordion chevron. It rendered at the default 24px in the foreground color, while Accordion uses a 16px `text-secondary` caret, so the two collapsible patterns looked inconsistent. The Panel caret now renders at 16px and its color is driven by a new themeable `collapsibleIcon` slot (defaulting to `text-secondary` in the RUI theme).
- f817023: fix(DST-1631): keep the `RangeCalendar` within its container on small screens. Each month carried a hard `min-w-[250px]` with no breakpoint guard, so below `sm` (where the months stack) the calendar could not shrink and overflowed a narrow Panel. The floor is now gated to `sm` and up (`min-w-0 sm:min-w-[250px]`), letting the flexible-cell grid shrink to fit while the desktop two-across layout is unchanged.
- 5d0b6c0: fix(DST-1632): center the section `Loader` together with its label and give the `Table` drag handle edge spacing.

  The section `Loader` sized its container to a fixed square, so a labelled loader overflowed the box and the section wrapper centered the box instead of the spinner-and-label group. The spinner now carries the fixed size and the container is content-sized, so the whole group centers as one. The `Table` drag cell had no padding, leaving the grip flush against the row edge. It now uses the shared cell edge padding and its column matches the checkbox column width, so the grip lines up with its header and the first cell.

- e5701c4: feat(DST-1634): standardize `Input` trailing-action alignment and make `size="icon"` a public `Button` API.

  The `Input` leading icon is clamped to 16px so it no longer overlaps the placeholder. Every trailing action (clear button, chevron, loading spinner, or a custom icon button) now sits in a control-sized centered box flush to the edge, so its icon aligns at the same inset as the leading icon across `Input`, `SearchField`, `ComboBox`, `Autocomplete`, `TagField`, and `DatePicker`. `Button`'s `size="icon"` is now public and documented as the way to build an icon button, composing with any `variant` (for example `variant="ghost" size="icon"`).

  Migration: `variant="icon"` was never a real Button variant. It silently rendered a default button, so any usage from older docs should switch to `size="icon"` (with a variant, for example `variant="ghost" size="icon"`).

- a34b353: fix(DST-1636): simplify the Accordion `icon` slot to `pointer-events-none text-secondary`, matching Panel's `collapsibleIcon`. Drops the redundant `shrink-0` (already baked into `MorphCaret`) and the obsolete `transition-transform duration-250` (the caret morphs its path `d` rather than rotating). No visual change.
- 766a46b: feat(DST-1370): migrate `ContextualHelp`, `SectionMessage`, and `EmptyState` to the slot-configuration pattern

  - `SectionMessage.Title` now renders a semantic heading (`<h3>` by default) instead of a `<div>`, fixing an a11y gap. The level is configurable via the new `headingLevel` prop on `<SectionMessage>`. When a title is present, the container becomes a `role="group"` labelled by the title via `aria-labelledby`.
  - New `<SectionMessage.Description>` sub-component for a short summary between title and content.
  - `ContextualHelp.Title` now uses `slot="title"`, so the popover dialog gets a proper `aria-labelledby`. The title tag changes from `<h3>` to `<h2>` (same as `Dialog.Title`); visual appearance is unchanged.
  - New `<ContextualHelp.Description>` sub-component.
  - The `Theme` type now requires a `description` key on the `SectionMessage` and `ContextualHelp` style records; themes defining styles for these components must add it.
  - `EmptyState`'s `title` now renders as a semantic heading (`<h3>` by default, configurable via the new `headingLevel` prop), and its `description` renders through the `<Description>` primitive (same DOM as before, now sitting 4px below the title to match the description rhythm of the other components). The flat-props API is unchanged.
  - All three roots now also publish a `ButtonContext`, completing the slot-configuration set. It scopes action buttons (e.g. those placed in `SectionMessage.Content`, the `EmptyState` `action`, or `ContextualHelp` content) to a clean baseline so they never inherit a surrounding container's button cascade (such as a `Panel.Header`'s ghost/small look). No variant or positioning is imposed, so existing usage renders unchanged.

- 4d44517: fix: make Select and Menu overlay appear above Drawer on small screens

  On small screens, `Select` and `Menu` render their options in a `Tray` (bottom sheet). The `Tray` overlay had `z-40` in the theme while the `Drawer` overlay uses `z-50`, so the tray rendered behind an open drawer and was unreachable.

  Moved the `z-index` from the theme style file into the `TrayModal` component implementation (matching the project's z-index architecture rule), and raised it to `z-50`. Both the `Drawer` and `Tray` portal to `document.body`; at equal z-index, DOM order determines stacking. The `Tray` is always mounted after the `Drawer`, so it correctly appears on top.

- Updated dependencies [c789dee]
- Updated dependencies [28c4e40]
- Updated dependencies [9918172]
- Updated dependencies [f1990eb]
- Updated dependencies [d72b30a]
- Updated dependencies [be0eeb9]
- Updated dependencies [9b613e6]
- Updated dependencies [e9996ef]
- Updated dependencies [0b7f87f]
- Updated dependencies [c20abe3]
- Updated dependencies [13a1982]
- Updated dependencies [d72f464]
- Updated dependencies [9fd4000]
- Updated dependencies [f715905]
- Updated dependencies [0637671]
- Updated dependencies [e686474]
- Updated dependencies [c799448]
- Updated dependencies [dd044be]
- Updated dependencies [50d8339]
- Updated dependencies [ecd739f]
- Updated dependencies [2fc7b96]
- Updated dependencies [586ffd1]
- Updated dependencies [af7767c]
- Updated dependencies [8418ee7]
- Updated dependencies [fc8ca13]
- Updated dependencies [508ec2c]
- Updated dependencies [2a275bb]
- Updated dependencies [018c055]
- Updated dependencies [c30f224]
- Updated dependencies [0e4b915]
- Updated dependencies [51484fd]
- Updated dependencies [b6666b4]
- Updated dependencies [7605d46]
- Updated dependencies [40b006e]
- Updated dependencies [5d0b6c0]
- Updated dependencies [e5701c4]
- Updated dependencies [306fe23]
- Updated dependencies [199e066]
- Updated dependencies [106821a]
- Updated dependencies [3231866]
- Updated dependencies [40e6b21]
- Updated dependencies [867f3cc]
- Updated dependencies [b954ab2]
- Updated dependencies [2b3e286]
- Updated dependencies [d0bb11c]
- Updated dependencies [b41a3e3]
- Updated dependencies [be0eeb9]
- Updated dependencies [ccd3bb3]
- Updated dependencies [766a46b]
- Updated dependencies [0e3971a]
- Updated dependencies [4d44517]
  - @marigold/components@18.0.0-beta.4
  - @marigold/system@18.0.0-beta.4

## 6.0.0-beta.3

### Minor Changes

- 141a2cc: feat(DST-1373): adopt the slot-configuration pattern in `Card`

  `Card.Header` is now a slot provider: drop a `<Title>` and an optional `<Description>` directly inside it and the header wires up the heading level, id, accessible name, and theme classes automatically. A bare `<Title>` placed directly inside `<Card>` (no `Card.Header` wrapper) is also picked up by the root, so title-only cards can skip the header and still get the right padding and `aria-labelledby` wiring. `<Card>` itself now renders an `<article>` landmark and is automatically labelled by its `<Title>` via `aria-labelledby`, or by an explicit `aria-label`. A new `headingLevel` prop (default `3`) controls the underlying heading tag for the document outline.

  The theme `Card` slot map gains `title` and `description` entries — the typography previously carried on the `header` slot has moved to `title`. Variant text color now flows through a new `--card-accent` CSS custom property, so `master` and `admin` cards pick up the matching accent automatically. Raw `<Stack>` / `<Headline>` composition inside `Card.Header` still renders but does not pick up the slot wiring; prefer `<Title>` / `<Description>` going forward.

- bd45aee: feat(DST-876): add Card usage guidelines

  Renames the `Card.Preview` slot to `Card.Media` across components, theme, and docs. This is a breaking change: consumers using `<Card.Preview>`, the `data-card-preview` selector, or the `preview` theme slot key must migrate to `Card.Media`, `data-card-media`, and the `media` slot key respectively.

  Adds a "Usage" section to the Card docs covering when to use cards, media slot guidance.

- 263c5e6: feat(DST-1238): align Dialog with the shared `ui-panel-*` pattern

  Dialog now adopts the `ui-panel-content` and `ui-panel-actions` utilities already used by Drawer, Tray, and Sidebar. Visible changes are scoped to Dialog:
  - Actions gain a `border-t` divider as the interaction-zone marker
  - Content gains consistent `py-4` vertical padding (was `py-1`)
  - Actions padding becomes symmetric `py-4` (was `pt-4 pb-6`)
  - Responsive button stacking (`flex-col-reverse sm:flex-row`) remains Dialog-specific identity

  Dialog's header keeps its original treatment (`px-6 pt-6`, no border). It's a conversational opener that sits close to the message body, not a section divider above scrollable content — the ticket's "maintain unique identity where functionally necessary" guidance applies.

  New `ui-panel-content` utility (`overflow-y-auto outline-none px-6 py-4`) added; adopted by Dialog and Drawer. Tray retains its compact `p-2` content padding and Sidebar retains its tighter `px-3 py-1` nav padding because those areas have intentionally tighter densities.

  The `ui-panel-*` utilities are now documented with an inline docstring in `ui.css` clarifying they're for modal-style panels (Dialog/Drawer/Tray/Sidebar) and distinct from the `Panel` component.

  Drawer, Tray, and Sidebar have no visual change — Drawer migrates inline padding/scroll classes to the new `ui-panel-content` utility (identical CSS output); Tray and Sidebar style files are untouched.

  [DST-1238](https://reservix.atlassian.net/browse/DST-1238)

- 4d20fb6: feat(DST-1483): remove ActionButton in favor of a slot-aware Button (rename ActionGroup → ButtonGroup)

  The beta-only `<ActionButton>` is removed. `<Button>` is now slot-aware: it adapts
  automatically inside a button container, so you write `<Button>` everywhere instead
  of learning a second button component.
  - `<ActionButton>` is removed. Use `<Button>`; it adapts inside `<ButtonGroup>` and
    `<Panel.Header>`. Opt a button out of the cascade with `slot={null}`.
  - `<ActionGroup>` is renamed to `<ButtonGroup>`, mirroring the existing
    `ToggleButtonGroup → ToggleButtonContext → ToggleButton` trio.
  - A single Marigold-owned `ButtonContext` drives the cascade (replaces
    `ActionButtonContext` + `ActionGroupContext`). RAC's own `ButtonContext`
    (`close`/`increment`/`decrement` slots) is untouched.
  - **Uniform precedence:** a local prop (`variant`, `size`, `disabled`) always wins
    over the container. This drops the former `ActionGroup` `size`-group-wins outlier.
  - `<ButtonGroup>` cascades `variant: 'secondary'` when unset, the same baseline
    as a standalone `<Button>`. Slot-aware parents override it where they want
    lower emphasis: `<Panel.Header>` cascades `variant: 'ghost'` + `size: 'small'`,
    so a labelled header action stays readable. An icon-only action (a bare-icon
    `<Button>`, an `<ActionMenu>` kebab) sets `size="icon"` to render as a square.
  - `<ButtonGroup>` now owns a structural `flex gap-1` layout (orientation-aware), so
    a standalone cluster is spaced correctly — `<ActionGroup>` had no layout of its
    own. A container's positional className (e.g. Panel's `[grid-area:actions]`) still
    rides along and positions the group.
  - Overlays (`Popover`, `Modal`, `Tray`, `Drawer`) reset `ButtonContext` at their
    content root, so a header/group cascade can't leak through the portal into an
    overlay's `slot="close"` or `Dialog.Actions` buttons.
  - `<SelectList.Option>` cascades `variant: 'ghost'` to a nested `<Button>`,
    `<LinkButton>`, or `<ActionMenu>`, so a trailing in-row action reads as
    low-emphasis chrome without an explicit `variant`.

  **Migration**
  - `<ActionButton>` → `<Button>` (its `default` variant maps to `variant="ghost"`).
  - `<ActionGroup>` → `<ButtonGroup>`.
  - `ActionButtonContext` / `ActionGroupContext` → `ButtonContext`.
  - `<ActionMenu>` keeps its public name. Its trigger is now a slot-aware `<Button>`
    that inherits the cascade instead of hardcoding a variant: it renders `secondary`
    on its own (the standalone `<Button>` baseline, matching the pre-unification look)
    and `ghost` inside `<Panel.Header>`, `<SelectList.Option>`, or a `<ButtonGroup>`.
    A `variant` set on the `<ActionMenu>` still wins.

### Patch Changes

- 16bcb56: feat([DST-1395]): **SelectList** horizontal layouts now automatically flip to a vertical stack when the wrapping container is narrower than `40rem` (~640px).
- 0760ecc: refactor(DST-1374): use `<TextValue>` and `<Description>` for selection-container items

  Consumer-facing JSX in component stories and documentation demos for `<Select>`, `<SelectList>`, `<ListBox>`, `<Menu>`, `<ComboBox>`, and `<Autocomplete>` now composes item content with the `<TextValue>` and `<Description>` primitives instead of hand-written `<Text slot="label">` / `<Text slot="description">`. The primitives are drop-in replacements that render the same RAC `<Text>` with the same default slot values, so rendering, `aria-describedby` wiring, and accessibility are identical.

  `<Menu.Item>` gains first-class `label` and `description` theme slots, mirroring `<SelectList.Option>`. `MenuItem` merges the Marigold theme classNames into RAC's `TextContext` so nested `<TextValue>` / `<Description>` pick up Menu styling without losing RAC's slot wiring. Menu items adopt a two-column grid layout (icon column + content column) so descriptions render below labels; existing plain-text and icon+text menu items are unaffected.

  The `Menu` theme type in `@marigold/system` is extended with required `label` and `description` slot keys. Consumers maintaining a custom theme that overrides `Menu` will need to add these two slots to satisfy the type. `@marigold/theme-rui` is updated accordingly in this release.

  No public API change on `Select.Option`, `SelectList.Option`, `ListBox.Item`, `Menu.Item`, `ComboBox.Option`, or `Autocomplete.Option`.

- 6430567: fix(DST-1436): drop `background` from hover transitions across `ui-surface`, `ui-surface-contrast`, `Button`, `Tabs`, `Table` (row + edit buttons), `LegacyTable`, `Sidebar` (navLink + backButton), `Calendar` cells, `SelectList`, and `ActionBar.clearButton`. Hover background flips now happen instantly, making high-frequency controls feel snappier and aligning Button variants (primary/secondary previously transitioned the background while ghost/destructive were already instant). Color, border, box-shadow, and transform transitions are preserved.
- 334688e: chore(DST-1364): migrate `ListBox` item label/description styling off descendant selectors

  `ListBox` now exposes `label` and `description` as first-class theme entries, and `ListBox.Item` injects their classNames into react-aria's `TextContext` (merging rather than replacing, so RAC's `aria-describedby` wiring is preserved) instead of styling `[slot=description]` via a descendant selector on `item`. This also benefits `Select.Option`, `ComboBox.Option`, and `Autocomplete.Option`, which re-export `ListBox.Item`.

  The `Theme` type in `@marigold/system` now requires `label` and `description` keys on the `ListBox` record, so custom themes implementing `ListBox` must add these entries. No public API change in `@marigold/components`; visually identical except `description` now explicitly sets `font-normal` (parity with `SelectList`).

- Updated dependencies [5945653]
- Updated dependencies [141a2cc]
- Updated dependencies [bd45aee]
- Updated dependencies [16bcb56]
- Updated dependencies [75cab86]
- Updated dependencies [0760ecc]
- Updated dependencies [14f1324]
- Updated dependencies [431d4dd]
- Updated dependencies [141a2cc]
- Updated dependencies [4d20fb6]
- Updated dependencies [fc9ffb1]
- Updated dependencies [334688e]
- Updated dependencies [334688e]
- Updated dependencies [9cdb389]
  - @marigold/components@18.0.0-beta.3
  - @marigold/system@18.0.0-beta.3

## 6.0.0-beta.2

### Minor Changes

- 9a407ef: feat([DST-753]): `SectionMessage` exposes an `announce` prop and uses react-aria's `LiveAnnouncer` to notify assistive technology.

  **What changed (DST-753):**
  - `<SectionMessage>` accepts a new `announce?: boolean` prop. When set, the message text is sent to a shared, always-mounted live region maintained by `@react-aria/live-announcer`. Priority is `polite` for `info` / `success` / `warning` and `assertive` for `error`.
  - `announce` defaults to `true` for `variant="error"` and `false` for all other variants, preserving today's behavior for the common error case while letting consumers opt in for confirmations and informational updates.
  - The wrapper element no longer carries `role="alert"` for the error variant. Announcements are now delegated to the singleton live announcer instead.
  - Re-announcing the same message uses the React `key` pattern: pass a changing `key` to force a remount.

  **Why:**

  The previous implementation only announced the `error` variant, and it did so by adding `role="alert"` to a conditionally rendered element. Per the WAI-ARIA spec and MDN guidance, `role="alert"` should be on an element that already exists in the DOM before its content is injected, and it should not contain interactive elements. Marigold's `SectionMessage` violated both constraints (the alert was mounted together with its content, and it can contain close buttons and action links), making announcements unreliable on some screen reader / browser combinations.

  The new implementation uses `@react-aria/live-announcer`, which maintains persistent polite and assertive live regions at the document root. This is the same mechanism used across React Spectrum and avoids the conditional-rendering and interactive-content pitfalls of inline `role="alert"`. It also unifies the API: opt in to announcement for any variant with a single prop.

  **Additional cleanup bundled with this release (beyond DST-753):**
  - **Close button now matches the rest of the system.** The previous theme defined a `close` slot for `SectionMessage` with bespoke overrides (`size-8`, `[&_svg]:size-6`, `text-foreground`, negative margins) that produced a visibly larger close button than every other close button in the design system. The component now renders the shared `<CloseButton>` with no overrides, so it gets the same 16px icon, focus ring, hover-opacity, and rounded-full styling as Dialog, Drawer, etc. The `close` slot has been removed from the `SectionMessage` theme type.
  - **Component cleanup.** Dropped a stale `useButton(props, buttonRef)` call that was applying div-level props to a button, the unused `buttonRef`, and the `{...buttonProps}` spread on `<CloseButton>`. The `Button` inside `CloseButton` already provides all keyboard/press semantics.
  - **Theme variant order normalized.** `info` (the default) is now listed first across the `container`, `content`, and `icon` slots in `theme-rui`, matching the variant table in the docs and the existing `defaultVariants` setting.

  **Docs:**
  - New anatomy SVG matching the Card / Sidebar / SelectList style; title and close button marked as optional, with content rules (no period in title, don't repeat title in body).
  - Two realistic announcement demos: a bulk-archive form (polite, with RAC `validate` and the `key` re-announce pattern) and a server-availability save error (assertive).
  - Added focus-management guidance for dynamic appearance and post-dismiss.
  - Added form-summary placement rule pairing `<SectionMessage>` with field-level validation.
  - Added action constraints (one primary action, verb+noun labels, descriptive link text).
  - Added two-line body rule with a link-out overflow pattern for longer content.
  - Folded the previous Position subsection into Usage; removed redundant Do/Don't tiles; renamed subsections to Dismissal / Actions / Announcements.
  - Drive-by: typo fix in the `feedback-messages` pattern doc.

  **Migration:**
  - Code relying on `getByRole('alert')` or `[role="alert"]` selectors to find rendered `SectionMessage` error nodes needs to be updated. The message text itself is still rendered as before; only the wrapper role is gone.
  - Consumers who previously wrapped a dynamic `<SectionMessage>` in their own `<div role="status">` or `<div aria-live="polite">` can replace that wrapper with `<SectionMessage announce>`.
  - Custom themes that defined a `SectionMessage.close` slot will now see a type error. Remove the slot. Close button styling now flows entirely from the `CloseButton` theme.
  - The SectionMessage's close button is visually smaller after this release (matches every other close button in Marigold). If you previously relied on the larger size, that was an inconsistency, not a feature.

### Patch Changes

- Updated dependencies [3a62175]
- Updated dependencies [2a34a64]
- Updated dependencies [61f917f]
- Updated dependencies [d51416c]
- Updated dependencies [a59d2dd]
- Updated dependencies [9a407ef]
  - @marigold/components@18.0.0-beta.2
  - @marigold/system@18.0.0-beta.2

## 6.0.0-beta.1

### Minor Changes

- 727163c: feat([DST-1134]): add `<RangeCalendar>` component (alpha)

  Adds a new `<RangeCalendar>` for selecting a contiguous or non-contiguous date range, built on react-aria's `<RangeCalendar>` with Marigold conventions (`disabled`, `readOnly`, `error`, `dateUnavailable`, `allowsNonContiguousRanges`). Supports up to three side-by-side months via `visibleDuration`, stacking vertically below the `sm` breakpoint; the same responsive stacking now applies to multi-month `<Calendar>` for parity. `description` and `errorMessage` route through `<FieldBase>` so the help/error UI matches the rest of the form-component family (TriangleAlert icon + HelpText container). Ships as an alpha component with a stub docs page under the form section.

  [DST-1134](https://reservix.atlassian.net/browse/DST-1134)

- cc568e3: feat([DST-1429]): `Card` now exposes a `Panel`-aligned padding API.

  **What changed:**
  - `Card` accepts `p` / `px` / `py` props (mutually exclusive `p` vs `px+py`), resolving to CSS custom properties `--card-px` and `--card-py` on the container. Defaults to `square-regular`.
  - A new `space` prop controls the gap between slots, resolving to `--card-gap`. Defaults to `regular`.
  - `Card.Body` and `Card.Footer` accept an opt-in `bleed` prop to skip horizontal padding for tables, media, or full-width action bars.
  - Internally, `Card` switched from CSS grid with `grid-template-areas` to a flex column with `gap-y`. JSX order now determines visual order — place `Card.Preview` first when used.
  - Slot theme styles (`header`, `body`, `footer`) no longer hardcode `px-4` / `py-*`; padding lives in the component layer and is driven by the CSS variables above.
  - `Card.Preview` automatically escapes the container's vertical padding when used as the first or last child via negative margins.

  **Why:**

  Cards previously had no consumer-controllable padding API and no default padding on the container — content rendered as direct children of `<Card>` was visually broken. The new API mirrors `Panel`'s padding model so the two surfaces behave consistently.

  **Migration:**
  - Wrap bare children in `<Card.Body>`. Bare children inside `<Card>` are no longer rendered with horizontal padding; this matches `Panel`'s composition contract.
  - If you used `Card.Preview` for media at the top, keep doing so — it stays edge-to-edge.
  - No changes needed for the canonical composition (`Preview` + `Header` + `Body` + `Footer`).

- 496a9f2: feat(SelectList): standardized API, item layout, and visual distinction from ListBox (DST-1076)

  `<SelectList>` has been refined into a first-class form field for picking one or many items from a visible list of rich two-line rows. This release contains breaking renames and a tightened type surface.

  **Breaking changes**
  - `SelectList.Item` → **`SelectList.Option`**. The option semantic matches `Select.Option` and the HTML `<option>` mental model. Update any `<SelectList.Item>` usage to `<SelectList.Option>`.
  - `SelectList.Action` has been **removed**. Drop your `<ActionMenu>` or `<IconButton>` directly inside `<SelectList.Option>` — the component positions, sizes, and styles the nested control automatically via `ButtonContext`. Limit: one action per option (multi-button groups will arrive with a future `ActionGroup`).
  - Leading-image slot has been **removed**. Compose images inside `<Text slot="label">` (or anywhere in children) as you see fit.
  - `selectionMode="none"` is no longer accepted. `SelectList` is a form field; the default is now `"single"`.
  - `onChange` is strictly typed per `selectionMode`: `(key: Key | null) => void` for single, `(keys: Key[]) => void` for multiple. The shape matches `Select<T, M>`. Passing `setState` directly may require adapting the callback.

  **Other changes**
  - **Selection indicator** — single-select rows render a visible radio circle; multi-select renders a checkbox.
  - **Label & description slots** — use `<Text slot="label">` and `<Text slot="description">` inside `<SelectList.Option>`. The row skeleton is `selection · label + description · action (optional)`.
  - **Dev-mode warning** when `textValue` is missing on an option whose children aren't a plain string.
  - **Own theme entry** — `SelectList` ships a dedicated theme component. The theme exposes first-class `label`, `description`, and `action` entries; slot styling no longer uses descendant selectors. Consumers with custom themes must add or update a `SelectList` entry.

  **Documentation**

  The SelectList docs page is rewritten around the new API. Adds an anatomy diagram, a decision table for choosing between `<SelectList>` and lighter controls (`<Radio.Group>`, `<Checkbox.Group>`, `<Select>`, `<Combobox>`, `<TagField>`), and dedicated sections for multi-selection, per-row actions (decision-help and configuration patterns), horizontal orientation, and empty state. Replaces selected prose with Do/Don't tiles. Tightens the accessibility section to what's specific to SelectList (keyboard model, label requirement, `textValue` for rich rows).

  **Migration**

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
  +     Free
  +     <IconButton aria-label="Info"><Info /></IconButton>
  +   </SelectList.Option>
  + </SelectList>
  ```

### Patch Changes

- 566c468: fix([DST-1295]): replace `gap` between `CheckboxGroup` and `RadioGroup` items with per-item padding so the full space between items is clickable. Vertical items now meet the 24px target-size minimum; horizontal spacing keeps visual parity. Standalone `Checkbox` is unaffected.

  Also align the label and icon: switched the inner row layout from `items-center` to `items-start` so the icon stays on the first line when the label wraps. `Radio` labels now use `leading-4` to match `Checkbox`, and `Radio`'s icon-to-label gap moves from an inline `gap-[1ch]` to the theme-driven `gap-x-2` for parity with `Checkbox`.

- 2014edf: fix(DST-1406): restore focus outline on virtualized ListBox items. RAC's virtualizer wrapper sets an inline `z-index: 0` per item, creating a stacking context the option's `focus-visible:z-1` cannot escape — adjacent wrappers paint on top in DOM order and clip the focused outline (most visible when the next item is `selected`). Lift the wrapper containing the focused option above its siblings so the outline is fully visible. Affects all virtualized listboxes (`Select`, `ComboBox`, `Autocomplete`).
- f8fbef9: fix([DST-1412]): fix multi-month Calendar/RangeCalendar layout at non-default widths. With three months at `width="1/2"` the third month overflowed the calendar wrapper because `min-w-[250px]` only sized for a single month; with `width="full"` the date grids stayed at content size while their columns expanded, leaving header text floating over empty space. Switch the calendar minimum to `min-w-fit` so multi-month grows to fit its natural content, and add `w-full` to `calendarGrid` so the date table fills its column.

  [DST-1412](https://reservix.atlassian.net/browse/DST-1412)

- 4742e8e: feat([DST-901]): styleProps for `width`, `maxWidth`, `height`, `space`, `spaceX`, `spaceY`, `pr`, `pl`, `pt`, `pb` now accept both numeric scale values (`4`) and their string equivalents (`"4"`). The public types are now declarative (`Scale | Fraction | WidthKeyword`, etc.) instead of being derived from the internal class-name maps.

  Components that previously resolved `width`, `maxWidth`, and `height` via class-name lookup (Form, Calendar, legacy Table column header / select-all cell, Slider, Scrollable, Switch, Grid) now resolve them through CSS custom properties (`createWidthVar` / `createHeightVar`) targeting `--width`, `--max-width`, `--height`. Those variables — along with `--container-width` and `--field-width` already used by `FieldBase` — are registered as non-inheriting (`@property … inherits: false`) in the RUI theme so they cannot leak into descendants.

  `createWidthVar` gained support for the previously missing keywords (`svh`, `lvh`, `dvh`, `px`, `container`), and a new `createHeightVar` helper was added. Both share a common factory and a base keyword set, so they remain trivially in sync.

  The runtime class-name maps `width`, `maxWidth`, `height`, `gapSpace`, `paddingSpace`, `paddingSpaceX`, `paddingSpaceY`, `paddingRight`, `paddingLeft`, `paddingTop`, `paddingBottom` are no longer exported from `@marigold/system`. These were internal utilities consumed only by `@marigold/components`. Use the prop types (`WidthProp`, `HeightProp`, …) and the CSS-var helpers (`createWidthVar`, `createHeightVar`, `createSpacingVar`) instead. The corresponding TypeScript prop types are unchanged.

- 5f2e9a0: fix([DST-1408]): drop `position: relative` from body in theme-rui preflight

  `themes/theme-rui/src/preflight.css` previously set
  `body { position: relative; overflow-x: clip }` to contain
  `@react-aria/live-announcer`'s portal. Empirically that containment
  isn't needed: the live-announcer node is a 1×1 px element with
  `overflow: hidden` and `clip-path: inset(50%)`, so its content cannot
  expand the document's scrollable area in any state — a synthetic
  test toggling `body.position` between `relative` and `static` with
  the announcer mounted produces identical `body.scrollWidth/scrollHeight`.

  Meanwhile, `position: relative` on `<body>` makes it the containing
  block for absolute portals (Tooltip, Popover, Menu, Select dropdown).
  React-aria's `useOverlayPosition` then takes a special-case branch
  that adds the page's scroll offset on top of itself when computing
  "available space above the trigger", producing a near-zero number
  even when the viewport has hundreds of pixels of headroom. Every
  overlay with a `top` placement (notably `<Tooltip>`) flips to
  `bottom`, and forcing `placement="top"` positions the overlay far
  off-screen because the same math is broken in both directions.

  Removing `position: relative` while keeping `overflow-x: clip`
  restores correct overlay placement without losing the defensive
  horizontal-scroll guard. `clip` does not establish a containing
  block for absolute descendants (per CSS Overflow Module Level 3), so
  the bug cannot reappear from this rule alone — but the file's
  comment now warns that `position`, `transform`, `contain`,
  `filter`, `backdrop-filter`, or `will-change: transform` on `<body>`
  would re-introduce it.

- 2d9d6fd: feat(DST-1366): introduce slot-configurable primitives

  Adds three text-bearing role primitives — `Title`, `Description`, `TextValue` — and three action primitives — `ActionButton`, `ActionGroup`, `ActionMenu` — that participate in slot-keyed context. Text/heading slots use React Aria's `HeadingContext` / `TextContext` directly; action slots use Marigold-owned contexts (`ActionButtonContext`, `ActionGroupContext`, `ActionMenuContext`) consumed via `useContextProps`.

  `Title` wraps RAC's `<Heading>` with `slot="title"` and `level={2}` as defaults, both overridable by `HeadingContext`. The `level` precedence is default ← context ← local, so a container can publish `{ level: 4 }` and drive a stretch of nested `<Title>`s to `<h4>` without each call site setting it. `Description` and `TextValue` forward straight to RAC's `<Text>` with `slot="description"` and `slot="label"` defaults respectively, letting `<Text>` consume `TextContext` on its own. None of the three carry typography props. Styling cascades from the surrounding container (or selection item) via `HeadingContext` / `TextContext`. Consumers drop these into containers without any `slot` wiring. The container provides level, layout (e.g. a grid area), size, variant, color, and any other styling through a single `Provider`.

  `ActionGroup` is its own top-level component (own folder, own docs page, own Storybook entry) — there is no `ActionButton.Group` compound. It cascades `size`, `variant`, and `disabled` to nested `<ActionButton>`, `<LinkButton>`, and `<ActionMenu>` triggers via `ActionGroupContext`, with explicit per-prop precedence:
  - `size`: group wins (visual uniformity within a cluster).
  - `variant`: local wins (so a single destructive action can sit inside an otherwise uniform group).
  - `disabled`: local wins; the group provides the default. Writing `disabled={false}` on a child re-enables it inside an otherwise-disabled group.

  `ActionMenu` is rebuilt to compose its own `MenuTrigger` + `<ActionButton>` + `Popover` / `Tray` + RAC `Menu` rather than delegating to Marigold's `Menu`. The trigger uses `<ActionButton>` so an outer `ActionButtonContext` cascades to it. Marigold's `Menu` is untouched.

  `LinkButton` is now slot-aware: it picks up `ActionButtonContext` and `ActionGroupContext` so a navigating action can sit alongside `<ActionButton>` inside an `<ActionGroup>` and inherit the same cascade. A `destructive-ghost` variant is added to match `<ActionButton>`. Context is consumed read-only (via `useSlottedContext`) to sidestep the anchor/button ref-type mismatch that `useContextProps` would have created. The read-only consumption now also absorbs `className` from `ActionButtonContext` (mirroring `<ActionButton>`'s `useContextProps`-driven className merge) so positional classes published by a parent container — e.g. a grid-area class injected via `ActionButtonContext` — reach the rendered anchor. This lets `<LinkButton>` participate in container-driven layouts the same way `<ActionButton>` does.

  The container-driven layout pattern this enables comes with a corresponding convention: **positional `className` flows through slot contexts and is absorbed at the first layout boundary**. `<ActionGroup>` enforces the convention at its own boundary by scrubbing `ActionButtonContext` for its descendants — it republishes an empty value so nested `<ActionButton>`s and `<LinkButton>`s do not individually re-claim a positional class that was meant for the group as a whole. Cascading props (`size`, `variant`, `disabled`) still reach the children via `ActionGroupContext`, which they read independently. This convention scales to every future container that adopts the slot-configuration pattern.

  `<ActionBar>`'s legacy top-level `ActionButton` slot is internalized and re-exposed as `ActionBar.Button`. Existing consumers that already use `<ActionBar.Button>` are unaffected.

  Typography prep: `Headline` exports `HeadlineSize`, `Text` exports `TextSize` and `TextVariant`. The aliases aren't yet consumed by other primitives, but exposing them now lets a future typography-token PR replace runtime classes without rewriting consumer-facing prop types.

- Updated dependencies [727163c]
- Updated dependencies [cc568e3]
- Updated dependencies [566c468]
- Updated dependencies [9f4dc97]
- Updated dependencies [3c6a943]
- Updated dependencies [4742e8e]
- Updated dependencies [496a9f2]
- Updated dependencies [496a9f2]
- Updated dependencies [8b754f0]
- Updated dependencies [5744bbf]
- Updated dependencies [2d9d6fd]
- Updated dependencies [2ff7bda]
  - @marigold/components@18.0.0-beta.1
  - @marigold/system@18.0.0-beta.1

## 6.0.0-beta.0

### Major Changes

- adb8a18: feat(DST-1237): theme-owned breakpoints with CSS fallback

  Breakpoint resolution is now theme-driven: `useSmallScreen` and `useResponsiveValue` read `theme.screens` from the ThemeProvider context instead of relying on hardcoded values in `defaultTheme`. If no theme provides screens, the hooks fall back to reading Tailwind v4's `--breakpoint-*` CSS custom properties.
  - Added `screens` to `@marigold/theme-rui` (matches Tailwind v4 defaults)
  - Removed `screens` from `defaultTheme` in `@marigold/system`
  - Added `resolveScreens` utility for theme-first, CSS-fallback resolution

- f629319: refactor([DST-1283]): **Breaking Change** — Remove `<Multiselect>` (and the `react-select` dependency) from `@marigold/components`.

  Use `<TagField>` instead.

- d35022b: DST-878: Polish design tokens and add token documentation.

  **New color palette:**
  - Replace default gray scale with warm neutral "charcoal" palette (oklch, hue 54, 11 steps from 50-950)

  **Token renames and restructuring:**
  - Rename `brand` to `primary`, `muted-foreground` to `secondary`, `focus` to `focus-highlight`
  - Rename status token structure from `*-muted`/`*-muted-foreground`/`*-muted-accent` to `*`/`*-foreground`/`*-accent`
  - Add `disabled-surface` token for disabled control backgrounds
  - Add `overlay-backdrop` token for modal/tray backdrops
  - Update page background colors

  **New hover utilities:**
  - Add `ui-state-hover` utility (solid hover for list items, table rows, menu items)
  - Add `ui-state-hover-ghost` utility (translucent hover for ghost buttons, tabs, action bar)
  - Migrate all components from raw `hover:bg-hover`/`hover:bg-current/10` to the new utilities

  **Documentation:**
  - Add new Token Overview page with complete token reference
  - Add annotated UI diagram, color palette demo, Do/Don't guidance, hover and selection pattern docs
  - Remove outdated `design-tokens.mdx` and `design-token-guidelines.mdx` pages

- 968bc0b: DST-1209: Refactor elevation documentation and remove deprecated utilities.

  **Breaking: Remove `util-surface-*` utilities**
  - Delete `util-surface-sunken`, `util-surface-body`, `util-surface-raised`, `util-surface-overlay`
  - Remove `utils.css` from theme-rui build

  **Migration from legacy utilities:**
  | Old utility | New replacement |
  |---|---|
  | `util-surface-sunken` | Removed, use `bg-background` for the page base layer |
  | `util-surface-body` | `bg-background` (no shadow needed) |
  | `util-surface-raised` | `ui-surface shadow-elevation-raised` |
  | `util-surface-overlay` | `ui-surface shadow-elevation-overlay` |

  **Documentation:**
  - Rewrite elevation page around the 3-tier shadow system (border, raised, overlay)
  - Add surfaces section explaining `bg-background`, `bg-surface`, `bg-muted`, and `ui-surface`
  - Add interactive demos, annotated SVG diagram, and per-tier Do/Don't guidelines
  - Add migration table from legacy `util-surface-*` to new tokens

  **Fixes:**
  - Fix broken `bg-bg-surface-*` tokens in card-elevation demo, inset-equal demo, and Columns story
  - Update Card docs elevation section to match new page structure

- 00d93c8: feat(DST-1246): update Switch component layout and sizing to align with Checkbox and Radio

  The Switch component previously rendered its label on the left and toggle on the right, which was inconsistent with Checkbox and Radio where the control sits on the left. When used together in forms, this created a visually misaligned layout.

  **Layout**: Toggle now renders before the label (control on the left, label on the right), matching Checkbox and Radio. This ensures consistent visual alignment when Switch is used alongside other boolean controls in form layouts.

  **Sizing**: Reduced the default track size from 24x40px to 16x28px and thumb from 20px to 12px. This brings the Switch closer in visual weight to Checkbox/Radio (16px), making it fit better in the flow of forms.

  **Settings variant**: A new `variant="settings"` mirrors the default layout — label and description on the left, toggle on the far right. This is the common pattern used on settings/preferences pages. The variant is propagated to `BooleanField` so that grid columns and description placement adjust accordingly.

  **Description support**: Switch now accepts a `description` prop (help text rendered below the control), matching Checkbox's existing support. The description text aligns with the label text using CSS grid + subgrid, automatically adapting to any control size without hardcoded padding. Properly wired with `aria-describedby` for accessibility.

  **Form support**: The `name` prop passes through to the underlying input for HTML form submission.

  **Shared BooleanField**: Extracted a reusable `BooleanField` wrapper used by both Checkbox and Switch for consistent description rendering and `aria-describedby` wiring. Uses CSS grid with subgrid to align description text with label text across both components.

  ## Breaking changes

  ### Restoring the old Switch behavior

  The default Switch layout has changed: the toggle is now on the **left** and the label on the **right** (previously reversed). If you need the old layout (label left, toggle right), use the new `variant="settings"`:

  ```diff
  - <Switch label="Wi-Fi" />
  + <Switch label="Wi-Fi" variant="settings" />
  ```

  The `size="large"` prop has been removed. The default size is now smaller (16x28px track). There is no built-in way to get the old large dimensions (24x40px track) — if needed, create a custom size variant in your theme's `Switch.styles.ts`.

  ### Custom theme migration

  This release introduces a new required theme component `BooleanField` and changes the layout model of the `Checkbox` and `Switch` container slots from flexbox to CSS grid. **Custom themes must be updated or Checkbox/Switch will throw a runtime error.**

  ### 1. Add `BooleanField` to your theme (required)

  `BooleanField` is a new multi-slot theme component used internally by both `Checkbox` and `Switch` to render descriptions. If your theme does not include it, any `Checkbox` or `Switch` with a `description` prop will throw:

  ```
  Error: Component "BooleanField" is missing styles in the current theme.
  ```

  Add the following to your theme's component styles:

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

  - `container`: Defines the 2-column grid layout wrapping the control and its description. The `default` variant uses `grid-cols-[auto_1fr]` (control left, label right). The `settings` variant uses `grid-cols-[1fr_auto]` (label left, control right).
  - `description`: Styles the description text wrapper. Placed under the label column via `col-start-2` (default) or `col-start-1` (settings). `mt-0.5` adds vertical spacing between the label row and description.

  Then export it from your theme's component index file:

  ```ts
  export { BooleanField } from './BooleanField.styles';
  ```

  ### 2. Update `Checkbox` container slot (required if customized)

  The `Checkbox` container slot changed from flexbox to CSS grid with conditional subgrid support:

  **Before:**

  ```ts
  container: cva({ base: 'cursor-pointer read-only:cursor-default gap-2' }),
  ```

  **After:**

  ```ts
  container: cva({
    base: [
      'grid grid-cols-[auto_1fr] gap-x-2 items-center',
      'cursor-pointer read-only:cursor-default',
      'group-data-[booleanfield]/booleanfield:grid-cols-subgrid group-data-[booleanfield]/booleanfield:col-span-full',
    ],
  }),
  ```

  Key changes:
  - `gap-2` changed to `gap-x-2` (column gap only, since row gap is now handled by `BooleanField.description`)
  - `grid grid-cols-[auto_1fr] items-center` replaces the `flex items-center` that was previously hardcoded in the component
  - `group-data-[booleanfield]/booleanfield:grid-cols-subgrid` and `group-data-[booleanfield]/booleanfield:col-span-full` enable subgrid when inside a `BooleanField` wrapper, so the description aligns with the label

  ### 3. Update `Switch` container slot (required if customized)

  The `Switch` container slot also changed from minimal styles to CSS grid with subgrid:

  **Before:**

  ```ts
  container: cva({
    base: 'disabled:cursor-not-allowed disabled:text-disabled-foreground',
  }),
  ```

  **After:**

  ```ts
  container: cva({
    base: [
      'grid gap-x-2 items-center',
      'disabled:cursor-not-allowed disabled:text-disabled-foreground',
      'group-data-booleanfield/booleanfield:grid-cols-subgrid group-data-booleanfield/booleanfield:col-span-full',
    ],
    variants: {
      variant: {
        default: 'grid-cols-[auto_1fr]',
        settings: 'grid-cols-[1fr_auto]',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  ```

  Key changes:
  - Added `grid gap-x-2 items-center` (replaces `flex items-center gap-2` that was previously hardcoded in the component)
  - Grid columns moved to `variant` to support both default and settings layouts
  - Added subgrid support for BooleanField integration

- 724f0ce: refa([DST-1162]): **Breaking changes**: The `Card` component has been refactored into a compound component pattern.

  **What changed:**
  - The previous prop-based API (`padding`, `space`, etc.) has been removed.
  - Content must now be composed using explicit sub-components: `Card.Header`, `Card.Body`, `Card.Footer`, and `Card.Preview`.
  - A `CardContext` is now required — sub-components will throw an error if used outside of a `<Card>`.

  **Migration:**

  ```tsx
  // Before
  <Card>
    <SomeContent />
  </Card>

  // After
  <Card>
    <Card.Header>Title</Card.Header>
    <Card.Body><SomeContent /></Card.Body>
    <Card.Footer>Actions</Card.Footer>
  </Card>
  ```

### Minor Changes

- 6587493: refa([DST-1298]): Refactor Divider component: API, styling, and docs

  We fixed the vertical orientation of the divider, which previously didn't work.
  Added new Divider stories and updated the Divider docs.

- 93f9ef1: feat(DST-1257): add universal `none` spacing token
  - Introduce `NoSpacingToken = 'none'` shared across all spacing token families
  - Add `'none'` to `SpacingTokens`, `PaddingSpacingTokens`, and `InsetSpacingTokens`
  - Add `--spacing-none: --spacing(0)` CSS custom property to the theme

  `'none'` now works wherever a spacing token is accepted: `Stack`/`Inline` gap (`space="none"`), `Inset` axis padding (`spaceX="none"` / `spaceY="none"`), and `Inset` recipes (`space="none"`) — useful for wrappers that should render without adding any spacing (e.g. an edge-to-edge `Table` inside a containing component).

- 8326bf7: feat(DST-1326): introduce `Panel.CollapsibleHeader`, `Panel.CollapsibleTitle`, and `Panel.CollapsibleDescription`. The collapsible mirrors `Panel.Header` — a header wrapper with a title plus an optional description — and the whole visual surface is a single click target: title and description render as spans inside the trigger `<button>`, with the accessible name wired via `aria-labelledby` and the description via `aria-describedby`. The chevron icon uses a reusable `MorphCaret` that animates via SVG path morphing (honours `prefers-reduced-motion`).
- 326f707: feat(theme-rui): preflight fixes, file layout refactor, token and export corrections

  A cohesive set of changes that (1) adds peer-dependency fixes needed
  for page-level scroll, (2) splits the theme's CSS into files with
  unambiguous roles, and (3) fixes a prefixer bug that stranded design
  tokens inside the scoped bundle.

  **New: `preflight.css`**

  Two peer-dependency fixes on the real `<html>` / `<body>`:
  - `html { scrollbar-gutter: stable }` — prevents a 1 px reflow when
    `@react-aria/overlays` locks the page (it sets `overflow: hidden`
    on `<html>` and compensates scrollbar width).
  - `body { position: relative; overflow-x: clip }` — contains the
    `@react-aria/live-announcer` portal (mounted at `top: -10000px;
left: -10000px`) so it cannot expand the document's scrollable
    area. `clip` (not `hidden`) keeps `position: sticky` on
    descendants working.

  These rules ship inside both entry points; the prefixer excludes
  `html`/`body` so the rules reach the document root while the rest
  of the bundle stays scoped to `[data-theme="rui"]`.

  **Scrollbar track**

  `ui-scrollbar`'s track is now transparent so the themed scrollbar
  blends into any surface.

  **File layout refactor**
  - `tokens.css` (new) — `@plugin` declaration and every design token
    in one place. Easy to find, easy to extend.
  - `theme.css` (Tailwind-native entry) — imports `preflight.css` +
    `tokens.css` + `ui.css` + `variants.css` and paints `<body>`
    directly. A Marigold-first app needs zero extra markup to get the
    theme's page background, text color, and font.
  - `styles.css` (pre-compiled entry) — imports the same base and
    paints `[data-theme="rui"]`. The consumer places the attribute on
    `<html>`, `<body>`, or a wrapper `<div>` to control where Marigold
    paints — whole-app or island.
  - `global.css` (removed, never released) — the body paint now lives
    inline in the two entry points that actually need it, so a shared
    file with ambiguous semantics is no longer necessary.

  **Two clean mental models**
  - Use `theme.css` with your own Tailwind build when Marigold is the
    whole app. Body paints automatically, tokens live at `:root`,
    utilities tree-shake against your content.
  - Use `styles.css` as a pre-compiled drop-in when Marigold is an
    island or you are not running Tailwind. Place `data-theme="rui"`
    wherever Marigold should paint.

  **Tokens at `:root`**

  `postcss-prefix-selector` previously rewrote `@theme`'s output from
  `:root, :host` to `[data-theme="rui"], [data-theme="rui"] :host`,
  which meant any unscoped rule could not resolve
  `var(--color-background)` because the variables were only declared
  inside the `[data-theme="rui"]` scope. The prefixer now excludes
  `:root`, `:host`, and `[data-theme="rui"]` in addition to
  `html`/`body`, so design tokens are emitted globally while utility
  classes remain scoped. The `[data-theme="rui"]` exclude uses a
  quote-agnostic regex so prettier round-trips don't reintroduce
  double-prefixing.

  **CSS exports carry a `style` condition**

  Tailwind v4's CSS resolver uses `conditionNames: ["style"]`.
  Bare-string export entries without a matching condition fail under
  strict resolvers, so every `.css` subpath now declares both `style`
  and `default` targets. The unused `./*` JS catchall is removed. New
  subpath exports: `./tokens.css`, `./preflight.css`.

  Existing documented imports (`theme.css`, `styles.css`) continue to
  work.

### Patch Changes

- 5cd5290: fix(DST-1359): align `ActionBar` action button spacing with the regular `Button`. The `actionButton` style in `theme-rui` was missing `gap-2 items-center justify-center`, which caused icons and labels inside ActionBar buttons to render without the proper spacing/alignment used by the ghost/default `Button`. Adding these utilities restores visual parity across the design system.
- 84d3213: Paint `Checkbox` and `Radio` controls with `bg-surface` so the inner area follows the theme surface token. Keeps the controls visually distinct over containers that paint a non-default background — e.g. a hovered or selected `SelectList` row. `Radio` already used `bg-surface` (added in DST-878 token polish); this brings `Checkbox` in parity.
- b7c132d: fix(DST-1354): restore collapsing `Table.EditableCell` edit trigger

  The overlay/ring affordance introduced in #5250 (DST-1275) did not read as editable in user testing: sighted users did not associate the hover ring with inline editing, and there was no discoverable trigger for keyboard or touch. This change reverts that approach and restores the explicit pencil edit button.

  The trigger collapses to zero layout space at rest (`w-0 overflow-hidden`) and expands on row hover or keyboard focus, so static layout remains clean while the affordance is discoverable the moment the user interacts with the row. When expanded, the wrapper switches to `overflow-visible` so the button's focus outline is not clipped. The cell itself stays clickable as a touch target. Enabled editable cells always truncate their content to stay aligned with column headers and match the single-line editing controls; disabled cells behave like a regular `Table.Cell`.

- f16b887: fix(DST-1352): use correct outline for focus + error state in compound fields
- 20a42b0: Rename universal spacing token from `none` to `collapsed` to avoid a Tailwind v4 collision. `--spacing-none` inside `@theme static` caused `leading-none` to resolve to `0` instead of `line-height: 1`. The new name `collapsed` is a semantic design term (cf. CSS margin collapse) that reads naturally in both gap (`space="collapsed"`) and padding (`inset="collapsed"`) contexts.
- 8902b10: fix: register `--ui-background-color`, `--ui-border-color`, and `--ui-highlight-color` as non-inheriting custom properties

  Previously, setting one of these variables on a themed surface (e.g. a destructive Panel overriding `--ui-border-color`) would cascade the value into every nested element that also reads `ui-surface`, tinting Inputs, Buttons, Cards, etc. with the parent's color.

  These three custom properties are now registered via `@property { inherits: false }`, so each surface resolves its own fallback via the existing `var(..., var(--color-…))` pattern and nested surfaces keep their defaults.

- Updated dependencies [adb8a18]
- Updated dependencies [326f707]
- Updated dependencies [b7c132d]
- Updated dependencies [6587493]
- Updated dependencies [f16b887]
- Updated dependencies [f629319]
- Updated dependencies [93f9ef1]
- Updated dependencies [8326bf7]
- Updated dependencies [bfea9df]
- Updated dependencies [8326bf7]
- Updated dependencies [1cac70d]
- Updated dependencies [cddcfd3]
- Updated dependencies [e33a1e7]
- Updated dependencies [20a42b0]
- Updated dependencies [00d93c8]
- Updated dependencies [c2a1c72]
- Updated dependencies [724f0ce]
- Updated dependencies [62cca29]
- Updated dependencies [de34b15]
- Updated dependencies [04111ca]
  - @marigold/system@18.0.0-beta.0
  - @marigold/components@18.0.0-beta.0

## 5.5.1

### Patch Changes

- cd9dd4d: fix(DSTSUP-266): render the required-field asterisk via a `ui-required-indicator` utility

  The required indicator (the red `*` after a label) was defined inline as `after:content-["*"]`. That quoted arbitrary value does not survive JS compilation into an extractable class name (`content-["*"]` becomes `content-[\"*\"]`), so consumers that regenerate Tailwind by scanning the compiled theme packages (the Marigold starter, StackBlitz, `@reservix/core`) never generated a rule for it and the asterisk was invisible. It kept working in Storybook and the docs because those read the source or the pre-built CSS.

  The indicator is now a named `ui-required-indicator` utility with its value defined in CSS (`ui.css`). The class name is quote-free, so it survives compilation and renders regardless of how a consumer builds its styles.

- Updated dependencies [76fca24]
  - @marigold/components@17.9.1
  - @marigold/system@17.9.1

## 5.5.0

### Minor Changes

- ed2d9ae: feat(DST-1551): add `DateRangePicker` component

  New `<DateRangePicker>` lets users enter or select a start–end date range through a single field, mirroring `<DatePicker>`'s API and behaviour. Two date inputs (`start`/`end`) sit in one field group with a calendar button that opens a `<RangeCalendar>` in a popover on desktop and a tray on small screens. Supports per-input paste (ISO/EU/US formats), `granularity` (inline time segments), `visibleDuration` (up to three months), and the usual Marigold field props (`disabled`, `readOnly`, `required`, `error`, `errorMessage`, `description`, `minValue`, `maxValue`, `dateUnavailable`, `width`, `variant`, `size`). Adds a matching `DateRangePicker` theme entry to `theme-rui`.

### Patch Changes

- ed2d9ae: fix(DST-1551): round the `RangeCalendar` hover and focus highlight on days outside the selected range

  Days outside the selected range now round their hover and focus highlight to match the selected state, instead of showing a square highlight against the rounded endpoints. In-range cells stay square so the range fill still connects seamlessly.

- 24354a9: fix(DST-1560): correct the `@source inline` padding safelist to the real spacing tokens

  The padding safelist in `styles.css` still used the pre-rename vocabulary `{compact, tight, regular, relaxed, spacious}`, but the spacing tokens were long ago renamed to `{tight, snug, regular, relaxed, loose}`. As a result `compact`/`spacious` force-generated dead utility classes (resolving to undefined `--spacing-*` vars), while the real `snug`/`loose` tokens were never safelisted and so were unavailable in scanner-excluded stories and in the (unscanned) docs app. The leading family-less line was also stale — it predates the `square`/`squish`/`stretch` split.

  Replaced the three lines with the three inset-padding families (`square`/`squish`/`stretch`) using the real size names, so utility classes like `p-squish-relaxed` resolve to a concrete value and the full inset vocabulary is available where the scanner can't see it.

- 4d44517: fix: make Select and Menu overlay appear above Drawer on small screens

  On small screens, `Select` and `Menu` render their options in a `Tray` (bottom sheet). The `Tray` overlay had `z-40` in the theme while the `Drawer` overlay uses `z-50`, so the tray rendered behind an open drawer and was unreachable.

  Moved the `z-index` from the theme style file into the `TrayModal` component implementation (matching the project's z-index architecture rule), and raised it to `z-50`. Both the `Drawer` and `Tray` portal to `document.body`; at equal z-index, DOM order determines stacking. The `Tray` is always mounted after the `Drawer`, so it correctly appears on top.

- Updated dependencies [ed2d9ae]
- Updated dependencies [e686474]
- Updated dependencies [2fc7b96]
- Updated dependencies [508ec2c]
- Updated dependencies [4d44517]
  - @marigold/components@17.9.0
  - @marigold/system@17.9.0

## 5.4.1

### Patch Changes

- Updated dependencies [bdda185]
- Updated dependencies [a609642]
- Updated dependencies [60b6e03]
  - @marigold/components@17.8.0
  - @marigold/system@17.8.0

## 5.4.0

### Minor Changes

- f4608c6: feat(DSTSUP-262): add `large` size to Dialog for wider layouts

  `Dialog` (and `ConfirmationDialog`, which inherits the prop) now accepts `size="large"`, which sets the dialog width to `1024px` — matching the Tailwind `lg` breakpoint. Use it for content that doesn't fit the previous `medium` cap of `768px`, e.g. multi-month calendars or wider forms. The existing `min()` width formula keeps the dialog viewport-safe on smaller screens.

### Patch Changes

- Updated dependencies [a6a1cb3]
- Updated dependencies [f4608c6]
- Updated dependencies [4242aa1]
- Updated dependencies [da46e58]
- Updated dependencies [e0d5c7b]
  - @marigold/components@17.7.0
  - @marigold/system@17.7.0

## 5.3.2

### Patch Changes

- 9436cbc: fix(DST-1482): make the `width` prop size field components again

  Setting `width` on a field component (`<Select>`, `<TextField>`, `<NumberField>`, …) had no visible effect — the field sized to its content and consumers had to wrap it in an extra element. `FieldBase` sets the `--field-width` CSS variable for its child field element to consume via `w-(--field-width)`, but the variable was registered with `@property … { inherits: false }`, so it never reached the child and `width` fell back to `auto`.

  `--field-width` is now registered with `inherits: true`, restoring the intended parent→child handoff. The same-element layout variables (`--width`, `--max-width`, `--height`, `--container-width`) keep their non-inheriting leak protection.

  Also clarifies in the prop docs that numeric `width` values are spacing-scale tokens, not pixels: `width={64}` resolves to `calc(var(--spacing) * 64)` ≈ 16rem (256px).

- a289d42: chore(deps): update react-aria

  Bumps the react-aria packages and `tailwindcss-react-aria-components` (theme-rui).

  Note: following the react-aria update, `Switch` now toggles with the Space key
  to match native checkbox behavior. It no longer toggles on Enter.

- Updated dependencies [6f24f07]
- Updated dependencies [9436cbc]
- Updated dependencies [737c0a9]
- Updated dependencies [c619ffd]
- Updated dependencies [1c5c5fd]
- Updated dependencies [a289d42]
  - @marigold/components@17.6.0
  - @marigold/system@17.6.0

## 5.3.1

### Patch Changes

- 6517e25: fix(DST-1447): honor `prefers-reduced-motion: reduce` globally. The theme now disables every CSS transition when the user (or Chromatic during VRT) requests reduced motion. CSS `@keyframes` animations are left alone so intentional motion (Sidebar slide-in, Drawer entrance, spinners) keeps working, and real users without the preference see no change. Side effect: stabilizes Chromatic visual regression snapshots that previously flickered when a focus-color transition was captured mid-frame on Autocomplete, Select, ComboBox, and Tray stories.
- Updated dependencies [3b29d91]
- Updated dependencies [c65d2a7]
  - @marigold/components@17.5.1
  - @marigold/system@17.5.1

## 5.3.0

### Minor Changes

- 727163c: feat([DST-1134]): add `<RangeCalendar>` component (alpha)

  Adds a new `<RangeCalendar>` for selecting a contiguous or non-contiguous date range, built on react-aria's `<RangeCalendar>` with Marigold conventions (`disabled`, `readOnly`, `error`, `dateUnavailable`, `allowsNonContiguousRanges`). Supports up to three side-by-side months via `visibleDuration`, stacking vertically below the `sm` breakpoint; the same responsive stacking now applies to multi-month `<Calendar>` for parity. `description` and `errorMessage` route through `<FieldBase>` so the help/error UI matches the rest of the form-component family (TriangleAlert icon + HelpText container). Ships as an alpha component with a stub docs page under the form section.

  [DST-1134](https://reservix.atlassian.net/browse/DST-1134)

- 6587493: refa([DST-1298]): Refactor Divider component: API, styling, and docs

  We fixed the vertical orientation of the divider, which previously didn't work.
  Added new Divider stories and updated the Divider docs.

### Patch Changes

- 5cd5290: fix(DST-1359): align `ActionBar` action button spacing with the regular `Button`. The `actionButton` style in `theme-rui` was missing `gap-2 items-center justify-center`, which caused icons and labels inside ActionBar buttons to render without the proper spacing/alignment used by the ghost/default `Button`. Adding these utilities restores visual parity across the design system.
- f8fbef9: fix([DST-1412]): fix multi-month Calendar/RangeCalendar layout at non-default widths. With three months at `width="1/2"` the third month overflowed the calendar wrapper because `min-w-[250px]` only sized for a single month; with `width="full"` the date grids stayed at content size while their columns expanded, leaving header text floating over empty space. Switch the calendar minimum to `min-w-fit` so multi-month grows to fit its natural content, and add `w-full` to `calendarGrid` so the date table fills its column.

  [DST-1412](https://reservix.atlassian.net/browse/DST-1412)

- 4742e8e: feat([DST-901]): styleProps for `width`, `maxWidth`, `height`, `space`, `spaceX`, `spaceY`, `pr`, `pl`, `pt`, `pb` now accept both numeric scale values (`4`) and their string equivalents (`"4"`). The public types are now declarative (`Scale | Fraction | WidthKeyword`, etc.) instead of being derived from the internal class-name maps.

  Components that previously resolved `width`, `maxWidth`, and `height` via class-name lookup (Form, Calendar, legacy Table column header / select-all cell, Slider, Scrollable, Switch, Grid) now resolve them through CSS custom properties (`createWidthVar` / `createHeightVar`) targeting `--width`, `--max-width`, `--height`. Those variables — along with `--container-width` and `--field-width` already used by `FieldBase` — are registered as non-inheriting (`@property … inherits: false`) in the RUI theme so they cannot leak into descendants.

  `createWidthVar` gained support for the previously missing keywords (`svh`, `lvh`, `dvh`, `px`, `container`), and a new `createHeightVar` helper was added. Both share a common factory and a base keyword set, so they remain trivially in sync.

  The runtime class-name maps `width`, `maxWidth`, `height`, `gapSpace`, `paddingSpace`, `paddingSpaceX`, `paddingSpaceY`, `paddingRight`, `paddingLeft`, `paddingTop`, `paddingBottom` are no longer exported from `@marigold/system`. These were internal utilities consumed only by `@marigold/components`. Use the prop types (`WidthProp`, `HeightProp`, …) and the CSS-var helpers (`createWidthVar`, `createHeightVar`, `createSpacingVar`) instead. The corresponding TypeScript prop types are unchanged.

- b7c132d: fix(DST-1354): restore collapsing `Table.EditableCell` edit trigger

  The overlay/ring affordance introduced in #5250 (DST-1275) did not read as editable in user testing: sighted users did not associate the hover ring with inline editing, and there was no discoverable trigger for keyboard or touch. This change reverts that approach and restores the explicit pencil edit button.

  The trigger collapses to zero layout space at rest (`w-0 overflow-hidden`) and expands on row hover or keyboard focus, so static layout remains clean while the affordance is discoverable the moment the user interacts with the row. When expanded, the wrapper switches to `overflow-visible` so the button's focus outline is not clipped. The cell itself stays clickable as a touch target. Enabled editable cells always truncate their content to stay aligned with column headers and match the single-line editing controls; disabled cells behave like a regular `Table.Cell`.

- f16b887: fix(DST-1352): use correct outline for focus + error state in compound fields
- 8902b10: fix: register `--ui-background-color`, `--ui-border-color`, and `--ui-highlight-color` as non-inheriting custom properties

  Previously, setting one of these variables on a themed surface (e.g. a destructive Panel overriding `--ui-border-color`) would cascade the value into every nested element that also reads `ui-surface`, tinting Inputs, Buttons, Cards, etc. with the parent's color.

  These three custom properties are now registered via `@property { inherits: false }`, so each surface resolves its own fallback via the existing `var(..., var(--color-…))` pattern and nested surfaces keep their defaults.

- Updated dependencies [727163c]
- Updated dependencies [3c6a943]
- Updated dependencies [4742e8e]
- Updated dependencies [b7c132d]
- Updated dependencies [6587493]
- Updated dependencies [f16b887]
- Updated dependencies [1cac70d]
- Updated dependencies [5744bbf]
- Updated dependencies [e33a1e7]
- Updated dependencies [c2a1c72]
- Updated dependencies [2ff7bda]
- Updated dependencies [de34b15]
- Updated dependencies [04111ca]
  - @marigold/components@17.5.0
  - @marigold/system@17.5.0

## 5.2.4

### Patch Changes

- 5dfb6da: Remove muted text color from Dialog content slot for better readability
- bbf0832: refactor([DSTSUP-245]): Clean up Calendar styles

  Move hardcoded Tailwind classes from Calendar component files into theme slots, reduce cell padding from `p-2` to `p-1`, and add new `calendarHeading` theme slot.

- 85b2eb0: fix(DST-1275): improve EditableCell hover/focus affordance with data-editable attribute
- d341a9d: Fix CJS export paths pointing to non-existent `.js` files. Since tsdown 0.16.0, output uses `.cjs` extensions but `main`, `types`, and `exports` fields were never updated to match.
- d6507d5: Switch focus ring implementation from `box-shadow` (`ring-*`) to CSS `outline` to prevent clipping in scrollable containers and improve Windows High Contrast Mode accessibility. Replace `transition-all` and `transition-colors` with explicit `transition-[color,background-color]` to prevent outline-color from animating on focus. Redistribute padding from compound component containers to individual sub-components (Dialog, ContextualHelp, Accordion) so focus outlines have breathing room inside overflow boundaries.
- 27d13b7: fix([DSTSUP-245]): Calendar Days alinged centered through class
- 49fc2e2: fix(DST-1278): unify Table row hover styles for href and selectionMode rows
- Updated dependencies [f4f7a05]
- Updated dependencies [bbf0832]
- Updated dependencies [3f77810]
- Updated dependencies [85b2eb0]
- Updated dependencies [d341a9d]
- Updated dependencies [f560d95]
- Updated dependencies [a4b467f]
- Updated dependencies [50566a2]
- Updated dependencies [203baca]
- Updated dependencies [969c8cc]
  - @marigold/components@17.4.0
  - @marigold/system@17.4.0

## 5.2.3

### Patch Changes

- Updated dependencies [d3374cd]
  - @marigold/components@17.3.1
  - @marigold/system@17.3.1

## 5.2.2

### Patch Changes

- 6a29a6c: style([DST-1256]): Replace hardcoded values with semantic tokens
- f3068d7: fix([DST-1255]): Use correct semantic tokens in Tag and Slider style files
- Updated dependencies [a48059c]
- Updated dependencies [6a29a6c]
- Updated dependencies [548dcb4]
  - @marigold/components@17.3.0
  - @marigold/system@17.3.0

## 5.2.1

### Patch Changes

- fd6f323: bugfix[DST-1250]: fix broken style in `<Menu>`
  - @marigold/system@17.2.1
  - @marigold/components@17.2.1

## 5.2.0

### Minor Changes

- ed928a0: Update ActionBar with enter/exit animations, keyboard support, and built-in Table integration.
  - Add `useActionBar` hook and `ActionBarContext` for managing selection state between ActionBar and Table
  - Add `actionBar` render prop to Table for automatic selection wiring and ActionBar positioning
  - Add enter/exit animations using `motion/react` and react-aria `useEnterAnimation`/`useExitAnimation`
  - Add Escape key support to clear selection via `FocusScope` and `useKeyboard`
  - Add screen reader announcement when ActionBar appears
  - Add localized `selectedCount`/`selectedAll` messages (en-US, de-DE)
  - Update ActionBar theme slots: rename `actions` to `toolbar`, add `selection` slot
  - Update theme type definition to match new slot names

- e6091b6: Export `appearances` map from `@marigold/theme-rui/appearances`

  The theme package now exports a typed `appearances` object (and `Appearances` type) via `@marigold/theme-rui/appearances`. This map is auto-generated during the build from component style files and contains the available `variant`/`size` keys for each themed component.

  This removes the duplicated `build-appearances.mjs` scripts that previously existed in `docs`, replacing them with a single source of truth in the theme package.

- b115fda: Migrate from `class-variance-authority` to `cva` and simplify `extendTheme` via function composition.
  - Replace `class-variance-authority` dependency with `cva` (v1 beta), which has built-in Tailwind merge support via `defineConfig`
  - Refactor the custom `cva` wrapper to use `cva`'s `defineConfig` with a `twMerge` hook, storing variant configs in a WeakMap (for docs introspection) instead of a `.variants` property
  - Simplify `extendTheme` to compose style functions directly (`cn(existingFn(props), newFn(props))`) instead of extracting and merging variant configs — this preserves `defaultVariants` and `compoundVariants` that were previously lost during merging
  - Update all theme style files in `theme-rui` to the new `cva` API (object config with `base`/`variants`/`compoundVariants` keys)

- 61bfc60: Refactor relational spacing scale for better semantic clarity and visual rhythm.
  - Rename `--spacing-peer` token to `--spacing-regular`
  - Remove unused `--spacing-joined` and `--spacing-context` tokens
  - Adjust spacing scale values: tight (4px→6px), regular (16px→24px), group (32px→48px), section (64px→96px)
  - Move field-internal spacing from theme (`Field.styles` `space-y-2`) into component implementations using new `in-field` custom variant
  - Add `in-field:mb-1.5` to Label and `in-field:mt-1` to HelpText for consistent field layout
  - Update `SpacingTokens` type to reflect new scale

- 470d81c: feat(DST-979): Introduce a dedicated Sidebar component

  Add new `Sidebar` component for persistent app-level navigation. Features compound component API (`Sidebar.Header`, `Sidebar.Nav`, `Sidebar.Item`, `Sidebar.Footer`, `Sidebar.Toggle`, etc.), drill-down sub-navigation with animated transitions, collapse/expand with keyboard shortcut (Cmd+B / Ctrl+B) and localStorage persistence, mobile-responsive sheet overlay, full accessibility support, and i18n (EN/DE).

- c3bf8e4: feat([DST-1168]): Introduce TopNavigation Component
  - Three-slot grid layout (`Start`, `Middle`, `End`) using compound component pattern
  - Semantic HTML with `<header>` container and `<nav>` landmarks
  - Sticky by default, configurable alignment, and i18n ARIA labels
  - Theme styles for `theme-rui` and type definitions in `@marigold/system`

### Patch Changes

- 91eb222: Update ActionBar styling with surface contrast and dedicated button slot.
  - Apply `ui-surface-contrast` utility to ActionBar container for adaptive theming
  - Add `button` slot to ActionBar theme for properly styled action buttons (replaces `Button.ghost`)
  - Add `clearButton` hover/focus/disabled styles using theme-aware utilities
  - Update `ActionButton` to use `ActionBar.button` classNames instead of `Button.ghost`
  - Replace `CloseButton` with `IconButton` for the clear selection button
  - Update stories to use `lucide-react` icons directly

- cf56729: Add explicit `types` condition to package exports for reliable type resolution.
- 5d4c915: feat([DST-1240]): Add auto-collapse behavior to Breadcrumbs. The `maxVisibleItems` prop now defaults to `'auto'`, which uses a `ResizeObserver` to progressively show or hide breadcrumb items based on available container width.
- 28eba72: Improve color contrast ratios to meet WCAG AA standards.

  **Token changes (theme.css):**
  - Bump `muted-foreground` from stone-500 to stone-600 (4.71:1 → 7.55:1)
  - Bump `disabled-foreground` from stone-400 to stone-500 (2.37:1 → 4.71:1)
  - Bump `placeholder` from stone-500 to stone-600 (4.71:1 → 7.55:1)

  **Component fixes:**
  - Remove opacity modifiers (`/80`, `/70`) on muted-foreground in Calendar, ComboBox, Select, DatePicker, and Input
  - Replace `text-foreground/60` in Table editable cells with `text-muted-foreground`
  - Replace `marker:text-foreground/50` in List with `marker:text-muted-foreground`
  - Replace `opacity-60` in Accordion icon and Menu item SVGs with `text-muted-foreground`
  - Replace `disabled:opacity-50` in Tabs with `disabled:text-disabled-foreground`
  - Replace hardcoded `bg-stone-300`/`bg-stone-800` in Table drop indicator with `bg-border`/`bg-brand` tokens
  - Fix bug where `disabled:text-gray-50` made Input icons nearly invisible

- b61ba43: Refined elevation shadow tokens: `shadow-elevation-border` is slightly more subtle with symmetric spread; `shadow-elevation-raised` softens the crisp first layer and is a touch darker overall.
- 7ca2eb1: feat([DST-1227]): 💄 Implement Animated Transitions for Tabs Component, The active tab underline must slide smoothly between items
- f7870ce: Reinforce floating Drawer panel boundary with darker border and spread shadow
- a3e3e8e: Replace fixed `hover:bg-hover hover:text-foreground` with `hover:bg-current/10` on ghost-style buttons. The new value uses `currentColor` at 10% opacity so the hover background adapts to any container (light or dark) without forcing a fixed stone-100 background or overriding text color. Applied consistently to `Button` (ghost, destructive-ghost), `IconButton`, `Pagination`, `Tabs`, and `Table` editable-cell action buttons.
- beebd7c: Improve ListBox and Menu usability on mobile screens (DST-1210).
  - Align `useSmallScreen` hook with Tailwind's `sm` breakpoint by deriving the value from `defaultTheme.screens.sm` using CSS Media Queries Level 4 range syntax (`width < 640px`)
  - Add `max-sm:min-h-11` (44px) to ListBox and Menu items for WCAG 2.1 touch targets on mobile
  - Replace `min-[600px]:` with `sm:` in Table editable cell styles for breakpoint consistency
  - Refactor `useSmallScreen` to use `MediaQueryList.addEventListener('change')` instead of `window.resize`
  - Extract shared `mockMatchMedia` test helper into `test.utils`

- 9de007c: Align `Menu` button styles with `Button` by reusing `buttonBase` — consistent sizing, hover, disabled, and pending states across both components.
- ed2baef: fix(NumberField): prevent group from appearing disabled when stepper hits min/max boundary
- a715f08: Add shared CSS utilities `ui-interactive`, `ui-press`, `ui-panel-header`, and `ui-panel-actions` to reduce repeated style patterns across component theme files.
- 600d09f: fix(DSTSUP-233): Added card shadows to master- and adminmark
- 1ec6788: Set explicit `py-0` on table column headers to prevent external systems from overriding vertical padding
- f63e57f: refactor(DST-1233): remove tailwindcss-animate, standardize overlay animations
- Updated dependencies [91eb222]
- Updated dependencies [ed928a0]
- Updated dependencies [cf56729]
- Updated dependencies [5d4c915]
- Updated dependencies [b3c7085]
- Updated dependencies [3019d28]
- Updated dependencies [efbd292]
- Updated dependencies [7ca2eb1]
- Updated dependencies [95c22b6]
- Updated dependencies [4a24ad6]
- Updated dependencies [beebd7c]
- Updated dependencies [b115fda]
- Updated dependencies [61bfc60]
- Updated dependencies [470d81c]
- Updated dependencies [600d09f]
- Updated dependencies [c3bf8e4]
- Updated dependencies [f63e57f]
- Updated dependencies [d963df2]
  - @marigold/components@17.2.0
  - @marigold/system@17.2.0

## 5.1.0

### Minor Changes

- fd1b092: feat(DST-1219): Improve click area of `<TagField>`

  Improves the click area of the TagField component so that clicking
  anywhere on the field (not just the chevron button) opens the dropdown.

### Patch Changes

- a3042ed: fix(DST-1220): Update to use ui classes instead of util classes in components
- Updated dependencies [fd1b092]
- Updated dependencies [a3042ed]
  - @marigold/components@17.1.0
  - @marigold/system@17.1.0

## 5.0.1

### Patch Changes

- fb32888: Add `ui.css` with reusable UI component utilities (input, surface, state styles) to the theme build output.
  - @marigold/system@17.0.1
  - @marigold/components@17.0.1

## 5.0.0

### Major Changes

- 44d01a6: feat(DST-1141): Update `<Card>` to use semantic spacing and add `stretch` property
  - `<Card>` uses semantic spacing
  - Added `stretch` in favor of `size="full"`
  - Updated test suite
  - Fixed that the `<Card>` always take full width

- 63f1603: style([DST-1143]): Improve ContextualHelp sizes

  **Breaking Change**: Sizes have been removed, the default has a new style.

- 0c00d1d: ## 🎨 Changes

  ### 1. Refactored Surface Styling

  **What changed:**
  - Completely refactored the surface styling system to use `background-clip` and `background-origin` for gradient borders
  - Improved contrast and depth across all surface-based components (inputs, cards, dialogs, etc.)
  - **DateInput**: Added new `input` part for styling

  **Technical Details:**
  - New `ui-surface` utility class that works on single elements including `<input>`
  - Gradient borders transition from lighter (top) to darker (bottom) for improved depth perception
  - Removed deprecated utilities: `util-focus-*`, `util-disabled`
  - Introduced new state utilities: `ui-state-focus`, `ui-state-disabled`, `ui-state-error`, `ui-state-readonly`
  - New elevation system: `ui-elevation-raised`, `ui-elevation-overlay`

  ### 2. Semantic Spacing System (DST-1001)

  **New Relational Spacing Scale:**
  Introduced semantic tokens that describe the strength of relationships between elements:
  - `joined` (0.25rem) - Elements attached as a single unit
  - `tight` (1rem) - Packed containers for high-density scanning
  - `related` (2rem) - Minimal separation for related pairs (label + input)
  - `peer` (4rem) - Self-contained equals in the same flow
  - `group` (8rem) - Logical separation between content zones
  - `section` (16rem) - Distinct layout sections
  - `context` (32rem) - Complete contextual shift

  **New Inset (Padding) Scale:**
  - `tight`, `snug`, `regular`, `relaxed`, `loose` - with square, squish, and stretch variants
  - Example: `--spacing-squish-regular`, `--spacing-stretch-relaxed`

  **Benefits:**
  - Decouples intent from pixel values
  - Consistent rhythm across the interface
  - Improved scannability and hierarchy
  - Reduced reliance on explicit containers (cards/borders)

  ### 3. Component Improvements

  **FileField:**
  - Removed hardcoded unchangeable styles
  - Better grid-based layout for file items
  - Added `itemRemove` part for styling
  - Proper internationalization for remove button

  **DatePicker:**
  - Fixed dropdown sizing - now fits content instead of input width
  - Improved calendar popover positioning

  **Select & Input Components:**
  - Simplified container structure
  - Better icon and action placement
  - Improved accessibility with proper ARIA attributes

  **Dialog & Overlay Components:**
  - Consistent elevation styling
  - Better scrollbar styling
  - Improved focus management

  ## 📝 Documentation
  - **New Spacing Guide**: Comprehensive documentation explaining the semantic spacing system
  - Added visual examples for relational and inset spacing
  - Guidance on implicit vs. explicit grouping
  - Updated all example forms and patterns to use new spacing tokens

  ## 🔧 Technical Improvements
  - Replaced deprecated data attributes with proper CSS selectors
  - Better TypeScript typing for spacing tokens
  - Improved theme component definitions
  - Cleaner CSS with reduced specificity
  - Better support for different component states (disabled, readonly, error, focus)

  ## 📊 Statistics
  - **118 files changed**
  - **1,677 insertions**, **690 deletions**
  - Components affected: TextArea, Input, DateField, FileField, Select, Calendar, Card, Dialog, Menu, Toast, and many more

  ## ⚠️ Migration Notes

  ### Spacing Values

  ```tsx
  // Before
  <Stack space="fieldY">
  <Inline space="fieldX">

  // After
  <Stack space="peer">
  <Inline space="related">
  ```

  ### Surface Styling

  ```css
  /* Before */
  .util-surface-raised

  /* After */
  .ui-surface /* uses raised elevation by default */
  .ui-surface.ui-elevation-overlay /* for overlays */
  ```

### Minor Changes

- d8ce791: feat([DST-1092]): Add TagField component and deprecate Multiselect
  - Add `<TagField>` component: a multi-select field that displays selected items as removable tags with a searchable dropdown, built on react-aria's Select, Autocomplete, and TagGroup
  - Support for controlled/uncontrolled selection, disabled state, error state, disabled keys, sections, and custom empty state
  - Deprecate `<Multiselect>` component with updated docs pointing to `<TagField>`

- 0c00d1d: refa(DST-1001): Added a set of relational spacing tokens for future use. Provided documentation explaining the semantic spacing system.
- 196172e: **BREAKING CHANGE**: Comprehensive Table component rewrite with modern features

  This release introduces a complete rewrite of the `Table` component built on react-aria-components, providing enhanced accessibility, modern features, and improved developer experience.

  ## Breaking Changes

  The old `Table` component has been moved to `@marigold/components/legacy`. The main `Table` export now refers to the new implementation.

  ### Changed API Structure

  **Migration Required:**

  ```typescript
  // Before (old Table)
  import { Table } from '@marigold/components';

  // After - Option 1: Use legacy export (temporary)
  import { Table } from '@marigold/components/legacy';

  // After - Option 2: Migrate to new Table API (recommended)
  import { Table } from '@marigold/components';

  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
      <Table.Column>Email</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>John Doe</Table.Cell>
        <Table.Cell>john@example.com</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  ```

  ### Empty State Prop Location

  The `emptyState` prop has been moved from the `Table` component to `Table.Body`. This change provides better composition and follows react-aria-components patterns.

  **Migration Required:**

  ```typescript
  // Before (old Table)
  <Table emptyState={<EmptyMessage />}>
    <Table.Header>
      <Table.Column>Name</Table.Column>
    </Table.Header>
    <Table.Body>
      {/* rows */}
    </Table.Body>
  </Table>

  // After (new Table)
  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
    </Table.Header>
    <Table.Body emptyState={<EmptyMessage />}>
      {/* rows */}
    </Table.Body>
  </Table>
  ```

  ### Form Fields in Table Cells

  Inlining form fields directly in table cells is no longer supported. This approach broke accessibility patterns and keyboard navigation as it created conflicting focus management between the table's row selection and form inputs.

  **Migration Required:**

  ```typescript
  // Before (old Table) - NOT ACCESSIBLE
  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <TextField />  {/* This breaks keyboard navigation */}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>

  // After (new Table) - Use TableEditableCell
  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.EditableCell
          field={<TextField name="name" defaultValue={value} />}
          onSubmit={handleSubmit}
        >
          {value}
        </Table.EditableCell>
      </Table.Row>
    </Table.Body>
  </Table>
  ```

  ### Cell Alignment Props

  The `align` prop on `Table.Column`, `Table.Cell`, and `Table.EditableCell` has been renamed to `alignX` for consistency with other Marigold layout components.

  Vertical alignment (`alignY`) is only available on the `Table` component itself, not on individual cells. It controls the vertical alignment of all cell content.

  **Migration Required:**

  ```typescript
  // Before
  <Table.Column align="right">Balance</Table.Column>
  <Table.Cell align="right">{value}</Table.Cell>

  // After
  <Table.Column alignX="right">Balance</Table.Column>
  <Table.Cell alignX="right">{value}</Table.Cell>

  // Vertical alignment (table-level only)
  <Table alignY="top">
    {/* ... */}
  </Table>
  ```

  ### Column Width Values

  Tailwind CSS width classes are no longer supported on `Table.Column`. Column widths now use pixel values or CSS grid units, which provides better content-fitting behavior and more predictable layouts.

  **Migration Required:**

  ```typescript
  // Before (old Table)
  <Table.Column width="w-32">Name</Table.Column>
  <Table.Column width="w-full">Description</Table.Column>

  // After (new Table)
  <Table.Column width="200px">Name</Table.Column>
  <Table.Column width="1fr">Description</Table.Column>  {/* Default: 1fr */}
  ```

  By default, columns use `1fr` as their width, which distributes available space evenly. You can now specify exact pixel widths for columns that need fixed sizing, or use CSS grid units like `2fr` for proportional layouts.

  ## New Features

  The new `Table` component includes:

  ### Core Features
  - **Enhanced Accessibility**: Built on react-aria with full ARIA pattern compliance, keyboard navigation, and screen reader support
  - **Sorting**: Click column headers to sort ascending/descending with visual indicators (`SortAscending`, `SortDescending` icons)
  - **Selection**: Single or multiple row selection with checkboxes and keyboard support
  - **Row Actions**: Support for action menus and interactive elements within rows

  ### Advanced Features
  - **Editable Cells**: Inline cell editing with `TableEditableCell` component supporting text inputs, selects, and custom editors
  - **Drag and Drop**: Reorder rows with visual drag preview and drop indicators
  - **Sticky Headers**: Keep table headers visible while scrolling through data
  - **Empty States**: Built-in support for displaying empty state messages
  - **Links**: Clickable cells and proper link handling within table rows

  ### Layout & Styling
  - **Text Overflow Control**: Choose between truncation and wrapping for cell content
  - **Text Selection**: Enable/disable text selection within table cells
  - **Cell Alignment**: Flexible horizontal (`alignX`) and vertical (`alignY`) text alignment options
  - **Responsive Design**: Better handling of different viewport sizes
  - **Column Width Control**: Support for fixed and flexible column widths

  ## New Components

  This release adds several new subcomponents:
  - `Table.Column` - Define table columns with sorting, alignment, and width options
  - `Table.EditableCell` - Editable table cells with inline editing support
  - `Table.SelectableCell` - Checkbox cells for row selection
  - `Table.renderDropIndicator` - Render function for custom drop indicators
  - `Table.renderDragPreview` - Render function for custom drag previews

  ## New Icons
  - `Pencil` - Indicates editable cells
  - `SortAscending` - Ascending sort indicator
  - `SortDescending` - Descending sort indicator

  ## Theme Updates
  - New theme styles for the modern `Table` component in `@marigold/theme-rui`
  - Legacy `Table` styles preserved as `LegacyTable.styles.ts`
  - Updated documentation theme (`@marigold/theme-docs`) with new Table styles

  ## Documentation

  Comprehensive documentation updates including:
  - Complete API reference with all new props and features
  - Interactive demos for all features (sorting, selection, editing, drag-drop, etc.)
  - Anatomy diagram showing component structure
  - Migration guide from legacy Table
  - Accessibility guidelines

  ## Backward Compatibility

  The legacy `Table` component remains available at `@marigold/components/legacy` for backward compatibility. However, it is now considered deprecated and will receive maintenance updates only. We strongly recommend migrating to the new `Table` component to benefit from:
  - Better accessibility and ARIA compliance
  - Modern features (sorting, selection, editing)
  - Improved performance
  - Active development and new features
  - Better React 19 compatibility

  ## Examples

  ### Basic Table

  ```tsx
  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
      <Table.Column>Email</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>John Doe</Table.Cell>
        <Table.Cell>john@example.com</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  ```

  ### Sortable Table

  ```tsx
  <Table>
    <Table.Header>
      <Table.Column allowsSorting>Name</Table.Column>
      <Table.Column allowsSorting>Email</Table.Column>
    </Table.Header>
    <Table.Body>{/* rows */}</Table.Body>
  </Table>
  ```

  ### Selectable Table

  ```tsx
  <Table selectionMode="multiple">
    <Table.Header>
      <Table.Column>Name</Table.Column>
      <Table.Column>Email</Table.Column>
    </Table.Header>
    <Table.Body>{/* rows with selection */}</Table.Body>
  </Table>
  ```

  ### Editable Table

  ```tsx
  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
      <Table.Column>Email</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.EditableCell>
          {name => <TextField value={name} />}
        </Table.EditableCell>
        <Table.EditableCell>
          {email => <TextField value={email} />}
        </Table.EditableCell>
      </Table.Row>
    </Table.Body>
  </Table>
  ```

  ## Technical Details
  - Built on `react-aria-components` v1.5.0+
  - Fully typed with TypeScript
  - Comprehensive test coverage (unit + browser tests)
  - Follows WCAG 2.1 AA accessibility standards
  - Compatible with React 19
  - Supports both controlled and uncontrolled modes

### Patch Changes

- 34c785a: style([DST-1154]): Update Admin/Master Badge Styling
- f756051: fix(DST-1192): Do not show button as pressed when used to "expand" something
- 2e3f7d2: fix(DST-1188): Correctly apply elevation shadows
- 00a3c81: fix(DST-1205): Fix visuals of `<NumberField>` stepper when disabled using min/max
- 01e6bdb: [DST-1157]: introduce new `<ActionBar>` alpha component
- a0564dc: style(DST-1158): Set table background color to white.
- 282b330: fix([DST-1170]): Update Drawer styles to take full height on small screens when position top or bottom
- 7928a23: Refactor z-index implementation to move all z-index values from theme style files to component implementations. This ensures consistent stacking order across all themes and makes z-index behavior theme-independent.

  **Changes:**
  - Moved z-index classes from theme style files (`*.styles.ts`) to component implementations
  - Z-index values are now applied directly in component `className` props using Tailwind utilities
  - Updated 8 component files: ToastProvider, Popover, Tooltip, Underlay, DrawerModal, Drawer, ActionBar
  - Updated 7 theme style files to remove z-index classes
  - Added comprehensive z-index documentation to CLAUDE.md
  - ActionBar moved to floating layer (z-30) for better integration with content overlays

  **Benefits:**
  - Z-index stacking order is now consistent across all themes
  - Components control their own z-index, making it part of component behavior
  - Easier maintenance - developers only check component files to understand stacking
  - Future themes automatically inherit correct z-index stacking

- 5a90757: feat(DSTSUP-225): Introduce `<ToggleButton>` and `<ToggleButtonGroup>` as alpha components
- 4645c5d: style(DST-1197): Refine elevation shadows
- 8dd0455: feat([DSTSUP-222]): Introduce `<EmptyState>` Component as beta
- b7c64cc: fix(Checkbox): Correctly apply focus styling on checkboxes
- 8a70185: refa(DST-974): Refactoring width property on `FieldBase` and Form Elements like `Input`, `TextArea`, `DateInput` and `Select`. Labels and HelpText can now be wider as the actual input field.
- Updated dependencies [d8ce791]
- Updated dependencies [34c785a]
- Updated dependencies [96e145a]
- Updated dependencies [196172e]
- Updated dependencies [cfa9b99]
- Updated dependencies [00a3c81]
- Updated dependencies [cc61968]
- Updated dependencies [01e6bdb]
- Updated dependencies [2244030]
- Updated dependencies [6c071f0]
- Updated dependencies [44d01a6]
- Updated dependencies [63f1603]
- Updated dependencies [7928a23]
- Updated dependencies [5a90757]
- Updated dependencies [0c00d1d]
- Updated dependencies [4645c5d]
- Updated dependencies [59ed05f]
- Updated dependencies [8dd0455]
- Updated dependencies [1469268]
- Updated dependencies [196172e]
- Updated dependencies [31a4e38]
- Updated dependencies [f916a20]
- Updated dependencies [726239d]
- Updated dependencies [1bd9f27]
- Updated dependencies [b7c64cc]
- Updated dependencies [8a70185]
  - @marigold/components@17.0.0
  - @marigold/system@17.0.0

## 4.0.2

### Patch Changes

- 89acee4: feat: Add a generic spacing scale that can be used with `createSpacingVar`
- Updated dependencies [89acee4]
- Updated dependencies [4ac589b]
- Updated dependencies [d720c5e]
- Updated dependencies [0b8ca1e]
- Updated dependencies [c5bd98b]
  - @marigold/components@16.1.0
  - @marigold/system@16.1.0

## 4.0.1

### Patch Changes

- Updated dependencies [77a64e8]
- Updated dependencies [b90a67e]
  - @marigold/components@16.0.1
  - @marigold/system@16.0.1

## 4.0.0

### Major Changes

- b947276: style(DST-1089): Add expand/collapse animation to `<Accordion>`
- f10119a: refa(DST-1109): Remove required indicator from the label's text content

  **BREACKING CHANGE:** We removed the `indicator` styling from `<Label>`. The component is no longer a multi-part component. Rather than styling the required indicator through a dedicated part (previsouly `indicator`), you can now apply it anyway you want, for example by using `'group-required/field:after:content-["*"]'`.

### Minor Changes

- 98bf929: [DST-1075]: Introduce `<FileField>`component

### Patch Changes

- 832e3fa: fix(styles): Remove extra spacing when hidden/a11y elements are causing it
- 13b5c4b: fix(DST-1112): Show focus ring of `<CloseButton>` only when focused with keyboard
- 2ac63f7: fix([DSTSUP-196]): Fix Listbox layout when more than one element is used.
- 57a2bd3: style([DST-1126]): Fix Breadcrumb styling
- 0040853: fix(docs): Remove old broken Tailwind plugins
- 62692a6: style(DST-1086): Add a new destructive button variant
- 4eebff4: [DSTSUP-191]:
  Breaking chnge: `<XLoader />` renamed to `<Loader />`
  Added a new prop `loaderType` which is by default `cycle`. New option `cycle` shows a spinning cycle.
- Updated dependencies [832e3fa]
- Updated dependencies [845f26c]
- Updated dependencies [1e98c67]
- Updated dependencies [9027ce9]
- Updated dependencies [b947276]
- Updated dependencies [2ac63f7]
- Updated dependencies [29494b4]
- Updated dependencies [98bf929]
- Updated dependencies [57a2bd3]
- Updated dependencies [62692a6]
- Updated dependencies [f10119a]
- Updated dependencies [4eebff4]
  - @marigold/components@16.0.0
  - @marigold/system@16.0.0

## 3.0.3

### Patch Changes

- 2d7f163: fix(SectionMessage): Fix Section Message Styles
  - @marigold/system@15.4.3
  - @marigold/components@15.4.3

## 3.0.2

### Patch Changes

- 961eaf5: fix: Make `grid-templates-areas` class more robust
  - @marigold/system@15.4.2
  - @marigold/components@15.4.2

## 3.0.1

### Patch Changes

- Updated dependencies [d710177]
  - @marigold/components@15.4.1
  - @marigold/system@15.4.1

## 3.0.0

### Major Changes

- 77e0417: fix([DST-1078]): Fix scrolling within `<ContextualHelp>`

### Minor Changes

- e985fe2: feat([DST-1091]): Add multiselection mode to `<Select>`

### Patch Changes

- f621653: feat([DSTSUP-187]): Enhance Toast component with action support
  - Introduced `action` property
  - Update description to support JSX

- 35df36a: style([DST-1082]): Use correct accordion font-size
- Updated dependencies [f621653]
- Updated dependencies [025d6e9]
- Updated dependencies [ffbebd0]
- Updated dependencies [e985fe2]
- Updated dependencies [9ec4620]
- Updated dependencies [77e0417]
  - @marigold/components@15.4.0
  - @marigold/system@15.4.0

## 2.3.0

### Minor Changes

- 4395d2e: feat([DST-1047]): Improve `<List>` styles and add `small` variant
- 5e62b84: feat([DST-1051]): Introduce `ConfirmationDialog`
- beeba04: feat([DST-1042]): Add "destrutive" variant to `<Menu.Item>`

### Patch Changes

- fa1f489: fix(Link): Add 'text-sm' class to Link component styles
- 217d415: fix([DST-1054]): Add missing font color in accordion component
- f22bfdd: fix([DST-1053]): Add missing background-color for Accordion
- 061b5e9: feat([DST-1050]): Card master and adminmark variant
- 89e2b70: fix(Tag): Adjust tag styles (no extra padding if empty state is small, e.g. only text)
- 8fa6736: fix([DST-1057]): Add missing background color for master and admin badge
- ce13acf: fix([DST-1046]): Remove extra padding at the bottom of `<Select>`.
- Updated dependencies [95b55b8]
- Updated dependencies [c6fb6c2]
- Updated dependencies [bad3ef4]
- Updated dependencies [ba5f502]
- Updated dependencies [4395d2e]
- Updated dependencies [97adc14]
- Updated dependencies [061b5e9]
- Updated dependencies [91a5e7b]
- Updated dependencies [baf550b]
- Updated dependencies [4ccbec2]
- Updated dependencies [5e62b84]
- Updated dependencies [ce996ae]
- Updated dependencies [beeba04]
  - @marigold/components@15.3.0
  - @marigold/system@15.3.0

## 2.2.0

### Minor Changes

- 6147cf9: style(DST-1041): Switch Master and Admin Colors

### Patch Changes

- @marigold/system@15.2.0
- @marigold/components@15.2.0

## 2.1.0

### Minor Changes

- a3ddf47: feat([DST-1037]): Add `description` (help text) to `<Checkbox>` component

### Patch Changes

- e46a11d: fix(Drawer): Apply `z-index` to prevent overlap
- Updated dependencies [7b3caca]
- Updated dependencies [a3ddf47]
- Updated dependencies [0583b77]
  - @marigold/components@15.1.0
  - @marigold/system@15.1.0

## 2.0.2

### Patch Changes

- 16ae83d: style([DST-1034]): update styles for headline levels
  - @marigold/system@15.0.2
  - @marigold/components@15.0.2

## 2.0.1

### Patch Changes

- df57868: Fix([DSTSUP-181]): Adjust Accordion.Header styles to support full width
- 00d230a: chore: allow `react-aria` patch version range as dependencies
- b351484: feat([DST-981]): Drawer supports controlling the origin of the `<Drawer>` by using `placement` property (e.g. left, right, top, bottom), also supports configurable sizes to adapt to different sizes.
- Updated dependencies [df57868]
- Updated dependencies [00d230a]
- Updated dependencies [b351484]
  - @marigold/components@15.0.1
  - @marigold/system@15.0.1

## 2.0.0

### Major Changes

- cd21a2c: refa([DST-1007]): Rename "secondary" to "default" variant and fix appearance demo

  **Breaking Change:** If you used `<Menu variant="secondary">` remove the variant prop.

### Minor Changes

- 2a64b4f: feat([DST-1008]): Introduce a "remove all" function for `<Tag.Group>`
- 41da911: feat([DST-1005]): Add a "link" variant to `<Button>`

### Patch Changes

- 9881913: feat([DST-728]): Animate `<Button>` on press
- bbed52e: fix: correct broken classnames in `<Pagination>` and `<Slider>`
- Updated dependencies [6d8358c]
- Updated dependencies [44ceb28]
- Updated dependencies [2a64b4f]
- Updated dependencies [7e33a7f]
- Updated dependencies [82370d2]
- Updated dependencies [80a4427]
- Updated dependencies [801e968]
- Updated dependencies [9bac182]
- Updated dependencies [62ac4b8]
- Updated dependencies [0585db1]
- Updated dependencies [17318a8]
- Updated dependencies [6d2d2d4]
- Updated dependencies [5e06780]
- Updated dependencies [41da911]
- Updated dependencies [13d27bf]
- Updated dependencies [1ab48da]
  - @marigold/components@15.0.0
  - @marigold/system@15.0.0

## 1.4.1

### Patch Changes

- 81f1c9d: fix broken release
- Updated dependencies [424e2f4]
- Updated dependencies [81f1c9d]
  - @marigold/components@14.1.1
  - @marigold/system@14.1.1
  - @marigold/theme-plugins@1.0.2

## 1.4.0

### Minor Changes

- cc493fc: feat([DST-737]): Add Toast component

  Added ToastProvider Component with corresponding documentation and stories. It's a small Temporary Notification on the edge of the screen, that should be used for messages that don’t need immediate interaction.

- 2163518: feat([DST-899]):Breadcrumb Component

  We added a new Breadcrumbs component to improve navigation and accessibility in the UI.
  It supports collapsing long breadcrumb lists, custom separators (chevron or slash), and integrates with react-aria-components for full accessibility and keyboard navigation.
  The component is flexible, supports links and custom content, and includes comprehensive documentation and usage examples.

### Patch Changes

- ea0f758: fix(DST-968): Fix `<Tag>` styles and add multiselect tag filter to filter pattern example
- 906c84f: refa([DST-969]): Remove obsolete "text" variant from `<Button>`
- 37f40ba: feat([DST-977]): Style icons inside `<Menu.Item>`
- Updated dependencies [cc493fc]
- Updated dependencies [930e633]
- Updated dependencies [8f550ec]
- Updated dependencies [69e7b61]
- Updated dependencies [ea0f758]
- Updated dependencies [8e178b7]
- Updated dependencies [2163518]
- Updated dependencies [37f40ba]
  - @marigold/components@14.1.0
  - @marigold/system@14.1.0

## 1.3.0

### Minor Changes

- 29e6133: feat([DST-937]): Add master and admin mark variants

### Patch Changes

- a7ec9d3: fix[DSTSUP-169]: Fix width property on Calendar component
- 5e08185: docs([DST-925]): Introduce "admin- and master mark" pattern
  fix([DST-925]): Adjust styles of Tabs to work better with badges
- 9311338: docs([DST-936]): Update tooltip page
- Updated dependencies [a7ec9d3]
- Updated dependencies [5e08185]
- Updated dependencies [6d61be9]
- Updated dependencies [29e6133]
  - @marigold/components@14.0.0
  - @marigold/system@14.0.0

## 1.2.0

### Minor Changes

- 0d7f9db: docs([DST-815]):Updated token display to use RUI theme structure. Replaced deprecated Core and B2B token references with RUI semantic tokens that align with the current design system.

### Patch Changes

- 9a5791c: docs([DST-914]): Update Divider docs to match new structure of component pages

  **Breaking Change**: Removed `className` property on this component.

- e31a116: [DSTSUP-161]: The `<Multiselect>` matches now our default `<input>` styles in RUI.
- 854e00b: refa([DST-871]): Enhance Inline component to dynamically align buttons with input fields when descriptions are present.
- c33ad07: docs([DST-921]): Revise text component page to new component page structure.

  **Breaking Change**: Some propertys has been removed, including `className` and HtMLElement props.

- Updated dependencies [9a5791c]
- Updated dependencies [854e00b]
- Updated dependencies [430c266]
- Updated dependencies [c33ad07]
- Updated dependencies [98bea2e]
- Updated dependencies [16f6dbb]
- Updated dependencies [d224a2f]
  - @marigold/components@13.0.0
  - @marigold/system@13.0.0

## 1.1.5

### Patch Changes

- Updated dependencies [a6bcd89]
  - @marigold/components@12.0.5
  - @marigold/system@12.0.5

## 1.1.4

### Patch Changes

- 3e19b71: feat([DST-883]): New variant for RUI table. You can now use a new variant for RUI theme.
- ed72011: feat(DSTSUP-150): add `ghost` version to `<Menu>` + normalize svg sizes in buttons and menus
- 6c230c7: feat[DST-731]: Add ContextualHelp Component with Docs
  We added a new ContextualHelp component to provide inline help and guidance within the UI.
  It displays contextual information in a popover triggered by an icon button, with configurable placement, size, and icon variant (help or info).
  The component is accessible, supports both controlled and uncontrolled open states, and is designed for flexible content layout.
- befd17d: chore([DST-882]): Remove default right alignment in RUI table
- 17d28b5: feat([DST-885]): update default `<Link>` styles and add link variant
- 5127d58: feat([DST-884]): add vertical alignment property (alignY) to table
- Updated dependencies [3e19b71]
- Updated dependencies [ed72011]
- Updated dependencies [6c230c7]
- Updated dependencies [17d28b5]
- Updated dependencies [5127d58]
  - @marigold/components@12.0.4
  - @marigold/system@12.0.4

## 1.1.3

### Patch Changes

- 12b00ed: feat[DST-856]: Add TimeField Component

  We added a new TimeField component to support time-based user input.
  It allows users to select and edit time values, with configurable granularity (hours, minutes, seconds) and optional 12/24-hour format.
  The component supports accessibility features like keyboard navigation.

- be782c3: feat([DST-864]): Add `full` to `size` options to `Card` so that it spans the availble width
- Updated dependencies [7451134]
- Updated dependencies [12b00ed]
- Updated dependencies [73edbb0]
  - @marigold/components@12.0.3
  - @marigold/system@12.0.3

## 1.1.2

### Patch Changes

- ca26659: refa([DST-715]): Refactor `<Calendar>` component, Fix resizing when open calendar listboxes
- Updated dependencies [0bca5d8]
- Updated dependencies [ca26659]
  - @marigold/components@12.0.2
  - @marigold/system@12.0.2

## 1.1.1

### Patch Changes

- 0e8211b: chore([DST-853]): Refa styles for `<Menu>` button
- af401e5: fix([DSTSUP-135]): Use correct padding on `<MultiSelect>` component
- 2a96627: ([DST-862]): Update RUI link styles and remove empty variants
- f2cbc72: refa([DST-858]): remove border and circle from badges
- 534ad77: refa([DST-738]): Adding checkmark icon as selection indicator in RUI theme for SelectList and Listbox components.
- Updated dependencies [0e8211b]
- Updated dependencies [af401e5]
- Updated dependencies [534ad77]
  - @marigold/components@12.0.1
  - @marigold/system@12.0.1

## 1.1.0

### Minor Changes

- 438b959: feat([DSTSUP-112]): Add sizes to RUI's `<Dialog>`
- 2ed500d: feat([DST-804]): Allow `Tag` to be used in forms and overhaul its docs

  BREACKING CHANGE: Remove the `allowsRemoving` prop. This didn't had an effect for a while and to make it more clear removing is enabled, if there is a function set on the `onRemove` prop.

### Patch Changes

- beaa990: styles([DSTSUP-128]): Fix `disabled` styles for `Radio` and `Checkbox`
- 15b844d: fix([DST-811]): Add color to tabs separator
- d71d9ab: styles([DST-823]): adjust RUI `<NumberField>` background styles
- Updated dependencies [d7cfabd]
- Updated dependencies [438b959]
- Updated dependencies [20ecd9c]
- Updated dependencies [fe4b9de]
- Updated dependencies [4e510fb]
- Updated dependencies [9d57c1f]
- Updated dependencies [2ed500d]
- Updated dependencies [4e0971e]
- Updated dependencies [c30993e]
  - @marigold/components@12.0.0
  - @marigold/system@12.0.0

## 1.0.1

### Patch Changes

- 70399e4: style([DST-724]): Adjust required icon for form elements in RUI style
- 25c37c6: refa([DST-800]): Simplify animation in `<Drawer>`
- 798e410: fix([DST-794]): Set correct outline on focus for input and textarea
- 87e7f4d: feat:([DSTSUP-110]): Add surface tokens to the theme and creates Tailwind utils to apply the (`utils-surface-{sunken,body,raised,overlay}`)
- 1e5ce6e: refa([DST-681]): Simplify label required classes
- 16b9e54: fix([DSTSUP-123]): Adjust z-index of table styles for sticky header
- 2a87f43: feat[DST-759]: Implement `<CloseButton>` component to be re-used into other components internally (e.g Dialog, Tag, Drawer and SectionMessage).
- Updated dependencies [8dab2e6]
- Updated dependencies [70399e4]
- Updated dependencies [c9b95bc]
- Updated dependencies [337f9ee]
- Updated dependencies [d24cee3]
- Updated dependencies [4686a0d]
- Updated dependencies [c42767f]
- Updated dependencies [2a87f43]
  - @marigold/components@11.5.0
  - @marigold/system@11.5.0

## 1.0.0

### Major Changes

- 81b2216: refa([DST-720]): Rename `option` to `item` in styles for `<ListBox>`

  **Breaking Change**: This change will break your styles if you use custom styles for the `<ListBox>` Component. `option` is now called `item`.

### Patch Changes

- 953cf3d: Making the dialog titles independant
- 334abb9: chore([DSTSUP-111]): Icon size in `<SectionMessage>`
- Updated dependencies [81b2216]
- Updated dependencies [953cf3d]
  - @marigold/components@11.4.1
  - @marigold/system@11.4.1

## 0.5.0

### Minor Changes

- 0e1e515: feat: adding multiselect rui styles

### Patch Changes

- @marigold/system@11.4.0
- @marigold/components@11.4.0

## 0.4.0

### Minor Changes

- 611c2e8: feat(733): Introduce a `<Drawer>` component
- 7554cf9: refa([DST-755]): Cleanup `NumberField` styles for RUI + left align text when stepper is hidden

### Patch Changes

- 599ef6b: fix([DST-752]): use `rgba` instead of `alpha` value in our theme.css
- a7a9e2c: fix: Use stone value without rgba to keep oklch color
- 8b404d2: fix([DST-750]): Do not set styles for content in `<Accordion>`
- Updated dependencies [888e852]
- Updated dependencies [08ba5c7]
- Updated dependencies [611c2e8]
- Updated dependencies [8b404d2]
- Updated dependencies [7554cf9]
  - @marigold/components@11.3.0
  - @marigold/system@11.3.0

## 0.3.2

### Patch Changes

- 3d1f8c6: feat(rui): Next version of RUI theme with small updates and styling fixes.
- Updated dependencies [3d1f8c6]
  - @marigold/components@11.2.3
  - @marigold/system@11.2.3

## 0.3.1

### Patch Changes

- f775048: Fix mixins

## 0.3.0

### Minor Changes

- 9412037: RUI theme release 0.3.0

### Patch Changes

- 933b49a: fix(rui): Correctly apply padding when `<Input>` has an icon/action
- ec860e7: fix(rui): Correctly apply error styles in fields
- 3b734cc: fix(rui): Correctly display readonly state
- Updated dependencies [9412037]
- Updated dependencies [91c72e8]
  - @marigold/components@11.2.2
  - @marigold/system@11.2.2

## 0.2.0

### Minor Changes

- 40db199: feat(rui): Add more styles to components

### Patch Changes

- Updated dependencies [40db199]
- Updated dependencies [619b4b2]
  - @marigold/components@11.2.1
  - @marigold/system@11.2.1

## 0.1.1

### Patch Changes

- Updated dependencies [c387b43]
- Updated dependencies [a31881d]
- Updated dependencies [c387b43]
  - @marigold/components@11.2.0
  - @marigold/system@11.2.0

## 0.1.0

### Minor Changes

- 3d7aaad: feat(DST-693): Expose `theme.css` files from packages

### Patch Changes

- Updated dependencies [be665e7]
  - @marigold/components@11.1.1
  - @marigold/system@11.1.1

## 0.0.5

### Patch Changes

- Updated dependencies [fd96b48]
- Updated dependencies [300bfba]
  - @marigold/components@11.1.0
  - @marigold/system@11.1.0

## 0.0.4

### Patch Changes

- Updated dependencies [8e58923]
  - @marigold/components@11.0.2
  - @marigold/system@11.0.2

## 0.0.3

### Patch Changes

- @marigold/system@11.0.1
- @marigold/components@11.0.1

## 0.0.2

### Patch Changes

- Updated dependencies [964e025]
- Updated dependencies [82c869c]
- Updated dependencies [d96b809]
  - @marigold/components@11.0.0
  - @marigold/system@11.0.0

## 0.0.1
