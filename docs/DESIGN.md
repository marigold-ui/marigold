---
name: Marigold Examples (RUI Theme)
description: Reference-implementation app UIs built from Marigold components on the RUI theme — calm, precise, dependable.
colors:
  background: 'oklch(0.965 0.003 54)'
  surface: '#ffffff'
  foreground: 'oklch(0.22 0.008 54)'
  secondary: 'oklch(0.62 0.007 54)'
  muted: 'oklch(0.985 0.002 54)'
  border: 'oklch(0.86 0.005 54)'
  hover: 'oklch(0.92 0.004 54)'
  control: 'oklch(0.86 0.005 54)'
  ring: 'oklch(0.62 0.007 54)'
  primary: 'oklch(0.22 0.008 54)'
  primary-foreground: 'oklch(0.985 0.002 54)'
  primary-hover: 'oklch(0.15 0.008 54)'
  accent-orange: '#f98e22'
  accent-orange-strong: '#ea6d0c'
  destructive-accent: 'oklch(0.577 0.245 27.325)'
  success-accent: 'oklch(0.627 0.194 149.214)'
  warning-accent: 'oklch(0.554 0.135 66.442)'
  info-accent: 'oklch(0.546 0.245 262.881)'
  link: 'oklch(0.546 0.245 262.881)'
typography:
  display:
    fontFamily: 'InterVariable, Inter, system-ui, sans-serif'
    fontSize: '2.25rem'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '-0.01em'
  headline:
    fontFamily: 'InterVariable, Inter, system-ui, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 700
    lineHeight: 1
    letterSpacing: '-0.01em'
  title:
    fontFamily: 'InterVariable, Inter, system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 'normal'
  body:
    fontFamily: 'InterVariable, Inter, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 'normal'
  label:
    fontFamily: 'InterVariable, Inter, system-ui, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: '0.05em'
rounded:
  sm: '0.125rem'
  md: '0.375rem'
  lg: '0.5rem'
  full: '9999px'
spacing:
  collapsed: '0'
  tight: '0.375rem'
  related: '0.5rem'
  regular: '1.5rem'
  group: '3rem'
  section: '6rem'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-foreground}'
    rounded: '{rounded.md}'
    height: '2.25rem'
    padding: '0.5rem 1rem'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.primary-foreground}'
  button-secondary:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.md}'
    height: '2.25rem'
    padding: '0.5rem 1rem'
  input:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.md}'
    height: '2.25rem'
    padding: '0.5rem 0.75rem'
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.lg}'
    padding: '1.5rem'
  badge:
    backgroundColor: '{colors.muted}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.full}'
    padding: '0 0.5rem'
  sidebar-item-active:
    backgroundColor: '{colors.control}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.md}'
---

# Design System: Marigold Examples (RUI Theme)

## 1. Overview

**Creative North Star: "The Clear Ledger"**

These pages are a beautifully-kept book of record. Every surface is legible, every number
sits exactly where it should, and the whole thing reads as something you would trust to run
a business on. The visual system is almost entirely monochrome — a single warm-charcoal
neutral (hue 54) carries page, text, borders, and controls — so that the rare appearance of
color _means_ something: an orange primary action, a green success, a red warning. Nothing
is decorative. The ledger is calm because it is exact.

The system is built so that an adopter sees a dashboard or a settings form and thinks _"I
want my product to look like this, and I can build it with just these components."_ That
trust is the product. It is earned through restraint and consistency, not through novelty:
the same button shape, the same field vocabulary, the same shadow physics on every page.
Density appears only where the data earns it — tables run dense, headers breathe.

This system explicitly rejects **generic AI/SaaS slop** (identical card grids, the big-number
hero-metric template, gradient text, tracked-uppercase eyebrows on every section, decorative
glass), **untouched Bootstrap/MUI defaults** (assembled, not composed), **over-designed flash**
(a product UI cosplaying as a brand page), and **cluttered enterprise overload** (every pixel
filled, no rhythm).

**Key Characteristics:**

- Near-monochrome warm-charcoal surface; color is reserved for meaning, never decoration.
- Inter Variable throughout — one family carries headings, data, labels, and body.
- A real, restrained three-tier shadow vocabulary (border / raised / overlay) — not flat.
- Semantic relational spacing (`tight` → `section`) that makes rhythm a token, not a guess.
- Motion is state-only: ease-out curves, 150–300 ms, with reduced-motion fallbacks built in.

## 2. Colors

A warm-charcoal monochrome surface (OKLCH hue 54) with a single saturated orange accent and a standard semantic status set delegated to Tailwind v4's default palette.

### Primary

- **Ink Charcoal** (`oklch(0.22 0.008 54)`): The near-black warm charcoal (`charcoal-900`). Carries primary body text _and_ the primary-action fill — the same value does double duty, which is why a primary button reads as "ink made solid." Hover deepens to `oklch(0.15 0.008 54)`.
- **Marigold Orange** (`#f98e22` / `#ea6d0c`): The brand accent (`orange-500`/`600`). Used sparingly — `master`-access cards and badges, and accent moments where the system needs a spark of its own identity. It is never a default button color; it is a flag, not a fill.

