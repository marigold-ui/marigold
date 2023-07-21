import { getLocalTimeZone, today } from '@internationalized/date';
import { Calendar } from '@marigold/components';

export default () => <Calendar defaultValue={today(getLocalTimeZone())} />;
