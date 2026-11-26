import { TimeField, TimeFieldProps, parseTime } from '@marigold/components';

export default (props: TimeFieldProps) => (
  <TimeField label="Event time" defaultValue={parseTime('13:45')} {...props} />
);
