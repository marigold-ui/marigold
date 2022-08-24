import { NumberField } from '@marigold/components';

export const DecimalNumberField = () => (
  <NumberField
    label="Decimals"
    formatOptions={{
      signDisplay: 'exceptZero',
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }}
    defaultValue={0}
  />
);
