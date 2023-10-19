import { Dispatch, Key, SetStateAction } from 'react';

import { useDateFormatter } from '@react-aria/i18n';

import { CalendarState } from '@react-stately/calendar';

import { Button } from '../Button';

interface MonthDropdownProps {
  state: CalendarState;
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

const MonthDropdown = ({ state, setSelectedDropdown }: MonthDropdownProps) => {
  let months = [];
  let formatter = useDateFormatter({
    month: 'long',
    timeZone: state.timeZone,
  });

  let numMonths = state.focusedDate.calendar.getMonthsInYear(state.focusedDate);
  for (let i = 1; i <= numMonths; i++) {
    let date = state.focusedDate.set({ month: i });
    months.push(formatter.format(date.toDate(state.timeZone)));
  }

  let onChange = (index: Key) => {
    let value = Number(index) + 1;
    let date = state.focusedDate.set({ month: value });
    state.setFocusedDate(date);
  };

  return (
    <ul
      style={{
        gridTemplateColumns: '1fr 1fr 1fr',
        overflowY: 'scroll',
        rowGap: '2.5rem',
      }}
      className="grid h-full max-h-[300px] min-w-[300px] p-2"
    >
      {months.map((month, index) => {
        return (
          <li className="flex justify-center" key={index}>
            <Button
              data-selected={true}
              data-active={true}
              disabled={state.isDisabled}
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
    // <Select
    //   aria-label="Month"
    //   onChange={onChange}
    //   selectedKey={String(state.focusedDate.month)}
    //   data-testid="month"
    //   disabled={state.isDisabled}
    // >
    //   {months.map((month, i) => (
    //     <Select.Option key={i + 1}>{month.substring(0, 3)}</Select.Option>
    //   ))}
    // </Select>
  );
};

export default MonthDropdown;
