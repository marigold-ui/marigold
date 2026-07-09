# DST-1511: Relative Date Presets (Quick Ranges) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `presets` prop (relative quick-select date ranges/dates) to `Calendar`, `RangeCalendar`, `DatePicker`, and `DateRangePicker`, with built-in localized presets, plus exported `useDatePresets`/`useDateRangePresets` hooks for userland compositions.

**Architecture:** The preset UI is implemented once inside the `Calendar` folder (shared by both calendars, like `CalendarGrid` already is) and rendered as a horizontal Marigold `SegmentedControl` with a visible localized label ABOVE the calendar in every context (REVISED — originally a left column of plain buttons). The pickers simply forward a `presets` prop to their embedded calendar. Pure date math + types live in `presets.ts`; localized label resolution lives in `usePresets.ts` hooks which are also public API. Active preset is **derived by value equality** (no extra state, `SegmentedControl` controlled `value`); selecting a preset applies the value via the picker state when inside a picker (popover stays open) or the calendar state standalone.

**Tech Stack:** React 19, react-aria-components 1.19 (subpath imports), `@internationalized/date`, Tailwind v4 via `@marigold/system` `cva` slots, Vitest + Storybook story tests.

**Ticket:** [DST-1511](https://reservix.atlassian.net/browse/DST-1511) — note the ticket predates the existing `DateRangePicker`; no new component is needed.

## Decisions (resolved via grill-me interview, 2026-07-08)

1. No new component — presets are added to existing `Calendar`/`RangeCalendar`, forwarded from `DatePicker`/`DateRangePicker`.
2. Prop name is `presets`. Shape: array mixing **built-in string keys** and **custom objects** `{ id?, label, value: T | (() => T) }` (resolver callbacks supported — MUI/antd lesson: static values go stale past midnight).
3. Built-ins v1 (REVISED during execution, user decision): ONE unified catalog — the day keys `'today' | 'yesterday' | 'tomorrow'` are valid in BOTH contexts (in range contexts they resolve to single-day ranges, e.g. today → { start: today, end: today }); the range-only keys `'last-7-days' | 'last-30-days' | 'this-month'` remain range-context only. `BuiltInDateRangePresetKey = BuiltInDatePresetKey | 'last-7-days' | 'last-30-days' | 'this-month'`, math and labels derived from one source. Week/month/year families deferred (additive later). The two internal preset components share one generic implementation.
4. `last-N-days` **includes today**: start = today − (N−1), end = today.
5. Layout (REVISED after Task 5 review, user decision): presets render as a horizontal Marigold `SegmentedControl` (radio semantics, visible localized label from the `presets` intl key) ABOVE the calendar in every context. No placement prop. The original left-column plain-Button design was replaced; the `calendarPresets`/`calendarPreset` theme slots from Task 4 are removed again (SegmentedControl brings its own theming).
6. Active preset derived by value equality (`isSameDay` on endpoints); no `selectedPresetId` state. No match = "custom" (`SegmentedControl` controlled `value={null}`, nothing selected).
7. (REVISED) Preset selection applies the value and the picker popover STAYS OPEN — radio arrow-keys select while navigating, so auto-close would break keyboard use. Inside a picker, presets set the value via `DateRangePickerStateContext`/`DatePickerStateContext` `.setValue(...)` (applies without closing); standalone calendars use the calendar state's `setValue`. Calendar-cell selection keeps its existing close-on-select behavior. en-US `presets` label copy: "Quick selection".
8. Presets whose resolved value violates `minValue`/`maxValue` or hits unavailable dates render **disabled** (not hidden, not clamped).
9. Labels for built-ins come from `intlMessages` (`de-DE`, `en-US`); custom labels are plain strings supplied by the consumer.
10. `useDatePresets`/`useDateRangePresets` hooks are **exported** so userland compositions (e.g. DST-1434's Select + two DatePicker fields) reuse Marigold's math and i18n.
11. Docs: presets section + demo on all four component pages, plus a From/To two-DatePicker composition demo on the datepicker page. The filter pattern page (DST-1434) stays untouched.

## Global Constraints

- Package manager: **pnpm only** (`packageManager: pnpm@11.8.0`), Node 24.x.
- Strict TypeScript — no `any`; use `unknown` or proper types. `import type` for type-only imports.
- react-aria-components imports use **subpath modules** (e.g. `react-aria-components/Button`), namespace types via `import type RAC from 'react-aria-components'`.
- Never expose `className`/`style` props; theme via `useClassNames` slots only.
- z-index classes belong in component implementations, never in `*.styles.ts` (not needed here, but do not add any).
- Tests: Vitest APIs only (`vi.*`), `userEvent` never `fireEvent`, accessible queries (`getByRole`) over test ids.
- Stories: use `preview.meta(...)` factory; component tests attached via `Story.test(...)` + `Story.tags = ['component-test']`.
- Commit messages: conventional commits with ticket scope, e.g. `feat(DST-1511): ...`.
- Run `pnpm typecheck:only` after code changes; `pnpm format` before final commit.
- Branch: work directly on `DST-1511_add-relative-date-range-presets` (already checked out, clean).

## File Structure

| File                                                                                         | Status | Responsibility                                                                                                                    |
| -------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `packages/components/src/Calendar/presets.ts`                                                | Create | Types, built-in preset definitions (pure date math), equality/bounds helpers. No React.                                           |
| `packages/components/src/Calendar/presets.test.ts`                                           | Create | Unit tests for the date math with faked system time.                                                                              |
| `packages/components/src/Calendar/usePresets.ts`                                             | Create | `useDatePresets` / `useDateRangePresets` hooks — resolve built-in keys to localized labels + resolver fns. Public API.            |
| `packages/components/src/Calendar/usePresets.test.tsx`                                       | Create | renderHook tests for label localization and custom preset normalization.                                                          |
| `packages/components/src/Calendar/CalendarPresets.tsx`                                       | Create | Internal `PresetList` (presentational) + `CalendarPresets` (single) + `RangeCalendarPresets` (range) wired to RAC state contexts. |
| `packages/components/src/Calendar/Context.tsx`                                               | Modify | Add `readOnly` to `CalendarContextValue`.                                                                                         |
| `packages/components/src/Calendar/Calendar.tsx`                                              | Modify | `presets?: DatePreset[]` prop + row layout wrapper.                                                                               |
| `packages/components/src/RangeCalendar/RangeCalendar.tsx`                                    | Modify | `presets?: DateRangePreset[]` prop + row layout wrapper.                                                                          |
| `packages/components/src/DatePicker/DatePicker.tsx`                                          | Modify | Forward `presets` to `<Calendar>` (Tray + Popover branches).                                                                      |
| `packages/components/src/DateRangePicker/DateRangePicker.tsx`                                | Modify | Forward `presets` to `<RangeCalendar>` (Tray + Popover branches).                                                                 |
| `packages/components/src/intl/messages.ts`                                                   | Modify | 7 new keys × 2 locales.                                                                                                           |
| `packages/components/src/intl/messages.test.ts`                                              | Modify | Assertions for new keys.                                                                                                          |
| `packages/components/src/index.ts`                                                           | Modify | Export hooks + preset types.                                                                                                      |
| `packages/system/src/types/theme.ts`                                                         | Modify | Add `calendarPresets`/`calendarPreset` slots to `Calendar` and `RangeCalendar` unions.                                            |
| `themes/theme-rui/src/components/Calendar.styles.ts`                                         | Modify | Styles for the two new slots (`RangeCalendar.styles.ts` inherits via spread — no change needed there).                            |
| `packages/components/src/RangeCalendar/RangeCalendar.stories.tsx`                            | Modify | `Presets` story + component tests.                                                                                                |
| `packages/components/src/Calendar/Calendar.stories.tsx`                                      | Modify | `Presets` story + component tests.                                                                                                |
| `packages/components/src/DateRangePicker/DateRangePicker.stories.tsx`                        | Modify | `Presets` story + popover close test.                                                                                             |
| `packages/components/src/DatePicker/DatePicker.stories.tsx`                                  | Modify | `Presets` story + test.                                                                                                           |
| `docs/content/components/form/daterangepicker/daterangepicker-presets.demo.tsx`              | Create | Built-in + custom range presets demo.                                                                                             |
| `docs/content/components/form/rangecalendar/rangecalendar-presets.demo.tsx`                  | Create | Inline range calendar presets demo.                                                                                               |
| `docs/content/components/form/datepicker/datepicker-presets.demo.tsx`                        | Create | Single-date presets demo.                                                                                                         |
| `docs/content/components/form/datepicker/datepicker-from-to-presets.demo.tsx`                | Create | Two-field From/To composition with per-field presets.                                                                             |
| `docs/content/components/form/calendar/calendar-presets.demo.tsx`                            | Create | Inline calendar presets demo.                                                                                                     |
| `docs/content/components/form/{daterangepicker,rangecalendar,datepicker,calendar}/index.mdx` | Modify | "Quick select presets" section per page.                                                                                          |
| `.changeset/dst-1511-date-presets.md`                                                        | Create | Minor bumps for components/system/theme-rui.                                                                                      |

---

### Task 1: Preset math module (`presets.ts`)

**Files:**

- Create: `packages/components/src/Calendar/presets.ts`
- Test: `packages/components/src/Calendar/presets.test.ts`

**Interfaces:**

- Consumes: `@internationalized/date` (`today`, `getLocalTimeZone`, `startOfMonth`, `endOfMonth`, `isSameDay`), `DateValue` type from `react-aria-components/Calendar`.
- Produces (used by Tasks 3–6):
  - Types: `DateRange { start: DateValue; end: DateValue }`, `BuiltInDatePresetKey`, `BuiltInDateRangePresetKey`, `CustomDatePreset`, `CustomDateRangePreset`, `DatePreset`, `DateRangePreset`.
  - `builtInDatePresets: Record<BuiltInDatePresetKey, { messageKey: string; resolve: () => DateValue }>`
  - `builtInDateRangePresets: Record<BuiltInDateRangePresetKey, { messageKey: string; resolve: () => DateRange }>`
  - `isSameRange(a: DateRange, b: DateRange): boolean`
  - `isOutOfBounds(range: DateRange, minValue?: DateValue | null, maxValue?: DateValue | null): boolean`

- [ ] **Step 1: Write the failing test**

`packages/components/src/Calendar/presets.test.ts`:

```ts
import { CalendarDate } from '@internationalized/date';
import { vi } from 'vitest';
import {
  builtInDatePresets,
  builtInDateRangePresets,
  isOutOfBounds,
  isSameRange,
} from './presets';

describe('built-in presets', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Wed Jul 8 2026, local time
    vi.setSystemTime(new Date(2026, 6, 8, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('today resolves to the current day', () => {
    expect(builtInDatePresets.today.resolve()).toEqual(
      new CalendarDate(2026, 7, 8)
    );
  });

  test('yesterday resolves to the previous day', () => {
    expect(builtInDatePresets.yesterday.resolve()).toEqual(
      new CalendarDate(2026, 7, 7)
    );
  });

  test('tomorrow resolves to the next day', () => {
    expect(builtInDatePresets.tomorrow.resolve()).toEqual(
      new CalendarDate(2026, 7, 9)
    );
  });

  test('last-7-days spans 7 days ending today', () => {
    expect(builtInDateRangePresets['last-7-days'].resolve()).toEqual({
      start: new CalendarDate(2026, 7, 2),
      end: new CalendarDate(2026, 7, 8),
    });
  });

  test('last-30-days spans 30 days ending today', () => {
    expect(builtInDateRangePresets['last-30-days'].resolve()).toEqual({
      start: new CalendarDate(2026, 6, 9),
      end: new CalendarDate(2026, 7, 8),
    });
  });

  test('this-month spans the current calendar month', () => {
    expect(builtInDateRangePresets['this-month'].resolve()).toEqual({
      start: new CalendarDate(2026, 7, 1),
      end: new CalendarDate(2026, 7, 31),
    });
  });

  test('every built-in has a message key', () => {
    for (const preset of [
      ...Object.values(builtInDatePresets),
      ...Object.values(builtInDateRangePresets),
    ]) {
      expect(preset.messageKey).toMatch(/^preset/);
    }
  });
});

describe('isSameRange', () => {
  test('true for identical day ranges', () => {
    const a = {
      start: new CalendarDate(2026, 7, 1),
      end: new CalendarDate(2026, 7, 8),
    };
    const b = {
      start: new CalendarDate(2026, 7, 1),
      end: new CalendarDate(2026, 7, 8),
    };
    expect(isSameRange(a, b)).toBe(true);
  });

  test('false when an endpoint differs', () => {
    const a = {
      start: new CalendarDate(2026, 7, 1),
      end: new CalendarDate(2026, 7, 8),
    };
    const b = {
      start: new CalendarDate(2026, 7, 1),
      end: new CalendarDate(2026, 7, 9),
    };
    expect(isSameRange(a, b)).toBe(false);
  });
});

describe('isOutOfBounds', () => {
  const range = {
    start: new CalendarDate(2026, 7, 2),
    end: new CalendarDate(2026, 7, 8),
  };

  test('false without bounds', () => {
    expect(isOutOfBounds(range)).toBe(false);
  });

  test('true when start is before minValue', () => {
    expect(isOutOfBounds(range, new CalendarDate(2026, 7, 5))).toBe(true);
  });

  test('true when end is after maxValue', () => {
    expect(isOutOfBounds(range, undefined, new CalendarDate(2026, 7, 5))).toBe(
      true
    );
  });

  test('false when range fits the bounds', () => {
    expect(
      isOutOfBounds(
        range,
        new CalendarDate(2026, 7, 1),
        new CalendarDate(2026, 7, 31)
      )
    ).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run --project=unit-tests packages/components/src/Calendar/presets.test.ts`
Expected: FAIL — `Cannot find module './presets'` (or equivalent resolution error).

- [ ] **Step 3: Write the implementation**

`packages/components/src/Calendar/presets.ts`:

```ts
import {
  endOfMonth,
  getLocalTimeZone,
  isSameDay,
  startOfMonth,
  today,
} from '@internationalized/date';
import type { DateValue } from 'react-aria-components/Calendar';

// Types
// ---------------
export interface DateRange {
  start: DateValue;
  end: DateValue;
}

export type BuiltInDatePresetKey = 'today' | 'yesterday' | 'tomorrow';

export type BuiltInDateRangePresetKey =
  | 'last-7-days'
  | 'last-30-days'
  | 'this-month';

export interface CustomDatePreset {
  /**
   * Identifier used to key the preset. Defaults to the label.
   */
  id?: string;
  label: string;
  /**
   * The date the preset selects. Pass a function to resolve the value at
   * selection time, so relative presets stay correct in long-lived views.
   */
  value: DateValue | (() => DateValue);
}

export interface CustomDateRangePreset {
  /**
   * Identifier used to key the preset. Defaults to the label.
   */
  id?: string;
  label: string;
  /**
   * The range the preset selects. Pass a function to resolve the value at
   * selection time, so relative presets stay correct in long-lived views.
   */
  value: DateRange | (() => DateRange);
}

export type DatePreset = BuiltInDatePresetKey | CustomDatePreset;
export type DateRangePreset = BuiltInDateRangePresetKey | CustomDateRangePreset;

// Built-in presets
// ---------------
interface BuiltInPreset<T> {
  messageKey: string;
  resolve: () => T;
}

export const builtInDatePresets: Record<
  BuiltInDatePresetKey,
  BuiltInPreset<DateValue>
> = {
  today: {
    messageKey: 'presetToday',
    resolve: () => today(getLocalTimeZone()),
  },
  yesterday: {
    messageKey: 'presetYesterday',
    resolve: () => today(getLocalTimeZone()).subtract({ days: 1 }),
  },
  tomorrow: {
    messageKey: 'presetTomorrow',
    resolve: () => today(getLocalTimeZone()).add({ days: 1 }),
  },
};

// "Last N days" includes today: start = today - (N - 1), end = today.
export const builtInDateRangePresets: Record<
  BuiltInDateRangePresetKey,
  BuiltInPreset<DateRange>
> = {
  'last-7-days': {
    messageKey: 'presetLast7Days',
    resolve: () => {
      const now = today(getLocalTimeZone());
      return { start: now.subtract({ days: 6 }), end: now };
    },
  },
  'last-30-days': {
    messageKey: 'presetLast30Days',
    resolve: () => {
      const now = today(getLocalTimeZone());
      return { start: now.subtract({ days: 29 }), end: now };
    },
  },
  'this-month': {
    messageKey: 'presetThisMonth',
    resolve: () => {
      const now = today(getLocalTimeZone());
      return { start: startOfMonth(now), end: endOfMonth(now) };
    },
  },
};

// Helpers
// ---------------
export const isSameRange = (a: DateRange, b: DateRange) =>
  isSameDay(a.start, b.start) && isSameDay(a.end, b.end);

export const isOutOfBounds = (
  range: DateRange,
  minValue?: DateValue | null,
  maxValue?: DateValue | null
) =>
  Boolean(
    (minValue && range.start.compare(minValue) < 0) ||
    (maxValue && range.end.compare(maxValue) > 0)
  );
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run --project=unit-tests packages/components/src/Calendar/presets.test.ts`
Expected: PASS (13 tests).

- [ ] **Step 5: Typecheck and commit**

```bash
pnpm typecheck:only
git add packages/components/src/Calendar/presets.ts packages/components/src/Calendar/presets.test.ts
git commit -m "feat(DST-1511): add date preset math and types"
```

---

### Task 2: Localized labels (`intl/messages.ts`)

**Files:**

- Modify: `packages/components/src/intl/messages.ts` (insert into both locale objects, alphabetically after `pagePrevious`)
- Test: `packages/components/src/intl/messages.test.ts`

**Interfaces:**

- Produces message keys consumed by Task 3's hooks: `presets`, `presetLast7Days`, `presetLast30Days`, `presetThisMonth`, `presetToday`, `presetYesterday`, `presetTomorrow`.

- [ ] **Step 1: Write the failing test**

Add to the `de-DE` describe block in `packages/components/src/intl/messages.test.ts`:

```ts
test('preset messages are strings', () => {
  expect(de.presets).toBe('Schnellauswahl');
  expect(de.presetLast7Days).toBe('Letzte 7 Tage');
  expect(de.presetLast30Days).toBe('Letzte 30 Tage');
  expect(de.presetThisMonth).toBe('Dieser Monat');
  expect(de.presetToday).toBe('Heute');
  expect(de.presetYesterday).toBe('Gestern');
  expect(de.presetTomorrow).toBe('Morgen');
});
```

Add to the `en-US` describe block:

```ts
test('preset messages are strings', () => {
  expect(en.presets).toBe('Quick select');
  expect(en.presetLast7Days).toBe('Last 7 days');
  expect(en.presetLast30Days).toBe('Last 30 days');
  expect(en.presetThisMonth).toBe('This month');
  expect(en.presetToday).toBe('Today');
  expect(en.presetYesterday).toBe('Yesterday');
  expect(en.presetTomorrow).toBe('Tomorrow');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run --project=unit-tests packages/components/src/intl/messages.test.ts`
Expected: FAIL — `expected undefined to be 'Schnellauswahl'`.

- [ ] **Step 3: Add the messages**

In `packages/components/src/intl/messages.ts`, in the `'de-DE'` object after `pagePrevious: 'Vorherige Seite',`:

```ts
    presetLast7Days: 'Letzte 7 Tage',
    presetLast30Days: 'Letzte 30 Tage',
    presetThisMonth: 'Dieser Monat',
    presetToday: 'Heute',
    presetTomorrow: 'Morgen',
    presetYesterday: 'Gestern',
    presets: 'Schnellauswahl',
```

In the `'en-US'` object after `pagePrevious: 'Previous page',`:

```ts
    presetLast7Days: 'Last 7 days',
    presetLast30Days: 'Last 30 days',
    presetThisMonth: 'This month',
    presetToday: 'Today',
    presetTomorrow: 'Tomorrow',
    presetYesterday: 'Yesterday',
    presets: 'Quick select',
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run --project=unit-tests packages/components/src/intl/messages.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/components/src/intl/messages.ts packages/components/src/intl/messages.test.ts
git commit -m "feat(DST-1511): add localized labels for date presets"
```

---

### Task 3: Public hooks (`usePresets.ts`) + package exports

**Files:**

- Create: `packages/components/src/Calendar/usePresets.ts`
- Test: `packages/components/src/Calendar/usePresets.test.tsx`
- Modify: `packages/components/src/index.ts` (after line 59, the `CalendarProps` export)

**Interfaces:**

- Consumes: Task 1 (`builtInDatePresets`, `builtInDateRangePresets`, preset types), Task 2 (message keys).
- Produces (used by Task 5's components and by userland):
  - `interface ResolvedPreset<T> { id: string; label: string; resolve: () => T }`
  - `useDatePresets(presets: DatePreset[]): ResolvedPreset<DateValue>[]`
  - `useDateRangePresets(presets: DateRangePreset[]): ResolvedPreset<DateRange>[]`

- [ ] **Step 1: Write the failing test**

`packages/components/src/Calendar/usePresets.test.tsx`:

```tsx
import { CalendarDate } from '@internationalized/date';
import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { useDatePresets, useDateRangePresets } from './usePresets';

const wrapper =
  (locale: string) =>
  ({ children }: { children: ReactNode }) => (
    <I18nProvider locale={locale}>{children}</I18nProvider>
  );

test('resolves built-in keys to localized labels (de-DE)', () => {
  const { result } = renderHook(
    () => useDateRangePresets(['last-7-days', 'this-month']),
    { wrapper: wrapper('de-DE') }
  );
  expect(result.current.map(p => p.label)).toEqual([
    'Letzte 7 Tage',
    'Dieser Monat',
  ]);
  expect(result.current[0].id).toBe('last-7-days');
});

test('resolves built-in keys to localized labels (en-US)', () => {
  const { result } = renderHook(() => useDatePresets(['today', 'yesterday']), {
    wrapper: wrapper('en-US'),
  });
  expect(result.current.map(p => p.label)).toEqual(['Today', 'Yesterday']);
});

test('normalizes custom presets with static values', () => {
  const value = new CalendarDate(2026, 7, 1);
  const { result } = renderHook(
    () => useDatePresets([{ label: 'Season start', value }]),
    { wrapper: wrapper('en-US') }
  );
  expect(result.current[0].id).toBe('Season start');
  expect(result.current[0].label).toBe('Season start');
  expect(result.current[0].resolve()).toEqual(value);
});

test('normalizes custom presets with resolver functions and explicit id', () => {
  const range = {
    start: new CalendarDate(2026, 7, 1),
    end: new CalendarDate(2026, 7, 14),
  };
  const { result } = renderHook(
    () =>
      useDateRangePresets([
        { id: 'festival', label: 'Festival', value: () => range },
      ]),
    { wrapper: wrapper('en-US') }
  );
  expect(result.current[0].id).toBe('festival');
  expect(result.current[0].resolve()).toEqual(range);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run --project=unit-tests packages/components/src/Calendar/usePresets.test.tsx`
Expected: FAIL — `Cannot find module './usePresets'`.

- [ ] **Step 3: Write the implementation**

`packages/components/src/Calendar/usePresets.ts`:

```ts
import type { DateValue } from 'react-aria-components/Calendar';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { intlMessages } from '../intl/messages';
import {
  type DatePreset,
  type DateRange,
  type DateRangePreset,
  builtInDatePresets,
  builtInDateRangePresets,
} from './presets';

export interface ResolvedPreset<T> {
  id: string;
  label: string;
  /**
   * Resolves the preset to a concrete value. Called at selection time so
   * relative presets ("today") stay correct in long-lived views.
   */
  resolve: () => T;
}

interface BuiltInPreset<T> {
  messageKey: string;
  resolve: () => T;
}

const useResolvedPresets = <
  Key extends string,
  Custom extends { id?: string; label: string; value: T | (() => T) },
  T,
>(
  presets: (Key | Custom)[],
  builtIns: Record<Key, BuiltInPreset<T>>
): ResolvedPreset<T>[] => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return presets.map(preset => {
    if (typeof preset === 'string') {
      const builtIn = builtIns[preset];
      return {
        id: preset,
        label: stringFormatter.format(builtIn.messageKey),
        resolve: builtIn.resolve,
      };
    }
    const { id, label, value } = preset;
    return {
      id: id ?? label,
      label,
      resolve: typeof value === 'function' ? (value as () => T) : () => value,
    };
  });
};

/**
 * Resolves single-date presets (built-in keys and custom presets) to
 * localized labels and value resolvers. Useful to build custom preset UIs
 * (e.g. a Select of quick filters) that stay in sync with Marigold's
 * built-in preset labels and date math.
 */
export const useDatePresets = (
  presets: DatePreset[]
): ResolvedPreset<DateValue>[] =>
  useResolvedPresets(presets, builtInDatePresets);

/**
 * Resolves date-range presets (built-in keys and custom presets) to
 * localized labels and value resolvers. Useful to build custom preset UIs
 * (e.g. a Select of quick filters) that stay in sync with Marigold's
 * built-in preset labels and date math.
 */
export const useDateRangePresets = (
  presets: DateRangePreset[]
): ResolvedPreset<DateRange>[] =>
  useResolvedPresets(presets, builtInDateRangePresets);
```

Note: if `useLocalizedStringFormatter`'s typing rejects the plain `string` message key, type `messageKey` as `keyof (typeof intlMessages)['en-US'] & string` in `presets.ts` instead of widening here — do not use `any`.

- [ ] **Step 4: Add package exports**

In `packages/components/src/index.ts`, directly after the existing lines

```ts
export { Calendar } from './Calendar/Calendar';
export type { CalendarProps } from './Calendar/Calendar';
```

add:

```ts
export { useDatePresets, useDateRangePresets } from './Calendar/usePresets';
export type { ResolvedPreset } from './Calendar/usePresets';
export type {
  BuiltInDatePresetKey,
  BuiltInDateRangePresetKey,
  CustomDatePreset,
  CustomDateRangePreset,
  DatePreset,
  DateRange,
  DateRangePreset,
} from './Calendar/presets';
```

- [ ] **Step 5: Run tests and typecheck**

Run: `pnpm vitest run --project=unit-tests packages/components/src/Calendar/usePresets.test.tsx && pnpm typecheck:only`
Expected: PASS, no type errors.

- [ ] **Step 6: Commit**

```bash
git add packages/components/src/Calendar/usePresets.ts packages/components/src/Calendar/usePresets.test.tsx packages/components/src/index.ts
git commit -m "feat(DST-1511): add useDatePresets and useDateRangePresets hooks"
```

---

### Task 4: Theme slots (`calendarPresets`, `calendarPreset`)

**Files:**

- Modify: `packages/system/src/types/theme.ts:285-310` (both `Calendar?` and `RangeCalendar?` slot unions)
- Modify: `themes/theme-rui/src/components/Calendar.styles.ts` (add two slots; `RangeCalendar.styles.ts` inherits them via `...Calendar` spread — no change)

**Interfaces:**

- Produces: `classNames.calendarPresets` (list container) and `classNames.calendarPreset` (preset button) available via `useClassNames({ component: 'Calendar' | 'RangeCalendar' })` — consumed by Task 5.

- [ ] **Step 1: Extend the slot unions**

In `packages/system/src/types/theme.ts`, add `| 'calendarPresets' | 'calendarPreset'` to **both** the `Calendar?` record (after `'select'`, line ~295) and the `RangeCalendar?` record (after `'select'`, line ~308):

```ts
    Calendar?: Record<
      | 'calendar'
      | 'calendarContainer'
      | 'calendarMonth'
      | 'calendarListboxButton'
      | 'calendarCell'
      | 'calendarControllers'
      | 'calendarHeader'
      | 'calendarGrid'
      | 'calendarHeading'
      | 'calendarPresets'
      | 'calendarPreset'
      | 'select',
      ComponentStyleFunction<string, string>
    >;
```

(Apply the identical two entries to the `RangeCalendar?` record.)

- [ ] **Step 2: Add the theme styles**

In `themes/theme-rui/src/components/Calendar.styles.ts`, add to the `Calendar` object after the `calendarListboxButton` entry:

```ts
  calendarPresets: cva({
    base: [
      // Chips that wrap above the calendar on small screens ...
      'flex flex-row flex-wrap content-start gap-1',
      // ... and a vertical list beside it on larger screens.
      'sm:flex-col sm:flex-nowrap sm:border-r sm:border-border sm:pr-3',
    ],
  }),
  calendarPreset: cva({
    base: [
      'cursor-pointer rounded-md px-3 py-2 text-left text-sm whitespace-nowrap text-foreground',
      'outline-none focus-visible:ui-state-focus',
      'hover:ui-state-hover transition-[color,background-color] duration-150',
      'disabled:cursor-not-allowed disabled:text-disabled disabled:hover:bg-transparent',
      'aria-pressed:bg-selected-bold aria-pressed:text-selected-bold-foreground',
    ],
  }),
```

- [ ] **Step 3: Typecheck**

Run: `pnpm typecheck:only`
Expected: PASS. (`RangeCalendar.styles.ts` spreads `...Calendar`, so it satisfies the extended record automatically.)

- [ ] **Step 4: Commit**

```bash
git add packages/system/src/types/theme.ts themes/theme-rui/src/components/Calendar.styles.ts
git commit -m "feat(DST-1511): add calendar preset theme slots"
```

---

### Task 5: `CalendarPresets` components + wire into `RangeCalendar`

**Files:**

- Create: `packages/components/src/Calendar/CalendarPresets.tsx`
- Modify: `packages/components/src/Calendar/Context.tsx` (add `readOnly`)
- Modify: `packages/components/src/RangeCalendar/RangeCalendar.tsx`
- Test: `packages/components/src/RangeCalendar/RangeCalendar.stories.tsx` (new `Presets` story + tests)

**Interfaces:**

- Consumes: Task 1 helpers (`isSameRange`, `isOutOfBounds`, types), Task 3 hooks (`useDatePresets`, `useDateRangePresets`, `ResolvedPreset`), Task 4 slots (`calendarPresets`, `calendarPreset`), `useCalendarContext` from `./Context`, RAC `CalendarStateContext`/`RangeCalendarStateContext`.
- Produces (used by Task 6):
  - `CalendarPresets({ presets: DatePreset[] })` — single-date preset list, reads `CalendarStateContext`.
  - `RangeCalendarPresets({ presets: DateRangePreset[] })` — range preset list, reads `RangeCalendarStateContext`.
  - `RangeCalendarProps` gains `presets?: DateRangePreset[]`.
  - `CalendarContextValue` gains `readOnly?: boolean`.

- [ ] **Step 1: Write the failing story test**

In `packages/components/src/RangeCalendar/RangeCalendar.stories.tsx` (follow the file's existing `preview.meta`/`meta.story` pattern; add imports for `fn`/`expect` from `storybook/test`, `I18nProvider` from `react-aria-components/I18nProvider`, and `CalendarDate`, `getLocalTimeZone`, `isSameDay`, `today` from `@internationalized/date` if not present):

```tsx
export const Presets = meta.story({
  args: {
    'aria-label': 'Period',
    onChange: fn(),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <RangeCalendar
        {...args}
        presets={[
          'last-7-days',
          'last-30-days',
          'this-month',
          {
            label: 'Festival season',
            value: () => ({
              start: new CalendarDate(2026, 6, 1),
              end: new CalendarDate(2026, 8, 31),
            }),
          },
        ]}
      />
    </I18nProvider>
  ),
});
Presets.tags = ['component-test'];

Presets.test(
  'selecting a built-in preset sets the range and highlights the preset',
  async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Last 7 days' });
    await userEvent.click(button);

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    const [range] = (args.onChange as ReturnType<typeof fn>).mock.calls[0];
    const now = today(getLocalTimeZone());
    await expect(isSameDay(range.start, now.subtract({ days: 6 }))).toBe(true);
    await expect(isSameDay(range.end, now)).toBe(true);
    await expect(button).toHaveAttribute('aria-pressed', 'true');
  }
);

Presets.test('presets render inside a labeled group', async ({ canvas }) => {
  const group = canvas.getByRole('group', { name: 'Quick select' });
  await expect(group).toBeVisible();
});

export const PresetsWithMinValue = meta.story({
  args: {
    'aria-label': 'Period',
    minValue: today(getLocalTimeZone()),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <RangeCalendar {...args} presets={['last-7-days']} />
    </I18nProvider>
  ),
});
PresetsWithMinValue.tags = ['component-test'];

PresetsWithMinValue.test(
  'a preset outside minValue/maxValue is disabled',
  async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Last 7 days' });
    await expect(button).toBeDisabled();
  }
);
```

- [ ] **Step 2: Run the story test to verify it fails**

Run: `pnpm vitest run --project=storybook-tests packages/components/src/RangeCalendar/RangeCalendar.stories.tsx`
Expected: FAIL — TypeScript error on unknown `presets` prop / no button named "Last 7 days".

- [ ] **Step 3: Add `readOnly` to the calendar context**

In `packages/components/src/Calendar/Context.tsx`, extend the interface:

```ts
export interface CalendarContextValue {
  classNames: CalendarSharedClassNames;
  visibleMonths: number;
  minValue?: DateValue | null;
  maxValue?: DateValue | null;
  disabled?: boolean;
  readOnly?: boolean;
}
```

- [ ] **Step 4: Create the presets components**

`packages/components/src/Calendar/CalendarPresets.tsx`:

```tsx
import { isSameDay, toCalendarDate } from '@internationalized/date';
import { use } from 'react';
import { Button } from 'react-aria-components/Button';
import { CalendarStateContext } from 'react-aria-components/Calendar';
import type { DateValue } from 'react-aria-components/Calendar';
import { RangeCalendarStateContext } from 'react-aria-components/RangeCalendar';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { intlMessages } from '../intl/messages';
import { useCalendarContext } from './Context';
import {
  type DatePreset,
  type DateRange,
  type DateRangePreset,
  isOutOfBounds,
  isSameRange,
} from './presets';
import { useDatePresets, useDateRangePresets } from './usePresets';

// Helpers
// ---------------
/**
 * Walks every day of the range so a preset can not select through blocked
 * dates. Ranges are day-granular and preset-sized (weeks/months), so the
 * linear scan is cheap.
 */
const rangeHasUnavailableDate = (
  range: DateRange,
  isUnavailable: (date: ReturnType<typeof toCalendarDate>) => boolean
) => {
  let date = toCalendarDate(range.start);
  const end = toCalendarDate(range.end);
  while (date.compare(end) <= 0) {
    if (isUnavailable(date)) return true;
    date = date.add({ days: 1 });
  }
  return false;
};

// PresetList (shared, presentational)
// ---------------
interface PresetItem {
  id: string;
  label: string;
  disabled: boolean;
  active: boolean;
  onSelect: () => void;
}

const PresetList = ({ items }: { items: PresetItem[] }) => {
  const { classNames } = useCalendarContext();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <div
      role="group"
      aria-label={stringFormatter.format('presets')}
      className={classNames.calendarPresets}
    >
      {items.map(item => (
        <Button
          key={item.id}
          className={classNames.calendarPreset}
          isDisabled={item.disabled}
          aria-pressed={item.active}
          onPress={item.onSelect}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

// CalendarPresets (single date)
// ---------------
export const CalendarPresets = ({ presets }: { presets: DatePreset[] }) => {
  const state = use(CalendarStateContext);
  const { minValue, maxValue, disabled, readOnly } = useCalendarContext();
  const resolvedPresets = useDatePresets(presets);

  if (!state) return null;

  const items = resolvedPresets.map(preset => {
    const value = preset.resolve();
    return {
      id: preset.id,
      label: preset.label,
      disabled: Boolean(
        disabled ||
        readOnly ||
        isOutOfBounds({ start: value, end: value }, minValue, maxValue) ||
        state.isCellUnavailable(toCalendarDate(value))
      ),
      active: state.value != null && isSameDay(state.value, value),
      // Resolve again on selection so relative presets are never stale.
      onSelect: () => state.setValue(preset.resolve()),
    };
  });

  return <PresetList items={items} />;
};

// RangeCalendarPresets
// ---------------
export const RangeCalendarPresets = ({
  presets,
}: {
  presets: DateRangePreset[];
}) => {
  const state = use(RangeCalendarStateContext);
  const { minValue, maxValue, disabled, readOnly } = useCalendarContext();
  const resolvedPresets = useDateRangePresets(presets);

  if (!state) return null;

  const items = resolvedPresets.map(preset => {
    const value = preset.resolve();
    return {
      id: preset.id,
      label: preset.label,
      disabled: Boolean(
        disabled ||
        readOnly ||
        isOutOfBounds(value, minValue, maxValue) ||
        rangeHasUnavailableDate(value, date => state.isCellUnavailable(date))
      ),
      active:
        state.value?.start != null &&
        state.value?.end != null &&
        isSameRange(state.value as DateRange, value),
      // Resolve again on selection so relative presets are never stale.
      onSelect: () => state.setValue(preset.resolve()),
    };
  });

  return <PresetList items={items} />;
};
```

Implementation notes for the executor:

- `state.setValue(...)` on the RAC state contexts is the same commit path calendar cell selection uses; inside a picker it flows through the picker's `onChange` and closes the popover (verified by Task 7's test). If `DateValue` vs `CalendarDate`/`RangeValue` typings mismatch on `setValue`, prefer narrowing our types over casts.
- `isCellUnavailable` exists on both calendar states (`@react-stately/calendar`); it only reflects the `dateUnavailable` callback, not min/max.

- [ ] **Step 5: Wire `presets` into RangeCalendar**

In `packages/components/src/RangeCalendar/RangeCalendar.tsx`:

a) Import (after the existing `../Calendar/` imports):

```ts
import { RangeCalendarPresets } from '../Calendar/CalendarPresets';
import type { DateRangePreset } from '../Calendar/presets';
```

b) Add to `RangeCalendarProps` (after `pageBehavior`):

```ts
  /**
   * Quick-select presets rendered next to the calendar. Accepts built-in
   * keys (`'last-7-days'`, `'last-30-days'`, `'this-month'`) with localized
   * labels, and custom presets with a `label` and a range value or resolver
   * function. Selecting a preset sets the range; the preset matching the
   * current selection is highlighted. Presets that fall outside
   * `minValue`/`maxValue` or hit unavailable dates are disabled.
   */
  presets?: DateRangePreset[];
```

c) Destructure `presets` in the component signature (after `pageBehavior = 'visible',`).

