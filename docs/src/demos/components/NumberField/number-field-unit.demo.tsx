import { NumberField } from '@marigold/components';

export const UnitNumberField = () => (
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
);
