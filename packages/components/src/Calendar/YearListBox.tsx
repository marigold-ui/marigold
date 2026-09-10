import type { Dispatch, SetStateAction } from 'react';
import { CalendarYearPicker } from 'react-aria-components';
import { type CalendarDropdownView, useCalendarOrRangeState } from './Context';
import { ListBox } from './ListBox';

const YEARS_AROUND_FOCUS = 20;

interface YearDropdownProps {
  setSelectedDropdown: Dispatch<
    SetStateAction<CalendarDropdownView | undefined>
  >;
}

const YearListBox = ({ setSelectedDropdown }: YearDropdownProps) => {
  const state = useCalendarOrRangeState();
  const focusedYear = state.focusedDate.year;
  const anchorAtEraFloor =
    state.focusedDate.calendar.identifier === 'gregory' && !state.minValue;

  const start = anchorAtEraFloor
    ? Math.max(focusedYear - YEARS_AROUND_FOCUS, 1)
    : focusedYear - YEARS_AROUND_FOCUS;
  const min = state.minValue ? state.minValue.year : start;
  const max = state.maxValue
    ? state.maxValue.year
    : start + YEARS_AROUND_FOCUS * 2;
  const visibleYears = 2 * Math.max(focusedYear - min, max - focusedYear) + 1;

  return (
    <CalendarYearPicker visibleYears={visibleYears}>
      {({ items, value, onChange, 'aria-label': ariaLabel }) => (
        <ListBox
          ariaLabel={ariaLabel}
          items={
            anchorAtEraFloor
              ? items.filter(item => item.date.era === state.focusedDate.era)
              : items
          }
          isSelected={item => item.id === value}
          onSelect={item => {
            onChange(item.id);
            setSelectedDropdown(undefined);
          }}
          format={item => item.formatted}
        />
      )}
    </CalendarYearPicker>
  );
};

export default YearListBox;
