import { NumberField } from '@marigold/components';

export const CurrencyNumberField = () => (
  <NumberField
    label="Amount"
    defaultValue={19.99}
    formatOptions={{
      style: 'currency',
      currency: 'USD',
    }}
  />
);
