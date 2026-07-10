# DST-1511 — Date Preset Rail Rework (Design)

**Date:** 2026-07-09
**Ticket:** [DST-1511](https://reservix.atlassian.net/browse/DST-1511)
**Branch:** `DST-1511_add-relative-date-range-presets`
**Status:** Approved (supersedes the SegmentedControl preset UI from the 2026-07-08 plan)

## Context

The first DST-1511 implementation (9 commits, tip `bdc7ed2b4`) rendered presets as a
horizontal `SegmentedControl` above the calendar. The design team then delivered a
formal handoff (`design_handoff_date_selection/README.md`) specifying a different
preset UI: a vertical **ListBox rail** beside the calendar (desktop) and a full-width
preset list in the bottom sheet (mobile). The branch was deliberately reset to
`7d400566f`, discarding those commits (still reachable at `bdc7ed2b4`).

This spec covers the **preset rework only**. The handoff's broader high-fidelity
restyle of Calendar/RangeCalendar/DatePicker/DateRangePicker (day-cell states, pill
range endpoints, event dots, popover/sheet chrome, month+year Select variant, Tray
confirm-button redesign) is explicitly **out of scope** and would be its own effort.

Note: the handoff README references `Date selection.dc.html`, `Calendar.dc.html`, and
`BUILD_PROMPT.md`, but only the README, `colors_and_type.css`, and fonts were
delivered. The README's written specs are sufficient for the preset rework; measurements
below come from it.

## Decisions (user-confirmed 2026-07-09)

1. The handoff supersedes the SegmentedControl decision — presets become a ListBox
   rail (desktop) / stacked list (mobile).
2. All four components keep the `presets` prop (Calendar, RangeCalendar, DatePicker,
   DateRangePicker); the rail design is extrapolated to single-date contexts.
3. Built-in catalog is the **union** of the old and handoff catalogs.
4. Build strategy: **salvage** the UI-agnostic layers (`presets.ts`, `usePresets.ts`,
   intl messages, their tests) from `bdc7ed2b4`; rebuild only the UI layer.
5. (2026-07-09, after Storybook review of Tasks 1–7) Small screens use a **two-view
   switcher** (preset list first, "Custom…" entry → calendar with back row) instead
   of the stacked list — unified across picker trays AND inline calendars.
6. (2026-07-09, after mobile re-check) Default small-screen view is context-bound:
   trays list-first, inline calendars grid-first with a "Quick selection" nav row;
   `defaultPresetsOpen?: boolean` on `Calendar`/`RangeCalendar` opts inline usage
   into list-first (pickers set it internally; not exposed on the pickers).
7. (2026-07-09, third mobile iteration) Inline "Quick selection" opens a **Marigold
   Tray** with the preset list — tap applies and closes; no Custom…/Back inline.
   `defaultPresetsOpen` is dropped entirely; the calendars detect picker context
   via the RAC picker state contexts instead (supersedes the prop half of
   decision 6).
8. (2026-07-10, fourth mobile iteration — final) The picker trays adopt the SAME
   flow: tray opens on the calendar with the "Quick selection" row; the preset
   list opens as a second sheet stacked on top; tapping a preset applies and
   closes the sheet. The list-first mode, "Custom…" entry, back row, picker
   detection for presentation, and the `presetsCustom` intl key are all removed
   (supersedes the tray half of decisions 5–7).

Prior decisions that stand (from the 2026-07-08 plan): unified catalog (day keys are
valid range presets), active preset derived by value equality (no stored state),
popover/tray stays open on preset selection, `setFocusedDate` jumps the visible month,
presets violating bounds/unavailability render disabled (not hidden), resolver
callbacks re-resolve at selection time, exported `useDatePresets`/`useDateRangePresets`
hooks, labels via `intlMessages` (de-DE, en-US).

## Built-in preset catalog

Single-date keys (valid in both contexts; in range contexts they resolve to a
single-day range):

| Key         | Resolves to |
| ----------- | ----------- |
| `today`     | today       |
| `yesterday` | today − 1d  |
| `tomorrow`  | today + 1d  |

Range-only keys:

| Key            | Resolves to                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| `this-week`    | locale-aware `startOfWeek(today)` … start + 6d                                                                 |
| `next-7-days`  | today … today + 6d (includes today; handoff example "Jul 9 – 15")                                              |
| `next-30-days` | today … today + 29d                                                                                            |
| `last-7-days`  | today − 6d … today (includes today)                                                                            |
| `last-30-days` | today − 29d … today                                                                                            |
| `this-month`   | `startOfMonth(today)` … `endOfMonth(today)`                                                                    |
| `this-quarter` | first day … last day of the calendar quarter containing today (Q1 Jan–Mar, Q2 Apr–Jun, Q3 Jul–Sep, Q4 Oct–Dec) |

All anchored on `today(getLocalTimeZone())`, resolved at selection time (never stale
past midnight). Custom presets: `{ id?, label, value: T | (() => T) }`, labels are
plain strings from the consumer. Consumers choose which keys to render and in what
order via the `presets` array; there is no default preset list.

New intl label keys (en-US / de-DE): This week / Diese Woche, Next 7 days /
Nächste 7 Tage, Next 30 days / Nächste 30 Tage, This quarter / Dieses Quartal.
The existing 7 keys from `bdc7ed2b4` are restored unchanged.

## Preset UI

One generic internal component (in `packages/components/src/Calendar/`, shared like
`CalendarGrid`) built on RAC `ListBox` with `selectionMode="single"` and
`disallowEmptySelection` (clicking the active preset must not clear the date value —
selection is derived, not stored). It replaces the discarded `PresetSegmentedControl`;
the thin `CalendarPresets`/`RangeCalendarPresets` wrappers and their state-context
wiring (apply via `DatePickerStateContext`/`DateRangePickerStateContext`/calendar
state `setValue`, disabled computation, value-equality matching) carry over from
`bdc7ed2b4`.

**Layout variants** (switched inside the calendars via the existing `useSmallScreen`,
so pickers need no extra plumbing):

- **Rail** (default, ≥ md): vertical column to the **left of** the calendar grid.
  Width 150px, subtle raised background (stone-50), 1px border-right, padding 8px,
  row gap 2px.
- **Small screens — ONE behavior everywhere** (REVISED 2026-07-09/10, four
  iterations; supersedes the context-bound presentation): the calendar grid
  always renders, topped by a full-width **"Quick selection" row** (existing
  `presets` message + trailing chevron-right, `aria-haspopup="dialog"`) that
  opens a **Marigold Tray** (bottom sheet, `Tray.Trigger` + controlled open
  state) containing the preset list — full-width rows with the check indicator
  and a trailing resolved-value sublabel in `text-sm` muted (range
  "Jul 9 – 15" / "Jul 9 – Aug 2", single date "Jul 9"), recomputed per render —
  plus a `Tray.Title` ("Quick selection") and a Close action. Tapping a preset
  applies the value (via the picker state inside pickers, so the picker's own
  overlay stays open) AND closes the preset sheet; Close/backdrop/Escape
  dismiss. Inside a picker's tray this stacks **sheet-on-sheet**: the preset
  sheet opens above the picker tray, and closing it reveals the calendar with
  the applied value. The row is never auto-focused on mount and the sheet
  never auto-opens (a11y). There is NO list-first mode, NO "Custom…" entry,
  NO back row, and NO picker detection for presentation (the `presetsCustom`
  intl key is removed again); grid selection keeps existing close-on-select
  picker behavior.

**Option row** (both variants): `flex items-center gap-2`, height 36px, padding
`0 10px`, `radius-md`, pointer cursor. Fixed 16px leading slot containing a
`Check` icon (foreground color, ~15px) **only when selected**. Label `text-sm`
(rail) / `text-base` (stack), regular weight, foreground color. Selected row:
neutral `stone-200` fill (not brand), label stays foreground. Hover: `stone-100`.
Disabled: disabled-foreground color, non-interactive. Exact colors map through
theme-rui tokens in the theme styles, never literal hex.

**Label:** no visible heading (per handoff). The ListBox gets a localized
`aria-label` from the existing "Quick selection" / "Schnellauswahl" intl key.

**Behavior:**

- Selecting a preset resolves it fresh, applies the value through the picker state
  (popover/tray **stays open**) or calendar state when standalone, and calls
  `setFocusedDate` so the visible month jumps to the selection.
- Active preset is derived by value equality (`isSameDay` on endpoints). Manual
  calendar edits that no longer match any preset leave the ListBox with an empty
  selection — the handoff's "manual edit clears the preset" emerges without state.
- Presets whose resolved value violates `minValue`/`maxValue` or covers an
  unavailable date render disabled.
- Keyboard/focus/ARIA semantics come from RAC `ListBox` — not reimplemented.

## Integration & theming

- `Calendar`: `presets?: DatePreset[]`; `RangeCalendar`: `presets?: DateRangePreset[]`.
  Both wrap the calendar in a row (rail) / column (stack) container when presets are
  present.
- `DatePicker`/`DateRangePicker` forward `presets` to their embedded calendar in both
  the Popover and Tray branches. No API change beyond the prop.
- Theme slots `calendarPresets` (list container) and `calendarPreset` (option) are
  added to the `Calendar`/`RangeCalendar` component types in `@marigold/system` and
  styled in `theme-rui` (`RangeCalendar.styles.ts` inherits via the existing spread).
  Unlike the discarded attempt, the slots stay — the ListBox has no theming of its own.
- Public exports: `useDatePresets`, `useDateRangePresets`, preset types, built-in key
  types (union catalog).

## Testing

- `presets.test.ts`: restored from `bdc7ed2b4`, extended for the four new keys
  (faked system time; quarter boundaries, locale-aware week start).
- `usePresets.test.tsx`: restored; extended label assertions for new keys ×
  both locales.
- Story component tests (all four components): rail renders options, selecting
  applies the value, popover stays open, disabled bounds, check-icon on the active
  row, manual-edit deselection. Mobile stack variant covered by unit tests with
  mocked `useSmallScreen` (story tests run desktop Firefox).
- `intl/messages.test.ts`: assertions for the new keys.

## Delivery tail (unchanged from the old plan)

Docs: "Quick select presets" section + demo on the four component pages, plus the
From/To two-DatePicker composition demo (per-field presets via the exported hooks).
Changeset (minor: components, system, theme-rui). Verification: `pnpm typecheck:only`
(baseline: 17 pre-existing errors in unrelated files — criterion is no new errors),
unit + story tests, `pnpm format`, Chromatic VRT, a11y audit.

## Out of scope

- Handoff's visual restyle of day cells, range endpoints (pill), in-range bars,
  event dots, field/popover chrome, bottom-sheet chrome (grabber, radii, confirm
  button), and the month/year Select header variant.
- Filter-pattern docs page (DST-1434) stays untouched.
- Committing `design_handoff_date_selection/` to the repo (user decides separately).
