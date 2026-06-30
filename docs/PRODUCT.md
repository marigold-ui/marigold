# Product

> **Scope:** This file governs the full-page **examples** surface in the docs app —
> `docs/app/(examples)/examples/*` — built entirely from `@marigold/components` on the
> RUI theme (`themes/theme-rui`). It is the reference-implementation surface, not the
> broader documentation/marketing site. Impeccable work here polishes the _visuals and
> composition_ of these example pages using shipped components + theme tokens only.

## Register

product

## Users

Developers and designers **evaluating or adopting Marigold**. Their context is the docs
site: they are deciding whether to adopt the system, learning how its components compose,
or copying patterns into their own product. The job to be done is _"show me what a real,
production-grade app looks like when it's built only with Marigold + the RUI theme, so I
can trust it and reproduce it."_

The examples model an event-ticketing-platform domain (events, venues, tickets, teams,
billing, settings) so the patterns read as real product work, not lorem-ipsum demos.

## Product Purpose

The example pages are Marigold's **canonical reference implementations** — the proof that
the system composes into trustworthy, production-grade product UIs. They exist so an
adopter can look at a dashboard, a data table, a settings form, or a filter view and think
_"I want my app to look like this, and I can build it with just these components."_

Success looks like: every example is visually impeccable, the composition is obviously
deliberate, and nothing on screen requires escape-hatch CSS to achieve. The pages should
raise an adopter's bar for their own work, and make the design system's quality
self-evident without a single word of marketing copy.

## Brand Personality

Calm, precise, trustworthy. Quiet confidence in the lineage of Linear and Stripe
dashboards — the tool disappears into the task and nothing shouts. Restraint is the point,
not a compromise: a near-monochrome warm-charcoal surface, an orange accent that earns its
place, generous breathing room. Three words: **composed, exact, dependable.**

## Anti-references

- **Generic AI / SaaS slop** — identical card grids, the big-number hero-metric template,
  gradient text, tiny tracked uppercase eyebrows above every section, decorative
  glassmorphism. These are the 2026 AI-generated tells and must not appear.
- **Untouched Bootstrap / MUI defaults** — an off-the-shelf component-library look with no
  point of view. The examples must read as _composed_, not assembled-from-defaults.
- **Over-designed / flashy** — heavy gradients, animation everywhere, decorative color: a
  product UI trying to be a brand page. Motion conveys state, not personality.
- **Cluttered enterprise overload** — dense, cramped, every pixel filled, legacy admin-panel
  with no rhythm. Density is allowed only where the task genuinely demands it.

## Design Principles

1. **Practice what you preach.** Every result must be achievable with shipped Marigold
   components and RUI theme tokens — no inline styles, no raw `className`/CSS escape
   hatches in example code. If a polish _needs_ custom CSS, that is a gap to file against
   the system, not a hack to ship in an example.
2. **The tool disappears.** Earned familiarity over novelty. Standard affordances, the same
   button/form/icon vocabulary screen to screen. An adopter should never pause at a
   subtly-off control.
3. **Restraint is the brand.** Neutral charcoal carries the surface; the orange accent and
   status colors are meaning (primary action, current selection, state), never decoration.
4. **Show range, don't dump features.** Each example proves _one_ realistic scenario well
   rather than cramming every component onto a page. Depth over inventory.
5. **Breathing room is credibility.** Deliberate spacing rhythm and whitespace signal
   precision. Vary spacing for hierarchy; reach for density only when the data earns it.

## Accessibility & Inclusion

WCAG 2.1 AA, inherited from Marigold's react-aria foundation. Keyboard navigation and
screen-reader support must stay complete through any visual change. Honor
`prefers-reduced-motion` (motion is state-only, so a crossfade/instant fallback is the
default). Verify contrast deliberately: the warm off-white background (`charcoal-100`)
means muted/secondary text must still clear 4.5:1 — do not let "elegant" gray body text
drop below the floor.
