# DST-1511: Date Preset Rail Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `presets` prop (quick-select date/range presets) to `Calendar`, `RangeCalendar`, `DatePicker`, and `DateRangePicker`, rendered as a vertical ListBox rail beside the calendar (stacked above with resolved-value sublabels on small screens), per the design handoff.

**Architecture:** The UI-agnostic layers (preset math, `usePresets` hooks, intl messages, their tests) are **restored from the orphaned commit `bdc7ed2b4`** (a prior, reviewed implementation whose SegmentedControl UI was superseded by the design handoff) and extended with four new built-in keys. Only the UI layer is new: a generic `PresetListBox` in the `Calendar` folder built on RAC `ListBox`, borrowing the existing `ListBox` theme slot classes (which already implement the handoff's check-indicator row visual), plus one new `calendarPresets` theme slot for the rail/stack container. Selection is derived by value equality (no stored state); selecting a preset applies the value through the picker state contexts so the popover stays open.

**Tech Stack:** React 19, react-aria-components 1.x (subpath imports), `@internationalized/date`, Tailwind v4 via `@marigold/system` `cva` slots, Vitest + Storybook story tests.

**Spec:** `docs/superpowers/specs/2026-07-09-DST-1511-preset-rail-rework-design.md`
**Ticket:** [DST-1511](https://reservix.atlassian.net/browse/DST-1511)

## Global Constraints

- Package manager: **pnpm only** (`packageManager: pnpm@11.8.0`), Node 24.x.
- Strict TypeScript — no `any`; use `unknown` or proper types. `import type` for type-only imports.
- react-aria-components imports use **subpath modules** (e.g. `react-aria-components/ListBox`); namespace types via `import type RAC from 'react-aria-components'`.
- Never expose `className`/`style` props on public components; theme via `useClassNames` slots.
- Tests: Vitest APIs only (`vi.*`), `userEvent` never `fireEvent`, accessible queries (`getByRole`) over test ids.
- Stories: `preview.meta(...)` factory; component tests attached via `Story.test(...)` and `tags: ['component-test']`.
- Commit messages: conventional commits with ticket scope, e.g. `feat(DST-1511): ...`.
- `pnpm typecheck:only` after code changes. **Baseline: 17 pre-existing errors in unrelated story/test files — the criterion is "no NEW errors".**
- Restores use `git show bdc7ed2b4:<path> > <path>`. The orphaned commit's parent **is** the current HEAD's tree for all restored files, so a restore yields exactly HEAD + the prior preset work — safe to overwrite.
- Branch: work directly on `DST-1511_add-relative-date-range-presets`.
- Reference date used in examples: today = 2026-07-09 (Thursday).

## File Structure

| File                                                                                                        | Status           | Responsibility                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/components/src/Calendar/presets.ts`                                                               | Restore + extend | Types, built-in preset math (now incl. `this-week`, `next-7-days`, `next-30-days`, `this-quarter`), equality/bounds helpers. No React. |
| `packages/components/src/Calendar/presets.test.ts`                                                          | Restore + extend | Unit tests for the date math with faked system time.                                                                                   |
| `packages/components/src/intl/messages.ts`                                                                  | Restore + extend | 7 restored + 4 new label keys × 2 locales.                                                                                             |
| `packages/components/src/intl/messages.test.ts`                                                             | Restore + extend | Assertions for all preset keys.                                                                                                        |
| `packages/components/src/Calendar/usePresets.ts`                                                            | Restore + adapt  | `useDatePresets`/`useDateRangePresets` hooks; now pass the active locale into built-in resolvers. Public API.                          |
| `packages/components/src/Calendar/usePresets.test.tsx`                                                      | Restore + extend | renderHook tests for labels/normalization + new keys.                                                                                  |
| `packages/components/src/index.ts`                                                                          | Restore          | Export hooks + preset types.                                                                                                           |
| `packages/system/src/types/theme.ts`                                                                        | Modify           | Add `calendarPresets` slot to `Calendar` and `RangeCalendar` unions.                                                                   |
| `themes/theme-rui/src/components/Calendar.styles.ts`                                                        | Modify           | `calendarPresets` slot styles (rail/stack). `RangeCalendar.styles.ts` inherits via existing spread — no change.                        |
| `packages/components/src/Calendar/CalendarPresets.tsx`                                                      | Create           | `PresetListBox` (generic UI) + `CalendarPresets` (single) + `RangeCalendarPresets` (range) wired to RAC state contexts.                |
| `packages/components/src/Calendar/Context.tsx`                                                              | Restore          | Adds `readOnly` to `CalendarContextValue`.                                                                                             |
| `packages/components/src/Calendar/Calendar.tsx`                                                             | Restore + edit   | `presets` prop + row/column layout wrapper.                                                                                            |
| `packages/components/src/RangeCalendar/RangeCalendar.tsx`                                                   | Restore + edit   | Same for ranges.                                                                                                                       |
| `packages/components/src/DatePicker/DatePicker.tsx`                                                         | Restore + edit   | Forward `presets` (Tray + Popover branches).                                                                                           |
| `packages/components/src/DateRangePicker/DateRangePicker.tsx`                                               | Restore + edit   | Forward `presets` (Tray + Popover branches).                                                                                           |
| `packages/components/src/Calendar/Calendar.stories.tsx`                                                     | Modify           | `Presets`/`PresetsWithMinValue` stories + component tests (listbox roles).                                                             |
| `packages/components/src/Calendar/Calendar.test.tsx`                                                        | Modify           | Small-screen sublabel unit test.                                                                                                       |
| `packages/components/src/RangeCalendar/RangeCalendar.stories.tsx`                                           | Modify           | Presets stories + tests.                                                                                                               |
| `packages/components/src/RangeCalendar/RangeCalendar.test.tsx`                                              | Modify           | Small-screen sublabel unit test.                                                                                                       |
| `packages/components/src/DatePicker/DatePicker.stories.tsx`                                                 | Modify           | Presets story + stays-open test.                                                                                                       |
| `packages/components/src/DateRangePicker/DateRangePicker.stories.tsx`                                       | Modify           | Presets story + stays-open test.                                                                                                       |
| `docs/content/components/form/{daterangepicker,rangecalendar,datepicker,calendar}/*.demo.tsx` + `index.mdx` | Create/Modify    | "Quick select presets" docs sections + 5 demos.                                                                                        |
| `.changeset/dst-1511-date-presets.md`                                                                       | Create           | Minor bumps: components, system, theme-rui.                                                                                            |

**Do NOT restore** `packages/components/src/Calendar/CalendarPresets.tsx` or any `*.stories.tsx` from `bdc7ed2b4` — those contain the superseded SegmentedControl UI/tests and are replaced by new code in this plan.

---

### Task 1: Restore & extend preset math (`presets.ts`)

**Files:**

- Restore + modify: `packages/components/src/Calendar/presets.ts`
- Restore + modify (test): `packages/components/src/Calendar/presets.test.ts`

**Interfaces:**

- Consumes: `@internationalized/date` (`today`, `getLocalTimeZone`, `startOfMonth`, `endOfMonth`, `startOfWeek`, `endOfWeek`, `isSameDay`).
- Produces (later tasks rely on): types `DateRange { start: DateValue; end: DateValue }`, `DatePreset`, `DateRangePreset`, `BuiltInDatePresetKey = 'today' | 'yesterday' | 'tomorrow'`, `BuiltInDateRangePresetKey` (adds `'this-week' | 'next-7-days' | 'next-30-days' | 'this-quarter'` to the restored `'last-7-days' | 'last-30-days' | 'this-month'`); records `builtInDatePresets`, `builtInDateRangePresets` with entries `{ messageKey: string; resolve: (locale?: string) => T }`; helpers `isSameRange(a, b)`, `isOutOfBounds(range, minValue?, maxValue?)`.

- [ ] **Step 1: Restore the reviewed math module and its tests**

```bash
git show bdc7ed2b4:packages/components/src/Calendar/presets.ts > packages/components/src/Calendar/presets.ts
git show bdc7ed2b4:packages/components/src/Calendar/presets.test.ts > packages/components/src/Calendar/presets.test.ts
```

- [ ] **Step 2: Run restored tests to verify the baseline passes**

Run: `pnpm vitest run --project=unit-tests packages/components/src/Calendar/presets.test.ts`
Expected: PASS (all restored tests green).

- [ ] **Step 3: Write failing tests for the four new built-in keys**

Append to `packages/components/src/Calendar/presets.test.ts` (merge the imports with the restored file's existing imports — it already imports from `vitest` and `@internationalized/date`; add `CalendarDate` and `isSameDay` if missing):

```ts
describe('handoff range presets', () => {
  const setToday = (year: number, month: number, day: number) => {
    vi.useFakeTimers();
    // Local noon avoids UTC/local date flips around midnight.
    vi.setSystemTime(new Date(year, month - 1, day, 12));
  };

  afterEach(() => {
    vi.useRealTimers();
  });

  test('this-week starts on Monday for de-DE', () => {
    setToday(2026, 7, 9); // Thursday
    const { start, end } =
      builtInDateRangePresets['this-week'].resolve('de-DE');
    expect(isSameDay(start, new CalendarDate(2026, 7, 6))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 7, 12))).toBe(true);
  });

  test('this-week starts on Sunday for en-US', () => {
    setToday(2026, 7, 9);
    const { start, end } =
      builtInDateRangePresets['this-week'].resolve('en-US');
    expect(isSameDay(start, new CalendarDate(2026, 7, 5))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 7, 11))).toBe(true);
  });

  test('next-7-days includes today', () => {
    setToday(2026, 7, 9);
    const { start, end } = builtInDateRangePresets['next-7-days'].resolve();
    expect(isSameDay(start, new CalendarDate(2026, 7, 9))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 7, 15))).toBe(true);
  });

  test('next-30-days includes today', () => {
    setToday(2026, 7, 9);
    const { start, end } = builtInDateRangePresets['next-30-days'].resolve();
    expect(isSameDay(start, new CalendarDate(2026, 7, 9))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 8, 7))).toBe(true);
  });

  test('this-quarter covers the calendar quarter of today', () => {
    setToday(2026, 7, 9);
    const { start, end } = builtInDateRangePresets['this-quarter'].resolve();
    expect(isSameDay(start, new CalendarDate(2026, 7, 1))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 9, 30))).toBe(true);
  });

  test('this-quarter at the year end resolves to Q4', () => {
    setToday(2026, 12, 31);
    const { start, end } = builtInDateRangePresets['this-quarter'].resolve();
    expect(isSameDay(start, new CalendarDate(2026, 10, 1))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 12, 31))).toBe(true);
  });

  test('this-quarter at the year start resolves to Q1', () => {
    setToday(2026, 1, 1);
    const { start, end } = builtInDateRangePresets['this-quarter'].resolve();
    expect(isSameDay(start, new CalendarDate(2026, 1, 1))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 3, 31))).toBe(true);
  });
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `pnpm vitest run --project=unit-tests packages/components/src/Calendar/presets.test.ts`
Expected: FAIL — TypeScript/compile errors, `'this-week'` etc. are not keys of `builtInDateRangePresets`.

- [ ] **Step 5: Implement the four new built-ins in `presets.ts`**

1. Extend the import from `@internationalized/date`:

```ts
import {
  endOfMonth,
  endOfWeek,
  getLocalTimeZone,
  isSameDay,
  startOfMonth,
  startOfWeek,
  today,
} from '@internationalized/date';
```

2. Replace the `BuiltInDateRangePresetKey` union:

```ts
// Day presets are also valid range presets: they resolve to a single-day
// range (start === end === the day), see `builtInDateRangePresets` below.
export type BuiltInDateRangePresetKey =
  | BuiltInDatePresetKey
  | 'this-week'
  | 'next-7-days'
  | 'next-30-days'
  | 'last-7-days'
  | 'last-30-days'
  | 'this-month'
  | 'this-quarter';
```

3. Change the `BuiltInPreset` interface's `resolve` signature (the restored resolvers stay valid — they simply ignore the argument):

```ts
interface BuiltInPreset<T> {
  messageKey: string;
  /**
   * Built-in resolvers receive the active locale so week-based presets can
   * respect the locale's first day of the week. Falls back to `en-US`, the
   * repo's fallback message locale.
   */
  resolve: (locale?: string) => T;
}
```

4. Add the new entries to `builtInDateRangePresets` (after the `tomorrow` entry, before `'last-7-days'`; "next/last N days" include today):

```ts
  'this-week': {
    messageKey: 'presetThisWeek',
    resolve: (locale = 'en-US') => {
      const now = today(getLocalTimeZone());
      return { start: startOfWeek(now, locale), end: endOfWeek(now, locale) };
    },
  },
  'next-7-days': {
    messageKey: 'presetNext7Days',
    resolve: () => {
      const now = today(getLocalTimeZone());
      return { start: now, end: now.add({ days: 6 }) };
    },
  },
  'next-30-days': {
    messageKey: 'presetNext30Days',
    resolve: () => {
      const now = today(getLocalTimeZone());
      return { start: now, end: now.add({ days: 29 }) };
    },
  },
```

and after `'this-month'`:

```ts
  'this-quarter': {
    messageKey: 'presetThisQuarter',
    resolve: () => {
      const now = today(getLocalTimeZone());
      // Calendar quarters: Jan–Mar, Apr–Jun, Jul–Sep, Oct–Dec.
      const start = now.set({ month: now.month - ((now.month - 1) % 3), day: 1 });
      return { start, end: endOfMonth(start.add({ months: 2 })) };
    },
  },
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `pnpm vitest run --project=unit-tests packages/components/src/Calendar/presets.test.ts`
Expected: PASS (restored + new tests).

- [ ] **Step 7: Typecheck and commit**

Run: `pnpm typecheck:only` — no NEW errors vs the 17-error baseline.

```bash
git add packages/components/src/Calendar/presets.ts packages/components/src/Calendar/presets.test.ts
git commit -m "feat(DST-1511): restore preset math and add handoff range presets"
```

---

### Task 2: Restore & extend intl messages

**Files:**

- Restore + modify: `packages/components/src/intl/messages.ts`
- Restore + modify (test): `packages/components/src/intl/messages.test.ts`

**Interfaces:**

- Produces: message keys `presets` ("Quick selection"/"Schnellauswahl"), `presetToday`, `presetYesterday`, `presetTomorrow`, `presetLast7Days`, `presetLast30Days`, `presetThisMonth` (restored) and `presetThisWeek`, `presetNext7Days`, `presetNext30Days`, `presetThisQuarter` (new) in both `de-DE` and `en-US`. Task 1's `messageKey` values must match these exactly.

- [ ] **Step 1: Restore messages and tests**

```bash
git show bdc7ed2b4:packages/components/src/intl/messages.ts > packages/components/src/intl/messages.ts
git show bdc7ed2b4:packages/components/src/intl/messages.test.ts > packages/components/src/intl/messages.test.ts
```

- [ ] **Step 2: Run restored tests to verify the baseline passes**

Run: `pnpm vitest run --project=unit-tests packages/components/src/intl/messages.test.ts`
Expected: PASS.

- [ ] **Step 3: Extend the tests for the four new keys (failing first)**

In `messages.test.ts`, the restored file has a `preset messages are strings` test in both the `de-DE` and `en-US` describe blocks. Add to the `de-DE` one:

```ts
expect(de.presetThisWeek).toBe('Diese Woche');
expect(de.presetNext7Days).toBe('Nächste 7 Tage');
expect(de.presetNext30Days).toBe('Nächste 30 Tage');
expect(de.presetThisQuarter).toBe('Dieses Quartal');
```

and to the `en-US` one:

```ts
expect(en.presetThisWeek).toBe('This week');
expect(en.presetNext7Days).toBe('Next 7 days');
expect(en.presetNext30Days).toBe('Next 30 days');
expect(en.presetThisQuarter).toBe('This quarter');
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `pnpm vitest run --project=unit-tests packages/components/src/intl/messages.test.ts`
Expected: FAIL — the new keys are `undefined`.

- [ ] **Step 5: Add the messages**

In `messages.ts`, the restored `de-DE` block contains `presetLast7Days` … `presets`. Extend it (keep the group together):

```ts
    presetNext7Days: 'Nächste 7 Tage',
    presetNext30Days: 'Nächste 30 Tage',
    presetThisQuarter: 'Dieses Quartal',
    presetThisWeek: 'Diese Woche',
```

and in the `en-US` block:

```ts
    presetNext7Days: 'Next 7 days',
    presetNext30Days: 'Next 30 days',
    presetThisQuarter: 'This quarter',
    presetThisWeek: 'This week',
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `pnpm vitest run --project=unit-tests packages/components/src/intl/messages.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add packages/components/src/intl/messages.ts packages/components/src/intl/messages.test.ts
git commit -m "feat(DST-1511): restore and extend localized preset labels"
```

---

### Task 3: Restore & adapt `usePresets` hooks + public exports

**Files:**

- Restore + modify: `packages/components/src/Calendar/usePresets.ts`
- Restore + modify (test): `packages/components/src/Calendar/usePresets.test.tsx`
- Restore: `packages/components/src/index.ts`

**Interfaces:**

- Consumes: Task 1's `builtInDatePresets`/`builtInDateRangePresets` (`resolve: (locale?: string) => T`), Task 2's message keys.
- Produces: `useDatePresets(presets: DatePreset[]): ResolvedPreset<DateValue>[]`, `useDateRangePresets(presets: DateRangePreset[]): ResolvedPreset<DateRange>[]` where `ResolvedPreset<T> = { id: string; label: string; resolve: () => T }` (note: the _resolved_ preset's `resolve` takes no argument — the hook closes over the locale). Public exports from `@marigold/components`.

- [ ] **Step 1: Restore the hooks, tests, and export list**

```bash
git show bdc7ed2b4:packages/components/src/Calendar/usePresets.ts > packages/components/src/Calendar/usePresets.ts
git show bdc7ed2b4:packages/components/src/Calendar/usePresets.test.tsx > packages/components/src/Calendar/usePresets.test.tsx
git show bdc7ed2b4:packages/components/src/index.ts > packages/components/src/index.ts
```

- [ ] **Step 2: Run restored tests to verify the baseline passes**

Run: `pnpm vitest run --project=unit-tests packages/components/src/Calendar/usePresets.test.tsx`
Expected: PASS.

- [ ] **Step 3: Write failing tests for locale-aware resolution and new labels**

Append to the restored `usePresets.test.tsx`. The wrappers below are self-contained — if the restored file already defines equivalent `I18nProvider` wrappers, reuse those instead of duplicating. Merge imports (`renderHook` from `@testing-library/react`, `I18nProvider` from `react-aria-components`, `CalendarDate`/`isSameDay` from `@internationalized/date`, `vi` from `vitest`, `ReactNode` from `react` — keep whatever the restored file already has):

```tsx
const withLocale =
  (locale: string) =>
  ({ children }: { children: ReactNode }) => (
    <I18nProvider locale={locale}>{children}</I18nProvider>
  );

test('labels the handoff range presets (en-US)', () => {
  const { result } = renderHook(
    () =>
      useDateRangePresets([
        'this-week',
        'next-7-days',
        'next-30-days',
        'this-quarter',
      ]),
    { wrapper: withLocale('en-US') }
  );

  expect(result.current.map(preset => preset.label)).toEqual([
    'This week',
    'Next 7 days',
    'Next 30 days',
    'This quarter',
  ]);
});

test('resolves this-week with the active locale (de-DE starts Monday)', () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 6, 9, 12)); // Thursday, Jul 9 2026
  try {
    const { result } = renderHook(() => useDateRangePresets(['this-week']), {
      wrapper: withLocale('de-DE'),
    });
    const { start, end } = result.current[0].resolve();
    expect(isSameDay(start, new CalendarDate(2026, 7, 6))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 7, 12))).toBe(true);
  } finally {
    vi.useRealTimers();
  }
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `pnpm vitest run --project=unit-tests packages/components/src/Calendar/usePresets.test.tsx`
Expected: FAIL — the de-DE `this-week` test resolves with the `en-US` fallback (Sunday start) because the hook doesn't pass the locale yet. (The label test may already pass — that's fine.)

- [ ] **Step 5: Pass the active locale into built-in resolvers**

In `usePresets.ts`:

1. Change the `@react-aria/i18n` import to `import { useLocale, useLocalizedStringFormatter } from '@react-aria/i18n';`
2. Update the local `BuiltInPreset` interface to match Task 1: `resolve: (locale?: string) => T;`
3. In `useResolvedPresets`, read the locale and close over it in the built-in branch:

```ts
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const { locale } = useLocale();

  return presets.map(preset => {
    if (typeof preset === 'string') {
      const builtIn = builtIns[preset];
      return {
        id: preset,
        label: stringFormatter.format(builtIn.messageKey),
        resolve: () => builtIn.resolve(locale),
      };
    }
    // ... custom branch unchanged
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `pnpm vitest run --project=unit-tests packages/components/src/Calendar/usePresets.test.tsx`
Expected: PASS.

- [ ] **Step 7: Typecheck and commit**

Run: `pnpm typecheck:only` — no NEW errors. (The restored `index.ts` only re-exports files that now exist again.)

```bash
git add packages/components/src/Calendar/usePresets.ts packages/components/src/Calendar/usePresets.test.tsx packages/components/src/index.ts
git commit -m "feat(DST-1511): restore locale-aware date preset hooks"
```

---

### Task 4: `calendarPresets` theme slot

**Files:**

- Modify: `packages/system/src/types/theme.ts` (the `Calendar` and `RangeCalendar` slot unions, around lines 285–310)
- Modify: `themes/theme-rui/src/components/Calendar.styles.ts`

**Interfaces:**

- Produces: `classNames.calendarPresets` available via `useClassNames({ component: 'Calendar' | 'RangeCalendar' })` — consumed by Task 5's `PresetListBox`. `themes/theme-rui/src/components/RangeCalendar.styles.ts` spreads `...Calendar`, so it inherits the slot with no change.

- [ ] **Step 1: Add the slot to both type unions**

In `packages/system/src/types/theme.ts`, add `| 'calendarPresets'` after `| 'calendarHeading'` in **both** the `Calendar?: Record<...>` and `RangeCalendar?: Record<...>` unions.

- [ ] **Step 2: Add the slot styles in theme-rui**

In `themes/theme-rui/src/components/Calendar.styles.ts`, add to the `Calendar` object (after `calendarHeading`):

```ts
  calendarPresets: cva({
    base: [
      // Stack: full-width list above the grid on small screens.
      'max-sm:w-full',
      // Rail: fixed column left of the grid. Negative margins pull it flush
      // against the calendar surface's padding so background and divider span
      // the full height. The tray strips that padding, but the tray only
      // shows on small screens where the stack layout applies.
      'sm:w-40 sm:shrink-0 sm:self-stretch',
      'sm:bg-muted sm:border-r sm:border-border',
      'sm:-my-2 sm:-ml-2 sm:rounded-l-[inherit]',
    ],
  }),
```

(Verify `RangeCalendar.styles.ts` still spreads `...Calendar` — it does today — so no edit there.)

- [ ] **Step 3: Typecheck**

Run: `pnpm typecheck:only`
Expected: no NEW errors vs baseline.

- [ ] **Step 4: Commit**

```bash
git add packages/system/src/types/theme.ts themes/theme-rui/src/components/Calendar.styles.ts
git commit -m "feat(DST-1511): add calendarPresets theme slot"
```

---

### Task 5: `PresetListBox` UI + Calendar integration

**Files:**

- Create: `packages/components/src/Calendar/CalendarPresets.tsx`
- Restore: `packages/components/src/Calendar/Context.tsx` (adds `readOnly`)
- Restore + edit: `packages/components/src/Calendar/Calendar.tsx`
- Modify (test): `packages/components/src/Calendar/Calendar.stories.tsx`, `packages/components/src/Calendar/Calendar.test.tsx`

**Interfaces:**

- Consumes: Task 3's `useDatePresets`/`ResolvedPreset`, Task 1's `isOutOfBounds`, Task 4's `calendarPresets` slot, existing `useCalendarContext()` (`classNames`, `minValue`, `maxValue`, `disabled`, `readOnly`), theme `ListBox` slot classes via `useClassNames({ component: 'ListBox' })`, `useSmallScreen` from `@marigold/system`, `Check` from `../icons/Check`.
- Produces: internal components `PresetListBox<T>` (generic; props `{ resolvedPresets, isActive, isDisabled, onSelect, formatValue, disabled?, readOnly? }`), `CalendarPresets({ presets: DatePreset[] })`; `Calendar` accepts `presets?: DatePreset[]`. Task 6 adds `RangeCalendarPresets` to this same file.

- [ ] **Step 1: Restore the context and integrated Calendar**

```bash
git show bdc7ed2b4:packages/components/src/Calendar/Context.tsx > packages/components/src/Calendar/Context.tsx
git show bdc7ed2b4:packages/components/src/Calendar/Calendar.tsx > packages/components/src/Calendar/Calendar.tsx
```

The restored `Calendar.tsx` already contains the `presets` prop, the `content` extraction, the `CalendarPresets` import, and passes `readOnly` into the context — it was written for the old above-the-grid layout, adjusted next.

- [ ] **Step 2: Adjust the restored `Calendar.tsx` for the rail layout**

Edit 1 — the `presets` JSDoc, replace:

```
   * Quick-select presets rendered above the calendar. Accepts built-in
```

with:

```
   * Quick-select presets rendered beside the calendar (stacked above the
   * grid on small screens). Accepts built-in
```

Edit 2 — the root className, replace:

```tsx
          hasPresets && 'gap-4',
```

with:

```tsx
          hasPresets && 'gap-4 max-sm:flex-col sm:flex-row',
```

(The root already has `flex-col`; `sm:flex-row` puts the rail beside the grid — the `sm` breakpoint is exactly `useSmallScreen`'s query, so CSS and JS switch together.)

- [ ] **Step 3: Create `CalendarPresets.tsx`**

```tsx
import type { CalendarDate } from '@internationalized/date';
import {
  getLocalTimeZone,
  isSameDay,
  toCalendarDate,
} from '@internationalized/date';
import { use } from 'react';
import type RAC from 'react-aria-components';
import { CalendarStateContext } from 'react-aria-components/Calendar';
import { DatePickerStateContext } from 'react-aria-components/DatePicker';
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
} from 'react-aria-components/ListBox';
import {
  useDateFormatter,
  useLocalizedStringFormatter,
} from '@react-aria/i18n';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { Check } from '../icons/Check';
import { intlMessages } from '../intl/messages';
import { useCalendarContext } from './Context';
import { type DatePreset, isOutOfBounds } from './presets';
import { type ResolvedPreset, useDatePresets } from './usePresets';

// Helpers
// ---------------
/**
 * `CalendarStateContext`'s `value` is typed against both selection modes
 * (`CalendarState<CalendarSelectionMode>`), so it is a
 * `CalendarDate | readonly (CalendarDate | null)[] | null` union. TS's
 * built-in `Array.isArray` guard can't narrow away the `readonly` array
 * branch (it only narrows against a mutable `any[]`), so this is a custom
 * predicate instead of a cast. Presets only support single-date calendars,
 * so multi-select values are treated as "no current selection".
 */
const isMultiSelectValue = (
  value: CalendarDate | readonly (CalendarDate | null)[] | null
): value is readonly (CalendarDate | null)[] => Array.isArray(value);

// Shared preset list
// ---------------
interface PresetListBoxProps<T> {
  /**
   * Localized presets to render as options, in the order given.
   */
  resolvedPresets: ResolvedPreset<T>[];
  /**
   * Whether a resolved preset's value matches the calendar's current
   * selection. Determines which option (if any) renders as selected.
   */
  isActive: (value: T) => boolean;
  /**
   * Whether a resolved preset's value should render disabled, e.g. because
   * it falls outside `minValue`/`maxValue` or covers an unavailable date.
   */
  isDisabled: (value: T) => boolean;
  /**
   * Applies a resolved preset's value. Called with a freshly resolved value
   * at selection time, so relative presets ("today") are never stale.
   */
  onSelect: (value: T) => void;
  /**
   * Formats a resolved value for the trailing sublabel shown on small
   * screens, e.g. "Jul 9 – 15".
   */
  formatValue: (value: T) => string;
  disabled?: boolean;
  readOnly?: boolean;
}

/**
 * Shared rendering and selection logic for `CalendarPresets` and
 * `RangeCalendarPresets`. A vertical listbox rail beside the calendar grid
 * (a full-width stack above it on small screens). Reuses the `ListBox`
 * theme's item/list classes so preset rows look like every other Marigold
 * listbox row (leading check indicator, neutral selected fill).
 */
const PresetListBox = <T,>({
  resolvedPresets,
  isActive,
  isDisabled,
  onSelect,
  formatValue,
  disabled,
  readOnly,
}: PresetListBoxProps<T>) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const isSmallScreen = useSmallScreen();
  const { classNames } = useCalendarContext();
  const listBoxClassNames = useClassNames({ component: 'ListBox' });

  const items = resolvedPresets.map(preset => ({
    ...preset,
    value: preset.resolve(),
  }));
  const selectedId = items.find(item => isActive(item.value))?.id;
  const disabledKeys = items
    .filter(item => disabled || readOnly || isDisabled(item.value))
    .map(item => item.id);

  const handleSelectionChange = (keys: RAC.Selection) => {
    if (keys === 'all') return;
    const [key] = keys;
    const preset = resolvedPresets.find(candidate => candidate.id === key);
    if (!preset) return;

    // Resolve again at selection time so relative presets are never stale.
    onSelect(preset.resolve());
  };

  return (
    <AriaListBox
      aria-label={stringFormatter.format('presets')}
      selectionMode="single"
      // Selection is derived from the calendar value; clicking the active
      // preset again must not clear that value.
      disallowEmptySelection
      selectedKeys={selectedId != null ? [selectedId] : []}
      disabledKeys={disabledKeys}
      onSelectionChange={handleSelectionChange}
      className={cn(listBoxClassNames.list, classNames.calendarPresets)}
    >
      {items.map(item => (
        <AriaListBoxItem
          key={item.id}
          id={item.id}
          textValue={item.label}
          className={listBoxClassNames.item}
        >
          {/* Mirrors `ListBoxItem`'s selection-indicator markup so the
              ListBox theme's check-visibility rules apply unchanged. */}
          <div className="selection-indicator contents">
            <Check size={16} strokeWidth="3" className="hidden" />
            {isSmallScreen ? (
              <div className="flex w-full items-center justify-between gap-3">
                <span>{item.label}</span>
                <span className="text-secondary">
                  {formatValue(item.value)}
                </span>
              </div>
            ) : (
              item.label
            )}
          </div>
        </AriaListBoxItem>
      ))}
    </AriaListBox>
  );
};

// CalendarPresets (single date)
// ---------------
export const CalendarPresets = ({ presets }: { presets: DatePreset[] }) => {
  const state = use(CalendarStateContext);
  // Present only when this calendar is rendered inside a `<DatePicker>`
  // popover. Applying a preset through the picker's own state (instead of
  // the calendar's) keeps the popover open, since it bypasses the calendar's
  // onChange chain that the picker otherwise uses to auto-close on select.
  const pickerState = use(DatePickerStateContext);
  const { minValue, maxValue, disabled, readOnly } = useCalendarContext();
  const resolvedPresets = useDatePresets(presets);
  const dateFormatter = useDateFormatter({ month: 'short', day: 'numeric' });

  if (!state) return null;

  const currentValue = isMultiSelectValue(state.value) ? null : state.value;

  return (
    <PresetListBox
      resolvedPresets={resolvedPresets}
      isActive={value => currentValue != null && isSameDay(currentValue, value)}
      isDisabled={value =>
        Boolean(
          isOutOfBounds({ start: value, end: value }, minValue, maxValue) ||
          state.isCellUnavailable(toCalendarDate(value))
        )
      }
      formatValue={value =>
        dateFormatter.format(toCalendarDate(value).toDate(getLocalTimeZone()))
      }
      onSelect={value => {
        if (pickerState) {
          pickerState.setValue(value);
        } else {
          // `setValue` expects a `CalendarDate` (not the broader
          // `DateValue`), so normalize before committing.
          state.setValue(toCalendarDate(value));
        }
        // Applying the value alone doesn't move the visible grid. Jump the
        // calendar's focused date to the selection so it's actually on screen.
        state.setFocusedDate(toCalendarDate(value));
      }}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};
```

- [ ] **Step 4: Add stories with component tests**

In `packages/components/src/Calendar/Calendar.stories.tsx` (merge imports: `CalendarDate`, `getLocalTimeZone`, `isSameDay`, `today` from `@internationalized/date`; `I18nProvider` from `react-aria-components`; `expect`, `fn` from `storybook/test` — check what the file already imports):

```tsx
export const Presets = meta.story({
  tags: ['component-test'],
  args: {
    'aria-label': 'Event date',
    onChange: fn(),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <Calendar
        {...args}
        presets={[
          'today',
          'yesterday',
          'tomorrow',
          { label: 'Kickoff', value: new CalendarDate(2026, 8, 1) },
        ]}
      />
    </I18nProvider>
  ),
});

Presets.test('presets render as a labeled listbox', async ({ canvas }) => {
  const listbox = canvas.getByRole('listbox', { name: 'Quick selection' });
  await expect(listbox).toBeVisible();
  await expect(canvas.getByRole('option', { name: 'Kickoff' })).toBeVisible();
});

Presets.test(
  'selecting a preset sets the date and marks the option selected',
  async ({ args, canvas, userEvent }) => {
    const option = canvas.getByRole('option', { name: 'Tomorrow' });
    await userEvent.click(option);

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    const [date] = (args.onChange as ReturnType<typeof fn>).mock.calls[0];
    await expect(
      isSameDay(date, today(getLocalTimeZone()).add({ days: 1 }))
    ).toBe(true);
    await expect(option).toHaveAttribute('aria-selected', 'true');
  }
);

Presets.test(
  'selecting a preset jumps the visible month to its date',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('option', { name: 'Kickoff' }));
    await expect(
      canvas.getByRole('button', { name: 'Aug' })
    ).toBeInTheDocument();
  }
);

export const PresetsWithMinValue = meta.story({
  tags: ['component-test'],
  args: {
    'aria-label': 'Event date',
    minValue: today(getLocalTimeZone()),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <Calendar {...args} presets={['yesterday', 'today']} />
    </I18nProvider>
  ),
});

PresetsWithMinValue.test(
  'a preset outside minValue/maxValue is disabled',
  async ({ canvas }) => {
    await expect(
      canvas.getByRole('option', { name: 'Yesterday' })
    ).toHaveAttribute('aria-disabled', 'true');
    await expect(
      canvas.getByRole('option', { name: 'Today' })
    ).not.toHaveAttribute('aria-disabled');
  }
);
```

- [ ] **Step 5: Run the story tests**

Run: `pnpm vitest run --project=storybook-tests packages/components/src/Calendar/Calendar.stories.tsx`
Expected: PASS (new preset tests plus the file's existing tests).

- [ ] **Step 6: Add the small-screen sublabel unit test**

In `packages/components/src/Calendar/Calendar.test.tsx` (import `mockMatchMedia` from `../test.utils`; copy the `smallScreenQuery` constant exactly as defined in `packages/components/src/Sidebar/Sidebar.test.tsx:19` — ``const smallScreenQuery = `(width < ${theme.screens!.sm})`;`` — including its `theme` import; import the `Presets` story):

```tsx
describe('presets on small screens', () => {
  afterEach(() => {
    window.matchMedia = mockMatchMedia([]);
  });

  test('stack items show the resolved value as a trailing sublabel', () => {
    window.matchMedia = mockMatchMedia([smallScreenQuery]);
    render(<Presets.Component />);

    const option = screen.getByRole('option', { name: 'Kickoff' });
    expect(option).toHaveTextContent('Aug 1');
  });
});
```

Run: `pnpm vitest run --project=unit-tests packages/components/src/Calendar/Calendar.test.tsx`
Expected: PASS.

- [ ] **Step 7: Typecheck and commit**

Run: `pnpm typecheck:only` — no NEW errors.

```bash
git add packages/components/src/Calendar
git commit -m "feat(DST-1511): render Calendar presets as a listbox rail"
```

---

### Task 6: RangeCalendar integration

**Files:**

- Modify: `packages/components/src/Calendar/CalendarPresets.tsx` (add `RangeCalendarPresets`)
- Restore + edit: `packages/components/src/RangeCalendar/RangeCalendar.tsx`
- Modify (test): `packages/components/src/RangeCalendar/RangeCalendar.stories.tsx`, `packages/components/src/RangeCalendar/RangeCalendar.test.tsx`

**Interfaces:**

- Consumes: Task 5's `PresetListBox`, Task 3's `useDateRangePresets`, Task 1's `isSameRange`/`isOutOfBounds`/`DateRange`/`DateRangePreset`.
- Produces: `RangeCalendarPresets({ presets: DateRangePreset[] })` exported from `CalendarPresets.tsx`; `RangeCalendar` accepts `presets?: DateRangePreset[]`.

- [ ] **Step 1: Restore the integrated RangeCalendar**

```bash
git show bdc7ed2b4:packages/components/src/RangeCalendar/RangeCalendar.tsx > packages/components/src/RangeCalendar/RangeCalendar.tsx
```

- [ ] **Step 2: Apply the same two layout edits as Task 5 Step 2**

Edit 1 — the `presets` JSDoc, replace `Quick-select presets rendered next to the calendar.` with `Quick-select presets rendered beside the calendar (stacked above the grid on small screens).`

Edit 2 — root className, replace `hasPresets && 'gap-4',` with `hasPresets && 'gap-4 max-sm:flex-col sm:flex-row',`

- [ ] **Step 3: Add `RangeCalendarPresets` to `CalendarPresets.tsx`**

Add imports (merge with existing):

```tsx
import { DateRangePickerStateContext } from 'react-aria-components/DateRangePicker';
import { RangeCalendarStateContext } from 'react-aria-components/RangeCalendar';
import { type DateRange, type DateRangePreset, isSameRange } from './presets';
import { useDateRangePresets } from './usePresets';
```

Add the range-walking helper next to `isMultiSelectValue`:

```tsx
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
```

Append the component:

```tsx
// RangeCalendarPresets
// ---------------
export const RangeCalendarPresets = ({
  presets,
}: {
  presets: DateRangePreset[];
}) => {
  const state = use(RangeCalendarStateContext);
  // Present only when this calendar is rendered inside a
  // `<DateRangePicker>` popover. Applying a preset through the picker's own
  // state (instead of the calendar's) keeps the popover open, since it
  // bypasses the calendar's onChange chain that the picker otherwise uses to
  // auto-close on select.
  const pickerState = use(DateRangePickerStateContext);
  const { minValue, maxValue, disabled, readOnly } = useCalendarContext();
  const resolvedPresets = useDateRangePresets(presets);
  const dateFormatter = useDateFormatter({ month: 'short', day: 'numeric' });

  if (!state) return null;

  return (
    <PresetListBox
      resolvedPresets={resolvedPresets}
      isActive={value =>
        state.value?.start != null &&
        state.value?.end != null &&
        isSameRange(state.value, value)
      }
      isDisabled={value =>
        Boolean(
          isOutOfBounds(value, minValue, maxValue) ||
          rangeHasUnavailableDate(value, date => state.isCellUnavailable(date))
        )
      }
      formatValue={({ start, end }) =>
        dateFormatter.formatRange(
          toCalendarDate(start).toDate(getLocalTimeZone()),
          toCalendarDate(end).toDate(getLocalTimeZone())
        )
      }
      onSelect={value => {
        if (pickerState) {
          pickerState.setValue(value);
        } else {
          state.setValue(value);
        }
        // Applying the value alone doesn't move the visible grid. Jump the
        // calendar to the range start so multi-month views show its beginning.
        state.setFocusedDate(toCalendarDate(value.start));
      }}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};
```

- [ ] **Step 4: Add stories with component tests**

In `packages/components/src/RangeCalendar/RangeCalendar.stories.tsx` (merge imports: `getLocalTimeZone`, `isSameDay`, `today` from `@internationalized/date`; the file already imports `CalendarDate`, `I18nProvider`, `expect`, `fn`):

```tsx
export const Presets = meta.story({
  tags: ['component-test'],
  args: {
    'aria-label': 'Period',
    onChange: fn(),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <RangeCalendar
        {...args}
        presets={[
          'today',
          'this-week',
          'next-7-days',
          'next-30-days',
          'this-month',
          'this-quarter',
          {
            label: 'January 2027',
            value: {
              start: new CalendarDate(2027, 1, 5),
              end: new CalendarDate(2027, 1, 11),
            },
          },
        ]}
      />
    </I18nProvider>
  ),
});

Presets.test('presets render as a labeled listbox', async ({ canvas }) => {
  const listbox = canvas.getByRole('listbox', { name: 'Quick selection' });
  await expect(listbox).toBeVisible();
  await expect(
    canvas.getByRole('option', { name: 'This quarter' })
  ).toBeVisible();
});

Presets.test(
  'selecting a built-in preset sets the range and marks the option selected',
  async ({ args, canvas, userEvent }) => {
    const option = canvas.getByRole('option', { name: 'Next 7 days' });
    await userEvent.click(option);

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    const [range] = (args.onChange as ReturnType<typeof fn>).mock.calls[0];
    const now = today(getLocalTimeZone());
    await expect(isSameDay(range.start, now)).toBe(true);
    await expect(isSameDay(range.end, now.add({ days: 6 }))).toBe(true);
    await expect(option).toHaveAttribute('aria-selected', 'true');
  }
);

Presets.test(
  'selecting the "today" preset sets a single-day range',
  async ({ args, canvas, userEvent }) => {
    const option = canvas.getByRole('option', { name: 'Today' });
    await userEvent.click(option);

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    const [range] = (args.onChange as ReturnType<typeof fn>).mock.calls[0];
    const now = today(getLocalTimeZone());
    await expect(isSameDay(range.start, now)).toBe(true);
    await expect(isSameDay(range.end, now)).toBe(true);
  }
);

Presets.test(
  'selecting a preset jumps the visible month to its range',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('option', { name: 'January 2027' }));

    await expect(
      canvas.getByRole('button', { name: 'Jan' })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: '2027' })
    ).toBeInTheDocument();
  }
);

export const PresetsWithMinValue = meta.story({
  tags: ['component-test'],
  args: {
    'aria-label': 'Period',
    minValue: today(getLocalTimeZone()),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <RangeCalendar {...args} presets={['last-7-days', 'next-7-days']} />
    </I18nProvider>
  ),
});

PresetsWithMinValue.test(
  'a preset outside minValue/maxValue is disabled',
  async ({ canvas }) => {
    await expect(
      canvas.getByRole('option', { name: 'Last 7 days' })
    ).toHaveAttribute('aria-disabled', 'true');
    await expect(
      canvas.getByRole('option', { name: 'Next 7 days' })
    ).not.toHaveAttribute('aria-disabled');
  }
);
```

- [ ] **Step 5: Run the story tests**

Run: `pnpm vitest run --project=storybook-tests packages/components/src/RangeCalendar/RangeCalendar.stories.tsx`
Expected: PASS.

- [ ] **Step 6: Add the small-screen sublabel unit test**

In `packages/components/src/RangeCalendar/RangeCalendar.test.tsx` (same `mockMatchMedia`/`smallScreenQuery` setup as Task 5 Step 6; import the `Presets` story):

```tsx
describe('presets on small screens', () => {
  afterEach(() => {
    window.matchMedia = mockMatchMedia([]);
  });

  test('stack items show the resolved range as a trailing sublabel', () => {
    window.matchMedia = mockMatchMedia([smallScreenQuery]);
    render(<Presets.Component />);

    const option = screen.getByRole('option', { name: 'January 2027' });
    // Intl range formatting varies in dash/space characters across ICU
    // versions, so match loosely.
    expect(option.textContent).toMatch(/Jan 5.*11/);
  });
});
```

Run: `pnpm vitest run --project=unit-tests packages/components/src/RangeCalendar/RangeCalendar.test.tsx`
Expected: PASS.

- [ ] **Step 7: Typecheck and commit**

Run: `pnpm typecheck:only` — no NEW errors.

```bash
git add packages/components/src/Calendar/CalendarPresets.tsx packages/components/src/RangeCalendar
git commit -m "feat(DST-1511): render RangeCalendar presets as a listbox rail"
```

---

### Task 7: Forward `presets` from the pickers

**Files:**

- Restore + edit: `packages/components/src/DatePicker/DatePicker.tsx`
- Restore + edit: `packages/components/src/DateRangePicker/DateRangePicker.tsx`
- Modify (test): `packages/components/src/DatePicker/DatePicker.stories.tsx`, `packages/components/src/DateRangePicker/DateRangePicker.stories.tsx`

**Interfaces:**

- Consumes: Tasks 5/6 (`Calendar`/`RangeCalendar` `presets` props).
- Produces: `DatePicker` accepts `presets?: DatePreset[]`, `DateRangePicker` accepts `presets?: DateRangePreset[]`; both forward to the embedded calendar in the Tray and Popover branches.

- [ ] **Step 1: Restore both pickers**

```bash
git show bdc7ed2b4:packages/components/src/DatePicker/DatePicker.tsx > packages/components/src/DatePicker/DatePicker.tsx
git show bdc7ed2b4:packages/components/src/DateRangePicker/DateRangePicker.tsx > packages/components/src/DateRangePicker/DateRangePicker.tsx
```

- [ ] **Step 2: Update the two `presets` JSDoc blocks**

In both files, replace `Quick-select presets rendered above the calendar in the popover.` with `Quick-select presets rendered beside the calendar in the popover (stacked above the grid in the small-screen tray).`

- [ ] **Step 3: Add DateRangePicker story + stays-open test**

In `packages/components/src/DateRangePicker/DateRangePicker.stories.tsx` (merge imports; the file already has popover-opening tests to mirror — e.g. it locates the trigger with `canvas.getByRole('button')` and the opened overlay with `canvas.findByRole('dialog')`):

```tsx
export const Presets = meta.story({
  tags: ['component-test'],
  args: {
    label: 'Period',
    onChange: fn(),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <DateRangePicker
        {...args}
        presets={['today', 'next-7-days', 'this-month']}
      />
    </I18nProvider>
  ),
});

Presets.test(
  'selecting a preset applies the range and keeps the popover open',
  async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'));
    const dialog = await canvas.findByRole('dialog');

    const option = within(dialog).getByRole('option', {
      name: 'Next 7 days',
    });
    await userEvent.click(option);

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    const [range] = (args.onChange as ReturnType<typeof fn>).mock.calls[0];
    const now = today(getLocalTimeZone());
    await expect(isSameDay(range.start, now)).toBe(true);
    await expect(isSameDay(range.end, now.add({ days: 6 }))).toBe(true);

    // The popover must stay open so keyboard users can keep adjusting.
    await expect(dialog).toBeVisible();
    await expect(option).toHaveAttribute('aria-selected', 'true');
  }
);
```

- [ ] **Step 4: Add DatePicker story + stays-open test**

In `packages/components/src/DatePicker/DatePicker.stories.tsx` (same import merging; the calendar trigger there is the icon button with `data-testid="action"` — mirror how the file's existing tests open the popover):

```tsx
export const Presets = meta.story({
  tags: ['component-test'],
  args: {
    label: 'Event date',
    onChange: fn(),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <DatePicker {...args} presets={['today', 'tomorrow']} />
    </I18nProvider>
  ),
});

Presets.test(
  'selecting a preset applies the date and keeps the popover open',
  async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'));
    const dialog = await canvas.findByRole('dialog');

    const option = within(dialog).getByRole('option', { name: 'Tomorrow' });
    await userEvent.click(option);

    await expect(args.onChange).toHaveBeenCalledTimes(1);
    const [date] = (args.onChange as ReturnType<typeof fn>).mock.calls[0];
    await expect(
      isSameDay(date, today(getLocalTimeZone()).add({ days: 1 }))
    ).toBe(true);

    await expect(dialog).toBeVisible();
    await expect(option).toHaveAttribute('aria-selected', 'true');
  }
);
```

- [ ] **Step 5: Run both story-test files**

Run: `pnpm vitest run --project=storybook-tests packages/components/src/DatePicker/DatePicker.stories.tsx packages/components/src/DateRangePicker/DateRangePicker.stories.tsx`
Expected: PASS (including each file's pre-existing tests).

- [ ] **Step 6: Typecheck and commit**

Run: `pnpm typecheck:only` — no NEW errors.

```bash
git add packages/components/src/DatePicker packages/components/src/DateRangePicker
git commit -m "feat(DST-1511): forward presets from DatePicker and DateRangePicker"
```

---

### Task 8: Documentation

**Files:**

- Create: `docs/content/components/form/daterangepicker/date-range-picker-presets.demo.tsx`
- Create: `docs/content/components/form/rangecalendar/range-calendar-presets.demo.tsx`
- Create: `docs/content/components/form/datepicker/date-picker-presets.demo.tsx`
- Create: `docs/content/components/form/datepicker/date-picker-from-to-presets.demo.tsx`
- Create: `docs/content/components/form/calendar/calendar-presets.demo.tsx`
- Modify: the `index.mdx` in each of those four folders

**Interfaces:**

- Consumes: the public `presets` props and `@marigold/components` exports from Tasks 1–7.
- Note: demos are referenced from MDX via `<ComponentDemo name="<file-basename-without-.demo.tsx>" />`. Before writing, skim one existing demo + its MDX section in the same folder (e.g. `date-range-picker-min-max.demo.tsx` and its `## Set minimum and maximum...` section in `daterangepicker/index.mdx`) and match heading style and prose tone. If the docs site's demo registry needs regenerating, run `pnpm registry`.

- [ ] **Step 1: DateRangePicker demo (the handoff's preset list)**

`date-range-picker-presets.demo.tsx`:

```tsx
import { DateRangePicker } from '@marigold/components';

export default () => (
  <DateRangePicker
    label="Reporting period"
    presets={[
      'today',
      'yesterday',
      'this-week',
      'next-7-days',
      'next-30-days',
      'this-month',
      'this-quarter',
    ]} // [!code highlight]
  />
);
```

- [ ] **Step 2: RangeCalendar demo (built-in + custom)**

`range-calendar-presets.demo.tsx`:

```tsx
import { CalendarDate } from '@internationalized/date';
import { RangeCalendar } from '@marigold/components';

export default () => (
  <RangeCalendar
    aria-label="Festival period"
    presets={[
      'this-week',
      'this-month',
      'this-quarter',
      {
        label: 'Festival season',
        value: () => ({
          start: new CalendarDate(2026, 6, 1),
          end: new CalendarDate(2026, 8, 31),
        }),
      }, // [!code highlight]
    ]}
  />
);
```

- [ ] **Step 3: DatePicker demo**

`date-picker-presets.demo.tsx`:

```tsx
import { DatePicker } from '@marigold/components';

export default () => (
  <DatePicker
    label="Event date"
    presets={['today', 'tomorrow']} // [!code highlight]
  />
);
```

- [ ] **Step 4: From/To composition demo**

`date-picker-from-to-presets.demo.tsx`:

```tsx
import { useState } from 'react';
import type { DateValue } from 'react-aria-components';
import { DatePicker, Stack } from '@marigold/components';

export default () => {
  const [from, setFrom] = useState<DateValue | null>(null);
  const [to, setTo] = useState<DateValue | null>(null);

  return (
    <Stack space={4}>
      <DatePicker
        label="From"
        value={from}
        onChange={setFrom}
        maxValue={to ?? undefined} // [!code highlight]
        presets={['today', 'tomorrow']}
      />
      <DatePicker
        label="To"
        value={to}
        onChange={setTo}
        minValue={from ?? undefined} // [!code highlight]
        presets={['today', 'tomorrow']}
      />
    </Stack>
  );
};
```

(Check `DatePicker`'s `value`/`onChange` types against the actual props — if `onChange` passes `null` differently or `Stack`'s spacing prop is named differently in current docs demos, follow the codebase. Run `pnpm typecheck:docs` to confirm.)

- [ ] **Step 5: Calendar demo**

`calendar-presets.demo.tsx`:

```tsx
import { Calendar } from '@marigold/components';

export default () => (
  <Calendar
    aria-label="Event date"
    presets={['yesterday', 'today', 'tomorrow']} // [!code highlight]
  />
);
```

- [ ] **Step 6: Add a "Quick select presets" section to each of the four `index.mdx` files**

Follow each file's existing section style (heading level, prose before the demo). Content per page (adapt wording to the surrounding tone):

```mdx
## Quick select presets

Use the `presets` prop to offer common ranges as a one-click list beside the
calendar. Built-in keys ship with localized labels and correct date math;
custom presets take a `label` and a value or resolver function. Presets that
fall outside `minValue`/`maxValue` or cover unavailable dates are disabled.
On small screens the list stacks above the calendar and shows the resolved
dates.

<ComponentDemo name="date-range-picker-presets" />
```

(Use the matching demo name per page; the datepicker page gets both `date-picker-presets` and, under a short "Combine with a second field" note, `date-picker-from-to-presets`.)

- [ ] **Step 7: Verify docs typecheck and commit**

Run: `pnpm typecheck:docs`
Expected: no NEW errors. If demos don't render because of the registry, run `pnpm registry` and re-check.

```bash
git add docs/content/components/form
git commit -m "docs(DST-1511): document quick select presets"
```

---

### Task 9: Changeset + full verification

**Files:**

- Create: `.changeset/dst-1511-date-presets.md`

- [ ] **Step 1: Write the changeset**

```md
---
'@marigold/components': minor
'@marigold/system': minor
'@marigold/theme-rui': minor
---

Add relative date presets to `Calendar`, `RangeCalendar`, `DatePicker`, and `DateRangePicker` via a new `presets` prop, rendered as a quick-selection list beside the calendar (stacked above the grid with resolved dates on small screens). Ships built-in localized presets (`today`, `yesterday`, `tomorrow`, `this-week`, `next-7-days`, `next-30-days`, `last-7-days`, `last-30-days`, `this-month`, `this-quarter`), supports custom presets with value resolvers, and exports `useDatePresets`/`useDateRangePresets` for userland compositions.
```

- [ ] **Step 2: Full test pass**

Run: `pnpm vitest run --project=unit-tests packages/components/src/Calendar packages/components/src/RangeCalendar packages/components/src/DatePicker packages/components/src/DateRangePicker packages/components/src/intl`
Expected: PASS.

Run: `pnpm vitest run --project=storybook-tests packages/components/src/Calendar/Calendar.stories.tsx packages/components/src/RangeCalendar/RangeCalendar.stories.tsx packages/components/src/DatePicker/DatePicker.stories.tsx packages/components/src/DateRangePicker/DateRangePicker.stories.tsx`
Expected: PASS.

- [ ] **Step 3: Typecheck, lint, format**

Run: `pnpm typecheck:only` — no NEW errors vs the 17-error baseline.
Run: `pnpm lint` — no new violations in touched files.
Run: `pnpm format` — then `git diff` and stage any formatting-only changes it produced in touched files.

- [ ] **Step 4: Commit**

```bash
git add .changeset/dst-1511-date-presets.md
git commit -m "chore(DST-1511): add changeset for date presets"
```

- [ ] **Step 5: Visual + a11y verification (user-involved)**

- Start Storybook (`pnpm sb`) and visually check: rail beside the grid (single + two-month RangeCalendar), stack in the small viewport, check indicator, selected fill, disabled presets.
- Trigger Chromatic VRT via the `/vrt` skill (user approves).
- Run the a11y-audit agent on `CalendarPresets.tsx` + the integrated stories.
- Deferred-findings ledger from the previous run does not apply (that code was discarded); do a final whole-branch review before PR.
