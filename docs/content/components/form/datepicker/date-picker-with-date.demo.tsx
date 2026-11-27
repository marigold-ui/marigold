import { useState } from 'react';
import {
  DatePicker,
  type DateValue,
  parseAbsoluteToLocal,
} from '@marigold/components';

export default () => {
  const [value, setValue] = useState<DateValue>(() =>
    parseAbsoluteToLocal(new Date().toISOString())!
  );

  return (
    <DatePicker
      label="Date"
      value={value}
      onChange={newValue => setValue(newValue!)}
    />
  );
};
