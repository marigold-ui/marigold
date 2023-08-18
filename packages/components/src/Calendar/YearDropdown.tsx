import { CalendarDate } from '@internationalized/date';
import React, { Key } from 'react';

import { useDateFormatter } from '@react-aria/i18n';

import { CalendarState } from '@react-stately/calendar';

import { Select } from '../Select';

interface YearDropdownProps {
  state: CalendarState;
}

const YearDropdown = ({ state }: YearDropdownProps) => {
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
    <Select
      aria-label="Year"
      selectedKey={'20'}
      onChange={onChange}
      data-testid="year"
      disabled={state.isDisabled}
    >
      {years.map((year, i) => (
        <Select.Option key={i}>{year.formatted}</Select.Option>
      ))}
    </Select>
  );
};

export default YearDropdown;
