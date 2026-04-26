# SelectList — Documentation Research

Research notes for writing `docs/content/components/collection/selectlist/index.mdx`.
Source paths referenced: `packages/components/src/SelectList/*`,
`themes/theme-rui/src/components/SelectList.styles.ts`,
`docs/content/components/collection/selectlist/*`.

> **Status:** API and behaviour notes re-verified against the current source on
> the `feat/DST-1076-selectlist-standardized-layout` branch (2026-04-25). All
> claims below are checked against `SelectList.tsx`, `SelectListOption.tsx`,
> `SelectListHiddenSelect.tsx`, and `SelectList.styles.ts`. Any deltas vs. the
> earlier draft are flagged inline.

## What it is and why it exists

`SelectList` is a form field where users pick one or many items from a **visible
list of rich, two-line options**. It exists because there's a real gap between
"a label is enough" (Radio / Checkbox) and "give me a whole grid of data"
(Table) — and `Select` / `ComboBox` can't fill that gap because their options
are collapsed behind a click and limited to a single line.

**The framing the doc should lead with:** Reach for `SelectList` when the
label alone isn't enough — and even a short inline description wouldn't be
enough — to make a confident choice. Each option earns visible space because
it carries decision-relevant context: a sub-line, a logo, a per-row action.
The trade-off is obvious and worth naming explicitly: `SelectList` is
**visually heavier** than a radio group or a `Select`, so use it when the
decision warrants the weight, and downgrade to a lighter control otherwise.

| Pattern                                    | Options visible? | Per-row description | Per-row action |
| ------------------------------------------ | ---------------- | ------------------- | -------------- |
| RadioGroup / CheckboxGroup                 | yes              | no (text only)      | no             |
| **SelectList**                             | **yes**          | **yes**             | **yes**        |
| Select / ComboBox / Autocomplete (ListBox) | no — dropdown    | no (single-line)    | no             |
| Table                                      | yes (grid)       | columns             | yes            |

The reason it can host per-row interactive elements (`IconButton`, `ActionMenu`)
without breaking selection is that it's built on **RAC's `GridList` primitive,
not `ListBox`**. ListBox cannot host nested focusable widgets; GridList can.
That is the technical / UX differentiator worth surfacing in the doc intro.
(See WAI-ARIA APG below — interactive children inside `role="listbox"` are
invisible to keyboard and screen-reader users; `role="grid"` is the supported
container for two-tier nav: arrows between rows, Tab inside a row.)

The standardised two-line skeleton (radio/checkbox indicator → label over
description → optional trailing action) reuses the same slot convention as
`Select`, `ComboBox`, and `Autocomplete` (`<Text slot="label">` /
`<Text slot="description">`), so the muscle memory carries over.

## API surface

### `<SelectList>` props (`packages/components/src/SelectList/SelectList.tsx`)

