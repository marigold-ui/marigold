import type { DateValue } from '@internationalized/date';
import { useState } from 'react';
import { DateRangePicker } from '@marigold/components';

const MIN_NIGHTS = 2;
const MAX_NIGHTS = 14;

const getErrorMessage = (nights: number | null): string | undefined => {
  if (nights === null) return undefined;
  if (nights < MIN_NIGHTS)
    return `A stay must be at least ${MIN_NIGHTS} nights.`;
  if (nights > MAX_NIGHTS) return `A stay can be at most ${MAX_NIGHTS} nights.`;
  return undefined;
};

export default () => {
  const [value, setValue] = useState<{
    start: DateValue;
    end: DateValue;
  } | null>(null);

  const nights = value ? value.end.compare(value.start) : null; // [!code highlight]
  const message = getErrorMessage(nights);

  return (
    <DateRangePicker
      label="Stay"
      value={value}
      onChange={setValue}
      error={Boolean(message)} // [!code highlight]
      errorMessage={message} // [!code highlight]
    />
  );
};
