import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const day = dayjs;

export const ago = (date: Date) => dayjs().from(date, true);
