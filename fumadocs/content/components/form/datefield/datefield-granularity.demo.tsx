import { parseAbsoluteToLocal, parseDateTime } from '@internationalized/date';
import { DateField, Stack } from '@marigold/components';

export default () => (
  <Stack space={8}>
    <DateField
      label="Date and Time"
      granularity="second"
      defaultValue={parseDateTime('2025-07-23T08:29')}
    />
    <DateField
      label="Date and Time with Timezone"
      granularity="second"
      defaultValue={parseAbsoluteToLocal('2024-03-15T05:25:21Z')}
    />
  </Stack>
);
