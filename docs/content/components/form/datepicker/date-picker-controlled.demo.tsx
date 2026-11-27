import { useState } from 'react';
import {
  DatePicker,
  type DateValue,
  Stack,
  parseDate,
} from '@marigold/components';

export default () => {
  const [value, setValue] = useState<DateValue>(() => parseDate('2023-10-29'));

  return (
    <Stack space={3}>
      <DatePicker
        label="Ticket Date"
        value={value}
        onChange={newValue => setValue(newValue!)}
      />
      <pre>
        <strong>Current Selected Date: </strong>
        {`Day: ${value.day} Month: ${value.month} Year: ${value.year}`}
      </pre>
    </Stack>
  );
};
