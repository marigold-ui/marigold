import { Dispatch, SetStateAction } from 'react';
import { CalendarYearPicker } from 'react-aria-components';
import { useCalendarOrRangeState } from './Context';
import { ListBox } from './ListBox';

interface YearDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

const YearListBox = ({ setSelectedDropdown }: YearDropdownProps) => {
  const state = useCalendarOrRangeState();
  const focusedYear = state.focusedDate.year;

  // `CalendarYearPicker` centers a fixed `visibleYears` window on the focused
  // year and clamps it to the bounds, so size the window to reach whichever
  // bound is farther. Unbounded sides keep the focused-year ±20 window. A wide
  // both-bounds range still renders every in-range year, so virtualizing the
  // listbox is the path forward if the DOM size ever becomes a concern.
  const min = state.minValue ? state.minValue.year : focusedYear - 20;
  const max = state.maxValue ? state.maxValue.year : focusedYear + 20;
  const visibleYears = 2 * Math.max(focusedYear - min, max - focusedYear) + 1;

  return (
    <CalendarYearPicker visibleYears={visibleYears}>
      {({ items, value, onChange, 'aria-label': ariaLabel }) => (
        <ListBox
          ariaLabel={ariaLabel}
          items={items}
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
