import { Dispatch, SetStateAction } from 'react';
import { CalendarMonthPicker } from 'react-aria-components';
import { useCalendarOrRangeState } from './Context';
import { ListBox } from './ListBox';

interface MonthDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

const MonthListBox = ({ setSelectedDropdown }: MonthDropdownProps) => {
  const state = useCalendarOrRangeState();
  const currentYear = state.focusedDate.year;

  // The month picker always renders all 12 months (the `grid-cols-3` layout
  // depends on a fixed grid), so out-of-range months are disabled per item
  // rather than omitted.
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
      {({ items, value, onChange }) => (
        <ListBox
          dataTestid="monthOptions"
          items={items}
          isDisabled={item => item.id < minMonth || item.id > maxMonth}
          isSelected={item => item.id === value}
          onSelect={item => {
            onChange(item.id);
            setSelectedDropdown(undefined);
          }}
          format={item => item.formatted.substring(0, 3)}
        />
      )}
    </CalendarMonthPicker>
  );
};

export default MonthListBox;
