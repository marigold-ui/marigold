'use client';

import { Slider } from '@marigold/components';

export default () => (
  <Slider
    defaultValue={[10, 30]}
    thumbLabels={['min', 'max']}
    step={5}
    label="Price range"
    formatOptions={{ style: 'currency', currency: 'EUR' }}
  />
);
