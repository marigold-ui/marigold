import React from 'react';

import { DateFormatterOptions, useDateFormatter } from '@react-aria/i18n';

interface DateFormatterProps extends DateFormatterOptions {
  value: Date;
  fullDigitWidth?: boolean;
}

export const DateFormatter = ({
  value,
  fullDigitWidth,
  ...props
}: DateFormatterProps) => {
  const formatter = useDateFormatter({
    ...props,
  });

  return (
    <span className={fullDigitWidth ? 'tabular-nums' : ''}>
      {formatter.format(value)}
    </span>
  );
};
