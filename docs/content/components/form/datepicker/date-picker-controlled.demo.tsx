import type { DateValue } from '@internationalized/date';
import { parseDate } from '@internationalized/date';
import { useState } from 'react';
import { DatePicker } from '@marigold/components';

export default () => {
  const [value, setValue] = useState<DateValue>(parseDate('2023-10-29'));

  return (
    <DatePicker label="Select Ticket Date" value={value} onChange={setValue} />
  );
};
