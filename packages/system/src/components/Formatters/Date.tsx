import React from 'react';

import { DateFormatterOptions, useDateFormatter } from '@react-aria/i18n';

interface DateFormatProps extends DateFormatterOptions {
  value: Date;
  wideDigits?: boolean;
}

export const DateFormat = ({
  value,
  wideDigits,
  ...props
}: DateFormatProps) => {
  const dateFormatter = useDateFormatter({
    ...props,
  });

  return (
    <span className={wideDigits ? 'tabular-nums' : ''}>
      {dateFormatter.format(value)}
    </span>
  );
};