| Prop                                   | Type                                                                    | Default                                   | Notes                                                                                                                  |
| -------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `variant`                              | `'default' \| 'bordered'`                                               | `'default'`                               | `default` = single surface w/ dividers; `bordered` = each row its own card                                             |
| `size`                                 | `string`                                                                | —                                         | Theme size hook                                                                                                        |
| `label`                                | `ReactNode`                                                             | —                                         | Rendered above the list, wired via `aria-labelledby`                                                                   |
| `description`                          | `ReactNode`                                                             | —                                         | Help text below                                                                                                        |
| `errorMessage`                         | `ReactNode \| (v) => ReactNode`                                         | —                                         | Shown when `error` is true                                                                                             |
| `error`                                | `boolean`                                                               | `false`                                   | Marks invalid (`data-invalid`, `data-error`)                                                                           |
| `required`                             | `boolean`                                                               | `false`                                   | Shows required marker; sets `required` on the hidden select for native validation                                      |
| `disabled`                             | `boolean`                                                               | `false`                                   | Disables every row (also adds `aria-disabled` on the grid — `SelectList.tsx:274`)                                      |
| `name` / `form`                        | `string`                                                                | —                                         | Submits via the hidden `<select>`                                                                                      |
| `width`                                | `WidthProp['width']`                                                    | —                                         | Field-level width (e.g. `'1/2'`) — same shape as the other form fields                                                 |
| `orientation`                          | `'vertical' \| 'horizontal'`                                            | `'vertical'`                              | Drives flex direction and arrow-key navigation                                                                         |
| `selectionMode`                        | `'single' \| 'multiple'`                                                | `'single'`                                | `single` → radio indicator; `multiple` → checkbox. Generic `M` makes `onChange` typesafe (`SelectList.tsx:41-43,108`). |
| `selectedKeys` / `defaultSelectedKeys` | `Iterable<Key>`                                                         | —                                         | Controlled / uncontrolled                                                                                              |
| `onChange`                             | `(key: Key \| null) => void` (single) / `(keys: Key[]) => void` (multi) | —                                         | Renamed from `onSelectionChange`; signature is generic-driven (`SelectList.tsx:137-139`)                               |
| `validate`                             | `(value) => ValidationError \| true \| null`                            | —                                         | Custom validation; sees `Key \| null` (single) or `Key[]` (multi)                                                      |
| `validationBehavior`                   | `'aria' \| 'native'`                                                    | inherits `<Form>`, then `'native'`        |                                                                                                                        |
| `emptyState`                           | `ReactNode`                                                             | —                                         | Wraps RAC `renderEmptyState`                                                                                           |
| `disallowEmptySelection`               | `boolean`                                                               | `true` in `single`, `false` in `multiple` | Radio-group semantics for single-select; opt out (`false`) for clearable filter pickers. See "Behaviour quirks" below. |
| `disabledBehavior` (RAC pass-through)  | `'all' \| 'selection'`                                                  | `'all'`                                   | `'selection'` lets disabled rows still be focused so their action menu still works                                     |
| `disabledKeys` (RAC pass-through)      | `Iterable<Key>`                                                         | —                                         |                                                                                                                        |
| `items` (RAC pass-through)             | `Iterable<T>`                                                           | —                                         | Enables render-callback children                                                                                       |

**Deliberately removed / renamed** (see `RemoveProps` in `SelectList.tsx:29–39`):

- `style`, `className` — theming-only via `useClassNames`.
- `dragAndDropHooks` — removed (DST-1185).
- `selectionBehavior` — hard-coded to `'toggle'` (`SelectList.tsx:277`). RAC's
  `selectionBehavior` is a no-op for single-select clear-on-click (see
  `useSelectableItem.ts:145-150`); the relevant knob is `disallowEmptySelection`,
  which we expose with mode-aware defaults.
- `renderEmptyState` → `emptyState`.
- `onSelectionChange` → `onChange`.
- `isDisabled` / `isInvalid` / `isRequired` → `disabled` / `error` / `required`.

### `<SelectList.Option>` props (`SelectListOption.tsx`)

| Prop        | Type        | Notes                                                                                                                                                                 |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | `Key`       | Required for static children                                                                                                                                          |
| `textValue` | `string`    | **Required when children isn't a plain string** — dev-mode warning fires otherwise (`SelectListOption.tsx:100–108`). Screen readers announce this as the option name. |
| `disabled`  | `boolean`   | Per-row disable                                                                                                                                                       |
| `children`  | `ReactNode` | Plain string, or `<Text slot="label">` + `<Text slot="description">` + optional `<IconButton>` / `<Button>` / `<ActionMenu>`                                          |

Standard RAC item props pass through (`href`, etc.).

`SelectListOption` merges (rather than replaces) parent `TextContext` /
`ButtonContext` slot values (`SelectListOption.tsx:44–87`) so options keep
working under any RAC-style slot provider higher in the tree.

