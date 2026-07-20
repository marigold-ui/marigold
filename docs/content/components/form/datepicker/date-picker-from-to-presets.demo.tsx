import type { DateValue } from '@internationalized/date';
import { useState } from 'react';
import { DatePicker, Stack } from '@marigold/components';

export default () => {
  const [from, setFrom] = useState<DateValue | null>(null);
  const [to, setTo] = useState<DateValue | null>(null);

  return (
    <Stack space={4}>
      <DatePicker
        label="From"
        value={from}
        onChange={setFrom}
        maxValue={to ?? undefined} // [!code highlight]
        presets={['today', 'tomorrow']}
      />
      <DatePicker
        label="To"
        value={to}
        onChange={setTo}
        minValue={from ?? undefined} // [!code highlight]
        presets={['today', 'tomorrow']}
      />
    </Stack>
  );
};
