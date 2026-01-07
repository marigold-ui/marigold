'use client';

import { Inline, Select } from '@marigold/components';

const nextTenYears = Array.from(
  { length: 10 },
  (_, i) => new Date().getFullYear() + i
);

export default () => (
  <Inline space={1} alignY="bottom">
    <Select
      label="Expiration Date"
      aria-label="Month"
      placeholder="Month"
      width={40}
    >
      <Select.Option id="01">January</Select.Option>
      <Select.Option id="02">February</Select.Option>
      <Select.Option id="03">March</Select.Option>
      <Select.Option id="04">April</Select.Option>
      <Select.Option id="05">May</Select.Option>
      <Select.Option id="06">June</Select.Option>
      <Select.Option id="07">July</Select.Option>
      <Select.Option id="08">August</Select.Option>
      <Select.Option id="09">September</Select.Option>
      <Select.Option id="10">October</Select.Option>
      <Select.Option id="11">November</Select.Option>
      <Select.Option id="12">December</Select.Option>
    </Select>
    <Select aria-label="Year" placeholder="Year" width={28}>
      {nextTenYears.map(year => (
        <Select.Option key={year} id={year.toString()}>
          {year}
        </Select.Option>
      ))}
    </Select>
  </Inline>
);
