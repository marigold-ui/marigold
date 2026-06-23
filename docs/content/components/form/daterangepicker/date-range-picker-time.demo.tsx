import { DateRangePicker } from '@marigold/components';

export default () => (
  <DateRangePicker
    label="Event window"
    granularity="minute" // [!code highlight]
  />
);
