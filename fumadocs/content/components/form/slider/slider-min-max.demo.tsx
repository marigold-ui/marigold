import { Slider } from '@marigold/components';

export default () => (
  <Slider
    label="Budget"
    formatOptions={{ style: 'currency', currency: 'EUR' }}
    defaultValue={680}
    minValue={100}
    maxValue={5000}
    step={100}
  />
);