d) Pass `readOnly` into the context value:

```ts
    <CalendarContext
      value={{
        classNames,
        visibleMonths,
        minValue,
        maxValue,
        disabled,
        readOnly,
      }}
    >
```

e) Restructure the `AriaRangeCalendar` children. The root keeps `relative` (the no-presets DOM stays byte-identical to avoid visual regressions); with presets, the existing children move into a `relative` wrapper that becomes the positioning context for the month/year dropdown overlay, and the root becomes a responsive row:

```tsx
<AriaRangeCalendar
  {...props}
  className={cn(
    'relative flex w-(--width) flex-col',
    hasPresets && 'gap-4 sm:flex-row',
    classNames.calendar
  )}
  style={createWidthVar('width', width)}
>
  {hasPresets ? (
    <>
      <RangeCalendarPresets presets={presets} />
      <div className="relative flex min-w-0 flex-col">{content}</div>
    </>
  ) : (
    content
  )}
</AriaRangeCalendar>
```

where above the `return`, define `const hasPresets = !!presets?.length;` and extract the current children (the `isMultiMonth ? (...) : (...)` block, unchanged) into `const content = isMultiMonth ? (...) : (...);`.

- [ ] **Step 6: Run the story tests to verify they pass**

Run: `pnpm vitest run --project=storybook-tests packages/components/src/RangeCalendar/RangeCalendar.stories.tsx`
Expected: PASS (new tests plus all pre-existing RangeCalendar story tests).

