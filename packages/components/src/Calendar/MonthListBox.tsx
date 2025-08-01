import { Dispatch, Key, SetStateAction, useContext } from 'react';
import { CalendarStateContext } from 'react-aria-components';
import { Button } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useCalendarContext } from './Context';
import { useFormattedMonths } from './useFormattedMonths';

interface MonthDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

const MonthListBox = ({ setSelectedDropdown }: MonthDropdownProps) => {
  const state = useContext(CalendarStateContext)!;
  const months = useFormattedMonths(state.timeZone, state.focusedDate);

  const onPress = (index: Key) => {
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
        const isSelected = index === state.focusedDate.month - 1;
        return (
          <li className="flex justify-center" key={index}>
            <Button
              slot="previous"
              onPress={() => onPress(index)}
              key={index + 1}
              aria-current={isSelected}
              className={cn(
                classNames.calendarListboxButton,
                'inline-flex items-center justify-center gap-[0.5ch]'
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
