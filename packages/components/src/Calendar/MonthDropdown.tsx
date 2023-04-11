import { Box } from '@marigold/system';
import { useDateFormatter } from '@react-aria/i18n';
import { CalendarState } from '@react-stately/calendar';
import React from 'react';
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
  let onChange = (key: unknown) => {
    let value = Number(key);
    let date = state.focusedDate.set({ month: value });
    state.setFocusedDate(date);
  };
  return (
    <Box style={{ flexShrink: 0 }}>
      <Select
        aria-label="Month"
        onChange={onChange}
        defaultSelectedKey={state.visibleRange.end.month.toString()}
      >
        {months.map((month, i) => (
          <Select.Option key={i + 1}>{month}</Select.Option>
        ))}
      </Select>
    </Box>
  );
};

export default MonthDropdown;