- [ ] **Step 7: Typecheck and commit**

```bash
pnpm typecheck:only
git add packages/components/src/Calendar/CalendarPresets.tsx packages/components/src/Calendar/Context.tsx packages/components/src/RangeCalendar/RangeCalendar.tsx packages/components/src/RangeCalendar/RangeCalendar.stories.tsx
git commit -m "feat(DST-1511): add presets to RangeCalendar"
```

---

### Task 6: Wire `presets` into `Calendar`

**Files:**

- Modify: `packages/components/src/Calendar/Calendar.tsx`
- Test: `packages/components/src/Calendar/Calendar.stories.tsx` (new `Presets` story + tests)

**Interfaces:**

- Consumes: `CalendarPresets` and `DatePreset` from Task 5/1.
- Produces: `CalendarProps` gains `presets?: DatePreset[]` (consumed by Task 8's DatePicker forwarding).

- [ ] **Step 1: Write the failing story test**

In `packages/components/src/Calendar/Calendar.stories.tsx` (adjust imports to the file's existing pattern):

```tsx
export const Presets = meta.story({
  args: {
    'aria-label': 'Date',
    onChange: fn(),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <Calendar {...args} presets={['today', 'yesterday', 'tomorrow']} />
    </I18nProvider>
  ),
});
Presets.tags = ['component-test'];

Presets.test(
  'selecting a preset sets the date and marks it selected',
  async ({ args, canvas, userEvent }) => {
    const radio = canvas.getByRole('radio', { name: 'Today' });
    await userEvent.click(radio);

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    const [date] = (args.onChange as ReturnType<typeof fn>).mock.calls[0];
    await expect(isSameDay(date, today(getLocalTimeZone()))).toBe(true);
    await expect(radio).toBeChecked();
  }
);
```

(Presets render as a `SegmentedControl` — radio semantics — labeled "Quick selection", matching the reworked Task 5. Match the exact assertions used in `RangeCalendar.stories.tsx`'s Presets tests.)

- [ ] **Step 2: Run the story test to verify it fails**

Run: `pnpm vitest run --project=storybook-tests packages/components/src/Calendar/Calendar.stories.tsx`
Expected: FAIL — unknown `presets` prop.

- [ ] **Step 3: Wire `presets` into Calendar**

In `packages/components/src/Calendar/Calendar.tsx`:

a) Imports:

```ts
import { CalendarPresets } from './CalendarPresets';
import type { DatePreset } from './presets';
```

b) Add to `CalendarProps` (after `pageBehavior`):

```ts
  /**
   * Quick-select presets rendered above the calendar. Accepts built-in
   * keys (`'today'`, `'yesterday'`, `'tomorrow'`) with localized labels, and
   * custom presets with a `label` and a date value or resolver function.
   * Selecting a preset sets the date; the preset matching the current
   * selection shows as selected. Presets that fall outside
   * `minValue`/`maxValue` or are unavailable are disabled.
   */
  presets?: DatePreset[];
```

c) Destructure `presets`, define `const hasPresets = !!presets?.length;`.

