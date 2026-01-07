'use client';

import { DateField, Inline } from '@marigold/components';

export default () => (
  <Inline space={2}>
    <DateField label="Start Date" width={36} />
    <DateField label="End Date" width={36} />
  </Inline>
);
