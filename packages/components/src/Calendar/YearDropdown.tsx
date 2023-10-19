import { CalendarDate } from '@internationalized/date';
import { Dispatch, Key, SetStateAction } from 'react';

import { useDateFormatter } from '@react-aria/i18n';

import { CalendarState } from '@react-stately/calendar';

import { Button } from '../Button';

interface YearDropdownProps {
  state: CalendarState;
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

const YearDropdown = ({ state, setSelectedDropdown }: YearDropdownProps) => {
  const years: { value: CalendarDate; formatted: string }[] = [];
  let formatter = useDateFormatter({
    year: 'numeric',
    timeZone: state.timeZone,
  });
  for (let i = -20; i <= 20; i++) {
    let date = state.focusedDate.add({ years: i });
    years.push({
      value: date,
      formatted: formatter.format(date.toDate(state.timeZone)),
    });
  }

  let onChange = (key: Key) => {
    let index = Number(key);
    let date = years[index].value;
    state.setFocusedDate(date);
  };

  return (
    <ul
      style={{
        gridTemplateColumns: '1fr 1fr 1fr',
        overflowY: 'scroll',
        rowGap: '2.5rem',
      }}
      className="grid  h-full max-h-[300px] min-w-[300px] p-2"
    >
      {years.map((year, index) => {
        return (
          <li className="flex justify-center" key={index}>
            <Button
              data-selected={true}
              data-active={true}
              disabled={state.isDisabled}
              variant={
                +year.formatted === state.focusedDate.year
                  ? 'secondary'
                  : 'text'
              }
              size="small"
              onPress={() => {
                onChange(index);
                setSelectedDropdown(undefined);
              }}
              key={index}
            >
              {year.formatted}
            </Button>
          </li>
        );
      })}
    </ul>
    // <Select
    //   aria-label="Year"
    //   selectedKey={'20'}
    //   onChange={onChange}
    //   data-testid="year"
    //   disabled={state.isDisabled}
    // >
    //   {years.map((year, i) => (
    //     <Select.Option key={i}>{year.formatted}</Select.Option>
    //   ))}
    // </Select>
  );
};

export default YearDropdown;
