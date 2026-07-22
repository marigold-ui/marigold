import { DateRangePicker } from '@marigold/components';

export default () => (
  <DateRangePicker
    label="Reporting period"
    presets={[
      'today',
      'yesterday',
      'this-week',
      'next-7-days',
      'next-30-days',
      'this-month',
      'this-quarter',
    ]} // [!code highlight]
  />
);
