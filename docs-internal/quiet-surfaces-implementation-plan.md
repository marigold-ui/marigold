# Quiet Surfaces — Implementation Plan

**Status:** planned, not started
**Jira:** [DST-1602](https://reservix.atlassian.net/browse/DST-1602) (Unplanned, under epic DST-1601)
**Base:** `feat/sidebar-nav-hierarchy` (PR [#5589](https://github.com/marigold-ui/marigold/pull/5589)). PR #5566 (the DST-1565 rework this builds on) has **landed on `beta-release`** as a squash merge, and #5589 has been merged up to date with it — so this work now stacks directly on `feat/sidebar-nav-hierarchy`, which is clean on `beta-release`.
**Author of the picks:** Sebastian, from three design explorations (see [Sources](#sources))

> ⚠️ **Utility rename — read before touching CSS.** The canonical #5566 that
> landed on `beta-release` renamed and restructured the surface utilities. There
> is now one primitive, `ui-frame` (fill + rim + radius), with **sibling** roles
> built on it — `ui-surface` (quiet decorative hairline) and `ui-control` (dense
> control edge) — plus two standalone modeled variants, `ui-contrast` (dark cap,
> primary/ActionBar) and `ui-contrast-destructive`. The old names this plan was
> first written against map as: `ui-surface-contrast`→`ui-contrast`,
> `ui-surface-control`→`ui-control`, `ui-surface-destructive`→`ui-contrast-destructive`.
> The porcelain surface added below is named **`ui-porcelain`** to sit in that
> family (a light-end sibling of `ui-contrast`). All steps use the new names.

This is the next iteration of the surface/shadow/ring rework. It combines three
independently explored and **picked** directions into one coherent visual move:

| Domain                          | Picked direction                       | Explored on               |
| ------------------------------- | -------------------------------------- | ------------------------- |
| Secondary button                | **G · Porcelain** (C edge × D fill)    | `design/secondary-button` |
| Input / control fields          | **1 · Quiet Flat** (fallback: 2 · Firm Edge) | `design/secondary-button` |
| Surfaces (card, panel, overlay) | **C · Tonal Quiet** (scoped to surfaces) | `design/subtle-refresh`   |

## The reconciled material logic

One sentence: **nothing in normal flow casts a shadow anymore — buttons are soft
raised caps, fields are flat wells, panels are layers of fill on a deeper page,
and the overlay shadow becomes the single, unmistakable signal for "floats
above the page".**

- **Primary / destructive buttons: unchanged.** They keep the dark modeled
  `ui-contrast` recipe. Tonal Quiet's flattened primary
  (`--contrast-* : 0`) is explicitly **not** adopted — the modeled look was the
  anchor the secondary button was aligned _to_.
- **Secondary button → Porcelain:** near-white convex cap (charcoal-50 gradient)
  with a modeled ring derived from a separate edge base (charcoal-200 − 0.12 L)
  and a soft top glint. No drop shadow, no engraved line, no keycap platform.
- **Fields → Quiet Flat:** flat white wells with the existing translucent
  hairline (`--color-control-border`, unchanged). Drop shadow and engraved
  bottom line removed. Focus / error / disabled behavior untouched.
  Fallback if the hairline proves too faint at form density: **Firm Edge** —
  raise the hairline alpha 0.26 → 0.44 (≈ 3.05:1, the WCAG 1.4.11 floor).
- **Cards / panels → Tonal Quiet:** the page ground deepens so white panels
  read as layers by fill delta alone; the decorative rim drops to a whisper;
  the `raised` shadow tier is retired; structural lines soften.
- **Overlays:** keep the overlay shadow tier (now the only shadow in the
  system), lighten the modal backdrop, and **evaluate** whether the shadow
  needs strengthening now that it carries hierarchy alone (procedure + exact
  candidate values in [Step 9](#step-9--overlay-elevation-check)).

### Contrast contract (light theme, computed)

Text ≥ 4.5:1 everywhere; meaningful non-text edges target ~3:1 as a floor, and
the system's deliberate sub-floor stance on resting control edges continues
(the focus ring remains the perceivable affordance).

| Element                                | Value                             | vs white | vs new page (0.945) |
| -------------------------------------- | --------------------------------- | -------- | ------------------- |
| Porcelain ring (rest / hover)           | from 200/300 − 0.12 L             | 1.87 / 2.31 | 1.59 / 1.96      |
| Porcelain cap bottom (rest)             | oklch(0.965 …)                    | 1.11     | 1.06                |
| Field edge (Quiet Flat, unchanged)      | 950 @ 0.26                        | 1.83     | 1.56                |
| Field edge (Firm Edge fallback)         | 950 @ 0.44                        | **3.05** | 2.59                |
| Surface rim (new whisper)               | 950 @ 0.05                        | 1.11     | —                   |
| Structural line (new)                   | oklch(0.925 0.004 54) opaque      | 1.25     | —                   |
| White panel vs page                     | fill delta                        | —        | 1.18                |
| Foreground text (charcoal-900)          | on white / on page                | 17.3     | 14.75               |
| Secondary text (charcoal-600)           | on white / on page                | 5.5      | **4.70** (≥ 4.5 ✓)  |
| Placeholder (charcoal-600) on white     |                                   | 5.52     | —                   |

Known, accepted tradeoffs (all carried over from the picked moodboards):

- On the page ground the Porcelain cap is close to the page fill (1.06:1) —
  the ring (1.59:1) and gradient carry the shape there; on white panels the
  ring reads 1.87:1.
- Disabled controls (`--color-disabled-surface` = charcoal-100 = 0.965) sit
  marginally _lighter_ than the new page (1.06:1 delta). Negligible on white
  panels where forms live; see [Decision D1](#decisions--fallbacks) if it
  bothers on the page ground.

---

## Branch & PR strategy

1. Jira task already exists: **[DST-1602](https://reservix.atlassian.net/browse/DST-1602)**
   (`💄 Quiet surfaces: porcelain secondary button, flat fields, tonal panels`),
   Unplanned, under epic DST-1601.
2. Branch **from `feat/sidebar-nav-hierarchy`** (PR #5589 — the sidebar rework
   is part of this iteration's look and stays underneath it):

   ```sh
   git fetch origin
   git switch -c style/DST-1602-quiet-surfaces origin/feat/sidebar-nav-hierarchy
   ```

3. Open the PR with base `feat/sidebar-nav-hierarchy` (stacked). Merge order is
   now just **#5589 → this one** (#5566 has already landed on `beta-release`);
   retarget to `beta-release` once #5589 merges.
4. The three `design/*` exploration branches are reference material only —
   **never merge them**. Everything needed from them is inlined below.

Dev loop: `pnpm sb` → [localhost:6006](http://localhost:6006).
⚠️ Storybook gotcha: the dev server does **not** pick up new arbitrary-property
class candidates (`[--x:…]`) from HMR in newly created files — restart
Storybook after adding the porcelain utility/classes.

---

## Step 1 — `themes/theme-rui/src/tokens.css`

### 1a. Deepen the page ground (Tonal Quiet)

`--color-background` decouples from the charcoal-100 rung so the deepening is
scoped to the page and does not drag disabled surfaces, focus highlights, and
the porcelain hover fill (all rung-100 consumers) along with it:

```css
/* --- Page Background & Text --- */
/* The page ground sits between rung 100 and 200: deep enough that white
   panels read as layers by fill delta alone (1.18:1), decoupled from the
   rung so disabled fills and hover caps keep their own values. */
--color-background: oklch(0.945 0.004 54);
```

(was: `var(--color-charcoal-100)`)

Also update the "Palette step mapping" comment block at the top of the
semantic section — step 100 is no longer the background step.

### 1b. Porcelain tokens (secondary button surface)

Add under a new heading after the `--color-control-border` group:

```css
/* --- Porcelain (raised control cap: secondary Button, Menu trigger) --- */
/* The light counterpart to the dark contrast surface: a near-white convex
   cap. The edge derives from its own base (not the fill) — deriving −0.12 L
   from the near-white cap would wash the ring out to ~1.5:1, so the base
   sits two rungs below the cap and darkens with it on hover. */
--color-porcelain: var(--color-charcoal-50);
--color-porcelain-hover: var(--color-charcoal-100);
--color-porcelain-edge: var(--color-charcoal-200);
--color-porcelain-edge-hover: var(--color-charcoal-300);
```

### 1c. Whisper rim + softened structural lines (Tonal Quiet)

```css
--color-surface-border: oklch(from var(--color-charcoal-950) l c h / 0.05);
```

(was alpha `0.1` — update the comment: the rim is now a whisper; panel
boundaries are carried by the fill delta against the deepened page.)

```css
--color-border: oklch(0.925 0.004 54);
```

(was `oklch(from var(--color-charcoal-300) calc(l - 0.08) c h)` ≈ 2.0:1; new
value ≈ 1.25:1 on white. Keep it **opaque** — the existing comment about alpha
stacking at line intersections still applies. This softens table grids,
panel-header dividers, `ui-panel-*` rules. See [Decision D2](#decisions--fallbacks)
if it goes too far.)

### 1d. Lighter modal backdrop (Tonal Quiet)

```css
--color-overlay-backdrop: oklch(from var(--color-charcoal-950) l c h / 45%);
```

(was `70%`. Interacts with Step 9 — with a lighter backdrop the overlay
shadow does more work.)

### 1e. Retire the in-flow elevation tiers

Delete `--shadow-elevation-border` and `--shadow-elevation-raised`.
Keep **only** the overlay tier and rewrite the elevation comment block:

```css
/* ==================== */
/*       ELEVATION      */
/* ==================== */
/*
  Single-tier shadow hierarchy: nothing in normal flow casts a shadow —
  buttons are raised caps (ui-porcelain / ui-contrast),
  fields are flat wells, panels separate by fill against the page. The
  overlay shadow is the one lift signal (Dialog, Drawer, Menu, Popover,
  Toast, ActionBar). Color is a literal oklch (hue 54), tuned independently
  of the palette rungs — update 54 if the palette hue shifts.
*/
--shadow-elevation-overlay:
  0px 1px 2px -1px oklch(0.15 0.02 54 / 0.126),
  0px 4px 8px -3px oklch(0.15 0.02 54 / 0.099),
  0px 12px 22px -8px oklch(0.15 0.02 54 / 0.081);
```

(The overlay value is unchanged for now — Step 9 decides whether to keep or
strengthen it.)

> Deleting the two tokens is intentional (honest cleanup, pre-1.0 theme). If a
> downstream consumer relies on them, the changeset (Step 11) is the place to
> call the removal out.

## Step 2 — `themes/theme-rui/src/ui.css`

### 2a. New porcelain surface utility

`ui-porcelain` is a third standalone modeled variant in the `ui-frame` family:
like `ui-contrast`, it does **not** `@apply ui-frame` (it draws its own ring,
inset glint, and gradient) — it's the light-end mirror of the dark `ui-contrast`
cap. Add it right after `ui-contrast-destructive`, plus the non-inheriting
property registration next to the existing `@property` block (currently the
`--ui-background-color` / `--ui-border-color` / `--ui-highlight-color` block):

```css
@property --porcelain-edge {
  syntax: '*';
  inherits: false;
}

/*
 * Porcelain surface: the raised light cap for neutral button-like controls
 * (secondary Button, Menu trigger). Mirrors ui-contrast at the light
 * end of the ramp: a convex fill gradient (+0.005 / −0.02 L), a modeled ring
 * one step darker than its edge base (−0.12 L), and a soft top glint
 * (+0.2 L / 0.9 alpha inset). No drop shadow — the cap itself is the lift.
 * The ring reads --ui-border-color first so focus/disabled recolor it like
 * every other surface; the edge base and fill flip via --porcelain-edge and
 * --ui-background-color (e.g. the hover flip in Button.styles.ts).
 *
 * `background` is excluded from the transition so state bg flips feel
 * instant (DST-1436).
 */
@utility ui-porcelain {
  @apply rounded-surface relative transition-[box-shadow];
  @apply text-foreground;
  @apply ring-1 ring-[var(--ui-border-color,oklch(from_var(--porcelain-edge,var(--color-porcelain-edge))_calc(l_-_0.12)_c_h))];
  @apply inset-shadow-[0_1px_1.5px_-1px_oklch(from_var(--porcelain-edge,var(--color-porcelain-edge))_calc(l_+_0.2)_c_h_/_0.9)];
  /* prettier-ignore */
  background: linear-gradient(
    to bottom,
    oklch(from var(--ui-background-color, var(--color-porcelain)) calc(l + 0.005) c h),
    oklch(from var(--ui-background-color, var(--color-porcelain)) calc(l - 0.02) c h)
  );
}
```

State behavior comes for free via the existing utilities: `ui-state-focus`
sets `--ui-border-color` (the ring reads it first), `ui-state-disabled`
overrides `background`, recolors the ring, and zeroes inset shadows (kills the
glint).

### 2b. Simplify `ui-control` (Quiet Flat)

`ui-control` currently composes `ui-frame`, swaps the ring to the dense
`--color-control-border`, **and** adds an engraved bottom line (an alpha-bumped
`inset-shadow`). Remove that engraved line — the control becomes fill + hairline
only. The current utility is:

```css
@utility ui-control {
  @apply ui-frame;
  --ui-border-color: var(--color-control-border);
  @apply inset-shadow-[0_-1px_0_0_oklch(from_var(--ui-border-color)_l_c_h_/_calc(alpha_+_0.08))];  /* ← delete this line */
}
```

Result (also update the doc comment above it, which still describes the bottom
bevel and "compose with shadow-elevation-border for lift"):

```css
/*
 * Control role: the operable counterpart to ui-surface, the other sibling built
 * on ui-frame. Where a surface wears the whisper decorative hairline, a control
 * needs a boundary that stands off the page, so this swaps the ring to the
 * dense --color-control-border. Flat by design: no engraving, no elevation —
 * the porcelain/contrast caps are the raised things, fields are wells.
 */
@utility ui-control {
  @apply ui-frame;
  --ui-border-color: var(--color-control-border);
}
```

## Step 3 — Porcelain adopters

### 3a. `themes/theme-rui/src/components/Button.styles.ts` (`secondary` variant, ~line 16–19)

```ts
secondary: [
  'ui-porcelain',
  'hover:[--ui-background-color:var(--color-porcelain-hover)] hover:[--porcelain-edge:var(--color-porcelain-edge-hover)]',
  'expanded:[--ui-background-color:var(--color-porcelain-hover)] expanded:[--porcelain-edge:var(--color-porcelain-edge-hover)]',
],
```

This replaces the current three-line `secondary` block, which is now:

```ts
secondary: [
  'ui-control shadow-elevation-border',
  'hover:[--ui-background-color:var(--color-hover)] hover:[--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_+_0.12))] hover:text-foreground',
  'expanded:[--ui-background-color:var(--color-hover)] expanded:[--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_+_0.12))]',
],
```

(the old block's `hover:text-foreground` and control-border alpha bump both go —
`ui-porcelain` sets `text-foreground` at rest and the edge flips via
`--porcelain-edge`.)

### 3b. `themes/theme-rui/src/components/Menu.styles.ts` (default trigger variant, line 52)

The comment there says it verbatim: "Neutral trigger = the secondary Button
look." It must move with the button — the same three `ui-porcelain` lines as 3a
replace the current `'ui-control shadow-elevation-border'` (line 52) + its
hover/expanded flips.

## Step 4 — Strip `shadow-elevation-border` from every in-flow control

Remove the class (and only the class) at each site — where a site also carries
`ui-control`/`ui-surface`, keep that and drop only `shadow-elevation-border`.
Line numbers below are current as of `feat/sidebar-nav-hierarchy` post-#5566
merge; re-grep before editing (the two adopters from Step 3 — `Button.styles.ts`
and `Menu.styles.ts` — are handled there, not here):

```sh
git grep -nE 'shadow-elevation-border' -- 'themes/theme-rui/src/components/**' 'packages/components/src/**' | grep -viE '\.test\.|\.stories\.'
```

In `themes/theme-rui/src/components/`:

| File | Line(s) | Note |
| --- | --- | --- |
| `Calendar.styles.ts` | 21, 64, 70 | container, `aria-selected:` day, month dropdown trigger |
| `Checkbox.styles.ts` | 10 | box keeps its `+0.06` alpha border |
| `DateField.styles.ts` | 6 | |
| `FileField.styles.ts` | 30 | dropzone — eyeball after: rim is now the 0.05 whisper |
| `Input.styles.ts` | 7 | |
| `ListBox.styles.ts` | 8 | |
| `NumberField.styles.ts` | 6 | |
| `Pagination.styles.ts` | 25 | drop `data-[selected=true]:shadow-elevation-border`; keep `data-[selected=true]:ui-control` |
| `Radio.styles.ts` | 23 | |
| `SegmentedControl.styles.ts` | 112 | thumb; also rewrite the comment at 101–102 (it references the old secondary-button recipe) |
| `Select.styles.ts` | 7 | |
| `SelectList.styles.ts` | 21, 101 | |
| `Slider.styles.ts` | 21 | |
| `Switch.styles.ts` | 34 | thumb |
| `Tag.styles.ts` | 14 | |
| `TagField.styles.ts` | 10 | |
| `TextArea.styles.ts` | 6 | |
| `ToggleButton.styles.ts` | 8, 25 | see Decision D3 for porcelain adoption |

In `packages/components/src/` (⚠️ separate package → own changeset):

| File | Line | Note |
| --- | --- | --- |
| `SelectList/SelectionIndicator.tsx` | 19 | drop `shadow-elevation-border` from the class list |

Optional same-commit cleanup: `ToggleButton.styles.ts`'s
`in-[.group]:inset-shadow-none` and `selected:shadow-none` become redundant
once the engraving and elevation are gone from `ui-control` — remove them or
leave with a TODO.

**Not touched** (overlay tier, stays): `ActionBar.styles.ts:9`,
`ContextualHelp.styles.ts:28`, `Dialog.styles.ts:8`, `Drawer.styles.ts:15`,
`Popover.styles.ts:10`, `Sidebar.styles.ts:26` (mobile drawer's overlay —
correct to keep; the desktop sidebar carries no in-flow shadow), `Table.styles.ts:124+146`,
`Toast.styles.ts:6`, `Tray.styles.ts:11`. See
[App shell interaction](#app-shell--sidebar-interaction-5589) for how the
token changes below still reach the sidebar even though its styles aren't edited here.

## Step 5 — Strip `shadow-elevation-raised` (Tonal Quiet surfaces)

| File | Line | Edit |
| --- | --- | --- |
| `Card.styles.ts` | 5 | `base: 'rounded-surface [--card-text:currentColor]'` |
| `Panel.styles.ts` | 6 | `base: 'rounded-surface [--panel-accent:currentColor]'` |
| `Accordion.styles.ts` | 21 | `card` variant: `'ui-surface py-1 outline-none'` |

Cards/panels now separate from the page by fill (white on 0.945 ≈ 1.18:1) plus
the 0.05 whisper rim. The tinted variants (master/admin/destructive) keep
their opaque accent borders and are unaffected beyond losing the shadow.

## Step 6 — Update the internal Styles reference story

`packages/components/src/Styles.stories.tsx` documents the design language
(elevation swatches, hairline weights, and `ui-contrast` surface specimens;
grep for the sections — line numbers moved when #5589 added its sidebar-nav
showcase to this file). Update it to match:

- Elevation section: one `overlay` swatch instead of three tiers; a line of
  copy stating the in-flow-is-flat rule.
- Add a porcelain swatch next to the `ui-contrast` surface specimens
  (`ui-porcelain`, plus its hover-flipped variant with the
  `--ui-background-color` / `--porcelain-edge` overrides baked).
- Remove `shadow-elevation-border/raised` from all specimen wrappers
  (grep the file — ~15 occurrences).

## Step 7 — Update tests that assert the old classes

Known asserting sites (grep for more after the strip:
`git grep -nE 'shadow-elevation-border|ui-control' -- 'packages/components/src/**/*.test.tsx'`):

- `packages/components/src/LinkButton/LinkButton.test.tsx:94` —
  `toHaveClass('shadow-elevation-border')` → `toHaveClass('ui-porcelain')`
- `packages/components/src/DateField/DateField.test.tsx:48` — inline snapshot
- `packages/components/src/Checkbox/Checkbox.test.tsx:47` — inline snapshot
- `packages/components/src/ToggleButton/ToggleButton.test.tsx:14,58,72` — snapshots
- `packages/components/src/ToggleButton/ToggleButtonGroup.test.tsx:12,19,31,42` — snapshots

Snapshots: `pnpm test:unit -u`, then review the diff — every change should be
exactly "class removed / porcelain classes added", nothing else.

## Step 8 — Build & verify

```sh
pnpm typecheck:only
pnpm lint
pnpm test:unit
pnpm test:sb        # story/browser tests (restart Storybook first — see gotcha above)
```

Visual pass in Storybook (`pnpm sb`), against both grounds (page + white
panel). Checklist:

- **Buttons:** secondary rest/hover/expanded/disabled/pending, small/icon
  sizes, next to primary + destructive + ghost (family alignment), inside
  toolbars next to Select/TextField (must NOT read as an input).
- **Menu:** trigger matches the secondary button exactly.
- **Fields:** TextField, TextArea, NumberField, DateField, Select, ComboBox,
  TagField, FileField, SelectList — rest/focus/invalid/readonly/disabled.
  Judge the 1.83:1 hairline at form density → this is the Quiet Flat vs Firm
  Edge decision point (D4).
- **Controls:** Checkbox, Radio, Switch, Slider, Tag, ToggleButton (standalone
  + group), SegmentedControl, Pagination, Calendar/DatePicker.
- **Surfaces:** Card, Panel (all variants), Accordion card variant, Table in
  `Panel bleed` — panel boundary must read on the deeper page without shadow.
- **App shell (see [dedicated section](#app-shell--sidebar-interaction-5589)):**
  the Sidebar example story from #5589. Three shell lines all key off
  `--color-surface-border`, which drops 0.1→0.05 here — verify each survives:
  the root divider (`border-r border-surface-border`), the opt-in `separator`
  (`bg-surface-border`), and the `ui-scroll-edge` top-nav seam. Plus:
  hover/selected nav rows on the deeper page ground (the idle→hover step
  shrinks as the sidebar bg deepens to 0.945 — confirm hover still reads).
- **Structural lines:** Table grids, panel header/actions dividers with the
  softened `--color-border` (D2).

## Step 9 — Overlay elevation check

The explicit "if it is strong enough" question. With zero in-flow shadows the
overlay shadow gains contrast by context — it may need **no** increase. But
the lighter backdrop (45%) and the whisper rim pull the other way.

Procedure: open Dialog, Drawer, Menu (open), Select (open), Popover, Toast,
ActionBar over the dense Table/Panel stories. Judge:

1. **No-backdrop floats are the critical case** (Menu, Popover, Toast,
   ActionBar — no backdrop helps them): does the float separate cleanly from
   a white panel underneath?
2. Dialog/Drawer with the 45% backdrop: does the surface still pop?
3. Does the overlay's edge read, or does the 0.05 whisper rim vanish?

Pick per outcome (in order of preference):

- **A — keep** the current `--shadow-elevation-overlay` (values in Step 1e).
  Expected default: it already reads stronger by contrast against a flat page.
- **B — strengthen** (bigger throw, same anatomy), if floats look pasted-on:

  ```css
  --shadow-elevation-overlay:
    0px 1px 2px -1px oklch(0.15 0.02 54 / 0.13),
    0px 6px 12px -4px oklch(0.15 0.02 54 / 0.11),
    0px 20px 36px -10px oklch(0.15 0.02 54 / 0.11);
  ```

- **C — edge assist** (composable with A or B), if the overlay's own boundary
  is the weak part: overlay surfaces keep a denser rim than in-flow surfaces.
  Add to `Dialog`, `Popover`, `Menu` (popover), `Toast`, `Tray`,
  `ContextualHelp`, `Table.styles.ts:146`:

  ```
  [--ui-border-color:oklch(from_var(--color-charcoal-950)_l_c_h_/_0.1)]
  ```

  (the previous surface-border density, scoped to floats).

- **D — backdrop revert**: if modals specifically feel weak, restore
  `--color-overlay-backdrop` to 60–70% before touching the shadow.

Screenshot the chosen state for the PR description.

## Step 10 — Documentation

- `docs/content/foundations/elevation/index.mdx` +
  `elevation-swatches.demo.tsx`: single-tier model, remove border/raised
  swatches, state the in-flow-is-flat rule and the porcelain/contrast cap
  story.
- `docs/content/foundations/token-overview/index.mdx`: token table (new
  `--color-porcelain*`, changed `--color-background`, `--color-border`,
  `--color-surface-border`, `--color-overlay-backdrop`, removed shadow
  tokens).
- `docs/content/components/collection/card/index.mdx` and
  `docs/content/components/layout/panel/index.mdx`: mention separation by
  fill, not shadow.
- Rebuild before checking: docs depend on `@marigold/theme-rui` →
  `pnpm build:themes && pnpm start`.

## Step 11 — Changesets

```sh
pnpm changeset
```

- `@marigold/theme-rui` **minor** — new `ui-porcelain` surface + tokens;
  simplified `ui-control` (engraved line removed); removed
  `--shadow-elevation-border` / `--shadow-elevation-raised`; page ground,
  surface rim, structural line, backdrop retuned; in-flow shadows removed;
  app-shell structural lines (Sidebar divider/separator, `ui-scroll-edge` seam)
  repointed to `--color-border` so they survive the whisper rim.
- `@marigold/components` **patch** — SelectionIndicator class cleanup.

## Step 12 — VRT

Prepare the branch and push. **Do not dispatch the VRT / Chromatic workflow —
ask Sebastian first** (standing rule). The diff will touch nearly every
snapshot by design; the review is where the whole move gets judged at once.

---

## App shell / sidebar interaction (#5589)

The sidebar / app-shell rework in #5589 sits **underneath** this work and its
styles are **not edited here** — but three token changes in Step 1 reach it
anyway, because the shell keys off shared tokens. #5589 is otherwise correct
as-is (nothing to change in that PR now); these are items **this** work must
handle so the shell survives the material change. Do a focused shell pass in
Step 8 against these:

### A. `--color-surface-border` 0.1 → 0.05 halves the shell's structural lines ⚠️ (the important one)

#5589 deliberately built the "seamless shell" on exactly **one** structural
line at **full** `surface-border` strength (its comment: _"full surface-border
strength so it stays perceivable"_). Three places depend on it, all of which
halve when Step 1c drops the token to the 0.05 whisper:

| Site | Class / rule | Role |
| --- | --- | --- |
| `Sidebar.styles.ts` `root` (~line 41) | `border-r border-surface-border` | the shell's one divider |
| `Sidebar.styles.ts` `separator` (~line 87) | `bg-surface-border` | opt-in section divider |
| `ui.css` `@keyframes sc-edge-b` (used by `ui-scroll-edge`) | `box-shadow: 0 1px 0 0 var(--color-surface-border)` | top-nav scrolled-under seam |

At 0.05 these read ≈ 1.06:1 on the deepened page — effectively gone, which
contradicts #5589's intent. The whisper rim is right for *decorative* surface
edges; a *structural* line is a different role and should not ride the same
token. **Recommended fix (a real edit DST-1602 must make, beyond the token
change):** repoint these three sites from the decorative `--color-surface-border`
to the structural `--color-border` (Step 1c gives it an opaque ≈ 1.25:1, still
clearly stronger than the 0.05 whisper). Concretely: `border-surface-border` →
`border-border` on `root`, `bg-surface-border` → `bg-border` on `separator`,
and change the `sc-edge-b` keyframe to `var(--color-border)`. If 1.25:1 still
reads too faint on the 0.945 ground, give the three a dedicated literal
(≈ charcoal-950 / 0.14). Decide in the Step 8 shell pass; **do not silently let
the seam vanish.**

### B. `--color-background` 0.965 → 0.945 deepens the sidebar; the hover step shrinks

The sidebar column is `bg-background`, so it deepens with the page (it stays
equal to the page — the divider, not a fill delta, is what separates them, so
that relationship holds). But the nav's idle→hover preview uses
`bg-hover` (charcoal-200 = 0.92): the step from the column to hover shrinks from
Δ0.045 to Δ0.025. Active (`bg-selected` charcoal-300 = 0.86) stays clearly
distinct. Verify hover still reads on the deeper ground; if it's too subtle,
nudge the sidebar's `hover:bg-hover` to a `hover` one rung darker locally rather
than moving the global token.

### C. Nothing to pull forward into #5589

The interactions above only bite once **this** work changes the tokens, so
#5589 lands unchanged and this work stays the next stacked iteration. Add
`Sidebar.styles.ts` and the `sc-edge-b` keyframe in `ui.css` to this work's
touched-files list (they are **not** in Step 4/5, which only strip shadows).

---

## Decisions & fallbacks

- **D1 — page-ground coupling.** Primary path decouples
  `--color-background` (literal 0.945) from rung 100 so every picked value
  stays exact. Alternative: retune the rung `--color-charcoal-100` itself to
  `oklch(0.945 0.004 54)` — one token instead of one exception, but it drags
  `--color-disabled-surface`, `--color-focus-highlight`, and
  `--color-porcelain-hover` 0.02 L deeper than what was picked (porcelain
  hover gets stronger: cap Δ 1.13:1 vs white; disabled fields deepen). Take it
  only if the "disabled lighter than page" artifact (1.06:1) actually shows up
  in review.
- **D2 — structural line softening.** `--color-border` 2.0:1 → 1.25:1 is the
  boldest Tonal Quiet ingredient (table grids, dividers). Fallback: keep the
  current `oklch(from var(--color-charcoal-300) calc(l - 0.08) c h)`;
  intermediate: opaque charcoal-300 (`0.86`, ≈ 1.5:1).
- **D3 — ToggleButton & SegmentedControl thumb.** Both currently use
  `ui-control shadow-elevation-border`. Primary path leaves them as **flat
  control surfaces** (they read as controls, and the selected states do the
  talking). Option: adopt `ui-porcelain` (same classes as Step 3a; for the
  SegmentedControl thumb replace `ui-control … [--ui-border-color:…]` with the
  porcelain utility) so everything button-shaped is a cap. Decide visually in
  Step 8; don't mix — either both or neither.
- **D4 — Firm Edge fallback for fields.** If the 1.83:1 hairline is too faint
  on shadowless flat fields (judge dense forms in Step 8), change **one
  line** in `tokens.css`:

  ```css
  --color-control-border: oklch(from var(--color-charcoal-950) l c h / 0.44);
  ```

  (≈ 3.05:1 on white — meets WCAG 1.4.11; update the token's comment, which
  currently documents the deliberate sub-floor stance.) This also firms
  checkbox/radio/select edges — re-eyeball those.
- **D5 — surface radius.** Tonal Quiet showed 10px (`--radius-surface:
  0.625rem`); Porcelain and Quiet Flat were picked at the current 8px. Primary
  path: **keep 8px** (one token, trivially revisited). If the rounder
  geometry is wanted, it changes buttons and fields too — separate decision.
- **D6 — overlay strength / backdrop.** Resolved in Step 9 (options A–D).

## Out of scope

- Tonal Quiet's full charcoal-ramp retune (0.975/0.945/0.915/0.87/…/0.28 ink)
  and its flattened primary (`--contrast-*: 0`) — **not** adopted; scope is
  surfaces only, and the modeled primary stays.
- Dark theme — same as the underlying DST-1565 work.
- The moodboard story files (`SecondaryButton.stories.tsx`,
  `ControlFields.stories.tsx`, `SubtleRefresh.stories.tsx`) stay on their
  `design/*` branches and are never merged.

## Sources

| What | Where |
| --- | --- |
| Porcelain pick (G) | `design/secondary-button` @ `bf63f9a19`, `packages/components/src/SecondaryButton.stories.tsx` (story `Styles/Secondary Button → Porcelain`, direction def ~line 247) |
| Quiet Flat / Firm Edge | `design/secondary-button` @ `2f8a90bfa`, `packages/components/src/ControlFields.stories.tsx` (directions `quiet-flat` ~line 118, `firm-edge` ~line 142) |
| Tonal Quiet | `design/subtle-refresh` @ `491c6218c`, `packages/components/src/SubtleRefresh.stories.tsx` (story `TonalQuiet` ~line 582) |
| Base rework | PR #5566 (`refa/DST-1565-ui-surface-shadow-ring`, **merged to `beta-release`** — introduced the `ui-frame`/`ui-surface`/`ui-control`/`ui-contrast` naming), PR #5589 (`feat/sidebar-nav-hierarchy`) |
| Contrast math | WCAG relative luminance over oklch→sRGB with alpha compositing; ratios in this file were computed against white and against the new page value |