## Behaviour quirks worth documenting

1. **Single mode is non-clearable by default (radio-group semantics).** Clicking
   the already-selected row keeps it selected and does not fire `onChange`.
   Implemented by defaulting `disallowEmptySelection` to `true` in single mode
   (`SelectList.tsx:191-192`). `multiple` mode keeps checkbox semantics — each
   row toggles independently. Pass `disallowEmptySelection={false}` to opt
   into a clearable single-select (for example, a filter where "no selection"
   is valid). Asserted in `Basic.play` (`SelectList.stories.tsx:183-192`).
2. **Per-row actions don't toggle the row.** Clicking an `IconButton` or
   `ActionMenu` inside an option doesn't bubble to the row's selection
   (`WithIconAction.play`, `WithActionMenu.play`). Use **at most one action
   per option**.
3. **Plain-string children render as the label.** They pick up label
   typography from the item base (`SelectList.styles.ts:42-55` — `text-sm
font-medium text-foreground` is the item default), so the
   `<Text slot="label">` wrapper is optional for simple options.
4. **Hidden native `<select>` participates in forms** (`SelectListHiddenSelect.tsx`).
   Multi-select submits all selected keys under the same `name`; single-select
   submits one. Required + native validation focuses the grid via
   `useFormValidation`.
5. **`disabledBehavior="selection"`** keeps disabled rows focusable (so the
   row's action menu still works) while blocking selection — that's what the
   existing demo shows.
6. **`emptyState` only renders when the collection is empty** (used with
   `items={[]}` or an empty render).
7. **Container width follows orientation**: vertical lists fill `width`,
   horizontal lists shrink to `w-fit` so the surface hugs the content
   (`SelectList.styles.ts:9-10`). Horizontal items get a `min-w-40` floor
   (`SelectList.styles.ts:54`) so each option is comfortably tappable in a
   row.
8. **Row height floor.** Items are `min-h-14` (56 px) in both variants — the
   default `min-h-14 px-3 py-2` for `default` and `min-h-14 p-4` for
   `bordered`. That clears the WCAG 2.2 24×24 minimum and the platform
   44×44 / 48×48 touch-target recommendations comfortably; worth flagging in
   the doc when teams ask about dense layouts.

## Variants

- **`default`** — single `ui-surface` container with the elevation border. Rows
  fill edge-to-edge, separated by real `border-b` dividers (so the focus ring
  can sit on top via inset shadow), with hover/selected backgrounds. First and
  last rows round into the surface's inner curve. **Use for:** picking from a
  defined set within a form.
- **`bordered`** — each row is its own `ui-surface`; the selected row
  strengthens its border via `--ui-border-color` plus a 0.5 px inset shadow
  (`SelectList.styles.ts:79-92`) instead of filling. There's a `gap-2` between
  cards. **Use for commit-level choices**: plans, payment methods, shipping
  methods — anything where each option feels like its own card.

## Use cases (from stories + Multiple Selection pattern + DST-1076)

- **Payment method picker** (Basic, Bordered) — name + masked card / account,
  optional logo, sometimes per-row "Manage" menu.
- **Saved payment methods management** (WithActionMenu) — multi-select to
  remove/refund, each row has Edit / Make default / Remove.
- **Shipping speed** (Horizontal, Disabled) — short list with ETA descriptions;
  horizontal makes a compact picker.
- **Order add-ons** (WithMultiSelection, WithForm) — multi-select extras
  (insurance, signature, gift wrap) submitted via FormData.
- **Subscription plans** (Bordered demo) — Free / Pro / Enterprise with descriptions.
- **Ticket types** (existing demos) — with per-row ActionMenu.

---

## Equivalent components in other design systems

A scan of the major systems to anchor naming, framing, and "alternative
component" cross-links. Findings used to verify that our positioning
("between RadioGroup and Table") matches how the field thinks about it.

| System                 | Component(s)                                                                                                                                                                        | Notes                                                                                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Adobe Spectrum**     | [`ListView`](https://react-spectrum.adobe.com/react-spectrum/ListView.html)                                                                                                         | The closest direct match. Explicitly distinct from `ListBox` because it supports rich row contents and per-row `ActionMenu`/`ActionGroup`. Single + multiple.  |
| **Material Design 3**  | [Lists](https://m3.material.io/components/lists/guidelines) (1/2/3-line) + selection foundation                                                                                     | No first-class "selectable list" — composition of `List` + `Checkbox` is expected. Angular Material has a dedicated `mat-selection-list`.                      |
| **Atlassian**          | `Select` (dropdown) — no visible-list equivalent                                                                                                                                    | Teams compose `Checkbox` / `Radio` + layout primitives for visible selection.                                                                                  |
| **Shopify Polaris**    | [`OptionList`](https://polaris-react.shopify.com/components/lists/option-list) + [`ResourceList`](https://polaris-react.shopify.com/components/lists/resource-list)                 | `OptionList` lives inside popovers; `ResourceList` is the closest equivalent — full-page rich list with bulk-select and per-item actions.                      |
| **IBM Carbon**         | [`Selectable Tile`](https://carbondesignsystem.com/components/tile/usage/) + [`Structured List` (selectable)](https://v10.carbondesignsystem.com/components/structured-list/usage/) | Tile = card-style (radio/checkbox icon, pricing-style); Structured List = compact rows, single-select only, **25-row ceiling before recommending Data Table**. |
| **GitHub Primer**      | [`ActionList`](https://primer.style/components/action-list/) (selection variant)                                                                                                    | Selection shown via leading check octicon. Same primitive backs `ActionMenu`, `SelectPanel`, `NavList`. Has section headers, dividers, trailing visuals.       |
| **Apple HIG**          | [Lists and Tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)                                                                                  | Selection = trailing checkmark. "Use a table instead of a picker for large value lists." Multiple-select on iOS via two-finger pan.                            |
| **Microsoft Fluent 2** | [`List`](https://fluent2.microsoft.design/components/web/react/core/list/usage) (selectable)                                                                                        | When selection is the only action, clicking anywhere on the item or pressing Space/Enter triggers selection.                                                   |
| **Ant Design**         | `List` + `Transfer`                                                                                                                                                                 | No purpose-built selectable list; selection is composed with `Checkbox`. `Transfer` covers two-set selection.                                                  |
| **Mantine**            | `Combobox` primitives                                                                                                                                                               | No visible-list named component; everything goes through Combobox/Select dropdown.                                                                             |
| **Chakra UI v3**       | [`CheckboxCard` / `RadioCard`](https://chakra-ui.com/docs/components/checkbox-card) + [`Listbox`](https://chakra-ui.com/docs/components/listbox)                                    | `CheckboxCard` is a near-1:1 with our `bordered` variant — `.Label` / `.Description` / `.Indicator` slots. Useful naming reference.                            |
| **Radix / shadcn**     | `Command` (cmdk) — searchable palette                                                                                                                                               | No dedicated visible-list selection primitive.                                                                                                                 |
| **Vercel Geist**       | `Select` only                                                                                                                                                                       | Lean system; no visible-list component documented.                                                                                                             |

**Naming patterns we could lean on in copy:** "Selectable list", "Option
list", "Resource list", "Selectable tiles", "Action list with selection".
The Spectrum framing — _"distinct from a `ListBox` because it supports rich
content and per-row actions"_ — is the cleanest one-liner and matches our
GridList-vs-ListBox technical pitch almost word-for-word.

**How others justify this component alongside Select / Radio** (recurring
phrasings to consider lifting):

- _"When options need more context than a single label can carry."_ (Carbon,
  Polaris, Spectrum)
- _"When the decision is consequential and users benefit from comparing
  options side by side."_ (Carbon Tile, PatternFly Selectable Cards)
- _"Use a list instead of a picker for large value lists."_ (Apple HIG)
- _"Sits between form controls and a data table."_ (PatternFly, Carbon)

## UX heuristics worth surfacing in the doc

Crisp, source-attributed bullets — pick the ones that match the section
you're writing.

### Choosing between RadioGroup / SelectList / Select

- **2–4 options:** prefer RadioGroup (single) or CheckboxGroup (multi). All
  visible, zero clicks. _(NN/g — ["Listboxes vs. dropdowns"](https://www.nngroup.com/articles/listbox-dropdown/))_
- **5–7 options with rich context:** SelectList earns its weight — visible,
  scannable, every option carries its sub-line. _(NN/g; Spectrum/Polaris
  framing)_
- **8+ flat options without rich context:** prefer `Select` / `ComboBox` so
  the field stays compact.
- **Many options + search needed:** `ComboBox` (single) or `Multiselect` /
  `TagField` (multi).
- **Tabular records:** `Table`. SelectList is for _picking_ options, not
  _displaying data_.

### Number of options

- General radio/checkbox cap: **~7** before switching to a listbox / dropdown.
  _(NN/g)_
- Compact list ceiling: **~25** before recommending a data table. _(IBM
  Carbon Structured List)_
- Selectable tiles/cards: **2–6** is the comfort zone. _(PatternFly)_
- Suggested SelectList cap: **~10–15**. Above that, scrolling cost overtakes
  comparison benefit; switch to `Select` / `Multiselect`.

### When two-line rows help vs. clutter

- Two-line rows are appropriate when the supporting line is **decision-relevant**
  — it differentiates options that look identical at the title level alone.
  _(MD3 lists guideline)_
- They become clutter when descriptions are redundant ("All Visa, Mastercard,
  Amex accepted" on every row), purely decorative, or wildly different lengths.
- Be consistent: all rows two-line OR all rows one-line. Mixed-height rows
  break visual rhythm and slow scanning.
- Three-line rows are rarely worth it in a selection context — escalate to a
  card UI instead.

### Single vs multiple selection signals

- **Single-select** → radio indicator (Carbon v12, Red Hat). Never use
  checkboxes for single-select; checkbox affordance implies independence.
- **Multiple** → always-visible checkboxes. Hover-only checkboxes break on
  touch and degrade for low-vision users.
- **Surface vs. card.** Flat list with dividers reads as a continuous set
  ("pick one of these list entries"); bordered cards read as peer choices
  ("commit to one of these"). Maps cleanly to our `default` vs. `bordered`
  split.

### Per-row actions

- Trailing edge of the row, **at most one inline action**; overflow into an
  `ActionMenu`. _(UX World; matches our docs' "one action per row" rule.)_
- Never hover-only — the action must surface for keyboard focus and touch.
- Two-tier keyboard contract (arrow keys between rows, Tab inside a row) is
  why the underlying primitive must be `role="grid"`, not `role="listbox"`.
  _(WAI-ARIA APG — ["Listbox pattern"](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/),
  ["Grid pattern"](https://www.w3.org/WAI/ARIA/apg/patterns/grid/))_

### Empty states

- Never leave the list area blank. Provide (1) a plain explanation, (2) a
  next-step CTA when there's an obvious one, (3) optional decorative art.
  _(NN/g — ["Empty State Interface Design"](https://www.nngroup.com/articles/empty-state-interface-design/))_
- If empty because of active filters, expose a "Clear filters" action.
- Don't render list chrome (headers, dividers) inside the empty state —
  screen readers will announce empty structural elements first.

### Touch / mobile

- Min tap target: **44×44 pt (iOS)**, **48×48 dp (Android)**, **24×24 CSS px**
  (WCAG 2.2 AA). _(NN/g — ["Touch Target Size"](https://www.nngroup.com/articles/touch-target-size/))_
  Our `min-h-14` (56 px) clears all three with margin.
- Trailing icon buttons need explicit 44–48 px hit areas even when the icon
  itself is 20–24 px.
- Horizontal orientation reduces discoverability on small viewports — keep
  it as a deliberate compact pattern, not a default.

### Accessibility deep cuts

- `role="listbox"` flattens children to text strings — interactive widgets
  inside listbox options break keyboard and screen-reader nav. _(WAI-ARIA APG)_
- `role="grid"` (RAC `GridList`) supports rich child semantics and the
  arrow-keys-for-rows / Tab-inside-row contract.
- `aria-multiselectable="true"` belongs on the container for multi-select.
- Selection state must not rely on color alone — `aria-selected` carries it
  semantically. _(WCAG 1.4.1)_
- "Select all" / "Clear" (when relevant) should be explicit buttons, not
  just shortcuts.

### Cognitive-load argument (for the intro / "When to use")

Dropdowns make users hold options in working memory: open, scan, scroll,
close, remember. Visible lists eliminate that tax — every option stays
scannable without interaction. The trade-off is vertical space, so
SelectList is the right tool when the decision complexity justifies the
weight, and the wrong one when the choice is trivial. _(NN/g listbox
article; NN/g cards article.)_

---

## What the existing draft does well, and what's missing

The current draft (`docs/content/components/collection/selectlist/index.mdx`)
covers anatomy, appearance, the slot convention, the bordered variant,
multi-select with action, and disabled behaviour. **Gaps to fill** to match
the depth of `radio/index.mdx` or `table/index.mdx`:

1. **Lead with the "label-isn't-enough" framing + GridList-not-ListBox
   advantage.** Currently not stated. The doc should open with the value
   prop ("reach for SelectList when even a short description in a Radio
   group wouldn't be enough; downside is visual weight") and the
   technical differentiator (rich rows + per-row actions because of
   `GridList`).
2. **Single vs multiple guidance** — like Radio's "Single vs. multiple
   selection" section. Tie back to RadioGroup / CheckboxGroup for the simpler
   cases.
3. **Clearable single-select escape hatch.** Document
   `disallowEmptySelection={false}` for filter-style pickers. Default is the
   radio-group behaviour; this prop is the explicit opt-in for clearable.
4. **Number of options / when to switch tools** — same shape as Radio's
   "Number of options" + "Ordering of options" sections. Suggest ~10–15 cap;
   for more, point at `Select` (single) or `Multiselect` / `TagField` /
   `ComboBox` (search). The existing Multiple Selection pattern page already
   lists this trade-off.
5. **`textValue` requirement** as a Callout — currently buried in one paragraph.
6. **Variant comparison table** like the Table doc (`default` vs `bordered`
   with "When to use").
7. **Orientation** — when horizontal makes sense (compact pickers like shipping
   speed). The Horizontal story is unused in docs.
8. **Empty state** — there's a story for it but no docs section. Borrow the
   Table doc's framing (Do/Don't with a clear next-step CTA).
9. **Forms section** — `name`/`form`/`required`/`validate`/`validationBehavior`,
   plus the hidden `<select>` makes FormData "just work". Cross-link to
   `patterns/user-input/form-implementation`.
10. **Width** — show `width="1/2"` on a story snippet for narrow layouts.
    (Already wired — see `SelectList.tsx:91`.)
11. **Disabled vs disabledBehavior** — clarify that `disabled` on the field
    disables everything, per-option `disabled` removes one row, and
    `disabledBehavior="selection"` keeps disabled rows actionable through
    their menu.
12. **Do / Don't tiles** — common Marigold convention. Suggested ones:
    - Do: keep labels short, descriptions to one line, only one action per row.
    - Do: reach for SelectList when context per option is decision-relevant.
    - Don't: use SelectList for plain text-only choices (use Radio/Checkbox).
    - Don't: put two actions in a row.
    - Don't: truncate labels.
    - Don't: mix one-line and two-line rows in the same list.
13. **Alternative components section** is solid; consider also linking back to
    `Multiselect` and `TagField` for the search-required variant, mirroring
    how `Multiselect` already links here.
14. **Related teasers** — `Form implementation guide` and `Multiple Selection
pattern` (matches the Radio/Checkbox doc convention).

## Demos already on disk (ready to reference)

- `selectlist-appearance.demo.tsx` — used by `<AppearanceDemo>` / `<AppearanceTable>`.
- `selectlist-bordered.demo.tsx` — plans variant.
- `selectlist-multiple-selection.demo.tsx` — multi-select with ActionMenu.
- `selectlist-disabledbehavior.demo.tsx` — `disabledBehavior="selection"`.

**Likely new demos** for: empty state, horizontal orientation, validation/error,
form submission, and width. The patterns already exist in the stories — just
port them to `*.demo.tsx`.

## Anatomy assets

`docs/public/selectlist/selectlist-anatomy.jpg` exists and is referenced.
No new asset needed unless you want per-section illustrations.

## Resolved during research

- **Single-mode click-on-selected.** Resolved by defaulting
  `disallowEmptySelection` to `true` in `single` mode (radio-group semantics)
  and `false` in `multiple` (checkbox semantics). Users opt into clearable
  single-select with `disallowEmptySelection={false}`. Note: RAC's
  `selectionBehavior` prop is **not** the right knob here — `useSelectableItem`
  ignores it for single-select click-to-clear (`useSelectableItem.ts:145-150`).
- **Width prop discoverability.** `width` is already implemented and tested,
  but is not yet shown in the doc. Adding a small example will surface it.
- **Naming check.** Spot-checked against Spectrum (`ListView`), Polaris
  (`ResourceList` / `OptionList`), Carbon (`Selectable Tile` / `Structured
List`), Primer (`ActionList`), Chakra (`CheckboxCard` + `Listbox`). Our
  `SelectList` name is unambiguous within Marigold and aligns with how
  Spectrum and Polaris frame the same gap. No rename warranted.
- **GridList-not-ListBox argument.** Confirmed by WAI-ARIA APG: interactive
  children inside `role="listbox"` break keyboard and screen-reader nav;
  `role="grid"` is the supported container for two-tier nav. This is the
  technical justification for hosting `IconButton` / `ActionMenu` inside a
  row.

## Sources for the UX bullets above

- [Listboxes vs. Dropdown Lists — NN/g](https://www.nngroup.com/articles/listbox-dropdown/)
- [Cards Component — NN/g](https://www.nngroup.com/articles/cards-component/)
- [Touch Target Size — NN/g](https://www.nngroup.com/articles/touch-target-size/)
- [Empty State Interface Design — NN/g](https://www.nngroup.com/articles/empty-state-interface-design/)
- [Listbox Pattern — WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
- [Grid Pattern — WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [Lists guidelines — Material Design 3](https://m3.material.io/components/lists/guidelines)
- [Selection foundation — Material Design 3](https://m3.material.io/foundations/interaction/selection)
- [ListView — React Spectrum](https://react-spectrum.adobe.com/react-spectrum/ListView.html)
- [ResourceList — Shopify Polaris](https://polaris-react.shopify.com/components/lists/resource-list)
- [Selectable Tile — IBM Carbon](https://carbondesignsystem.com/components/tile/usage/)
- [Structured List (v10) — IBM Carbon](https://v10.carbondesignsystem.com/components/structured-list/usage/)
- [ActionList — GitHub Primer](https://primer.style/components/action-list/)
- [Lists and Tables — Apple HIG](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)
- [List — Microsoft Fluent 2](https://fluent2.microsoft.design/components/web/react/core/list/usage)
- [CheckboxCard — Chakra UI v3](https://chakra-ui.com/docs/components/checkbox-card)
