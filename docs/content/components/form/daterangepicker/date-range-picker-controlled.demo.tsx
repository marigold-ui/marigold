import type { DateValue } from '@internationalized/date';
import { parseDate } from '@internationalized/date';
import { useState } from 'react';
import type { RangeValue } from '@react-types/shared';
import { DateRangePicker, Stack } from '@marigold/components';

export default () => {
  const [value, setValue] = useState<RangeValue<DateValue>>({
    start: parseDate('2023-10-29'),
    end: parseDate('2023-11-05'),
  });

  return (
    <Stack space={3}>
      <DateRangePicker
        label="Reporting Period"
        value={value}
        onChange={newValue => setValue(newValue!)}
      />
      <pre>
        <strong>Selected Range: </strong>
        {`${value.start.toString()} → ${value.end.toString()}`}
      </pre>
    </Stack>
  );
};