d) `Calendar.tsx` currently has two `return` branches (multi-month at lines 109-143, single-month at 145-205) with duplicated `CalendarContext` wrappers. Unify them the same way as RangeCalendar in Task 5: build `const content = isMultiMonth ? (<div className={classNames.calendarContainer}>…existing multi-month map…</div>) : (<>…existing overlay + single-month block…</>);`, then a single return:

```tsx
return (
  <CalendarContext
    value={{
      classNames,
      visibleMonths,
      minValue,
      maxValue,
      disabled,
      readOnly,
    }}
  >
    <Calendar
      className={cn(
        'relative flex w-(--width) flex-col',
        hasPresets && 'gap-4',
        classNames.calendar
      )}
      style={createWidthVar('width', width)}
      {...props}
    >
      {hasPresets ? (
        <>
          <CalendarPresets presets={presets} />
          <div className="relative flex min-w-0 flex-col">{content}</div>
        </>
      ) : (
        content
      )}
    </Calendar>
  </CalendarContext>
);
```

(Also pass `readOnly` into the context value, matching Task 5 step d. Mirror the exact layout classes the reworked RangeCalendar.tsx uses — presets bar stacks ABOVE the content, no `sm:flex-row`.)

- [ ] **Step 4: Run story tests to verify they pass**

