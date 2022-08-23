import { NumberField } from '@marigold/components';

export const PercentageNumberField = () => (
  <NumberField
    label="Percentage"
    defaultValue={0.42}
    formatOptions={{
      style: 'percent',
    }}
  />
);
