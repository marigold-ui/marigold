import { parseTime } from '@internationalized/date';
import { TimeField } from '@marigold/components';

export default () => (
  <TimeField label="Event time" defaultValue={parseTime('13:45')} />
);
