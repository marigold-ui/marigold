import { Dispatch, SetStateAction } from 'react';
import { useDateFormatter, useLocale } from '@react-aria/i18n';
import { useCalendarOrRangeState } from './Context';
import { ListBox } from './ListBox';

interface YearDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

const YearListBox = ({ setSelectedDropdown }: YearDropdownProps) => {
  const state = useCalendarOrRangeState();
  const focusedYear = state.focusedDate.year;

  // Derive the year list from the calendar's bounds so out-of-range years are
  // never rendered. Both boundaries are inclusive. We can't use react-aria's
  // `CalendarYearPicker` here: it treats `maxValue` as exclusive and drops the
  // max year, so it would be unreachable from the dropdown. Unbounded sides keep
  // the previous focused-year ±20 window. `set({ year })` clamps invalid days
  // (e.g. Feb 29 on a non-leap target) to the last valid day of the month.
  //
  // When both bounds are set we render every in-range year (one option each) on
  // purpose — that is what keeps `minValue`/`maxValue` reachable. For
  // pathologically wide ranges this grows the DOM; virtualizing the listbox is
  // the path forward if that ever becomes a concern.
  const minYear = state.minValue ? state.minValue.year : focusedYear - 20;
  const maxYear = state.maxValue ? state.maxValue.year : focusedYear + 20;

  const years = Array.from(
    { length: Math.max(maxYear - minYear + 1, 0) },
    (_, i) => state.focusedDate.set({ year: minYear + i })
  );

  const formatter = useDateFormatter({
    year: 'numeric',
    timeZone: state.timeZone,
  });

  // Localized accessible name, matching what react-aria's CalendarYearPicker
  // would expose (e.g. "year"/"Jahr"). Computed inline — this only mounts when
  // the dropdown opens, so memoizing the lookup isn't worth a hook.
  const { locale } = useLocale();
  const ariaLabel =
    new Intl.DisplayNames(locale, { type: 'dateTimeField' }).of('year') ??
    'year';

  return (
    <ListBox
      ariaLabel={ariaLabel}
      items={years}
      // Every rendered year is in range, so `isDisabled` is omitted (defaults to
      // nothing disabled).
      isSelected={year => year.year === focusedYear}
      onSelect={year => {
        state.setFocusedDate(year);
        setSelectedDropdown(undefined);
      }}
      format={year => formatter.format(year.toDate(state.timeZone))}
    />
  );
};

export default YearListBox;
