import { Dispatch, Key, SetStateAction, useContext } from 'react';
import { CalendarStateContext } from 'react-aria-components';
import { Button } from '../Button';
import { useFormattedMonths } from './useFormattedMonths';

interface MonthDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

const MonthListBox = ({ setSelectedDropdown }: MonthDropdownProps) => {
  const state = useContext(CalendarStateContext)!;
  const months = useFormattedMonths(state.timeZone, state.focusedDate);

  let onChange = (index: Key) => {
    let value = Number(index) + 1;
    let date = state.focusedDate.set({ month: value });
    state.setFocusedDate(date);
  };

  return (
    <ul
      data-testid="monthOptions"
      className="grid h-full max-h-[300px] min-w-[300px] grid-cols-3 gap-y-10 overflow-y-scroll p-2"
    >
      {months.map((month, index) => {
        return (
          <li className="flex justify-center" key={index}>
            <Button
              slot="previous"
              variant={
                index === state.focusedDate.month - 1 ? 'secondary' : 'text'
              }
              size="small"
              onPress={() => {
                onChange(index);
                setSelectedDropdown(undefined);
              }}
              key={index + 1}
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
