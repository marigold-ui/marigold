import { startOfWeek, today } from '@internationalized/date';
import { useContext, useMemo } from 'react';
import { CalendarGridProps, CalendarStateContext } from 'react-aria-components';

import { useCalendarGrid } from '@react-aria/calendar';
import { useDateFormatter, useLocale } from '@react-aria/i18n';

import { useClassNames } from '@marigold/system';

export function CalendarGridHeader(props: CalendarGridProps) {
  const state = useContext(CalendarStateContext)!;
  const { headerProps } = useCalendarGrid(props, state);

  const { locale } = useLocale();
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

  const classNames = useClassNames({ component: 'Calendar' });

  return (
    <thead {...headerProps}>
      <tr>
        {weekDays.map((day, index) => (
          <th className={classNames.calendarHeader} key={index}>
            {day.substring(0, 2)}
          </th>
        ))}
      </tr>
    </thead>
  );
}
