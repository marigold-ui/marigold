import React from 'react';
import { useMemo } from 'react';
import { AriaCalendarGridProps, useCalendarGrid } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { CalendarState } from '@react-stately/calendar';
import { getWeeksInMonth, startOfWeek, today } from '@internationalized/date';
import { CalendarCell } from './CalendarCell';
import { Box } from '@marigold/system';
import { useDateFormatter } from '@react-aria/i18n';
export interface CalendarGridProps extends AriaCalendarGridProps {
  state: CalendarState;
}

export const CalendarGrid = ({ state, ...props }: CalendarGridProps) => {
  const { locale } = useLocale();
  const { gridProps, headerProps } = useCalendarGrid(props, state);
  const numberOfWeeksInMonth = getWeeksInMonth(
    state.visibleRange.start,
    locale
  );

  const dayFormatter = useDateFormatter({
    weekday: 'short',
    timeZone: state.timeZone,
  });

  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(today(state.timeZone), locale);
    return [...new Array(7).keys()].map(index => {
      const date = weekStart.add({ days: index });
      const dateDay = date.toDate(state.timeZone);
      return dayFormatter.format(dateDay);
    });
  }, [locale, state.timeZone, dayFormatter]);

  return (
    <Box as="table" {...gridProps} cellPadding="5" style={{ width: '100%' }}>
      <Box as="thead" {...headerProps}>
        <Box as="tr">
          {weekDays.map((day, index) => (
            <th
              style={{ fontWeight: 'bolder', fontFamily: 'Inter' }}
              key={index}
            >
              {day.substring(0, 2)}
            </th>
          ))}
        </Box>
      </Box>
      <Box as="tbody">
        {[...new Array(numberOfWeeksInMonth).keys()].map(weekIndex => (
          <Box as="tr" key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={i}
                    date={date}
                    state={state as CalendarState}
                  />
                ) : (
                  <Box as="td" key={i} />
                )
              )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
