import { CalendarDate } from '@internationalized/date';
import { useContext } from 'react';
import { CalendarStateContext } from 'react-aria-components';
import { useDateFormatter } from '@react-aria/i18n';
import { DateListBox } from './DateList';

export const YearList = () => {
  const state = useContext(CalendarStateContext)!;
  const years: { value: CalendarDate; formatted: string }[] = [];
  const formatter = useDateFormatter({
    year: 'numeric',
    timeZone: state.timeZone,
  });

  // Generate years array from -20 to +20 relative to current focusedDate
  for (let i = -20; i <= 20; i++) {
    const date = state.focusedDate.add({ years: i });
    years.push({
      value: date,
      formatted: formatter.format(date.toDate(state.timeZone)),
    });
  }

  const handleSelect = (index: number) => {
    const date = years[index].value;
    state.setFocusedDate(date);
  };

  // Selected index is always 20 (current focusedDate is at center)

  return (
    <DateListBox
      items={years}
      getItemLabel={year => year.formatted}
      onSelect={handleSelect}
    />
  );
};