Run: `pnpm vitest run --project=storybook-tests packages/components/src/Calendar/Calendar.stories.tsx`
Expected: PASS (new + all pre-existing Calendar story tests — the refactor must not break them).

- [ ] **Step 5: Typecheck and commit**

```bash
pnpm typecheck:only
git add packages/components/src/Calendar/Calendar.tsx packages/components/src/Calendar/Calendar.stories.tsx
git commit -m "feat(DST-1511): add presets to Calendar"
```

---

### Task 7: Forward `presets` from `DateRangePicker`

**Files:**

- Modify: `packages/components/src/DateRangePicker/DateRangePicker.tsx`
- Test: `packages/components/src/DateRangePicker/DateRangePicker.stories.tsx`

**Interfaces:**

- Consumes: `RangeCalendarProps['presets']` from Task 5.
- Produces: `DateRangePickerProps` gains `presets?: DateRangePreset[]`.

- [ ] **Step 1: Write the failing story test**

In `packages/components/src/DateRangePicker/DateRangePicker.stories.tsx` (this file already imports `I18nProvider` and `@internationalized/date` helpers — reuse them):

```tsx
export const Presets = meta.story({
  args: {
    label: 'Period',
    onChange: fn(),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <DateRangePicker {...args} presets={['last-7-days', 'this-month']} />
    </I18nProvider>
  ),
});
Presets.tags = ['component-test'];

Presets.test(
  'selecting a preset applies the range and keeps the popover open',
  async ({ args, canvas, userEvent }) => {
    // Open the calendar popover via the trigger button next to the inputs.
    await userEvent.click(canvas.getByTestId('action'));

    const dialog = await screen.findByRole('dialog');
    const preset = within(dialog).getByRole('radio', {
      name: 'Last 7 days',
    });
    await userEvent.click(preset);

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    const [range] = (args.onChange as ReturnType<typeof fn>).mock.calls[0];
    const now = today(getLocalTimeZone());
    await expect(isSameDay(range.start, now.subtract({ days: 6 }))).toBe(true);
    await expect(isSameDay(range.end, now)).toBe(true);

    // Apply-and-stay-open: radio arrow-keys select while navigating, so the
    // popover must NOT close on preset selection.
    await expect(screen.getByRole('dialog')).toBeVisible();
    await expect(preset).toBeChecked();
  }
);
```

