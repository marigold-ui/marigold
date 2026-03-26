import type { DateValue } from '@internationalized/date';
import { CalendarDate } from '@internationalized/date';
import { useState } from 'react';
import { Calendar, Stack } from '@marigold/components';

export default () => {
  const [value, setValue] = useState<DateValue>(new CalendarDate(2025, 8, 7));

  return (
    <Stack space={3}>
      <Calendar
        aria-label="Event date"
        value={value}
        onChange={newValue => setValue(newValue!)}
      />
      <pre>
        <strong>Selected Date: </strong>
        {`Day: ${value.day} Month: ${value.month} Year: ${value.year}`}
      </pre>
    </Stack>
  );
};
