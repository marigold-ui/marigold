'use client';

import { DatePicker, Stack, Text } from '@marigold/components';

export default function () {
  return (
    <Stack space={4}>
      <Text size="small" variant="info">
        Try pasting a date in yyyy-mm-dd format (e.g., &quot;2025-09-24&quot;)
      </Text>
      <DatePicker
        label="Scheduled Date"
        description="You can paste dates directly into this field"
      />
    </Stack>
  );
}