(`screen`, `within`, `waitFor` come from `storybook/test`, same as the file's existing tests. If the file's existing tests open the popover differently — e.g. `getByRole('button')` scoped to the field — copy that idiom instead of `getByTestId`.)

- [ ] **Step 2: Run the story test to verify it fails**

Run: `pnpm vitest run --project=storybook-tests packages/components/src/DateRangePicker/DateRangePicker.stories.tsx`
Expected: FAIL — unknown `presets` prop.

- [ ] **Step 3: Forward the prop**

In `packages/components/src/DateRangePicker/DateRangePicker.tsx`:

a) Import: `import type { DateRangePreset } from '../Calendar/presets';`

b) Add to `DateRangePickerProps` (after `width`):

```ts
  /**
   * Quick-select presets rendered above the calendar in the popover.
   * Accepts built-in keys (`'last-7-days'`, `'last-30-days'`, `'this-month'`)
   * with localized labels, and custom presets with a `label` and a range
   * value or resolver function. Selecting a preset applies the range; the
   * popover stays open.
   */
  presets?: DateRangePreset[];
```

c) Destructure `presets` in `DateRangePickerBase` and pass it to **both** `RangeCalendar` instances:

```tsx
{
  isSmallScreen ? (
    <Tray>
      <Tray.Title>{rest.label}</Tray.Title>
      <Tray.Content>
        <RangeCalendar disabled={disabled} presets={presets} />
      </Tray.Content>
      <Tray.Actions>
        <Button slot="close">{stringFormatter.format('close')}</Button>
      </Tray.Actions>
    </Tray>
  ) : (
    <Popover>
      <Dialog>
        <RangeCalendar
          disabled={disabled}
          visibleDuration={visibleDuration}
          pageBehavior={pageBehavior}
          presets={presets}
        />
      </Dialog>
    </Popover>
  );
}
```

