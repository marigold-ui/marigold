# Component gaps surfaced by the examples

While polishing the full-page examples (`docs/app/(examples)/examples/*`) we hit a
handful of cases the design system can't yet express with shipped components, so the
example had to either work around it or leave the issue unaddressed. This is the running
list — fixing any of these in `@marigold/components` would let the examples (and real
adopters) drop a workaround.

Status legend: **Open** = no good component-level solution today · **Workaround** = shippable
but not ideal.

---

## 1. Featured / spanning tile — **Open**

**Where:** Dashboard & Analytics stat rows (`examples/page.tsx`, `examples/analytics/page.tsx`).

**Problem:** `Tiles` renders every tile at equal width/weight, so a stat row gives no
primacy signal — four `4xl` numbers compete equally. There's no way to make one metric
_featured_ (larger, or spanning two columns) without dropping out of `Tiles`/`Columns`
into hand-rolled layout.

**Wanted:** a featured/spanning affordance — e.g. `Tiles` honoring a per-item `colSpan`, or
a documented `Columns` recipe for a primary-metric + secondary-metrics row.

---

## 2. Sticky form footer / persistent action bar — **Open**

**Where:** Event Form (`examples/event-form/page.tsx`), a ~3700px multi-section form.

**Problem:** The only Save lives at the very bottom. On a long form the primary action is
off-screen for the whole fill. `ActionBar` exists but is scoped to table row-selection, not
to a form. Pinning a Save/Cancel bar today needs a raw `position: sticky` div — an escape
hatch the examples are meant to avoid.

**Wanted:** a `Page.Footer` / form action-bar primitive that can stick to the viewport
bottom, with the standard primary/secondary button slots.

---

## 3. `Avatar` component — **Workaround**

**Where:** Dashboard "Your team", Users list, shell user menu.

**Problem:** No `Avatar` in `@marigold/components`, so examples render a raw
`<img className="size-8 rounded-full" …>` — bypassing the theming/sizing system and the
`className` guidance. Sizing, fallback initials, and status rings are all reinvented per use.

**Wanted:** an `Avatar` (with `size`, image + initials fallback, optional status/badge slot).

---

## 4. Skeleton cells that mirror a `Table` — **Workaround**

**Where:** Filter venues table (`examples/filter/VenuesTable.tsx`).

**Problem:** The loading skeleton is a hand-built stack of `div`s that doesn't match the
real table's column rhythm (4 bars vs 10 columns). There's no `Table`-aware skeleton, so
the skeleton and the loaded layout drift — and adopters copying the pattern inherit the
mismatch.

**Wanted:** a skeleton mode on `Table` (or a `Table.Skeleton` that reuses the column
definitions) so loading state matches loaded layout for free.

---

## 5. Interactive / linkable `Card` — **Open (nice-to-have)**

**Where:** Analytics stat tiles (drill-down), any card-as-navigation.

**Problem:** `Card` has no `onPress`/`href`, so a stat tile can't become a drill-down target
without wrapping it in a custom interactive element (and re-deriving focus/hover states).

**Wanted:** an interactive `Card` variant (press/link) with the standard focus ring + hover.

---

## 6. `Badge` leading-icon slot — **Nice-to-have**

**Where:** Billing invoice status (`examples/billing/page.tsx`).

**Problem:** A high-stakes "failed" status reads better with a leading `!`/alert glyph, but
`Badge` has no documented icon slot, so meaning leans on the text label + color alone.

**Wanted:** a documented leading-icon affordance on `Badge`.

---

## Not gaps (verified during the pass)

- **Banner-level alert above a `Badge`'s severity** — covered: `SectionMessage` (with the
  `error` variant + assertive announce) is exactly this. Used in the Billing recovery PR.
- **Muted-text contrast** — measured, not a gap: `variant="muted"` (charcoal-600) is
  **5.5:1** on white surfaces and **4.97:1** on the warm page background — both pass WCAG AA
  for normal text. No token change needed.
- **Form validation** — not a gap: RAC `Form` defaults field `validationBehavior` to
  `native`, which Marigold fields inherit, so `required` + `errorMessage` surface on submit
  out of the box.
