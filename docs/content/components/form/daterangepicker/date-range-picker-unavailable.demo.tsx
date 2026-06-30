import { getLocalTimeZone, today } from '@internationalized/date';
import { DateRangePicker } from '@marigold/components';

export default () => {
  const now = today(getLocalTimeZone());

  // Nights that are already booked and cannot be part of a new stay.
  const booked = [
    now.add({ days: 3 }),
    now.add({ days: 4 }),
    now.add({ days: 5 }),
  ];

  return (
    <DateRangePicker
      label="Stay dates"
      minValue={now}
      dateUnavailable={date => booked.some(d => date.compare(d) === 0)} // [!code highlight]
    />
  );
};
