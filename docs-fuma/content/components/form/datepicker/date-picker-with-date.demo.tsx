'use client';

import type { DateValue } from '@internationalized/date';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { useState } from 'react';
import { DatePicker } from '@marigold/components';

export default () => {
  const date = new Date().toISOString();
  const [value, setValue] = useState<DateValue>(parseAbsoluteToLocal(date)!);

  return (
    <DatePicker
      label="Date"
      value={value}
      onChange={newValue => setValue(newValue!)}
    />
  );
};
