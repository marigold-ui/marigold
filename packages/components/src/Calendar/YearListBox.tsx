import type { Dispatch, SetStateAction } from 'react';
import { CalendarYearPicker } from 'react-aria-components';
import { type CalendarDropdownView, useCalendarOrRangeState } from './Context';
import { ListBox } from './ListBox';

interface YearDropdownProps {
  setSelectedDropdown: Dispatch<
    SetStateAction<CalendarDropdownView | undefined>
  >;
}

const YearListBox = ({ setSelectedDropdown }: YearDropdownProps) => {
  const state = useCalendarOrRangeState();
  const focusedYear = state.focusedDate.year;

  const start = Math.max(focusedYear - 20, 1);
  const min = state.minValue ? state.minValue.year : start;
  const max = state.maxValue ? state.maxValue.year : start + 40;
  const visibleYears = 2 * Math.max(focusedYear - min, max - focusedYear) + 1;

  return (
    <CalendarYearPicker visibleYears={visibleYears}>
      {({ items, value, onChange, 'aria-label': ariaLabel }) => (
        <ListBox
          ariaLabel={ariaLabel}
          items={items.filter(item => item.date.era === state.focusedDate.era)}
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
