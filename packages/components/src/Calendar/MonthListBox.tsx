import { Dispatch, SetStateAction } from 'react';
import { CalendarMonthPicker } from 'react-aria-components/Calendar';
import { useCalendarOrRangeState } from './Context';
import { ListBox } from './ListBox';

interface MonthDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

const MonthListBox = ({ setSelectedDropdown }: MonthDropdownProps) => {
  const state = useCalendarOrRangeState();
  const currentYear = state.focusedDate.year;

  // All 12 months always render (the grid-cols-3 layout needs them), so out-of-range
  // months are disabled per item rather than omitted.
  const minMonth =
    state.minValue && state.minValue.year === currentYear
      ? state.minValue.month
      : 1;
  const maxMonth =
    state.maxValue && state.maxValue.year === currentYear
      ? state.maxValue.month
      : 12;

  return (
    <CalendarMonthPicker>
      {({ items, value, onChange, 'aria-label': ariaLabel }) => (
        <ListBox
          ariaLabel={ariaLabel}
          items={items}
          isDisabled={item => item.id < minMonth || item.id > maxMonth}
          isSelected={item => item.id === value}
          onSelect={item => {
            onChange(item.id);
            setSelectedDropdown(undefined);
          }}
          // `CalendarMonthPicker` already emits abbreviated names (default
          // `format="short"`, e.g. "Jan"); use them as-is rather than truncating,
          // which would mangle longer/non-Latin localized abbreviations.
          format={item => item.formatted}
        />
      )}
    </CalendarMonthPicker>
  );
};

export default MonthListBox;
