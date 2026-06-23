import type { DateValue } from '@internationalized/date';
import { parseDate } from '@internationalized/date';
import { useState } from 'react';
import type { RangeValue } from '@react-types/shared';
import { DateRangePicker, Stack } from '@marigold/components';

export default () => {
  const [range, setRange] = useState<RangeValue<DateValue>>({
    start: parseDate('2024-01-01'),
    end: parseDate('2024-01-31'),
  });

  return (
    <Stack space={3}>
      <DateRangePicker
        label="Reporting period"
        value={range} // [!code highlight]
        onChange={value => setRange(value!)} // [!code highlight]
      />
      <pre className="text-sm">
        {`${range.start.toString()} to ${range.end.toString()}`}
      </pre>
    </Stack>
  );
};