- [ ] **Step 4: Run the story tests to verify they pass**

Run: `pnpm vitest run --project=storybook-tests packages/components/src/DateRangePicker/DateRangePicker.stories.tsx`
Expected: PASS. **Contingency (inverted after the SegmentedControl pivot):** if the popover CLOSES on preset selection (the calendar state's `setValue` propagating through the picker's close-on-select path), the presets components must prefer the picker state when present: `const pickerState = use(DateRangePickerStateContext)` (import from `react-aria-components/DateRangePicker`; `null` for a standalone calendar) and call `pickerState.setValue(range)` instead of the calendar state's `setValue` — the picker-level setter applies the value without closing. Mirror with `DatePickerStateContext` in `CalendarPresets` for Task 8.

- [ ] **Step 5: Typecheck and commit**

```bash
pnpm typecheck:only
git add packages/components/src/DateRangePicker/DateRangePicker.tsx packages/components/src/DateRangePicker/DateRangePicker.stories.tsx
git commit -m "feat(DST-1511): forward presets from DateRangePicker"
```

---

### Task 8: Forward `presets` from `DatePicker`

**Files:**

- Modify: `packages/components/src/DatePicker/DatePicker.tsx`
- Test: `packages/components/src/DatePicker/DatePicker.stories.tsx`

**Interfaces:**

- Consumes: `CalendarProps['presets']` from Task 6.
- Produces: `DatePickerProps` gains `presets?: DatePreset[]`.

- [ ] **Step 1: Write the failing story test**

In `packages/components/src/DatePicker/DatePicker.stories.tsx`:

```tsx
export const Presets = meta.story({
  args: {
    label: 'Date',
    onChange: fn(),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <DatePicker {...args} presets={['today', 'yesterday']} />
    </I18nProvider>
  ),
});
Presets.tags = ['component-test'];

Presets.test(
  'selecting a preset applies the date and keeps the popover open',
  async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId('action'));

    const dialog = await screen.findByRole('dialog');
    const preset = within(dialog).getByRole('radio', { name: 'Today' });
    await userEvent.click(preset);

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    const [date] = (args.onChange as ReturnType<typeof fn>).mock.calls[0];
    await expect(isSameDay(date, today(getLocalTimeZone()))).toBe(true);
    // Apply-and-stay-open (see revised decision 7).
    await expect(screen.getByRole('dialog')).toBeVisible();
    await expect(preset).toBeChecked();
  }
);
```

(Same import/idiom note as Task 7 step 1.)

- [ ] **Step 2: Run the story test to verify it fails**

Run: `pnpm vitest run --project=storybook-tests packages/components/src/DatePicker/DatePicker.stories.tsx`
Expected: FAIL — unknown `presets` prop.

- [ ] **Step 3: Forward the prop**

In `packages/components/src/DatePicker/DatePicker.tsx`:

a) Import: `import type { DatePreset } from '../Calendar/presets';`

b) Add to `DatePickerProps` (after `width`):

```ts
  /**
   * Quick-select presets rendered above the calendar in the popover.
   * Accepts built-in keys (`'today'`, `'yesterday'`, `'tomorrow'`) with
   * localized labels, and custom presets with a `label` and a date value or
   * resolver function. Selecting a preset applies the date; the popover
   * stays open.
   */
  presets?: DatePreset[];
```

c) Destructure `presets` in `DatePickerBase` and pass `presets={presets}` to **both** `<Calendar disabled={disabled} />` instances (Tray branch line ~139 and Popover branch line ~148).

- [ ] **Step 4: Run the story tests to verify they pass**

Run: `pnpm vitest run --project=storybook-tests packages/components/src/DatePicker/DatePicker.stories.tsx`
Expected: PASS (same contingency as Task 7 step 4, using `DatePickerStateContext`).

- [ ] **Step 5: Typecheck and commit**

```bash
pnpm typecheck:only
git add packages/components/src/DatePicker/DatePicker.tsx packages/components/src/DatePicker/DatePicker.stories.tsx
git commit -m "feat(DST-1511): forward presets from DatePicker"
```

---

### Task 9: Documentation (four component pages + five demos)

**Files:**

- Create: `docs/content/components/form/daterangepicker/daterangepicker-presets.demo.tsx`
- Create: `docs/content/components/form/rangecalendar/rangecalendar-presets.demo.tsx`
- Create: `docs/content/components/form/datepicker/datepicker-presets.demo.tsx`
- Create: `docs/content/components/form/datepicker/datepicker-from-to-presets.demo.tsx`
- Create: `docs/content/components/form/calendar/calendar-presets.demo.tsx`
- Modify: `docs/content/components/form/daterangepicker/index.mdx`, `.../rangecalendar/index.mdx`, `.../datepicker/index.mdx`, `.../calendar/index.mdx`

Demos are auto-registered by basename (`docs/scripts/build-registry.mjs` scans `content/**/*.demo.tsx`); no manual registration. Before writing, skim one existing demo in each folder to match its formatting. Consider the `component-docs-writer` skill conventions.

- [ ] **Step 1: Create the demo files**

`daterangepicker-presets.demo.tsx`:

```tsx
import {
  endOfYear,
  getLocalTimeZone,
  startOfYear,
  today,
} from '@internationalized/date';
import { DateRangePicker } from '@marigold/components';

export default () => (
  <DateRangePicker
    label="Period"
    presets={[
      'last-7-days',
      'last-30-days',
      'this-month',
      {
        label: 'This year',
        value: () => {
          const now = today(getLocalTimeZone());
          return { start: startOfYear(now), end: endOfYear(now) };
        },
      },
    ]}
  />
);
```

`rangecalendar-presets.demo.tsx`:

```tsx
import { RangeCalendar } from '@marigold/components';

export default () => (
  <RangeCalendar
    aria-label="Period"
    presets={['last-7-days', 'last-30-days', 'this-month']}
  />
);
```

`datepicker-presets.demo.tsx`:

```tsx
import { DatePicker } from '@marigold/components';

export default () => (
  <DatePicker label="Date" presets={['yesterday', 'today', 'tomorrow']} />
);
```

`datepicker-from-to-presets.demo.tsx`:

