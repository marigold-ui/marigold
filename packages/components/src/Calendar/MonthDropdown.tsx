import { Dispatch, Key, SetStateAction } from 'react';

import { CalendarState } from '@react-stately/calendar';

import { Button } from '../Button';

interface MonthDropdownProps {
  state: CalendarState;
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
  months: string[];
}

const MonthDropdown = ({
  state,
  setSelectedDropdown,
  months,
}: MonthDropdownProps) => {
  let onChange = (index: Key) => {
    let value = Number(index) + 1;
    let date = state.focusedDate.set({ month: value });
    state.setFocusedDate(date);
  };

  return (
    <ul className="grid h-full max-h-[300px] min-w-[300px] grid-cols-3 gap-y-10 overflow-y-scroll p-2">
      {months.map((month, index) => {
        return (
          <li className="flex justify-center" key={index}>
            <Button
              variant={
                +month === state.focusedDate.month ? 'secondary' : 'text'
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

export default MonthDropdown;
