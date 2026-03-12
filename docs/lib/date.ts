import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const day = dayjs;

/**
 * Formats given date to a relative human readable time string.
 */
export const ago = (date: Date) => dayjs().from(date, true);