```tsx
import { getLocalTimeZone, startOfMonth, today } from '@internationalized/date';
import { DatePicker, Inline } from '@marigold/components';

export default () => (
  <Inline space={4} alignY="input">
    <DatePicker
      label="From"
      presets={[
        {
          label: '30 days ago',
          value: () => today(getLocalTimeZone()).subtract({ days: 30 }),
        },
        {
          label: 'Start of month',
          value: () => startOfMonth(today(getLocalTimeZone())),
        },
        'today',
      ]}
    />
    <DatePicker label="To" presets={['yesterday', 'today']} />
  </Inline>
);
```

`calendar-presets.demo.tsx`:

```tsx
import { Calendar } from '@marigold/components';

export default () => (
  <Calendar aria-label="Date" presets={['yesterday', 'today', 'tomorrow']} />
);
```

- [ ] **Step 2: Add the docs sections**

In `docs/content/components/form/daterangepicker/index.mdx`, after the "Showing multiple months" section (before the "Narrow screens" callout):

```mdx
### Quick select presets

Relative ranges like "Last 7 days" or "This month" are by far the most common date filters, and picking them on a calendar takes several clicks. Pass `presets` to offer them as a quick-selection control above the calendar. Built-in keys (`'last-7-days'`, `'last-30-days'`, `'this-month'`) bring localized labels and the date math; custom presets take a `label` and a range value or a resolver function that is called at selection time, so relative presets never go stale. Selecting a preset applies the range while the popover stays open, so the resolved dates can be verified on the calendar. When the current selection matches a preset it shows as selected, and presets that fall outside `minValue`/`maxValue` or hit unavailable dates are disabled.

<ComponentDemo name="daterangepicker-presets" />

To reuse the built-in labels and date math in your own UI, for example a `Select` of quick filters, use the `useDateRangePresets` hook. It returns the presets with their localized labels and a `resolve` function for the concrete range.
```

In `rangecalendar/index.mdx`, add to its Usage part:

```mdx
### Quick select presets

Relative ranges like "Last 7 days" or "This month" are by far the most common date filters, and picking them on the calendar takes several clicks. Pass `presets` to offer them next to the grid. Built-in keys (`'last-7-days'`, `'last-30-days'`, `'this-month'`) bring localized labels and the date math; custom presets take a `label` and a range value or a resolver function that is called at selection time, so relative presets never go stale. Selecting a preset sets the range. When the current selection matches a preset it is highlighted, and presets that fall outside `minValue`/`maxValue` or hit unavailable dates are disabled.

<ComponentDemo name="rangecalendar-presets" />
```

In `datepicker/index.mdx`, add:

```mdx
### Quick select presets

For dates that are usually "today or nearby", presets save the trip through the calendar. Pass `presets` with built-in keys (`'today'`, `'yesterday'`, `'tomorrow'`) or custom presets with a `label` and a date value or resolver function. Selecting a preset applies the date while the popover stays open.

<ComponentDemo name="datepicker-presets" />

When a range is captured with two separate fields, give each field its own presets. Each field can only fill itself — for one-click ranges like "Last 7 days" that set both ends at once, use a [DateRangePicker](/components/form/daterangepicker) with `presets`, or drive both fields from a `Select` built with the `useDatePresets`/`useDateRangePresets` hooks.

<ComponentDemo name="datepicker-from-to-presets" />
```

In `calendar/index.mdx`, add to its Usage part:

```mdx
### Quick select presets

For dates that are usually "today or nearby", presets save the trip through the grid. Pass `presets` with built-in keys (`'today'`, `'yesterday'`, `'tomorrow'`) or custom presets with a `label` and a date value or resolver function that is called at selection time, so relative presets never go stale. Selecting a preset sets the date. When the current selection matches a preset it is highlighted, and presets that fall outside `minValue`/`maxValue` or are unavailable are disabled.

<ComponentDemo name="calendar-presets" />
```

The `<AutoTypeTable>` on each page picks up the new `presets` prop docs automatically from the interfaces.

- [ ] **Step 3: Verify the docs build renders the demos**

Run: `pnpm registry && pnpm --filter @marigold/docs dev` (requires `pnpm build` having been run once for workspace deps), open `http://localhost:3000/components/form/daterangepicker`, and check all four pages render their new section and interactive demo. Stop the dev server afterwards.

- [ ] **Step 4: Commit**

```bash
git add docs/content/components/form
git commit -m "docs(DST-1511): document date presets on calendar and picker pages"
```

---

### Task 10: Changeset + full verification

**Files:**

- Create: `.changeset/dst-1511-date-presets.md`

- [ ] **Step 1: Write the changeset**

`.changeset/dst-1511-date-presets.md`:

```md
---
'@marigold/components': minor
'@marigold/system': minor
'@marigold/theme-rui': minor
---

Add relative date presets (quick ranges) to `Calendar`, `RangeCalendar`, `DatePicker` and `DateRangePicker` via a new `presets` prop. Built-in keys (`'last-7-days'`, `'last-30-days'`, `'this-month'`, `'today'`, `'yesterday'`, `'tomorrow'`) ship localized labels and date math; custom presets take a label and a value or resolver function. The new `useDatePresets`/`useDateRangePresets` hooks expose the same resolution for userland compositions.
```

(Verify exact package names against each `package.json` before committing; adjust if the theme package is named differently.)

- [ ] **Step 2: Full verification pass**

```bash
pnpm typecheck:only
pnpm lint
pnpm vitest run --project=unit-tests packages/components/src/Calendar packages/components/src/intl
pnpm vitest run --project=storybook-tests packages/components/src/Calendar/Calendar.stories.tsx packages/components/src/RangeCalendar/RangeCalendar.stories.tsx packages/components/src/DatePicker/DatePicker.stories.tsx packages/components/src/DateRangePicker/DateRangePicker.stories.tsx
pnpm format
```

Expected: all green; `pnpm format` produces no unexpected diffs beyond the touched files.

- [ ] **Step 3: Visual + a11y verification**

- Start Storybook (`pnpm sb`), open the four `Presets` stories, and check: left-column layout on desktop, chip row in the small-screen viewport, highlighted active preset, disabled preset with `minValue`, focus ring on keyboard navigation.
- Run the `a11y-audit` agent (or the Storybook a11y addon) on `CalendarPresets` — the SegmentedControl must expose a labeled radiogroup ("Quick selection"/"Schnellauswahl"), radios reachable and selectable by keyboard, checked state reflecting the active preset, and selection must not close the picker popover.
- Trigger Chromatic VRT via the `/vrt` skill on this branch and review snapshots (expect new snapshots for the preset stories; **no diffs** on existing Calendar/RangeCalendar stories — the no-presets DOM was kept identical on purpose).

- [ ] **Step 4: Commit and hand off**

```bash
git add .changeset/dst-1511-date-presets.md
git commit -m "chore(DST-1511): add changeset"
```

Then create the PR with the `create-pr` skill (title: `feat(DST-1511): add relative date presets to calendars and date pickers`).

---

## Out of scope (explicitly)

- The filter pattern docs (`docs/content/patterns/user-input/filter/`) — owned by DST-1434; it will adopt this API separately.
- Week (`this-week`/`last-week`) and month/year (`last-month`/`this-year`/`last-year`) built-in keys — additive follow-ups.
- A relative _value model_ (Cloudscape/Grafana style `{ amount, unit }` values that survive serialization) — rejected: conflicts with the RAC `RangeValue<DateValue>` value contract.
- A `presetsPlacement` prop — single fixed layout for v1.

## Known risks

1. **Popover close-on-preset** relies on RAC propagating `state.setValue` through the picker's selection path. Task 7/8 tests pin the behavior; the contingency (picker state `close()`) is written into the tasks.
2. **Calendar.tsx refactor** (unifying the duplicated multi/single-month returns) touches the no-presets path. Existing story tests + VRT guard it.
3. **`useLocalizedStringFormatter` key typing** may require typing `messageKey` as a `keyof` the messages record (noted in Task 3).
4. **`sm:` breakpoint vs `useSmallScreen()`** — the CSS switch (chips vs column) and the Tray switch use different mechanisms; verify visually in Storybook at the boundary viewport (Task 10 step 3).
