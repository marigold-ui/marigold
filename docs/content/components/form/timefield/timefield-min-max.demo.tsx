import { parseTime } from '@internationalized/date';
import { TimeField, TimeFieldProps } from '@marigold/components';

export default (props: TimeFieldProps) => (
  <TimeField
    minValue={parseTime('09:00')}
    maxValue={parseTime('17:00')}
    label="Pick a time"
    description="Time must be during office hours form 09:00 - 17:00"
    defaultValue={parseTime('12:00')}
    {...props}
  />
);
