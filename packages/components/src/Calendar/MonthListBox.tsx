import { Dispatch, Key, SetStateAction, useContext } from 'react';
import { CalendarStateContext } from 'react-aria-components';
import { Button } from 'react-aria-components';
import { DateValue } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useCalendarContext } from './Context';
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

  const onPress = (index: Key, isDisabled: boolean) => {
    if (isDisabled) return;
    const date = state.focusedDate.set({ month: Number(index) + 1 });
    state.setFocusedDate(date);
    setSelectedDropdown(undefined);
  };

  const { classNames } = useCalendarContext();

  return (
    <ul
      data-testid="monthOptions"
      className="grid h-full max-h-[300px] min-w-[300px] grid-cols-3 gap-y-10 p-2"
    >
      {months.map((month, index) => {
        const monthNum = index + 1;
        const isDisabled = monthNum < minMonth || monthNum > maxMonth;
        const isSelected = index === state.focusedDate.month - 1;
        return (
          <li className="flex justify-center" key={index}>
            <Button
              slot="previous"
              onPress={() => onPress(index, isDisabled)}
              key={index + 1}
              aria-current={isSelected}
              isDisabled={isDisabled}
              className={cn(
                classNames.calendarListboxButton,
                'inline-flex items-center justify-center gap-[0.5ch]',
                isDisabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {month.substring(0, 3)}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default MonthListBox;
