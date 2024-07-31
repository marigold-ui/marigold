import type { DateValue } from '@internationalized/date';
import { parseDate } from '@internationalized/date';
import { useState } from 'react';
import { DatePicker } from '@marigold/components';

export default () => {
  const [value, setValue] = useState<DateValue>(parseDate('1912-06-23'));

  return <DatePicker label="Date" value={value} onChange={setValue} />;
};
