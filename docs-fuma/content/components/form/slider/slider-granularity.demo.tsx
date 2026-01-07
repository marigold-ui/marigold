'use client';

import { Slider } from '@marigold/components';

export default () => (
  <Slider label="Rating" step={1} minValue={1} maxValue={5} defaultValue={2} />
);
