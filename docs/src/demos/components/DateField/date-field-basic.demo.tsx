import { getLocalTimeZone, now } from '@internationalized/date';
import { DateField } from '@marigold/components';

export const BasicDateField = () => (
  <DateField
    label="date field"
    defaultValue={now(getLocalTimeZone())}
    description="this is description"
  />
);
