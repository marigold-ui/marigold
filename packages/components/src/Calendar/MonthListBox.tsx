import { useContext } from 'react';
import { CalendarStateContext } from 'react-aria-components';
import { DateListBox } from './DateList';
import { useFormattedMonths } from './useFormattedMonths';

export const MonthList = () => {
  const state = useContext(CalendarStateContext)!;
  const months = useFormattedMonths(state.timeZone, state.focusedDate);

  const handleSelect = (index: number) => {
    const date = state.focusedDate.set({ month: index });
    state.setFocusedDate(date);
  };

  return (
    <DateListBox
      items={months}
      getItemLabel={month => month}
      onSelect={handleSelect}
    />
  );
};
