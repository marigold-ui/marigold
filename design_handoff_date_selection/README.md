# Handoff: Date selection components (Calendar, RangeCalendar, DatePicker, DateRangePicker)

## Overview

Four reusable date-selection components for the Reservix ticketing admin, styled with the
**Marigold Design System (`@marigold/theme-rui`)**:

- **Calendar** — single-date month grid
- **RangeCalendar** — start/end range grid (1–2 months)
- **DatePicker** — field + popover Calendar
- **DateRangePicker** — field + popover with a **preset rail** (Today, Next 7 days, This month, …) beside a RangeCalendar

Plus the mobile treatments: a **bottom-sheet** picker and a **listbox of presets**.

## About the design files

The files in this bundle (`Date selection.dc.html`, `Calendar.dc.html`) are **design references created in
HTML** — prototypes showing the intended look and behavior. They are **not production code to copy directly.**

The task is to **recreate these designs in the real codebase** — a React app using
**Marigold (`@marigold/components`) + React Aria Components + Tailwind (theme-rui)** and
**`@internationalized/date`** for date values. Do not hand-roll calendar math, keyboard nav, focus
management, or ARIA — those come from React Aria Components (RAC). Wrap RAC primitives and apply theme-rui
tokens for styling. If any of these components already exist in Marigold, extend/restyle them rather than
rebuilding.

## Fidelity

**High-fidelity.** Colors, spacing, radii, typography, and states below are final and taken from theme-rui
tokens. Recreate pixel-for-pixel using Marigold/Tailwind tokens (never literal hex — map to the token names
given under **Design Tokens**).

---

## Components

### 1. Calendar (single date) — wraps RAC `Calendar`

**Purpose:** pick one date. Used standalone (inline) or inside DatePicker's popover.

**Layout**

- Column, `gap: 6px`. Optional header, weekday row (7-col grid), day grid (6 rows × 7 cols).
- Both the weekday row and the day grid use `grid-template-columns: repeat(7, 40px)` (desktop) / `repeat(7, 38px)` (mobile).

**Header** (optional, `showHeader`)

- Row, space-between, `padding: 0 2px 2px`.
- Prev / next buttons: 30×30, `rounded-md`, `1px solid --border`, `background #fff`, `shadow-elevation-border`, chevron icon 16px `--stone-600`.
- Month label centered: `--text-sm` (14px), `font-weight 600`, `--foreground`. Format `LLLL yyyy` → "July 2026".

**Weekday cell:** `--text-xs` (12px), `font-weight 600`, `--stone-500`, height 28px, centered. Labels `Mo Tu We Th Fr Sa Su` (week starts Monday).

**Day cell** (40px desktop / 38px mobile square, centered, `position: relative`):
| State | Style |
|---|---|
| Default (in month) | `--text-sm`, weight 400, `--foreground` |
| Outside current month | color `--stone-400` |
| Selected | inner square (cell − 6px), `background --brand`, `radius --radius-md`, text `--brand-foreground` weight 600 |
| Today (not selected) | inner square (cell − 6px), `1.5px solid --orange-500`, `radius --radius-md`, text `--orange-600` weight 600 |
| Hover (not selected/disabled) | inner square, `background --hover` (stone-100), `radius --radius-md` |
| Disabled / unavailable | color `--disabled-foreground`, `text-decoration: line-through` |
| Has event | 4px dot, bottom-center, `--orange-500` (or `--brand-foreground` if the day is selected) |

**Props:** `value`, `onChange`, `minValue`, `maxValue`, `isDateUnavailable`, `eventDates?: CalendarDate[]`, `showHeader?`.

---

### 2. RangeCalendar (start–end) — wraps RAC `RangeCalendar`

Same cell system as Calendar, plus:

- **Endpoints** (start/end): inner element `background --brand`, **`border-radius: 50%` (pill)**, text `--brand-foreground`.
- **In-range days:** full-width bar, `top/bottom: 3px`, `left/right: 0`, `background --stone-100`, radius 0 (the connector). The start cell's bar runs from center→right; the end cell's from left→center; endpoints round via the pill on top.
- **`visibleDuration`** 1 or 2 months. When 2: render two month grids side by side separated by a `1px --border` vertical divider (see DateRangePicker desktop).

**Props:** `value: {start, end}`, `onChange`, `minValue`, `maxValue`, `isDateUnavailable`, `visibleDuration?: 1|2`.

---

### 3. DatePicker — wraps RAC `DatePicker`

**Trigger field:** height 36px, `radius --radius` (4px), `1px solid --input`, `background #fff`, `shadow-elevation-border`, `padding: 0 10px`, `gap 8px`.

- Leading calendar icon 16px `--stone-500`; value text `--text-sm` (format `MMM d, yyyy` → "Jul 9, 2026"); trailing chevron-down 16px `--stone-500`.
- Focus: `border-color --ring` + `box-shadow: 0 0 0 3px color-mix(in oklab, var(--ring) 30%, transparent)`.

**Field states**

- Empty → placeholder `--placeholder`, e.g. `MM / DD / YYYY`.
- Filled → value shown.
- Error → `border-color --destructive`; help text below `--text-xs --destructive`, e.g. "Please enter a valid date."
- Disabled → `background --disabled`, text/icon `--disabled-foreground`, label dimmed.

**Popover:** `1px solid --border`, `radius --radius-lg` (8px), `background #fff`, `shadow-elevation-overlay`, `padding 14px`; contains `<Calendar>`. (Variant B: replace the calendar header chevrons with month + year **Select** controls.)

---

