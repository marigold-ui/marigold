import { useState } from 'react';
import { DatePicker, Inline, Select, Stack } from '@marigold/components';

export default () => {
  // The Select is the single source of truth: choosing a preset clears any
  // custom range, and picking custom dates is represented by the "custom" key.
  const [range, setRange] = useState<string>('last-30');

  return (
    <Stack space={4}>
      <Select
        aria-label="Date range"
        placeholder="Date range"
        width={36}
        defaultSelectedKey="last-30"
        onChange={key => setRange(key as string)}
      >
        <Select.Option id="last-7">Last 7 days</Select.Option>
        <Select.Option id="last-30">Last 30 days</Select.Option>
        <Select.Option id="this-month">This month</Select.Option>
        <Select.Option id="custom">Custom range…</Select.Option>
      </Select>

      {range === 'custom' && (
        <Inline space={4} alignY="input">
          <DatePicker label="From" />
          <DatePicker label="To" />
        </Inline>
      )}
    </Stack>
  );
};
