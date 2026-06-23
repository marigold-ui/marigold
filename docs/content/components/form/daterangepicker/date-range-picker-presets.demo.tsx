import { getLocalTimeZone, today } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import { useState } from 'react';
import { Button, DateRangePicker, Inline, Stack } from '@marigold/components';

const now = today(getLocalTimeZone());

const presets = {
  'Last 7 days': { start: now.subtract({ days: 6 }), end: now },
  'Last 30 days': { start: now.subtract({ days: 29 }), end: now },
  'This month': {
    start: now.set({ day: 1 }),
    end: now.add({ months: 1 }).set({ day: 1 }).subtract({ days: 1 }),
  },
};

export default () => {
  const [value, setValue] = useState<{
    start: DateValue;
    end: DateValue;
  } | null>(null);

  return (
    <Stack space={4}>
      <Inline space={2}>
        {Object.entries(presets).map(([label, range]) => (
          <Button
            key={label}
            variant="secondary"
            size="small"
            onPress={() => setValue(range)} // [!code highlight]
          >
            {label}
          </Button>
        ))}
      </Inline>
      <DateRangePicker
        label="Report period"
        value={value} // [!code highlight]
        onChange={setValue} // [!code highlight]
      />
    </Stack>
  );
};
