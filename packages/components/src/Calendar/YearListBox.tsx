import { CalendarDate } from '@internationalized/date';
import { Dispatch, SetStateAction, useContext } from 'react';
import { CalendarStateContext, DateValue } from 'react-aria-components';
import { useDateFormatter } from '@react-aria/i18n';
import { ListBox } from './ListBox';

interface YearDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
  minValue?: DateValue | null;
  maxValue?: DateValue | null;
}

const YearListBox = ({
  setSelectedDropdown,
  minValue,
  maxValue,
}: YearDropdownProps) => {
  const state = useContext(CalendarStateContext)!;
  const years: CalendarDate[] = [];
  for (let i = -20; i <= 20; i++) {
    years.push(state.focusedDate.add({ years: i }));
  }
  const formatter = useDateFormatter({
    year: 'numeric',
    timeZone: state.timeZone,
  });

  const minYear = minValue ? minValue.year : -Infinity;
  const maxYear = maxValue ? maxValue.year : Infinity;

  return (
    <ListBox
      dataTestid="yearOptions"
      items={years}
      isDisabled={({ year }) => year < minYear || year > maxYear}
      isSelected={({ year }) => year === state.focusedDate.year}
      onSelect={year => {
        state.setFocusedDate(year);
        setSelectedDropdown(undefined);
      }}
      format={year => formatter.format(year.toDate(state.timeZone))}
    />
  );
};

export default YearListBox;
