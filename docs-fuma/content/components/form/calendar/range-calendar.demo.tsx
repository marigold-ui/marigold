'use client';

import { CalendarDate } from '@internationalized/date';
import { Calendar } from '@marigold/components';

export default () => (
  <Calendar
    minValue={new CalendarDate(2019, 6, 5)}
    maxValue={new CalendarDate(2019, 6, 20)}
  />
);
