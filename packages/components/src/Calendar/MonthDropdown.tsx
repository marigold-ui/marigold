import { Dispatch, Key, SetStateAction, useContext } from 'react';
import { CalendarStateContext } from 'react-aria-components';

import { useDateFormatter } from '@react-aria/i18n';

import { Button } from '../Button';

interface MonthDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
  setSelectedValue: Dispatch<
    SetStateAction<{
      month?: string;
      year?: number;
    }>
  >;
  selectedValue: { month?: string; year?: number };
}

const MonthDropdown = ({
  setSelectedDropdown,
  setSelectedValue,
  selectedValue,
}: MonthDropdownProps) => {
  const state = useContext(CalendarStateContext)!;

  let months: string[] = [];
  let formatter = useDateFormatter({
    month: 'long',
    timeZone: state.timeZone,
  });
  console.log(state.timeZone);
  let numMonths = state.focusedDate.calendar.getMonthsInYear(state.focusedDate);
  console.log(numMonths);
  for (let i = 1; i <= numMonths; i++) {
    let date = state.focusedDate.set({ month: i });
    months.push(formatter.format(date.toDate(state.timeZone)));
  }

  let onChange = (index: Key) => {
    let value = Number(index) + 1;
    let date = state.focusedDate.set({ month: value });
    state.setFocusedDate(date);
    state.setValue(date);
    setSelectedValue({
      ...selectedValue,
      month: months[date.month - 1].substring(0, 3),
    });
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

export default MonthDropdown;