### Neutral

- **Ledger Paper** (`oklch(0.965 0.003 54)`): The page background (`charcoal-100`) — a warm off-white, not pure white. The page is paper; cards are the white slips laid on top.
- **Slip White** (`#ffffff`): The surface color for cards, panels, inputs, and tables. The contrast between paper and slip is what gives the layout its quiet depth.
- **Faint Tint** (`oklch(0.985 0.002 54)`): The muted fill (`charcoal-50`) for subtle zones on white surfaces.
- **Hairline** (`oklch(0.86 0.005 54)`): Borders, dividers, control fills, scrollbar (`charcoal-300`). Lines are hairline-thin and low-contrast on purpose.
- **Quiet Ink** (`oklch(0.62 0.007 54)`): Secondary text, placeholders, and the focus ring (`charcoal-600`). Verified to clear 4.5:1 on Slip White and Ledger Paper — this is the floor, do not go lighter for "elegance."

### Tertiary — Status (resolve from Tailwind v4 defaults)

- **Success** (`oklch(0.627 0.194 149.214)`, green): positive confirmations, success badges/messages.
- **Warning** (`oklch(0.554 0.135 66.442)`, yellow): cautions, pending states.
- **Destructive** (`oklch(0.577 0.245 27.325)`, red): danger zones, destructive actions, errors.
- **Info / Link** (`oklch(0.546 0.245 262.881)`, blue): informational messages and hyperlinks.
- **Admin Purple** (`purple-800`): the `admin`-access counterpart to Marigold Orange's `master` access.

Each status uses a soft tinted background (`*-100`) with a dark legible foreground (`*-950`) and a saturated accent (`*-600/700`) — never a full-saturation flood.

### Named Rules

**The Meaning-Only Color Rule.** Charcoal carries the surface. Every non-neutral color must encode meaning — primary action, current selection, or a semantic state (success/warning/error/info, master/admin access). Color used for decoration is forbidden. If you cannot name the meaning, use charcoal.

## 3. Typography

**Display / Body / Label Font:** Inter Variable (`InterVariable, Inter, system-ui, sans-serif`).

**Character:** One family, many weights. Product UIs don't need a display/body pairing; a well-tuned humanist sans carries headings, data, controls, labels, and body without ever shouting. Optical sizing is on; weight and size — not a second typeface — create the hierarchy.

### Hierarchy

- **Display** (semibold 600, 2.25rem / `text-4xl`, lh ~1.1): Big numerals — dashboard stat values, headline metrics. The one place size is allowed to be large.
- **Headline** (bold 700, 1.5rem / `text-2xl`, leading-none): `Page.Title` — the top of a page. `Headline` level-1 goes one step further (extrabold 800, `text-3xl`) for rare hero headings.
- **Title** (semibold 600, 1.125rem / `text-lg`, leading-none): `Panel.Title` and `Card.Title` — section and card headings.
- **Body** (regular 400, 0.875rem / `text-sm`, lh 1.5): The default UI text size. Tables and dense panels run at this size. Prose blocks cap at 65–75ch.
- **Label** (medium 500, 0.75rem / `text-xs`): Field labels, badges, metadata. Sidebar group labels add `uppercase` + `tracking-wider` (~0.05em) — the one sanctioned use of all-caps.

### Named Rules

**The One-Family Rule.** Inter does everything. Introducing a second typeface — especially a display/serif face in UI labels, buttons, or data — is forbidden. Hierarchy comes from weight (400 → 800) and the fixed rem scale, never from fluid `clamp()` sizing.

## 4. Elevation

This system is **not** flat. It uses a deliberate three-tier shadow hierarchy (built on a Josh-Comeau-style layered shadow palette) to encode the physical altitude of a surface. Depth is physics, not decoration: a thing casts a bigger shadow because it floats higher, full stop.

### Shadow Vocabulary

- **Border** (`shadow-elevation-border`): The faintest tier — small interactive controls (Input, Checkbox, Radio, Switch, Tag, secondary Button). Reads as a crisp edge, barely lifted.
- **Raised** (`shadow-elevation-raised`): Container surfaces resting on the page — `Card`, `Panel`, `Accordion`. The "slip of paper on the ledger" shadow.
- **Overlay** (`shadow-elevation-overlay`): Floating elements that escape the document flow — `Dialog`, `Drawer`, `Menu`, `Popover`, `Toast`. The deepest, softest tier.

### Named Rules

**The Altitude Rule.** Shadow tier maps to physical altitude, never to importance. A control is `border`, a resting container is `raised`, a floating element is `overlay`. Never reach for a heavier shadow to make something "feel more important" — use color or weight for emphasis, shadow only for height.

## 5. Components

### Buttons

