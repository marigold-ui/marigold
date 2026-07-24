import { DateRangePicker } from '@marigold/components';

export default () => (
  // A single field-shaped quick filter: the built-in `presets` list covers the
  // frequent ranges in one click, and the calendar in the same popover handles
  // any range a preset cannot express, so there is no separate "custom" branch.
  <DateRangePicker
    aria-label="Date range"
    width={36}
    presets={['last-7-days', 'last-30-days', 'this-month', 'this-quarter']} // [!code highlight]
  />
);
