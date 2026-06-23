import { DateRangePicker } from '@marigold/components';

export default () => (
  <DateRangePicker
    label="Date range"
    error // [!code highlight]
    errorMessage="Please select a valid date range." // [!code highlight]
  />
);
