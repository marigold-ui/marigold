import { CalendarDate } from '@internationalized/date';
import { RangeCalendar } from '@marigold/components';

export default () => (
  <RangeCalendar
    aria-label="Festival period"
    presets={[
      'this-week',
      'this-month',
      'this-quarter',
      {
        label: 'Festival season',
        value: () => ({
          start: new CalendarDate(2026, 6, 1),
          end: new CalendarDate(2026, 8, 31),
        }),
      }, // [!code highlight]
    ]}
  />
);
