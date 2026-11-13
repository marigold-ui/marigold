import { NumberField } from '@marigold/components';

export default () => (
  <NumberField
    label="Tickets"
    description="Single tickets from one listing"
    minValue={0}
    maxValue={2}
    defaultValue={1}
    width={44}
    showMaxValue
  />
);
