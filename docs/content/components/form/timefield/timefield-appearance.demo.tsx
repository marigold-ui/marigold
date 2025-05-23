import { parseTime } from '@internationalized/date';
import { TimeField, TimeFieldProps } from '@marigold/components';

export default (props: TimeFieldProps) => (
  <TimeField label="Event time" defaultValue={parseTime('13:45')} {...props} />
);
