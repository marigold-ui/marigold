import React from 'react';

import { useNumberFormatter } from '@react-aria/i18n';

interface PercentageProps extends Omit<Intl.NumberFormatOptions, 'style'> {
  value: number | bigint;
  wideDigits?: boolean;
}

export const Percentage = ({
  value,
  wideDigits,
  ...props
}: PercentageProps) => {
  const formatter = useNumberFormatter({
    style: 'percent',
    ...props,
  });
  return (
    <span className={wideDigits ? 'tabular-nums' : ''}>
      {formatter.format(value)}
    </span>
  );
};
