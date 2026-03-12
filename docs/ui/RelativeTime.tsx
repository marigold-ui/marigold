'use client';

import { ago, day } from '@/lib/date';

export interface RelativeTimeProps {
  date: Date;
}

export const RelativeTime = ({ date }: RelativeTimeProps) => {
  const isMoreThanSixMonthsAgo = day().diff(date, 'month') > 6;

  // Show date when given date is more than 6 months ago
  return isMoreThanSixMonthsAgo
    ? Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date)
    : `${ago(date)} ago`;
};
