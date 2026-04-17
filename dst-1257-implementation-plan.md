# DST-1257 — Build the `Panel` component

## Context

Marigold needs a standard, opinionated way to organize page content into visually distinct, labeled sections. Today this is built ad-hoc with `Stack + Headline`, `Accordion variant="card"`, or `Card variant="master|admin"` — which conflates "page section" with "collection item" (Card's true purpose) and produces inconsistent hierarchy across pages.

This task introduces **`Panel`** as a compound component for page-level content sectioning. Name selected after researching 16 design systems (`dst-1257-naming-research.md`); PatternFly is the closest precedent for shipping `Card` (collection items) and `Panel` (page sections) side-by-side.

Outcome: settings, form, and admin pages in the ticketing product are built from `Panel`s with consistent header/content/footer structure, variants, and accessibility semantics.

Jira: [DST-1257](https://reservix.atlassian.net/browse/DST-1257). Work is split into sub-tasks (see phase headings below); each sub-task ships as its own PR targeting `beta-release`.

## Decisions taken

| Topic                                      | Choice                                                                                                                                                                                                                                                                                     |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Component name                             | `Panel`                                                                                                                                                                                                                                                                                    |
| Internal primitive for `Panel.Collapsible` | RAC `Disclosure` directly (skip Marigold's `Collapsible`)                                                                                                                                                                                                                                  |
| `destructive` variant on existing `Card`   | **No** — Panel-only; Card stays at `default \| master \| admin`                                                                                                                                                                                                                            |
| Root semantics                             | Render `<section>` + auto-wired `aria-labelledby` from `Panel.Title`. Also accepts `aria-label` as override (required when no Title).                                                                                                                                                      |
| Required slots                             | None strictly required. **Only hard rule:** Panel must have either a visible `Panel.Title` or an `aria-label` prop — enforced via `React.Children` inspection at render (no `useEffect`).                                                                                                  |
| Header layout                              | CSS grid: `grid-template-columns: 1fr auto; grid-template-areas: "title actions" / "description actions"`. Actions placed via `grid-area` (JSX source order irrelevant). Empty Actions collapses `auto` column to 0 width.                                                                 |
| Description with Actions                   | Stays under Title in the left column (grid row 2, column 1)                                                                                                                                                                                                                                |
| Padding API                                | Direct `inset` prop on `Panel.Content` and `Panel.CollapsibleContent`                                                                                                                                                                                                                      |
| `inset` mechanism                          | Follows `Inset.tsx` pattern: `createSpacingVar('inset', token)` + Tailwind `p-(--inset)`. **Not** a CVA variant — prop-driven via CSS variable.                                                                                                                                            |
| `inset` value type                         | `InsetSpacingTokens` (which now includes `'none'` — no numeric Scale)                                                                                                                                                                                                                      |
| `inset` default                            | `square-regular`                                                                                                                                                                                                                                                                           |
| Padding location                           | **On each slot** (`Header`, `Content`, `Footer`, `CollapsibleContent`), **never on the root**. Prevents focus outlines on inner elements from being clipped by the Panel border/border-radius.                                                                                             |
| `Panel.Footer` in v1                       | Yes (Danger Zone example needs it)                                                                                                                                                                                                                                                         |
| `Panel.Title` element                      | RAC `<Heading level={N}>` + `classNames.title`. Panel-owned typography (does **not** reuse `Headline`). `level` defaults to `2`, range 2–6. Title writes `titleLevel` and `hasTitle` into context.                                                                                         |
| `Panel.Collapsible` API                    | **D-flat** compound: `Panel.Collapsible` (wraps RAC `Disclosure`), `Panel.CollapsibleTrigger` (renders `<Heading level={…}><Button slot="trigger">…</Button></Heading>`), `Panel.CollapsibleContent` (renders `<DisclosurePanel>` + `inset` prop). RAC `isExpanded` renamed to `expanded`. |
| Collapsible heading level                  | Auto-derived from context: `titleLevel + 1` when `hasTitle` is true, else `titleLevel` (default h2). Ensures correct heading outline for both Title+Collapsible and Collapsible-only panels.                                                                                               |
| Collapsible full-width                     | Spans full Panel width (ignores `Panel.Content`'s inset). `Panel.CollapsibleContent`'s own `inset` prop controls internal padding.                                                                                                                                                         |
| Slot dividers                              | `[&:not(:first-child)]:border-t` on Content / Collapsible / Footer siblings. Works for every slot permutation without conditional logic.                                                                                                                                                   |
| Context shape                              | `{ classNames, variant, titleId, titleLevel, hasTitle }`. Root calls `useClassNames` once, passes slotted result down. No `setTitleId`.                                                                                                                                                    |
| `forwardRef`                               | Skip on all sub-components in v1. Re-add if a real consumer need surfaces.                                                                                                                                                                                                                 |
| Variant set                                | `default \| master \| admin \| destructive` (renamed from `danger` — semantic parity with button variants).                                                                                                                                                                                |
| Variant visual treatment                   | **Exploration**: colored border + light gradient fade from edge into normal Card bg (alternative: inset border). Validate with design before locking in.                                                                                                                                   |
| Variant token sources                      | `master` → `--color-access-master-*`, `admin` → `--color-access-admin-*`, `destructive` → existing **`--color-destructive-*`** (no new tokens needed).                                                                                                                                     |
| Documented content scenarios               | `form`, `table`, `settings` (docs only — not a prop)                                                                                                                                                                                                                                       |
| Example-page migration                     | In scope — Phase 7 sub-task ([DST-1331](https://reservix.atlassian.net/browse/DST-1331))                                                                                                                                                                                                   |
| MDX docs + anatomy diagram                 | In scope — Phase 6 sub-task ([DST-1330](https://reservix.atlassian.net/browse/DST-1330))                                                                                                                                                                                                   |

---

## Implementation checklist

### Phase 1 — Foundations (theme + tokens) ✅ &nbsp; ·&nbsp; [DST-1325](https://reservix.atlassian.net/browse/DST-1325)

- [x] Add a universal `NoSpacingToken = 'none'` to `packages/system/src/types/tokens.ts` and include it in all three spacing families: `SpacingTokens`, `PaddingSpacingTokens`, `InsetSpacingTokens`. This makes `'none'` work for any spacing prop (gap, single-axis padding, inset recipes).
- [x] Add `--spacing-none: --spacing(0)` to `themes/theme-rui/src/theme.css` (placed above the relational/padding/inset blocks since it's universal). Resolves `var(--spacing-none)` whenever `space="none"` / `inset="none"` is used.
- [x] ~~Add `--color-access-danger` tokens~~ — **not needed**. Panel's `danger` variant reuses the existing `--color-destructive-*` tokens (`destructive`, `destructive-foreground`, `destructive-accent`, `destructive-bold`) already defined in `themes/theme-rui/src/theme.css`. `master` and `admin` continue to use `--color-access-master-*` / `--color-access-admin-*`.
- [x] `pnpm typecheck:only` — passes.

### Phase 2 — Component scaffold &nbsp; ·&nbsp; [DST-1326](https://reservix.atlassian.net/browse/DST-1326)

- [ ] Create folder `packages/components/src/Panel/`.
- [ ] `Context.tsx` — `PanelContext` with `{ classNames, variant, titleId, titleLevel, hasTitle }`. Root generates `titleId` via `useId()`, calls `useClassNames` once, and provides slotted result via context. No `setTitleId`. Optionally export a `usePanelContext()` hook.
- [ ] `Panel.tsx` — root component. Renders `<section>` with `aria-labelledby={titleId}` (or `aria-label` when passed). Generates `titleId` via `useId()`. Validates via `React.Children` inspection: must have either a `PanelTitle` descendant in Header or an `aria-label` prop — throw in render if neither. Sub-components assigned: `Header`, `Title`, `Description`, `Actions`, `Content`, `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`, `Footer`.
- [ ] `PanelHeader.tsx` — CSS grid: `grid-template-columns: 1fr auto; grid-template-areas: "title actions" "description actions"`. Title+Description in left column, Actions in right column via `grid-area`. Empty Actions collapses `auto` column to 0 width.
- [ ] `PanelTitle.tsx` — renders RAC `<Heading level={level}>` (default `2`, range 2–6) + `classNames.title`. Sets `id` from `ctx.titleId`. Panel-owned typography (does not reuse `Headline`). Writes `titleLevel` and `hasTitle` into context.
- [ ] `PanelDescription.tsx` — renders `<p>` with `classNames.description` (subdued styling).
- [ ] `PanelActions.tsx` — right-aligned slot wrapper via `grid-area: actions`.
- [ ] `PanelContent.tsx` — accepts `inset?: InsetSpacingTokens` (default `'square-regular'`). Uses `createSpacingVar('inset', token)` + Tailwind `p-(--inset)` (same pattern as `Inset.tsx`). `inset="none"` resolves to `padding: 0` via Phase 1's `--spacing-none` token.
- [ ] `PanelCollapsible.tsx` — wraps RAC `<Disclosure>`. Props: `defaultExpanded`, `expanded` (renamed from `isExpanded`), `onExpandedChange`. Children: `CollapsibleTrigger` + `CollapsibleContent`.
- [ ] `PanelCollapsibleTrigger.tsx` — renders `<Heading level={titleLevel + 1 | titleLevel}><Button slot="trigger">{children}</Button></Heading>`. Level auto-derived: `titleLevel + 1` when `hasTitle`, else `titleLevel`. Chevron icon rotates on expand.
- [ ] `PanelCollapsibleContent.tsx` — renders RAC `<DisclosurePanel>`. Accepts `inset?: InsetSpacingTokens` (default `'square-regular'`), same `createSpacingVar` mechanism as `PanelContent`.
- [ ] `PanelFooter.tsx` — bottom action bar with `classNames.footer`.
- [ ] Slot dividers: `[&:not(:first-child)]:border-t` applied on Content / Collapsible / Footer siblings. Works for every permutation.
- [ ] Export `Panel`, `PanelProps` from `packages/components/src/index.ts` (mirror Dialog export pattern). Sub-component prop types not re-exported at top level.

### Phase 3 — Theme styles &nbsp; ·&nbsp; [DST-1327](https://reservix.atlassian.net/browse/DST-1327)

- [ ] Create `themes/theme-rui/src/components/Panel.styles.ts` as a plain object of `cva()` calls (one per slot, mirroring `Accordion.styles.ts` structure).
- [ ] Slots: `root`, `header`, `title`, `description`, `actions`, `content`, `collapsibleTrigger`, `collapsibleContent`, `footer`.
- [ ] Base styling on root: raised elevation (`shadow-elevation-raised`), `rounded-md`, neutral surface bg, **no padding** (padding lives on each slot). Overflow hidden for rounded corners.
- [ ] Per-slot padding: `header` and `footer` get fixed opinionated padding from theme; `content` and `collapsibleContent` padding is **prop-driven** via `createSpacingVar` + `p-(--inset)` (not a CVA variant); `collapsibleTrigger` owns its own padding from the theme. **Never put padding on root** — focus rings on inner elements would be clipped by the Panel's `rounded-md` / border.
- [ ] Slot dividers: `[&:not(:first-child)]:border-t` as base class on `content`, `collapsibleTrigger` (the `Disclosure` wrapper), and `footer` — creates dividers between any adjacent slot siblings without conditional logic.
- [ ] Variant treatment (exploration):
  - [ ] First pass: 1px colored border + linear-gradient bg fade from the variant's color (low alpha) into the normal surface. Token sources: `master` → `--color-access-master-*`, `admin` → `--color-access-admin-*`, `destructive` → `--color-destructive-*`.
  - [ ] Build a side-by-side Storybook story comparing all four Panel variants against the Card variants.
  - [ ] Iterate visually until satisfactory; validate with design before merging.
- [ ] Register Panel styles in the theme-rui component registry (mirror Card registration).

### Phase 4 — Stories &nbsp; ·&nbsp; [DST-1328](https://reservix.atlassian.net/browse/DST-1328)

- [ ] Create `Panel.stories.tsx` using `preview.meta({...})` (mirror `Card.stories.tsx:8`).
- [ ] `Basic` — Header + Title + Content with form fields.
- [ ] `WithDescription` — Title + Description in header.
- [ ] `WithActions` — Title + Actions (e.g., overflow menu top-right).
- [ ] `WithDescriptionAndActions` — verify left-column wrap behavior.
- [ ] `WithCollapsible` — Content + one Panel.Collapsible.
- [ ] `WithMultipleCollapsibles` — uncommon case, documented.
- [ ] `WithFooter` — Danger Zone style with destructive action in footer.
- [ ] `Variants` — default / master / admin / destructive side-by-side.
- [ ] `VariantsVsCard` — comparison story to validate visual treatment.
- [ ] `TableInside` — `inset="none"` with a Table extending edge-to-edge.
- [ ] `FullPage` — multi-Panel settings page with page-level Save/Cancel outside.
- [ ] All interactive stories tagged `['component-test']` with `play` functions.

### Phase 5 — Tests &nbsp; ·&nbsp; [DST-1329](https://reservix.atlassian.net/browse/DST-1329)

> **Plan reconciliation** — the implementation landed with a different spacing/heading shape than originally drafted:
>
> - Padding is a **single prop set on the root** (`p` / `px` / `py`) that fans out to every slot via `--panel-px` / `--panel-py` CSS variables. `Panel.Content` / `Panel.CollapsibleContent` expose a `bleed` boolean (not `inset`) to opt out of the horizontal padding for tables/media.
> - Section spacing uses `space` on the root (default `regular`), exposed as `--panel-gap`.
> - Heading level uses `headingLevel` on the root (default `2`). `Panel.Title` renders at `headingLevel`; `Panel.CollapsibleTrigger` renders at `min(headingLevel + 1, 6)` when a Title is present, else `headingLevel` (default h2). Presence of a Title is tracked via `useSlot` (ref-callback), not `React.Children` inspection.
>
> Tests below reflect the shipped API.

- [ ] Create `Panel.test.tsx` importing stories (mirror `Card.test.tsx:1-3`).
- [ ] `Rendering` — root is `<section>`, has `aria-labelledby` matching Title's `id`; collapsible-only panel uses `aria-label` and omits `aria-labelledby`.
- [ ] `Sub-components` — Header / Title / Description / HeaderActions / Content / Footer render in their grid-area slots.
- [ ] `headingLevel prop` — default `2`; explicit `3`–`6` render the correct `<h3>`–`<h6>` element on `Panel.Title`.
- [ ] `Header layout` — Description stays under Title when HeaderActions are present (`[grid-area:description]` on the left column).
- [ ] `Spacing props` — `space` default `regular` resolves `--panel-gap` to `var(--spacing-regular)`; numeric scale resolves via `calc(var(--spacing) * N)`; `p="square-loose"` drives both `--panel-px` and `--panel-py` to `var(--spacing-square-loose-x/-y)`; `px` / `py` pairs override independently. Values flow to `Panel.Header`, `Panel.Content`, `Panel.Footer`, and `Panel.CollapsibleContent` via the inherited CSS vars (`px-(--panel-px)` on each slot).
- [ ] `bleed prop` — `Panel.Content bleed` and `Panel.CollapsibleContent bleed` drop the `px-(--panel-px)` utility to render edge-to-edge.
- [ ] `Variants` — variant classes applied by `useClassNames` (`default`, `master`, `admin`, `destructive`) land on root.
- [ ] `Collapsible interaction` — uncontrolled (Space/Enter/click toggles `aria-expanded`, chevron rotates), controlled (`expanded` + `onExpandedChange`).
- [ ] `Collapsible heading level` — renders at `headingLevel + 1` when Title present, else `headingLevel`; clamps to `h6`.
- [ ] `Multiple Collapsibles` — each independent (no shared state).
- [ ] `Collapsible-only panel` — no Title, `aria-label` on root, Collapsible trigger renders at `headingLevel` (default `h2`).
- [ ] Story-level play tests tagged `['component-test']` cover toggle, keyboard, and controlled behaviour (`Basic`, `WithCollapsible`, `WithMultipleCollapsibles`, `ControlledCollapsible`).
- [ ] `Coverage` meets 90% statements/functions/lines, 85% branches.

### Phase 6 — Documentation &nbsp; ·&nbsp; [DST-1330](https://reservix.atlassian.net/browse/DST-1330)

- [ ] Create `docs/content/components/panel/panel.mdx` following the existing component-docs MDX pattern.
- [ ] Anatomy diagram showing all sub-components labeled.
- [ ] Usage section: Basic, with Description, with Actions, with Footer, with Collapsible.
- [ ] Content-scenario guidance:
  - [ ] **Form content** → use default `inset="square-regular"`.
  - [ ] **Table content** → use `Panel.Content` with `bleed` prop. Document that edge alignment relies on the `--cell-edge-padding` CSS variable in the Table theme styles. Themes that want Panel-Table integration must set `[--cell-edge-padding:var(--panel-px,var(--cell-x-padding))]` on the `table` slot (theme-rui already does this).
  - [ ] **Settings content** → typically default; use `inset="square-relaxed"` for breathing room.
- [ ] Do/don't section:
  - [ ] DON'T nest Panels (`Panel > Panel` is forbidden).
  - [ ] DON'T put Cards inside Panels or vice versa.
  - [ ] DON'T put page-level Save/Cancel inside Panel.Footer.
  - [ ] DO use `Panel.Footer` only for panel-scoped destructive actions.
- [ ] Panel-vs-Card distinction explained at the top.
- [ ] Demo files (interactive) following the existing component-docs pattern.

### Phase 7 — Example-page migration &nbsp; ·&nbsp; [DST-1331](https://reservix.atlassian.net/browse/DST-1331)

- [ ] `docs/app/(examples)/inventory/Settings.tsx` — wrap each tab-panel section in `<Panel>` with Title + Content.
- [ ] `docs/app/(examples)/pattern/form/eventDetails.tsx` — replace `Stack + Headline + Accordion variant="card"` with `Panel + Panel.Collapsible`.
- [ ] `docs/app/(examples)/pattern/form/locationSettings.tsx` — same migration.
- [ ] `docs/app/(examples)/pattern/form/organizerInfo.tsx` — replace `<Card variant="master">` page-section anti-pattern with `<Panel variant="master">`.
- [ ] `docs/app/(examples)/pattern/form/registrationSettings.tsx` — same migration.
- [ ] `docs/app/(examples)/pattern/form/page.tsx` — adjust top-level spacing (`<Stack space="section">` between Panels).
- [ ] Visually verify each migrated page in `pnpm start`.

### Phase 8 — Wrap-up &nbsp; ·&nbsp; [DST-1332](https://reservix.atlassian.net/browse/DST-1332)

- [ ] `pnpm changeset` — minor bump for `@marigold/components` and `@marigold/theme-rui` for the Panel work. (`@marigold/system` was already bumped in Phase 1 / [DST-1325](https://reservix.atlassian.net/browse/DST-1325) for the universal `'none'` token.)
- [ ] `pnpm format` — apply.
- [ ] `pnpm lint` — must pass.
- [ ] `pnpm typecheck:only` — must pass.
- [ ] `pnpm test:unit` — Panel tests pass.
- [ ] `pnpm test:sb` — story tests pass.
- [ ] `pnpm test:coverage` — thresholds met.
- [ ] `pnpm build` — affected packages build clean.
- [ ] Each sub-task PR uses its own ticket key in the commit/PR prefix (e.g. `feat(DST-1326):` for Phase 2). Target branch is always `beta-release`.
- [ ] Open PR; link to Jira sub-task; note the variant visual treatment is exploratory and request design review.

---

## Verification (end-to-end)

- [ ] `pnpm sb` → open Storybook, walk every Panel story, run a11y addon (zero violations expected).
- [ ] Screen-reader smoke test: `<section>` is announced as a labeled region with the Title text as accessible name.
- [ ] `pnpm start` (after `pnpm build`) → docs site at localhost:3000:
  - [ ] Panel docs page renders with anatomy + demos.
  - [ ] `/inventory/settings` renders correctly with migrated Panels.
  - [ ] `/pattern/form` renders correctly with migrated Panels.
- [ ] Keyboard test on `Panel.Collapsible`: Space/Enter toggles; chevron rotates; focus stays on trigger after toggle.
- [ ] Tab order through a Panel with Header Actions + Content + Collapsible + Footer is logical (DOM order).
- [ ] **Focus rings not clipped**: tab through Buttons/Inputs at the edges of `Panel.Header`, `Panel.Content`, `Panel.Footer`. Confirm the focus outline is fully visible (not cut off by the Panel's rounded corners or border). This is the reason padding lives on slots, not on root.

---

## Reference: patterns to reuse

- **Compound shape**: `packages/components/src/Dialog/Dialog.tsx` (search for `DialogComponent extends ForwardRefExoticComponent`) and `packages/components/src/Dialog/Context.tsx`. Note: Panel skips `forwardRef` in v1.
- **Collapsible sub-component pattern**: `packages/components/src/Collapsible/Collapsible.tsx` — wraps RAC `Disclosure` + attaches `.Trigger` / `.Content`. Panel's `Collapsible` / `CollapsibleTrigger` / `CollapsibleContent` follows same shape.
- **Accordion context-driven classNames**: `packages/components/src/Accordion/Accordion.tsx` — root calls `useClassNames` once, passes slotted result via provider. Panel follows this pattern (classNames in context, not per-sub-component).
- **RAC Disclosure heading trigger**: `packages/components/src/Accordion/AccordionHeader.tsx` — wraps `<Heading><Button slot="trigger">…</Button></Heading>`. Panel's `CollapsibleTrigger` follows same RAC idiom.
- **Theme styles**: `themes/theme-rui/src/components/Accordion.styles.ts` — plain object of `cva()` calls (one per slot). Panel uses same structure.
- **Stories meta**: `packages/components/src/Card/Card.stories.tsx` (`preview.meta({...})`).
- **Import-story tests**: `packages/components/src/Card/Card.test.tsx` (top-level story imports like `import { Basic } from './Card.stories'`).
- **Inset mechanism**: `packages/components/src/Inset/Inset.tsx` — `createSpacingVar('space', token)` + Tailwind `p-(--space)`. Panel's `Content` and `CollapsibleContent` use same approach with `createSpacingVar('inset', token)` + `p-(--inset)`.
- **Inset tokens**: `packages/system/src/types/tokens.ts` — `InsetSpacingTokens` (includes universal `'none'`), `PaddingSpacingTokens`, `SpacingTokens`.
- **Spacing token `'section'`**: part of `SpacingTokens` — use `<Stack space="section">` between Panels.
- **Destructive color tokens**: `--color-destructive-*` in `themes/theme-rui/src/theme.css` — use for Panel `destructive` variant (no new access-\* tokens needed).
- **Z-index policy** (per CLAUDE.md): do NOT add `z-*` classes to `Panel.styles.ts`; apply in component implementation if needed (likely none).
