import { CalendarDate } from '@internationalized/date';

import { useDateFormatter } from '@react-aria/i18n';

export function useFormattedMonths(
  timeZone: string,
  focusedDate: CalendarDate
) {
  let months: string[] = [];
  let formatter = useDateFormatter({
    month: 'long',
    timeZone: timeZone,
  });

  let numMonths = focusedDate.calendar.getMonthsInYear(focusedDate);

  for (let i = 1; i <= numMonths; i++) {
    let date = focusedDate.set({ month: i });
    months.push(formatter.format(date.toDate(timeZone)));
  }

  return months;
}