- **Shape:** Gently rounded (`rounded-md`, 0.375rem). Heights are tokenized: small 2rem, default 2.25rem (`h-control`), large 2.5rem. Press feedback is `active:scale-[0.97]` over 150 ms.
- **Primary:** Ink Charcoal fill (`{colors.primary}`) with Slip-White text; hover deepens to `charcoal-950`. This is the workhorse — the default for the main action on a page.
- **Secondary (the real default variant):** Slip-White surface, foreground text, hairline border, `border` shadow; hover tints to `hover` and darkens the border. Used for everything that isn't _the_ primary action.
- **Ghost / Link / Destructive:** Ghost is transparent with a hover tint; Link uses the blue link color with a touch hitbox; Destructive uses the bold red fill. Marigold Orange is **not** a button variant.

### Cards & Panels

- **Corner Style:** `rounded-surface` (`rounded-lg`, 0.5rem).
- **Background:** Slip White on Ledger Paper. `master`/`admin` variants tint the background with orange/purple at low alpha plus a matching border.
- **Shadow Strategy:** `raised` (see Elevation). No border on the default variant — the shadow and the paper/slip contrast do the separating.
- **Internal Padding:** Generous (`1.5rem`-class insets). `Card.Title` is Title-level; `Card.Description` is `text-sm` Quiet Ink.

### Inputs / Fields

- **Style:** Slip-White surface, hairline + `border` shadow, `rounded-md`, height `2.25rem`.
- **Focus:** `ui-state-focus` ring in Quiet Ink (`charcoal-600`) — a clear, calm ring, never a colored glow.
- **Error / Disabled / Read-only:** `invalid` flips to the destructive error treatment; disabled and read-only have dedicated muted states. Every field ships all of them.

### Badges

- **Style:** Pill (`rounded-full`), `text-xs` medium, `px-2`. Default is muted fill + hairline border; semantic variants (success/warning/info/error) use their tinted background + dark foreground; `master`/`admin` carry the access colors.

### Navigation (Sidebar + TopNavigation)

- **Sidebar:** Ledger-Paper background, right hairline border, 16rem expanded / collapses to 0 with a 200 ms width transition (and a slide-in on mobile). Group labels are uppercase Label-level Quiet Ink.
- **Nav items:** `rounded-md`, `h-9`, `text-sm`, foreground at 80% opacity; hover tints; **active** item gets `bg-selected` (Hairline) + foreground + medium weight. The active state is a quiet fill, not a colored bar.
- **TopNavigation:** sidebar toggle on the start, breadcrumbs in the middle, user identity + menu on the end.

### Signature Component — The Stat Tile

The dashboard stat (`Tiles` of equal-height `Card`s) is the system's calling card: Quiet-Ink Label on top, a big Display numeral, a Quiet-Ink hint below. Restrained, equal-height, no icon, no gradient — the antithesis of the hero-metric template.

## 6. Do's and Don'ts

### Do:

- **Do** build every example from `@marigold/components` on the RUI theme. If a result needs raw CSS, that is a **system gap to file**, not a hack to ship.
- **Do** carry the surface with charcoal and reserve color for meaning — primary action, selection, semantic state. (The Meaning-Only Color Rule.)
- **Do** use the semantic spacing scale (`tight` 6px → `related` 8px → `regular` 24px → `group` 48px → `section` 96px) to build rhythm; vary spacing for hierarchy.
- **Do** map shadow tier to physical altitude: `border` for controls, `raised` for containers, `overlay` for floating elements. (The Altitude Rule.)
- **Do** keep one button shape, one field vocabulary, one icon style across every page. The tool should disappear into the task.
- **Do** keep secondary/muted text at Quiet Ink (`charcoal-600`) or darker — it clears 4.5:1 on both Ledger Paper and Slip White. Verify contrast; never go lighter for "elegance."
- **Do** prove one realistic scenario well per page. Depth over inventory.

### Don't:

- **Don't** ship **generic AI/SaaS slop**: identical icon-heading-text card grids, the big-number hero-metric template, gradient text (`background-clip: text`), tiny tracked-uppercase eyebrows above every section, or decorative glassmorphism.
- **Don't** leave it reading like **untouched Bootstrap/MUI defaults** — compose deliberately; assembled-from-defaults is a failure.
- **Don't** **over-design**: no heavy gradients, no animation-everywhere, no decorative color. A product UI is not a brand page. Motion conveys state, not personality.
- **Don't** create **cluttered enterprise overload** — cramped, every-pixel-filled admin density with no breathing room. Density only where data earns it.
- **Don't** use Marigold Orange (or any saturated hue) as a default fill or a decorative flourish; it is a flag, not paint.
- **Don't** introduce a second typeface, fluid `clamp()` heading sizes, or display fonts in UI labels/buttons/data. (The One-Family Rule.)
- **Don't** use `border-left`/`border-right` > 1px as a colored accent stripe on cards, list items, or alerts. Use full borders, background tints, or nothing.
- **Don't** add a colored glow on focus or a heavier shadow to signal importance — emphasis is weight and color, height is shadow.
