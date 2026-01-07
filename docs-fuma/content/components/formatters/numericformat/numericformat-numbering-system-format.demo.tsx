'use client';

import { NumericFormat, Stack } from '@marigold/components';

export default () => (
  <Stack space={1}>
    <NumericFormat value={123456} numberingSystem="mathsans" />
    <NumericFormat value={123456} numberingSystem="arab" />
    <NumericFormat value={123456} numberingSystem="beng" />
    <NumericFormat value={123456.78} numberingSystem="deva" />
    <NumericFormat
      value={[1000, 5000]}
      style="unit"
      unit="percent"
      numberingSystem="mathsans"
    />
  </Stack>
);
