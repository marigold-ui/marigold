import React from 'react';

import { DateFormatterOptions, useDateFormatter } from '@react-aria/i18n';

interface DateFormatterProps extends DateFormatterOptions {
  value: Date;
  wideDigits?: boolean;
}

export const DateFormatter = ({
  value,
  wideDigits,
  ...props
}: DateFormatterProps) => {
  const formatter = useDateFormatter({
    ...props,
  });

  return (
    <span className={wideDigits ? 'tabular-nums' : ''}>
      {formatter.format(value)}
    </span>
  );
};
