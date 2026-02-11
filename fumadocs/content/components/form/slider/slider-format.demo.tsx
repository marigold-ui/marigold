import { Slider } from '@marigold/components';

export default () => (
  <Slider
    label="Currency"
    formatOptions={{ style: 'currency', currency: 'EUR' }}
    defaultValue={60}
  />
);
