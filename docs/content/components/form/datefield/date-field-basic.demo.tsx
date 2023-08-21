import { CalendarDate } from '@internationalized/date';

import { DateField } from '@marigold/components';

export default () => (
  <DateField
    label="Date field"
    defaultValue={new CalendarDate(2020, 2, 3)}
    description="This is description"
  />
);
