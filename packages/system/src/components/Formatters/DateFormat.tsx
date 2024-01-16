import React from 'react';

import { DateFormatterOptions, useDateFormatter } from '@react-aria/i18n';

interface DateFormatProps extends DateFormatterOptions {
  value: Date;
  tabular?: boolean;
}

export const DateFormat = ({ value, tabular, ...props }: DateFormatProps) => {
  const dateFormatter = useDateFormatter({
    ...props,
  });

  return (
    <span className={tabular ? 'tabular-nums' : ''}>
      {dateFormatter.format(value)}
    </span>
  );
};
