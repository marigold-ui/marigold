import { Dispatch, Key, SetStateAction, useContext } from 'react';
import { CalendarStateContext, DateValue } from 'react-aria-components';
import { useCalendarContext } from './Context';
import { ListBox } from './ListBox';
import { useFormattedMonths } from './useFormattedMonths';

interface MonthDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
  minValue?: DateValue;
  maxValue?: DateValue;
}

const MonthListBox = ({
  setSelectedDropdown,
  minValue,
  maxValue,
}: MonthDropdownProps) => {
  const state = useContext(CalendarStateContext)!;
  const months = useFormattedMonths(state.timeZone, state.focusedDate);
  const currentYear = state.focusedDate.year;

  const minMonth =
    minValue && minValue.year === currentYear ? minValue.month : 1;
  const maxMonth =
    maxValue && maxValue.year === currentYear ? maxValue.month : 12;

  const { classNames } = useCalendarContext();

  return (
    <ListBox
      items={months}
      isDisabled={(_, monthIndex) =>
        monthIndex + 1 < minMonth || monthIndex + 1 > maxMonth
      }
      isSelected={(_, monthIndex) => monthIndex === state.focusedDate.month - 1}
      onSelect={(_, monthIndex) => {
        state.setFocusedDate(state.focusedDate.set({ month: monthIndex + 1 }));
        setSelectedDropdown(undefined);
      }}
      format={month => month.substring(0, 3)}
      buttonClassName={classNames.calendarListboxButton}
    />
  );
};

export default MonthListBox;
