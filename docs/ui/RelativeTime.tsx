'use client';

import { ago, day } from '@/lib/date';

export interface RelativeTimeProps {
  date: Date;
}

export const RelativeTime = ({ date }: RelativeTimeProps) => {
  const monthDifference = day().subtract(6, 'month').diff(date, 'month');
  console.log(monthDifference);

  return monthDifference > 6
    ? Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date)
    : `${ago(date)} ago ${date.toISOString()}`;
};
