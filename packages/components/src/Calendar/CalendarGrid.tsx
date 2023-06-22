import React from 'react';
import { useMemo } from 'react';
import { AriaCalendarGridProps, useCalendarGrid } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { CalendarState } from '@react-stately/calendar';
import { getWeeksInMonth, startOfWeek, today } from '@internationalized/date';
import { CalendarCell } from './CalendarCell';
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
    <table
      className="w-full border-spacing-[6px]"
      {...gridProps}
      cellPadding="8"
    >
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th style={{ fontWeight: 'bolder' }} key={index}>
              {day.substring(0, 2)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(numberOfWeeksInMonth).keys()].map(weekIndex => (
          <tr key={weekIndex}>
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
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