### 4. DateRangePicker (with presets) — wraps RAC `DateRangePicker`

**Desktop popover** = horizontal flex, `radius --radius-lg`, `shadow-elevation-overlay`, `overflow hidden`:

- **Preset rail** — left, width 150px, `background --stone-50`, `border-right 1px --border`, `padding 8px`, column `gap 2px`. Built as a RAC `ListBox` (`selectionMode="single"`).
- **Calendar area** — `padding 14px`; contains `<RangeCalendar>`.

**Presets** (compute with `@internationalized/date`, anchored on `today(getLocalTimeZone())`):
`Today, Yesterday, This week, Next 7 days, Next 30 days, This month, This quarter`.
Selecting a preset sets the range; editing the calendar manually clears the preset selection.

**ListBox option style — the key visual (matches the attached mockups):**

- Row: `flex items-center gap-2`, height 36px, `padding 0 10px`, `radius --radius-md`, cursor pointer.
- Fixed **16px leading slot** holds a `Check` icon (`--foreground`, ~15px, stroke 2.4) **only when selected**.
- Label: `--text-sm`, weight 400, `--foreground` (custom-range entries use `--link`).
- **Selected row:** `background --stone-200` (a neutral fill — **not** brand). Label stays `--foreground`.
- **Hover:** `background --hover` (stone-100).
- No trailing date on desktop (the calendar already shows the resolved range).

---

## Responsive / mobile

Below `md`, DatePicker and DateRangePicker present their content in a **bottom sheet** instead of a popover
(RAC `Modal` + `Dialog`):

- Sheet: `background #fff`, `border-radius 20px 20px 0 0`, `padding 14px 16px 22px`, `shadow-elevation-overlay`.
- 36×4px drag grabber, `--stone-300`, centered.
- Backdrop: `rgba(12,10,9,0.45)` (stone-950 @ 45%), no blur.
- Primary confirm button full-width, height 44px, `background --brand`, `--brand-foreground`, `radius --radius`.

**Mobile DateRangePicker presets = full-width ListBox** (same option style) with:

- **Leading check** slot (as desktop),
- Label `--text-base`,
- **Trailing resolved-range sublabel** `--text-sm --muted-foreground`, e.g. "Jul 9 – 15".
- Selected row `background --stone-200`.
  Below the list: the RangeCalendar and confirm button.

---

## Interactions & behavior

- All keyboard nav (arrows, PageUp/Down, Home/End), focus rings, roving tabindex, and ARIA roles come from
  React Aria Components — **do not reimplement**.
- Focus ring everywhere: `box-shadow: 0 0 0 2px color-mix(in oklab, var(--ring) 28–30%, transparent)`.
- Transitions: 120–200ms `ease` / `ease-out` on color, border-color, box-shadow. No scale/bounce.
- Preset click → sets `value`; calendar edit → `onChange` and clears active preset.
- Unavailable/`minValue`/`maxValue` days are non-interactive and rendered disabled.

## State management

- `Calendar` / `RangeCalendar`: controlled `value` (`CalendarDate` / `{start,end}`) via RAC.
- `DatePicker` / `DateRangePicker`: `value`, `onChange`, `isOpen` (popover/sheet), and for the range picker
  `activePreset: string | null` (cleared on manual calendar edit).
- No data fetching. `eventDates` (if used) is passed in by the parent.

## Design tokens (theme-rui — use token names, not hex)

Defined in `colors_and_type.css` (bundled).

- **Colors:** `--brand` (stone-950), `--brand-foreground` (stone-50), `--foreground`, `--muted-foreground`,
  `--stone-50/100/200/300/400/500/600`, `--orange-500/600`, `--input`, `--border`, `--ring`, `--hover`,
  `--selected`, `--disabled`, `--disabled-foreground`, `--placeholder`, `--destructive`, `--link`.
- **Radii:** `--radius-sm` 2, `--radius` 4, `--radius-md` 6, `--radius-lg` 8, `--radius-full`.
- **Type:** Inter; `--text-xs` 12, `--text-sm` 14, `--text-base` 16; weights 400/500/600/700.
- **Shadows:** `--shadow-elevation-border` (controls), `--shadow-elevation-overlay` (popovers/sheets).
- **Spacing:** 4px baseline (2/3/4/6 for padding).

## Assets

- **Fonts:** Inter (`.woff2` in `fonts/`, weights 400/500/600/700). In the app, load via your existing Inter setup.
- **Icons:** stroke icons (chevron, calendar, check, plus) — in production use `@marigold/icons`
  (`ChevronLeft/Right`, `Calendar`, `Check`, `Add`). The prototype uses inline Lucide-style SVG equivalents.
- No images or decorative assets.

## Locale & dates

- Week starts **Monday**; locale `en`. Display formats: single `MMM d, yyyy`; range `MMM d – d` / `MMM d – MMM d`.
- All values are `@internationalized/date` `CalendarDate`. Reference date used in mocks: **2026-07-09**.

## Files in this bundle

- `Date selection.dc.html` — the two delivered proposals (mobile preset list sheet + desktop preset rail + calendar).
- `Calendar.dc.html` — the reusable calendar grid used by both.
- `colors_and_type.css` — theme-rui tokens + Inter `@font-face`.
- `fonts/` — Inter woff2 (400/500/600/700).
- `BUILD_PROMPT.md` — a concise implementation prompt you can feed straight to Claude Code.

> The `.dc.html` files are "Design Component" prototypes. Open them in a browser to inspect states; read the
> markup/logic for exact measurements. Recreate as real React/Marigold components — do not ship the HTML.
