import { DateRangePicker } from '@marigold/components';

export default () => (
  <DateRangePicker
    label="Vacation"
    visibleDuration={{ months: 2 }} // [!code highlight]
  />
);
