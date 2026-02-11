import { NumericFormat, Stack } from '@marigold/components';

export default () => (
  <Stack space={1}>
    <NumericFormat
      value={[0.1234, 0.8765]}
      style="percent"
      notation="compact"
    />
    <NumericFormat value={[29.99, 59.99]} style="currency" currency="USD" />
    <NumericFormat
      value={[0.1234, 0.8765]}
      style="percent"
      notation="compact"
    />
    <NumericFormat
      value={[5, 12]}
      style="unit"
      unit="kilometer"
      unitDisplay="narrow"
    />
  </Stack>
);
