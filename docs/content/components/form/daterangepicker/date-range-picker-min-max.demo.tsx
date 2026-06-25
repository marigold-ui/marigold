import { getLocalTimeZone, today } from '@internationalized/date';
import { DateRangePicker } from '@marigold/components';

export default () => {
  const now = today(getLocalTimeZone());

  return (
    <DateRangePicker
      label="Booking window"
      minValue={now} // [!code highlight]
      maxValue={now.add({ months: 6 })} // [!code highlight]
    />
  );
};
