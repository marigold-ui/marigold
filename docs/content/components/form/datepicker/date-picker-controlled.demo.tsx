import { parseDate } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import { useState } from 'react';

import { DatePicker } from '@marigold/components';

export default () => {
  const [date, setDate] = useState<DateValue>(parseDate('1912-06-23'));

  return <DatePicker label="Date" value={date} onChange={setDate} />;
};
