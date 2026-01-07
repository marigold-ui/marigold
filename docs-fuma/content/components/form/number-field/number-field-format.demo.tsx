'use client';

import { NumberField, Stack } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <NumberField
      label="Amount"
      defaultValue={19.99}
      formatOptions={{
        style: 'currency',
        currency: 'USD',
      }}
    />
    <NumberField
      label="Decimals"
      formatOptions={{
        signDisplay: 'exceptZero',
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      }}
      step={0.1}
      defaultValue={0}
    />
    <NumberField
      label="Length"
      defaultValue={150}
      minValue={0}
      formatOptions={{
        style: 'unit',
        unit: 'centimeter',
        unitDisplay: 'short',
      }}
    />
    <NumberField
      label="Percentage"
      defaultValue={0.42}
      formatOptions={{
        style: 'percent',
      }}
    />
  </Stack>
);
