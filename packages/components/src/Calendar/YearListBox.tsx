import { CalendarDate } from '@internationalized/date';
import { Dispatch, SetStateAction, useContext } from 'react';
import { CalendarStateContext, DateValue } from 'react-aria-components';
import { useDateFormatter } from '@react-aria/i18n';
import { useCalendarContext } from './Context';
import { ListBox } from './ListBox';

interface YearDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
  minValue?: DateValue;
  maxValue?: DateValue;
}

const YearListBox = ({
  setSelectedDropdown,
  minValue,
  maxValue,
}: YearDropdownProps) => {
  const state = useContext(CalendarStateContext)!;
  const { classNames } = useCalendarContext();
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
      items={years}
      isDisabled={year => year.year < minYear || year.year > maxYear}
      isSelected={year => year.year === state.focusedDate.year}
      onSelect={year => {
        state.setFocusedDate(year);
        setSelectedDropdown(undefined);
      }}
      format={year => formatter.format(year.toDate(state.timeZone))}
      buttonClassName={classNames.calendarListboxButton}
      ulClassName="overflow-y-scroll"
    />
  );
};

export default YearListBox;
