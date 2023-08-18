import React, { Key } from 'react';

import { useDateFormatter } from '@react-aria/i18n';

import { CalendarState } from '@react-stately/calendar';

import { Select } from '../Select';

interface MonthDropdownProps {
  state: CalendarState;
}

const MonthDropdown = ({ state }: MonthDropdownProps) => {
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
    let value = Number(index);
    let date = state.focusedDate.set({ month: value });
    state.setFocusedDate(date);
  };
  return (
    <Select
      aria-label="Month"
      onChange={onChange}
      selectedKey={String(state.focusedDate.month)}
      data-testid="month"
      disabled={state.isDisabled}
    >
      {months.map((month, i) => (
        <Select.Option key={i + 1}>{month.substring(0, 3)}</Select.Option>
      ))}
    </Select>
  );
};

export default MonthDropdown;
